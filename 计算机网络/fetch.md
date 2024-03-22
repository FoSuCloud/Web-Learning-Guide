## fetch
* fetch属于html5新增的api，提供了一个接口来让我们`用于访问和操纵http管道的一些部分`，例如请求和响应
* fetch api提供了fetch()方法来简单的实现`跨网络异步获取资源`
* 以前我们要实现跨网络异步获取资源，需要通过XmlHttpRequest构建ajax请求来实现，现在可以通过 fetch请求实现

## fetch()和ajax区别
1. `fetch()只有在网络故障和请求被阻止的时候才会执行reject();`，返回404，500都是resolve()，`但是会把返回值的ok设置为false`
2. `fetch默认不发送cookie,除非前后端都设置了crediential`

## fetch()
1. 参数
* 接收两个参数，第一个参数是请求路径，必须填！
* 第二个参数是请求的相关配置，可选
2. fetch的中止
* 目前浏览器已经添加了一些实验性的api,但是还有很多浏览器不兼容，`fetch现在实际上的中止基本不可用`
3. 例子
1）简单例子

```javascript
// 使用fetch实现
fetch('http://localhost:3000').then((res) => {
    console.log(res, 'date:', Math.floor(new Date().getTime() / 1000))
    res.json().then((data) => {
        console.log(data);
    });
})
// 后端使用node

const http = require('计算机网络/http请求/http')
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200
    let arr = ['http://localhost:63342', 'http://localhost:3001']
    if (arr.includes(req.headers.origin)) {
        res.setHeader('content-type', 'text/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('set-cookie', 'a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=localhost')
    const data = {
        "number1": "2",
        "number2": "4"
    };
    res.end(JSON.stringify(data)); // 把json转换为字符串
})


server.listen(port, () => {
    console.log('start')
})

```
* 分析一下res响应结果数据
```javascript
// 首先是打印出来的res部分
/**
 body: (...)
 bodyUsed: true
 headers: Headers {}  // 请求头
 ok: true // 是否是200/304这种正常的响应状态
 redirected: false // 是否是重定向请求
 status: 200 // 状态码
 statusText: "OK" // 状态文本是ok
 type: "cors" // 请求类型，在这里是cors 跨站资源共享
 url: "http://localhost:3000/" // 服务器地址
 [[Prototype]]: Response  // 原型
 * */
```
* 然后由于`后端返回了json数据，但是很明显没有在res中获取到`
* 然后查询资源，知道需要通过res.json来获取
* 最后就能拿到对应的数据：{number1: "2", number2: "4"}
* `然后我们可以观察到prototype中还有text,blob,arrayBuffer等函数，可知对应类型对应一个函数`
* 另外我们还观察到我们接收到的数据是有cookie的,`但是并没有在application中看到存在cookie,下一个请求也没有携带`
2）配置credential
* fetch的credential配置不太一样，需要在第二个参数中配置，node.js：res.setHeader('Access-Control-Allow-Credentials', 'true')
```javascript
fetch('http://localhost:3000',{
            credentials: "include"
        }).then((res)=>{
            console.log(res, 'date:', Math.floor(new Date().getTime()/1000))
            res.json().then((data) => {
                console.log(data);
            });
        })
```
* 设置`credentials: "include"`,然后就可以发现我们的cookie可以接收和发送了
3）reject情况
* 我们在后端配置一下状态码为403，看看效果
```javascript
// node.js
res.statusCode = 403
// 前端
fetch('http://localhost:3000',{
    credentials: "include"
}).then((res)=>{
    console.log(res, 'date:', Math.floor(new Date().getTime()/1000))
    res.json().then((data) => {
        console.log(data);
    })
}).catch((err)=>{
    console.log('err',err)
})
```
* 在network控制台可以看到状态码是403，并且console这里也报错了
* 但是在fetch方法中还是调用了then方法
* 但是获取到的数据发生了一些改变
```javascript
//body: (...)
//bodyUsed: true
//headers: Headers {}
//ok: false
//redirected: false
//status: 403
//statusText: "Forbidden"
//type: "cors"
//url: "http://localhost:3000/"
```
* `最明显的是ok改为false了`
---
* 然后我们再把控制台的网络关掉，看看前端会执行then还是catch
* 结果是：`err TypeError: Failed to fetch`
4) 获取后端发送的buffer数据

```javascript
//  前端
fetch('http://localhost:3000', {
    credentials: "include"
}).then((res) => {
    console.log(res, 'date:', Math.floor(new Date().getTime() / 1000))
    res.blob().then((data) => {
        let fr = new FileReader()
        fr.onload = () => {
            console.log(fr.result)
        }
        fr.readAsText(data)
    })
}).catch((err) => {
    console.log('err', err)
})
// 后端

const http = require('计算机网络/http请求/http')
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200
    let arr = ['http://localhost:63342', 'http://localhost:3001']
    if (arr.includes(req.headers.origin)) {
        res.setHeader('content-type', 'text/html; charset=utf-8') // 类型为text/html
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('set-cookie', 'a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=localhost')
    let buffer = new Buffer('我是服务器数据') // 创建缓存区
    res.end(buffer);
})
server.listen(port, () => {
    console.log('start')
})
```
5) 设置fetch第二个参数
* 测试一下post请求，携带一些请求头， `注意请求头内容需要新建一个Headers对象！`
```javascript
// 前端
fetch('http://localhost:3000',{
    credentials: "include",
    method: 'post', // 设置请求方式
    body: JSON.stringify({name:'客户端',age:11}), // 设置请求体内容
    headers:new Headers({
        'Content-Type': 'application/json'
    })
}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log('err',err)
})
// 后端
res.setHeader('Access-Control-Allow-Headers','content-type'); // 不设置会跨域。
res.end(JSON.stringify(req.headers)); // 最后把请求头部分内容返回来
```

## fetch的缺点
1. 无法中止fetch请求
2. fetch不兼容ie浏览器，ie11也不支持

#### 停止请求
* `AbortController可以用来终止一个或者多个web请求(fetch请求)。axios的底层也是基于fetch去实现的，所以也可以去终止axios的请求`
```js
controller = new AbortController()
```
* `signal：实例化之后，响应一个AbortSingal对象，这个对象需要设置在fetch请求中，用于接收终止消息，终止请求`
* `abort():一个函数，用于调用该函数，终止对应的fetch请求。只要请求还未完成都可以终止`
* 看个例子
```js
let controller = new AbortController()
fetch('https://www.baidu.com/s?wd=1&rsv_spt=1&rsv_iqid=0x870244ea0001b600&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&rsv_sug3=2&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=1&rsp=5&inputT=728&rsv_sug4=803',{
    signal: controller.signal
})
setTimeout(()=>{
    controller.abort()
})
// 控制台显示 DOMException: The user aborted a request.
// 说明我们的请求被正确终止了！
```

















