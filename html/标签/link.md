## 通过预处理提高加载速度
1. preload:`设置preload需要有两个link,第一个放head最前面，第二个放到目标位置，然后加载到的时候就会从浏览器中取出来`
```
	<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
```
* `as属性是rel=preload的时候才需要添加，用于说明预加载文件类型！必须加！`
2. prefetch:`和preload的区别在于，prefetch会在浏览器忙的时候不去预加载，相同处:都需要两个link`
3. prerender:`不仅仅需要预加载该资源，并且需要解析，进行预渲染！！！`
4. dns-prefetch:`对设置的网址进行dns解析并且缓存到浏览器中，这样在浏览器访问到同域资源时会快一些！`
```
<link rel="dns-prefetch" href="//yiyeblog.com">
```
5. preconnct:`让浏览器在发起请求之前预先执行dns解析，TLS协商,TCP握手，通过消除往返来节省时间`

## html5不支持charset
`<meta charset="UTF-8">`

## link标签的预加载preload
1. `link标签是和页面一起加载的，所以异步加载！`
2. `而@import是在页面加载完毕后才加载的！加载顺序不一样！`
* link元素的rel属性设置值为preload可以让html页面中head元素内部书写一些声明式的资源获取请求，可以致命那些资源是在页面加载完毕后即刻需要的！
* `对于即刻需要声明的资源，可以在页面加载的生命周期的早期阶段就开始获取，在浏览器的朱渲染机制介入前就进行预加载`
* `除了设置rel="preload",还需要设置href,as属性`
  `<link rel="preload" href="style.css" as="style">`
  `<link rel="preload" href="main.js" as="script">`
