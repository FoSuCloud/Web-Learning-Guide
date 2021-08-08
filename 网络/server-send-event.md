## sse
* 服务器端想要向客户端推送消息，除了websocket，还有sse技术（server sent event）
* `此外http2也提供了服务器推送技术（但是客户端会因为连接关闭而接收出现问题，现在我还不知道是哪里出问题，代码问题？）`
  
## SSE技术的本质
* 严格来说，HTTP协议无法做到服务端主动推送消息，`但是有一种方式是，服务端先向客户端声明，接下来发送的是流信息(streaming)`
* `流信息：也就是发送的不是一个一次性的数据包，而是一个数据流（数据流会不断的发送过来）`
* `由于是流信息，所以客户端不会关闭连接，会一直等待服务器发送过来的新的数据流（例子：视频播放！）`，视频播放的本质就是以流信息的形式，完成一次用时很久的下载！
---
* `SSE技术就是基于这种流信息的方式实现的，基于http协议，除了ie，其他浏览器都支持`

## SSE和websocket的区别
1. Websocket技术是全双工通信，浏览器和服务器都可以互相发送消息；而SSE是只能服务器端发送消息给客户端(`浏览器第一次发送消息其实算是打开流，以后主动发送的消息其实就是另外一次请求，不算上一次SSE请求`)
* `因为流消息的本质就是服务器主动向浏览器推送数据，相当于下载被分为多次完成`
2. SSE技术是使用HTTP协议的，所以兼容性很好，现有的服务器软件都支持。`而websocket是另一种通信协议，只是在建立连接进行握手的时候使用了HTTP协议`
3. SSE技术更加轻量级，而websocket协议会更加复杂
4. `SSE技术默认会断线重连`，而websocket需要自己重新连接。
5. `SSE技术只支持传输文本，如果是二进制数据需要编码后再传输`，websocket协议默认支持传输文本和二进制数据
6. SSE技术支持自定义发送的消息类型(`event:`)

### 客户端例子
* `SSE默认不支持跨域，需要跨域要配置withCredentials:true,表示是否在请求时一起发送cookie`
* message事件用来接收服务器发送过来的数据；error事件是通信错误，连接中断的时候触发的事件；`close可以关闭连接`
* `如果服务器要触发其他事件，那么可以自定义Eventsource事件，那么就不会经过message事件触发，而是直接触发对应的自定义事件`
```javascript
    const evtSource = new EventSource("http://localhost:3000/", { withCredentials: true } );
    evtSource.onmessage = function(event) {
        console.log(event.data)
    }
    // 默认事件
    evtSource.addEventListener('test',(event)=>{
        console.log(event.lastEventId) // test1, 通过lastEventId可以获取到该条message的id
        console.log('test:',event.data)
        // evtSource.close(); // 关闭，之后的json数据也获取不到了，因为连接已经关闭了
    })
    // 自定义事件 
    evtSource.addEventListener('json',(event)=>{
        console.log('json:',event.data) // {'name':'yiye','age':33};
    })
    evtSource.onerror = function (event){
        console.log(event.data)
    }
```

### 服务端例子
* 前端代码运行在63342端口或者3001端口，然后我们配置跨域相关参数
* `cache-control:no-cache表示就是缓存中存在数据，依旧向服务器请求数据`
* `另外我们必须把content-type设置为text/event-stream(表示是事件流，才可以支持SSE技术，否则直接就关闭连接了，并且必须是文本！text)`
* 也即是类型是文本text,MIME类型是event-stream
* `还要设置connection:keep-alive;才能保持连接不关闭`
---
* `SSE技术，后端发送的数据需要注意格式！`
* 每次发送的数据作为一个message,使用`\n\n结尾`；`每个message都可以分为单行或者多行`，如果是多行，那么`只有最后一行是\n\n,其他行结尾使用\n`
* 每个message的格式都是： `[field]:[value][\n\n]`
* field只能是以下值：id,data,event,retry(`指定浏览器重新发起连接的时间间隔，浏览器会自动处理的！`)
* `另外还有一种情况是没有需要发送的数据，但是要保持连接状态，那么就使用注释，也就是冒号开头的行，该注释会被浏览器接收到，但是不会暴露给开发者，也不会在network显示`
---
* 发送json字段也可以，但是要注意多行的格式问题。
* `每个message发送之前，都可以先发送一个id表示该条message的唯一标示`
```javascript

const http=require('http')
const port = 3000;

const server =http.createServer((req,res)=>{
    res.statusCode = 200
    let arr=['http://localhost:63342','http://localhost:3001']
    if(arr.includes(req.headers.origin)){
        res.setHeader('content-type','text/event-stream; charset=utf-8')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('set-cookie','a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=localhost')
    res.write(":连接成功，发送数据啦~\n"); // 注释，前端获取不到
    // 前面没有event:xxx,所以是默认事件
    res.write('retry: 30000\n'); // 重连时间，也就是网络断开或者时间间隔到期之后等原因导致连接出错，那么浏览器就会重新发一个sse请求(直接断开本地后端测试)
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: 第二条数据\n\n");

    res.write("event: test\n");
    res.write("id: test1\n"); // 但是可以发现后面的json数据也带有这个id,如果不设置id的话！
    res.write("data: test的数据\n\n");

    res.write("event: json\n");
    // res.write("id: json\n"); // 
    res.write("data: {'name':'yiye',\n");
    res.write("data: 'age':33};\n\n");

    res.write("data: 默认事件\n\n"); // 这是默认事件message,上面的json事件已经结束了，因为上个dat是\n\n结尾！

    // 监听连接关闭
    req.addListener('close',()=>{
        console.log('连接关闭了～')
    })
})

server.listen(port,()=>{
    console.log('start')
})
```
* `直接断开本地后端服务测试retry,可以发现会在固定的时间间隔重新发一次请求`
---
* 最后我们可以在浏览器控制台的network看到存在一个`EventStream的tab页`
* 该页面描述了我们的数据类型和值，还有数据接收到的时间
* `并且自定义事件的确不会触发message事件，而是直接触发我们eventSource自定义的事件`
* [http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html]("sse")
