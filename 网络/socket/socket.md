## socket(套接字)
* 网络中要怎么进行通讯？首先最重要的几个点，`网络层的ip协议可以获取到主机地址；传输层的协议+端口可以唯一标示到应用程序`
* 所以就可以通过域名+协议+端口 `唯一标示到网络上的进程`
* `采用TCP/IP协议的应用程序通常都使用socket来实现网络进程之间的通信`
* IPC完成本地进程之间的通信，是通过PID作为本机的进程唯一标示来完成的。（但是在网络中，不同机器的PID可能会重复）

### 什么是socket
* socket起源于unix,而linux/unix基本哲学就是`一切皆文件`
* 所以socket的操作模式就是`打开open,读写read/write,关闭close`.`socket可以被视为一个特殊的文件`
* 服务器端和客户端统一使用socket提供的api进行通信。
* `虽然我们网络通信会使用到http,http2,websocket等协议，但是网络中进程的通信基于socket来进行的！`

### socket通信流程
1、服务器端创建socket
2、服务器端绑定socket和端口号bind()
3、服务器监听端口号listen()
4、客户端创建socket
5、客户端连接服务器，通过connect
6、服务器端accept接收到连接请求
7、客户端发送消息send
8、服务器端接收消息recv
9、客户端关闭连接close
10、服务器端关闭连接close

### socket实例
* 服务器端使用net模块来体现socket
```javascript
// node后端
const net = require('net');
const server = net.createServer();
server.on('connection',(client) => {
    client.write('Hello ');
    client.write('World!\n');
    client.close()
})

server.listen('8000')
```
* 前端请求使用curl发送
`curl http://localhost:8000`

* [https://juejin.cn/post/6844903904153436174]("socket连接池")
* [https://blog.csdn.net/qq_17371033/article/details/52315911]("socket通信图")
* [https://blog.csdn.net/dlutbrucezhang/article/details/8577810]("什么是socket")
