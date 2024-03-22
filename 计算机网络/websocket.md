## webSocket
* 客户端要实现webSocket只需要使用webSocket对象就可以了
* 而后端,`对于node来说，要实现webSocket通信，可以选择ws,socket.io,websocket-node等方式`
* 本文选择使用`ws作为websocket通信库`
---
* `webSocket是一种网络通信协议`，为什么有了http协议还需要websocket协议？
* 这是因为http协议(http2以下)，只能由客户端主动发起请求，不可以由服务器主动发起请求！
---
* `场景：手机客户端需要每天按时提醒我们起床，这个动作是手机(相当于服务端)主动发起的，而客户端是接收方`
* 如果我们只能客户端主动来向服务端获取数据，那么我们使用微信聊天就没办法进行了，因为必须要自己主动聊才能由回复，对方没办法主动发消息给我们！
* 旧的解决方案有：轮询(间隔10秒获取一次服务器的新消息)，长轮询；但是轮询的效率太低。
* 新的解决方案就是websocket(虽然http2也可以主动向客户端发起请求但还是有区别，具体看http2.md)

### 介绍
* 我们可以看到mdn中的介绍[https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API]("介绍")
* websocket就是为了可以向服务器发送消息，并且可以接收服务主动发送的消息的通信协议，不需要通过轮询服务器的方式来获取响应
* websocket协议在08年就出现了，现在在浏览器端的兼容性很好，然后服务器端需要看语言，也要看是否有实现了的库
* websocket的特点：
1. `建立在tcp协议之上，所以服务器端的websocket实现其实也很简单`
2. 和http协议有很好的兼容性，`默认端口也是80(ws)和443(wss)`，并且在websocket握手的阶段使用的是http协议。
* 所以握手阶段不容易屏蔽，可以通过各种http代理服务器
3. 数据格式比较轻量，性能开销小，通信高效。`我们可以在network控制台看到websocket协议的响应不是response,而是message,格式的确不一样`
4. `没有同源限制！只要服务器不检验，那么就可以和任意服务器通信。（所以也是一种跨域的方式）`
5. 可以发送文本，二进制数据
6. `协议标识符是ws,如果是加密了，那么就是wss(也就是套了一个tls层)`

### 客户端使用
```javascript
    // 使用WebSocket对象新建一个websocket连接
    var ws = new WebSocket("ws://localhost:3000/foo");
    // websocket连接开启后
    ws.onopen = function(evt) {
        console.log("Connection open ...");
        ws.send("Hello WebSockets!"); // 发送数据给服务器端
    };
    // 拿到websocket的响应后
    ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        // ws.close(); // 前端主动去结束请求
    };
    // websocket请求的关闭后
    ws.onclose = function(evt) {
        console.log("Connection closed.");
    };
    // ws出错的的时候
    ws.onerror = function(event) {
      // handle error event
    };
```
### 服务器端使用
```javascript
const WebSocketServer = require('ws').Server
const ws = new WebSocketServer({ port: 3000 });

ws.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    ws.send('websocket服务器端');
  });
});
```

### 例子
1. 首先我们按照上面的简单例子，可以在network控制台可以看到请求头和响应头都有一个字段`Connection:Upgrade,表示http协议需要升级！`
* 此外`响应头和请求头都还有一个字段是Upgrade:websocket，表示需要服务器把协议升级为websocket协议！`
2. `通过binaryType指定接收到数据格式，也就是接收到的二进制数据都会被解析为对应的格式(buffer或者arrayBuffer)`
```javascript
// 前端
ws.binaryType = 'arraybuffer' // 获取的二进制数据被解析为对应的类型(blob或者arrayBuffer)
ws.onmessage=function (evt){
    if(evt.data instanceof ArrayBuffer){
        console.log(String.fromCharCode.apply(null, new Int8Array(evt.data)))
    }
}
    
// 后端
ws.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let buf=new Buffer("buffer数据")
    ws.send(buf)
    let arr=new ArrayBuffer(32)
    const typedArray1 = new Int8Array(arr);
    typedArray1[0] = 97; // a
    ws.send(typedArray1)
  });
});
```
* 所以最后接收到两个数据，一个被解析为buffer￦ﾕﾰ￦ﾍﾮ（`因为buffer使用Int8Array解析，但是最后的字符确是中文，解码出错`）
* 最后一个解析为对应的字符a;
* `最好还是不使用binaryType来限制解析方式，应该在onmessage方法里面，通过instanceof来判断数据类型来决定解析方式`
3. 解析Buffer字符串数据
```javascript
// 前端
    ws.onmessage = function(evt) {
        if(evt.data instanceof Blob){
            let reader = new FileReader();
            reader.onload = function(event){
                console.log('blob',reader.result) // blob buffer数据
            };
            reader.readAsText(evt.data); // 作为一个文本数据去读取
        }
    };
// 后端
ws.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let buf=new Buffer('buffer数据')
    ws.send(buf)
  });
});
```
4. 如果websocket传输的数据是二进制数据，那么可以`通过bufferedAmount来判断还有多少字节的数据还没有发送出去`
* 也就是被send方法放入队列中，但是还没有被发送到网络中的字节数量
```javascript
// 前端
ws.onmessage = function(evt) {
  if(evt.data instanceof Blob){
    let reader = new FileReader();
    reader.onload = function(event){
      let img=document.createElement('img')
      img.src='data:base64;'+reader.result
      document.body.appendChild(img)
    };
    reader.readAsDataURL(evt.data); // 因为是base64数据，作为图片src，所以使用url读取方式
  }
  // ws.close(); // 前端主动去结束请求
};
// 后端
const fs=require('fs')
ws.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        fs.readFile('./static/1.png','binary',(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log('数据读取成功');
                let buf=new Buffer(data,'binary')
                ws.send(buf)
            }
        })
    });
});
```
* 最后我们可以看到对应的图片,但是太快了，没有办法实验到bufferedAmount这个api,所以自己创建一个大一点的buffer
```javascript
// 后端
ws.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('开始发送');
        let buf=new Buffer(10000000)
        ws.send(buf)
        let timer = setInterval(()=>{
            if(ws.bufferedAmount === 0){
                console.log('发送完成')
                clearInterval(timer)
            }else{
                console.log('还剩下',ws.bufferedAmount)
            }
        },1)
    });
});
```
* `此时我们可以看到bufferedAmount的确会变化，但是一直都是总数+10，最后才变为0，而不是渐渐变化的过程`
---

* 服务器端使用ws可以和http一起协作使用，具体的使用方法参考 [https://github.com/websockets/ws]("ws")
* 例子：

```javascript
// node后端
const parse = require('url').parse
const createServer = require('计算机网络/http请求/http').createServer
const Server = require('ws').Server

const server = createServer((req, res) => {
    console.log('server start')
    res.end('server')
});
// noServe,因为serve服务监听由http来完成
const wss1 = new Server({noServer: true});
const wss2 = new Server({noServer: true});

wss1.on('connection', function connection(ws) {
    ws.send('wss1');
    setTimeout(() => {
        ws.send("服务器主动推送的数据")
        let buf = new Buffer("buffer数据")
        ws.send(buf)
    }, 1000)
});

wss2.on('connection', function connection(ws) {
    ws.send('wss2');
});

server.on('upgrade', function upgrade(request, socket, head) {
    const {pathname} = parse(request.url);
    let origins = ['http://localhost:63342/']
    if (pathname === '/upgrade') {
        if (origins.includes(request.headers.origin)) {
            // 处理upgrade升级协议请求，在服务器模式不需要处理
            // 但是在noserve模式必须要手动处理，否则会连接失败
            wss1.handleUpgrade(request, socket, head, function done(ws) {
                wss1.emit('connection', ws, request); // 通知websocket连接
            });
        } else {
            socket.destroy();
        }
    } else {
        socket.destroy();
    }
});

server.listen(3000);
```
* `如果来源地址不在数组中，那么使用socket.destroy来关闭连接`，前端报错：WebSocket connection to 'ws://localhost:3000/upgrade' failed:
* `如果来源地址在数组中，那么就不调用socket.destory，而是发送数据给客户端`，浏览器得到："buffer数据"
* `所以虽然websocket原生支持跨域，但是也可以限制不跨域，根据来源来设置`

## 心跳包
* 在websocket使用http完成握手之后，任意时刻，客户端或者服务器端都可以任意发起ping，然后接收方就要响应pong用来确保对方还保持着连接
* `一般是服务器端用心跳包来确保客户端包还保持着连接`
* Ping表示发送方，pong表示接收方；例如浏览器发送信息给服务器，那么浏览器发送ping,服务器返回pong;
* 参考：[http://www.ruanyifeng.com/blog/2017/05/websocket.html]("webSocket")

## 断线重连
* 在接收到close事件的时候，重新发送connect,尝试连接（例如重新尝试3次）
