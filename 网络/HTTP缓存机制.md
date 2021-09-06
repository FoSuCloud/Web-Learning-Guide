## 为什么要使用HTTP缓存
1. 减少等待时间。因为缓存直接从客户端中读取，不需要等待服务器返回，即减轻了服务器压力，也减少了网络传输的时间
* 让用户可以更快看到显示内容，带来更好的用户体验
2. 减少流量，如果是电商网站之类的，多图片场景，需要考虑到用户流量费。

## HTTP缓存机制
* 缓存机制有客户端缓存，代理服务器缓存，服务器缓存
* `对于HTTP缓存机制来说，具有缓存功能的是浏览器缓存`

### 浏览器请求资源来源
* 首先我们需要知道，webkit引擎将资源分为两类，一类是`主资源，如html页面和下载项`
* 一类是`派生资源，例如html页面内嵌的图片或者脚本链接`
---
1. `from memory cache表示资源来自于内存缓存`：
* 优点：读取速度快
* 缺点：一旦关闭浏览器进程，内存中的缓存也就被释放了
* `我们访问过页面之后，如果再次打开，那么很可能就来自于浏览器内存`
* `只能存储html文件派生的部分资源，也就是链接到的脚本，图片，字体资源`
---
* 需要验证，是否是关闭浏览器进程会释放，还是关闭浏览器才会释放

2. `from disk cahce表示资源来自于磁盘缓存`：
* 优点：关闭浏览器进程，资源不会被释放
* 缺点：由于还需要从磁盘读取，所以速度慢于内存缓存
* `只能存储html文件派生的非脚本资源，例如css资源（因为css文件只需要读取一次就可以把页面渲染出来，不需要频繁读取）`
---
* 内存缓存和磁盘缓存的相同点
1）都属于强缓存
2）都只能存储派生类资源

### 浏览器三级缓存原理
1. 先从内存缓存中查找，如果有那么直接使用，没有则继续
2. 然后从磁盘缓存中查找，如果有那么直接使用，没有则继续
3. 然后进行网络请求
4. 把请求后的结果给浏览器解析，并且存储到内存缓存或者磁盘缓存中

### 浏览器请求判断顺序
1）判断强缓存(上面的三级缓存其实内存缓存和磁盘缓存都属于强缓存的缓存位置)
* 所以其实是先在内存缓存中查找资源的expires字段和cache-control字段，判断是否命中内存缓存
* 如果没有，则在磁盘缓存中查找资源的expires字段和cache-control字段，判断是否命中磁盘缓存
* 如果也没有，则表示强缓存没有命中
2）判断协商缓存
3）从服务器加载数据

## 强缓存
* `浏览器在加载资源时，会先根据本地缓存资源的header头信息判断是否命中强缓存`
* `如果命中强缓存，则直接使用强缓存中的资源，而不需要向服务器发起请求`
* `所以我们刚才说的内存缓存和磁盘缓存都属于强缓存资源！`
* `强缓存如果命中了，结果就是状态码200，size显示from memory cache或者from disk cache;虽然请求会显示，但是并没有发出请求给服务器！`
* 由于第一次请求获取到的expires或者cache-control字段就已经决定了资源的有效期，并且强缓存是否命中不需要经过服务器判断，所以被称为强缓存

### 强缓存的判断头信息
1. Expires（http1.0提出）:
* `这是响应头字段，只能响应头信息携带`
* `该字段用于表示资源的失效时间，如果资源还处于生效时间内，那么就会命中强缓存`
* `但是注意，如果服务器是纽约时间，客户端是北京时间，那么Expires就会有问题吗？不会，因为使用的是绝对时间，也就是格林尼治时间`
* `因为服务器返回的Expires时间是针对服务器当前的格林乔治时间来说的，所以如果服务器和客户端的请求响应过了很久才返回，也会有时间偏差`
---
* 格林尼治时间，就是我们常常说的0度经线的地方时间，和我们的北京时间相差八个小时！
* `格林乔治时间：2021-09-04T02:57:17.582Z 差不多就是 北京时间：Sat Sep 04 2021 10:57:17 GMT+0800 (中国标准时间)`
```js
const http = require('http')
const fs = require('fs')
const port =3000;

let serve = http.createServer((req,res)=>{
    let time = new Date(Date.now()+10000)
    res.setHeader('Expires',time)
    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')
    let file = fs.readFileSync('dist/img/3.png')
    res.end(file)
})

serve.listen(port,()=>{
    console.log('listen to '+ port)
})
```
* `但是还有一种情况是，客户端的时间被修改了，那么这个时候就会影响到缓存的有效性`
```text
例如
1。把过期时间先设置为一天
res.setHeader('expires',new Date(Date.now()+24*60*1000))
2。请求资源，发现10秒后也还是从disk获取硬盘缓存
3。但是我们把系统时间进行修改。例如mac,在偏好设置中把时间调整为三天后
4。然后刷新，发现现在每次请求都是获取新的资源！（前提是服务器和客户端不在同一台机器上）
5。因为我们在前端控制台，打印new Date()，也可以发现系统时间被修改为三天后了
6。所以我们服务器和客户端的时间完全对不上！
```
* `我们通过刷新页面来判断，如果两次刷新间隔在10秒内，那么会使用disk cache(请求返回的，所以放到了disk cache),也就是强缓存命中了！`
* `虽然响应状态码还是200，但是可以发现Expires字段的时间还是上次请求的时间(Expires的值一样)！`
* 但是如果两次刷新的间隔超过10秒，那么就会发送请求给服务器

2. cache-control（http1.1）
* `可以携带在请求头中，也可以携带在响应头中`
* `由于Expires是相对时间，会受到客户端的系统时间而影响到有效性，存在一定的缺陷`
* `所以在http1.1提出了cache-control，这是一个相对时间，在配置缓存的时候，返回的是以秒为单位的数值`
```js
    res.setHeader('Cache-Control','max-age=10')
    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')
    let file = fs.readFileSync('dist/img/3.png')
    res.end(file)
```
* `注意，浏览器会保存响应头信息，但是在Expires保存的是绝对时间，对于Cache-Control字段保存的是值和之前请求的时间`
* `因为浏览器要根据保存的上一次请求的响应时间，来判断是否超过了有效期max-age`
* `由于cache-control是根据客户端的两次请求时间差来判断，不会因为客户端的系统时间改变`
* cache-control除了max-age还有以下值：
1) public:表示可以被任何对象（代理服务器，客户端等）缓存。即使是通常不可缓存的内容也可以缓存。
* 例如1。该响应没有max-age指令或者没有expires字段。
* 2。该请求是post请求
2）private:表示是私有缓存，只能被单个用户缓存，也就是只能被客户端缓存。
* 不能被代理服务器缓存
3）no-cache:`在使用缓存之前，强制！！！要求先把请求发给服务器校验，也就是协商缓存校验！`
4）no-store:`不使用缓存`
* `注意，当expires字段和cache-control字段的max-age值都存在时，cache-control的max-age值优先`
* [参考]("https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control")


## 协商缓存
* `当强缓存没有命中，浏览器会发请求给服务器，服务器根据header的部分信息判断是否命中协商缓存`
* `如果协商缓存命中，返回304，表示资源没有更新，继续使用之前的资源。否则返回新的资源，状态码为200`
1. Last-Modified和If-Modified-Since
* `在浏览器第一次发起请求的时候，服务器的响应头要带上Last-Modified,表示资源的最后一次修改时间`
* 然后浏览器之后的请求都会带上一个请求头`if-modified-since(浏览器自己加的，值就是上一个Last-Modified的值)`
* `然后服务器获取请求头if-modified-since和当前资源的修改时间做对比，如果没有更新则返回304`
* `如果有更新则返回200，并且更新Last-Modified,然后浏览器下次请求带上的请求字段if-modefied-since就是最新的Last-Modified`
* node后端
```js
const http = require('http')
const fs = require('fs')
const port =3000;

let serve = http.createServer((req,res)=>{
    if(req.url === '/img'){
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')
        let old = new Date(req.headers["if-modified-since"]).getTime()
        let now = new Date().getTime()
        if(old+10000>=now){
            res.statusCode = 304;
            res.end();
        }else{
            res.setHeader('Last-Modified', new Date())
            let file = fs.readFileSync('dist/img/3.png')
            res.end(file)
        }
    }else{
        res.end('hello')
    }
})

serve.listen(port,()=>{
    console.log('listen to '+ port)
})
```
* 前端`注意，由于浏览器的缓存机制，所以如果我们只是单纯发送一个请求，即使后端设置statusCode=304,浏览器显示的也还是200！`
* `所以图片等需要缓存的资源就还是乖乖通过img标签等方式发起请求！`
```html
<img src="http://localhost:3000/img" alt="" />
```
* `根据描述，Last-Modefied和if-modefied-since这两组字段是很可靠的，但是有时候服务器资源修改了，但是修改时间没有及时更新，这个时候，这种问题就不容易定位出来！`
* `这是因为因为Last-modefied（使用格林乔治时间，GMT）只能精确到一秒,所以说是弱校验器`
* [参考]("https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching")

2. Etag/If-No-Match
* `为了解决服务器资源修改时间不够精确的问题，出现了Etag/If-No-Match这两组字段`
* `通过etag来判断就没问题，因为是强校验器，根据资源的hash值来判断，如果资源修改了，对应的hash改变，接收到的If-no-match字段的值也就不一致了`
* node后端，通过定时更新资源，改变etag值来达到判断是否命中协商缓存的目的
```js
const http = require('http')
const fs = require('fs')
const crypto = require('crypto')
const port =3000;


function getHash(){
    let md5 = crypto.createHash('md5')
    md5.update('some data to hash'+new Date());
    return md5.digest('base64');
}
let etag = getHash()
let serve = http.createServer((req,res)=>{
    if(req.url === '/img'){
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')

        if(req.headers['if-none-match'] === etag){
            res.statusCode = 304;
            res.end();
        }else{
            res.setHeader('ETag', etag)
            let file = fs.readFileSync('dist/img/3.png')
            res.end(file)
        }
        // 在一段时间后改变资源的hash值
        setTimeout(()=>{
            etag = getHash();
            console.log('etag',etag)
        },10000)
    }else{
        res.end('hello')
    }
})

serve.listen(port,()=>{
    console.log('listen to '+ port)
})
```
* `etag和if-no-match这两个字段和last-modefied还有If-modefied-since这组字段的更新逻辑类似`
* 如果etag没有更新，浏览器每次自动发送的if-no-match字段都是上一次接收到的etag字段的值！
* 但是也需要注意
```text
分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；
分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；
```
* `由于etag和if-no-match这组字段是对last-modefied和If-modefied-since这组字段的缺陷的完善，所以同时存在的时候`
* `先判断etag和IF-no-match这组字段，优先!`

如果请求经过身份验证或安全（即 HTTPS），则它不会被共享缓存缓存。

* [实战参考]("https://www.cnblogs.com/Jiangchuanwei/p/10632477.html")
* [参考]("https://juejin.cn/post/6844903672556552205")
* [参考]("https://juejin.cn/post/6844903517702848526")


## DNS缓存
* DNS就是域名解析系统，Domain Name System;`将域名转换为ip地址的一个系统`
* DNS缓存查找的流程是：`浏览器缓存-》本机DNS缓存-》DNS服务器`
* `由于DNS如果没有找到缓存，就会去查找网络上的DNS资源，获取对应的ip地址，所以DNS协议也会产生网络开销`
* 由于DNS在网络上查找解析地址也会消耗时间，所以DNS缓存也是一种性能优化的手段

https://juejin.cn/post/6844903764566999054

## 代理缓存
* `Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。`
* `Service worker是一个注册在指定源和路径下的事件驱动worker。`
* https://www.mnot.net/cache_docs/

## CDN缓存
* CDN和反向代理的区别？`反向代理只是CDN的一种技术，只是CDN的其中一部分！`
* CDN是内容分发网络`content delivery network`，`可以理解为12306在每个城镇的代理点，有了代理点，想要响应请求就可以直接在代理点响应，而不需要在北京这个总站响应！`
* CDN的优势；：
1）解决了跨运营商和跨地域访问的问题，访问延时大大降低
2）大部分请求在CDN边缘节点完成，CDN起到了分流的作用，减轻了源站的负担
* https://www.haorooms.com/post/cache_huancunliyong
#### CDN缓存
* CDN节点在接收到客户端请求之后，会判断本节点的这个缓存数据是否过期，如果没有过期就返回304状态码
* 如果过期了，那么CDN节点会向源站发出请求，刷新CDN缓存的响应数据，然后响应最新数据给请求的客户端

## HTML5离线缓存
* 使用manifest文件实现
