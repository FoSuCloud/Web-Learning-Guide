## csrf
* `注意，我们在网址http://localhost:63342去请求另一个域名`
* http://127.0.0.1:3000/；
* 结果会请求头会带上http://127.0.0.1:3000/这个网址的cookie
---
* `首先在浏览器的networke界面，可以看到http://127.0.0.1:3000/和http://localhost:63342/是不同的cookie域`
* `但是点击http://localhost:63342/网址的一个超链接却可以携带网址http://127.0.0.1:3000/的cookie`
---
* http://localhost:63342/：
* cookie为空！
* 代码：
```html
  <a href="http://127.0.0.1:3000/?params=alert(111)">reflect-xss</a>
```
* `点击之后跳转到http://127.0.0.1:3000,并且请求头cookie:a="111"`

* 因为`http://127.0.0.1:3000/,cookie为a="111"`
