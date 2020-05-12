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
