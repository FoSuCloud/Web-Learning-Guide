## esbuild
* `只返回一个文件 浏览器就能理解了`
* 使用go语言写的 -》 打包很快 
* 把ts编译为浏览器可以理解的js
* ts -> serve -> ts变为浏览器可以理解的js代码 -> 浏览器执行


loadash-es-》 n个import -> http -> 多个的话浏览器和服务器都顶不住这么多请求
* 解决方式就是
lodash-es -> n个import -> 变为一个esbuild导入 -》 请求就变少了
  
