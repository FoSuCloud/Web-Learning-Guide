## csp
* xss攻击是现在危害最大，最常见的网络攻击方式。要预防xss攻击需要做很多预防措施。
* 所以就有人提出是否有一种方式可以直接从根源上解决问题，浏览器禁止外部注入恶意脚本？
* 这就是csp(content security policy`内容安全政策`)的来历。

## csp介绍
* `csp等同于白名单，明确告诉浏览器哪些外部资源可以访问可以加载。`由浏览器去实现白名单的执行，开发者只需要提供配置
* `白名单极大的提高了网站的安全性，即使攻击者注入了恶意脚本，但是由于白名单的存在，浏览器也不会去执行该脚本！`
* `除非攻击者还控制了一台可信的主机，也就是控制的主机在白名单范围中！`
* 启用csp白名单的方式有两种
1. 在http头信息中加入`Content-Secure-Policy字段`
2. 在前端页面加入`meta标签`

## 例子
1. meta标签（前端配置）
```html
    <meta http-equiv="Content-Security-Policy" content="script-src 'self';">
```
* 然后就可以发现如果请求的脚本不是当前域名，会有csp错误
```html
// 前端
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' http://localhost:3000">
            <title>CSP Test</title>
    </head>
    <body>
        <script src="http://localhost:3000"></script>
    </body>
</html>
```
* 后端
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
    res.end('console.log("111")')
})

server.listen(port,()=>{
    console.log('start')
})
```
* 可以发现请求成功，`但是把前端的meta标签改为<meta http-equiv="Content-Security-Policy" content="script-src 'self' http://localhost:3001">就不行了`

2. 后端/运维配置响应头信息
* `但是现在后端添加了响应头信息，还是不可以限制。。。。？？？？？？为什么？`
```
res.setHeader('Content-Security-Policy',"script-src 'self';")
```
* 结果前端该怎么样还是怎么样。。。

## csp限制选项
* [参考mdn]("https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP")

