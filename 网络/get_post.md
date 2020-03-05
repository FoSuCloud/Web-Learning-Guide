## get请求与post请求的区别
1. get请求是向服务器请求数据，而post请求是向服务器提交数据；换言之，get请求相当于向服务器中查询数据，post请求是对服务器中的数据进行增删改
2. get请求是不安全的，因为`参数会暴露在url`中一起发送给服务器；而post请求的通过请求体发送数据，不会暴露参数；也就是get请求的参数和header请求头信息都一次性通过url发送给服务器；
* 而post请求分为两次发送，第一次发送header请求头信息，当服务器返回100状态码之后再第二次发送数据
3. get请求对长度有限制，2k;而post对数据长度没有限制
4. get请求的数据会被缓存在浏览器中，而post请求的数据不会被缓存，所以提交登录表单之后刷新页面会弹出确认框

## 请求头字段
1. referer:设置`前一个页面的地址`，并且前一个页面中的连接指向当前地址，也就是通过a页面来到当前b页面，那么referer就是a的地址
`https://www.so.com/s?q=%E8%AF%B7%E6%B1%82%E5%A4%B4%E7%BC%BA%E5%B0%91Etag%E5%AD%97%E6%AE%B5&src=srp&fr=hao_360so_suggest_b&psid=88dab29c42845b3d3b4eefebb69f6b92`
2. origin:`指示最初最初最初！！！的请求来源`，`在跨域的时候，get/post都会显示origin；同域的时候post显示origin,get不显示origin`,`如果浏览器不清楚请求的最初来源，那么就不显示origin字段`，`origin字段比referer更安全一点吧`
* Origin: http://www.example-social-network.com
[参考](http://blog.sina.com.cn/s/blog_625f850801015tik.html)
3. range:设置请求实体的字节数范围
`Range: bytes=500-999`
4. X-Requested-With: `标记ajax请求`，大部分js请求都会设置为XMLHttpRequest
5. Accept:表示接受的内容的数据类型
6. Accept-Charset:设置接受的字符编码
7. Accept-Encoding:表示接受的编码格式
8. Connection:主要用来设置`keep-alive表示不断开tcp连接`，但是还有一个选项是`Upgrate`,还有一个字段是`close，表示客户端发给服务端要断开tcp连接，最好有，这是规范`
9. Content-Type:设置`请求体的MIME类型`,`MIME类型就是用一个字符串(application/xxx)来指代一个请求得到的文件类型(flv,jar,css等等)`
* 如: Content-Type:application/javascript
* [参考](https://www.cnblogs.com/tjudzj/p/6528008.html)
10. Date:消息发送的时间，不一定和现在的时间一致
11. Host:`表示服务器的域名和端口号，如果是默认端口号就不用设置`，响应头不会发送Host字段
12. Upgrade:请求服务器升级协议(看101状态码)
13. Cache-Control:告诉缓存机制对这个对象的缓存时间，`max-age=0表示每次都强制刷新，max-age=3600则表示一个小时后这个缓存才过期`

## http缓存有关的字段
1. Expires(`缓存的最后有效时间，超过该时间，缓存失效`):格式为Fri,24,Dec 2020 04：24:01 GMT
2. Last-Modified/If-Modified:`一般服务端都会在响应头返回一个Last-Modified字段，告诉浏览器这个页面的最后修改时间`
3. Etag/If-None-Match:`用于验证缓存有效性`
4. Cache-Control:告诉缓存机制对这个对象的缓存时间，`max-age=0表示每次都强制刷新，max-age=3600则表示一个小时后这个缓存才过期`

## MIME类型
1. `text/html表示返回的文本需要被解析为HTML格式`
2. `text/plain表示返回的文本不需要被解析，就是纯文本`
3. `application/json表示返回的是json格式数据`
4. `如果是解析特殊字符就用 application/x-www-form-urlencoded`
5. `如果是form表单的post请求提交就用multipart/form-data`

## 响应字段
1. Content-type:说明了文档的MIME类型
```
MIME类型表示文档的类型
text/plain表示文档是ascll码
text/html表示文档是html
image/jpeg表示文档是JPEF图片
image/gif表示文档是gif图片
```
2. Content-Length表示文档的长度
3. Cache-Control表示页面资源缓存，例如:`Cache-Control:Max-age=2000;缓存时间为2000s,在此时间内重新请求那么都不会进行请求而是直接用之前的数据，同时返回文件不会有改变；如果时间是0则每次都强制刷新`
`并且如果在Max-age时间之后，那么如果服务器返回的If-None-Match表示没有更新的话，那么就会返回304状态码，同时直接使用缓存中的数据`
