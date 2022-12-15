## PWA
* PWA全称是progressive web app(`渐进式web app`)
* `pwa本质上就是web应用，使用现在web api的增幅和构建，实现与原生app相近的用户体验！`

#### Web Application Manifest
* [官方文档]("https://w3c.github.io/manifest/")
* `Manifest 即通过一个清单文件向浏览器暴露 web 应用的元数据，包括名称、icon 的 URL 等，以备浏览器使用`
* `比如在添加至主屏或推送通知时暴露给操作系统，从而增强 web 应用与操作系统的集成能力。`
---
* `build之后，可以发现可以直接通过 url访问到manifest.json文件`
* `配置crossorigin="use-credentials；<link rel="manifest" href="./manifest.json" crossorigin="use-credentials">`
---
* 通过配置manifest.json文件，可以实现以下功能：
* 基本功能：自定义名称，自定义图标，设置启动网址，设置作用域
* 改善应用体验：添加启动画面，设置显示类型，指定显示方向，设置主题色
* 应用安装增幅：引导用户添加应用

#### service worker
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



