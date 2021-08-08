## http2
* 首先我们在浏览器netWork栏右键选择`Header Options,开启请求的http协议查看`
* `http1.1就是http1.1, h2就是http2, 此外还有h3表示http3`

### 生成密钥
* `由于现在的浏览器都要求http2要进行加密，不支持不加密的http2`
* `所以一个支持http2通信协议的网站一定支持https！`
* 所以，首先，第一步是需要生成密钥！
```shell
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout key.pem -out ca.pem
```
* 得到文件`key.pem,ca.pem`，然后放在服务器的文件夹中

### 例子
```javascript
// node后端
const http2 = require('http2');
const fs = require('fs');
const path = require('path')

const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'./ssl/ca.pem'))
});

server.on('error', (err) => {
    console.error(err)
});

server.on('stream', (stream, headers) => {
    console.log(headers)
    // 流是一个双工流。
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
        'Access-Control-Allow-Origin':'https://localhost:3001' 
    });
    stream.end('<h1>你好世界</h1>');
});

server.listen(3000);

// 前端使用vue
// 在前端的vue.config.js中配置代理，把来源端口设置为3001
/**
 devServer: {
        open: true,
        host: "localhost",
        port: 3001,
        https: true,
        hotOnly: true,
        proxy: {
            "/": {
                target: "https://localhost:3000/",
                changeOrigin: true, // 是否改变发送到后端的host字段，如果改变，那么host就是对应的target字段
            }
        }
    },
 * */
// 执行代码
for(let i=0;i<1000;i++){
    fetch("https://localhost:3000/").then((res)=>{
        console.log(res);
    });
}
```
* 虽然我们在node后端写的字段名称是Access-Control-Allow-Origin，`但是node的http2会把字段转换为小写返回来`
* `我们可以观察到http1.1的请求，总时间是915ms`

### http1.1 例子
```javascript
// 前端
/**
 devServer: {
        open: true,
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            "/": {
                target: "https://localhost:3000/",
                changeOrigin: true, // 是否改变发送到后端的host字段，如果改变，那么host就是对应的target字段
            }
        }
    }
 * */
for(let i=0;i<1000;i++){
    fetch("http://localhost:3000/").then((res)=>{
        console.log(res);
    });
}
// 然后我们后端使用以前的代码，不开启https,不开启http2
```
* `然后我们在控制台可以观察到，http2请求的总时间是2s，这是因为加了https,时间变长了`

### http2的特点
1. 首先最明显的，`请求头和响应头字段都会被转换为小写`
2. 头部压缩：
* 参考[https://imququ.com/post/header-compression-in-http2.html]("头部压缩")
* 在第一次请求网站的时候，压缩不会很严重，`但是在之后的请求，头部压缩效果很好，很多字段头都是使用一个字节来代替`
* `实现原因是在浏览器和服务器共用一份静态字典，可以匹配键值对，也可以直接匹配字段头`
3. `http2和http1.1还有一个不同之处是,http2是一个二进制协议，而http1.1是一个文本协议`
   * 因为http2是一个二进制协议，所以可以把消息封装成更小的消息帧，进行二进制编码
4. `连接复用`：在http2中，同域名下所有的通信都在单个tcp连接上完成，这个连接可以承载任意数量的双向数据流
* `其实也就是多路复用`，同个域名只需要占用一个tcp连接。
5. 服务器推送
* `也就是服务器可以主动向客户端缓存发送数据，但是不可以直接向客户端本身发送数据（注意，只可以发送缓存）`
* `服务器向客户端缓存发送的数据，没有代码api可以获取的到，只有浏览器可以进行处理`
```javascript
// 一个应用例子就是请求index.html的时候，后端可以主动把对应的index.css,index.js文件一起发过来。而不需要前端再额外请求！
// 如果是这种场景，除了服务器推送，我们还可以使用preload来预加载；
```
* `后来找了一个demo，发现在服务器端口运行，可以实现服务器推送，可以在浏览器看到服务器发送过来的文件`
* `但是跨域的话没有办法获取到服务器推送的文件和数据`
* [https://github.com/RisingStack/http2-push-example]("参考")
---
* `服务器推送的资源会被保存在memory缓存中，如果浏览器没有缓存资源的时候，才会使用我们服务器推送的缓存资源`
* `服务器推送存在一个问题，如果我们浏览器存在旧的资源，那么即使我们服务器推送了新的资源，但是由于浏览器存在缓存，所以即使有新的资源，也会使用之前的缓存资源！`
---
* `另外推送缓存依赖于http2连接，http2连接断开后，推送缓存也会被销毁！`


### websocket和http2的区别
* 虽然两者都可以实现服务器向客户端发送消息。
* `但是websocket可以通过onmessage监听到服务器发送过来的消息。而http2是服务器推送技术，推送过来的数据只能是浏览器处理，客户端程序无法监听到`
* `所以一般服务器推送都是推送一些附属的样式文件之类的`

### sse技术可以和http2结合


* [https://zhuanlan.zhihu.com/p/26559480]("参考")
* [https://segmentfault.com/a/1190000013184607]("参考")
* [http://nodejs.cn/api/http2.html#http2_http_2]("参考")
