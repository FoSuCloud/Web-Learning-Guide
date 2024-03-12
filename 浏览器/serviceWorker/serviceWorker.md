#### service worker
* [官方文档]("https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers")
* [参考](https://blog.csdn.net/qq_42415326/article/details/124738703)
* Service Worker 是一个可编程的 Web Worker，它就像一个位于浏览器与网络之间的客户端代理，可以拦截、处理、响应流经的 HTTP 请求；
* 配合随之引入 Cache Storage API，可以自由管理 HTTP 请求文件粒度的缓存，这使得 Service Worker 可以从缓存中向 web 应用提供资源，即使是在离线的环境下。
* `service worker主要是提供详细的浏览器和网络/缓存间的代理服务`
---
* `service  worker的强大在于他们拦截http请求的能力，接收任何传入的http请求，并决定想要如何响应`
* `在service worker中可以编写逻辑来决定想要缓存的资源，以及想要满足什么条件和资源需要缓存多久`
* `出于安全考虑，service worker只能由https承载`
---
* 注意事项：
1. service worker运行在worker上下文(`self`)-> `不能访问DOM(web worker也是一样的)`
2. service worker`被设计为完全异步，所以同步api（ xhr,localstorage等不能在service worker中使用）`
3. 出于安全考虑，service worker只能由https承载
4. 某些浏览器的用户隐私模式，service worker不可用
5. `service worker的生命周期和页面无关，(关联页面未关闭时，他也可以退出。没有关联页面时，他也可以启动)`

#### 使用service worker的禁忌
1. `不要给service-worker.js设置不同的名字`
* 一般针对静态文件，现在都是在每次构建时根据内容给他们一个唯一的命名，例如 index.[hash].js
* 因为这些文件不常修改，再配以长时间的强制缓存，能够大大降低访问他们的耗时
* 但是针对service worker,这些做法不合适，例子：
1) 首页 index.html，底下包含了一段 <script> 用于注册 service-worker.v1.js。
2) 为了提升速度或者离线可用，这个 service-worker.v1.js 会把 index.html 缓存起来。
3) 某次升级更新之后，现在 index.html 需要配上 service-worker.v2.js 使用了，所以源码中底下的 <script> 中修改了注册的地址。
4) 但我们发现，用户访问站点时由于旧版 service-worker.v1.js 的作用，从缓存中取出的 index.html 引用的依然是 v1，并不是我们升级后引用 v2。
* `结果就是项目根本就没有更新！还是使用了旧的缓存代码！`
* `因为v1升级为v2依赖于index.html的引用地址的变化，但是index.html本身就被缓存起来了,所以我们没有办法加载v2`
* 这个时候，除非用户手动清除缓存，卸载v1,否则我们无能为力。
* `最佳实践就是service-worker.js使用相同的名字，不能再文件名上添加任何会变化的因素`

2. `不要给service-worker.js设置缓存`
* 和第一点的理由类似，为了防止浏览器需要请求新版本的service worker时，因为缓存的干扰而无法进行。
* `因为我们不能要求用户去清除缓存，所以我们必须给service-worker.js文件设置Cache-control:no-store`

#### service-worker的使用
* service worker使得我们可以解决离线应用的问题，可以使用javascript精细地控制应用缓存的静默行为
* service worker使得我们的应用可以先访问本地缓存资源，所以在离线状态时，在没有通过网络接收到更多的数据前，仍然可以提供基本的功能
* `有些浏览器默认不支持service worker，可能需要进行浏览器的一些配置才可以开启。例如 chrome canary;firefox nightly....`
---
* service worker是一个注册在指定源和路径下的事件驱动worker。采用javascript控制关联的页面或者网站，拦截或者修改访问和资源请求
* 细粒度地缓存资源。可以完全控制应用在特定情形下的表现。
* service worker运行在worker上下文中，因此他不能访问DOM。相对于驱动应用的主javascript线程，他运行在其他县城中，所以不会造成阻塞。
* service worker完全设计为异步。所以`localstorage,xhr等同步api不能在service worker中使用(fecth可以)`
----
* `使用ServieWorkerContanier.register方法首次注册service worker。如果注册成功，service worker将会被下载到客户端并尝试安装或激活`
* 注册成功后将作用于整个域内用户可访问的URL, 或者其特定的子集。
* service worker需要遵守以下生命周期：
1）下载
2）安装
3）激活
* `用户首次访问service worker控制的网站或者页面时，service worker会立刻被下载`
* 之后，在以下情况将会触发更新：
1）`一个前往作用域内页面的导航`
2）`在service worker上的一个事件被触发，并且过去24小时没有被下载`
* `无论他与现有的service worker不同（字节对比），还是第一次在页面或者网站遇到service worker，如果下载的文件是新的。安装就会尝试进行`

* 如果这是首次启用service worker，页面会首先尝试安装，安装成功后他会被激活。
* 如果现有service worker已启用，新版本会在后台安装，但不会激活，这个时序称为worker in waiting。
* 直到所有已加载的页面不再使用旧的service worker才会激活新的service worker。只要页面不再依赖旧的service worker，
* 新的service worker会被激活（`成为active worker`）

* `可以监听installEvent,事件触发时的标准行为是准备serive worker用于使用，例如使用内建的storage API来创建缓存`
* `并且放置应用离线时所需资源。`

* `还有一个activate事件，触发时可以清理旧缓存和旧的servie worker关联的东西。`
* `service worker可以通过fetchEvent事件去响应请求。通过FecthEvent.reponseWite方法可以任意修改这些请求的响应！！！`
----
* ` 因为oninstall和onactivate完成前需要一些时间，service worker 标准提供一个waitUntil方法`
* `，当oninstall或者onactivate触发时被调用，接受一个 promise。`
* `在这个 promise 被成功 resolve 以前，功能性事件不会分发到 service worker。`
---
* `addEventListener('fetch')用于阻止浏览器的默认 fetch 操作，并且由你自己提供一个响应`

### Service workers 也可以用来做这些事情
后台数据同步
响应来自其它源的资源请求
集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
在客户端进行 CoffeeScript，LESS，CJS/AMD 等模块编译和依赖管理（用于开发目的）
后台服务钩子
自定义模板用于特定 URL 模式
性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片

## 推送消息限制
* Chrome上对http协议默认Notification.permission = 'denied'，想要愉快的推送消息就要使用https协议！
* 但是如果https网站是不安全的，那么也还是不可以使用。


#### service-worker 的更新
https://www.cnblogs.com/lhp2012/p/14237542.html





