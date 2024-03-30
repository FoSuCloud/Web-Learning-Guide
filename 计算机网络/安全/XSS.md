## xss
* `XSS的全称是Cross Site Scripting跨站脚本`
* 跨站脚本中的脚本其实有两个，js和actionScript
* `当目标网站上的目标用户在使用浏览器的时候，发生了不被预期的恶意脚本就被称为XSS跨站脚本`
* 注意，脚本可以只是一行代码，也可以是`<script src=""></script>的形式引入的第三方脚本文件`
* `如果是引入的第三方脚本文件，那么脚本所在的浏览器上下文环境是嵌入的对象所在的环境！`
* `注意：由于浏览器存在的xss filter机制，所以很多xss攻击可能会无效了，也可能只能在部分浏览器使用`

## xss特点
1. 很难从UI上感知到，因为一般都是暗暗地执行脚本
2. 窃取用户信息(cookie/token)
3. 可以绘制UI(绘制弹窗，表单等)，诱骗用户点击
* `xss的本质就是想尽办法让目标网站的目标用户的浏览器上执行我们的恶意脚本！`

## xss种类
1. 存储型xss,特点有：
1) 恶意脚本被存储到服务端数据库或者本地系统文件中
2）用户访问页面的时候，读取对应的数据，浏览器渲染，然后就被攻击了
3）存储型xss的危害最大，因为对所有的用户可见。`无差别攻击！`; 并且很隐蔽，要是一直没有用户读取数据，那么就一直不会执行该脚本！
* 例子：后端node.js把留言板数据存储到一个变量中，下次访问返回
```html
<body>
    <textarea name="" id="input" cols="30" rows="10"></textarea>
    <input type="submit" value="提交" onclick="submit()" />
    <script>
      let input = document.getElementById("input");
      function submit() {
        fetch("http://localhost:3000", {
          method: "post",
          body: JSON.stringify({ content: input.value }),
        });
      }

      window.onload = () => {
        fetch("http://localhost:3000/info").then((res) => {
          res.text().then((response) => {
            let script = document.createElement("script");
            script.innerHTML = response;
            document.body.appendChild(script);
          });
        });
      };
    </script>
  </body>
```
* node.js后端代码

```javascript
const http = require('计算机网络/http请求/http')
const fs = require('fs')
const path = require('path')
const port = 3000;

const storage = {
    content: ''
}; // 存储
const server = http.createServer((req, res) => {
    res.statusCode = 200
    let arr = ['http://localhost:63342', 'http://localhost:3001']
    if (arr.includes(req.headers.origin)) {
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    if (req.url === '/info') {
        res.end(storage.content)
    }
    let result = '';
    req.on('data', (chunk) => {
        result += chunk;
    })
    req.on('end', () => {
        if (!storage.content) {
            storage.content = JSON.parse(result).content;
        }
        res.end(req.url)
    })
})

server.listen(port, () => {
    console.log('start')
})
```

* 应用场景： `富文本编辑器内容回显，要解决的话需要使用filterxss`

2. 反射型xss,特点有：
1) `不存储到服务器数据库或者文件系统中`
2）`从用户浏览器的URL上攻击`
* 整个流程是这样的：
* 以超链接为例子：
* `首先攻击者把恶意脚本注入到浏览器界面；第二步：用户点击超链接，然后跳转到对应的页面；第三步：后端解析到对应的url参数，然后响应给浏览器；第四步：浏览器执行响应的恶意脚本`
```html
// 前端
<a href="http://localhost:3000/?params=alert(111)">reflect-xss</a>
```
* 后端node.js

```javascript
const http = require('计算机网络/http请求/http')
const fs = require('fs')
const path = require('path')
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200
    let arr = ['http://localhost:63342', 'http://localhost:3001']
    if (arr.includes(req.headers.origin)) {
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    let paramsArr = req.url.split('params=')
    if (paramsArr.length === 2) {
        res.end('<script>' + paramsArr[1] + '</script>')
    } else {
        res.end(req.url)
    }
})
server.listen(port, () => {
    console.log('start')
})
```
---
* `在这里，流程就是点击超链接，然后后端获取到xss代码：alter(111)；然后响应（带上script标签）；然后浏览器执行该恶意脚本，弹出弹窗，结束！`

3. DOM xss，特点：
1） 不需要服务器参与
2）恶意攻击的发起和执行，全在浏览器完成
```html
    <script>
      let param = new URL(location.href).searchParams.get("params");
      let script = document.createElement("script");
      script.innerHTML = param;
      document.body.append(script);
    </script>
```
* 另外url是：
```text
http://localhost:63342/blog/%E5%B9%B3%E6%97%B6%E6%B5%8B%E8%AF%95.html?_ijt=s400drnq8g69bk0fuohsdh4c6m&params=alert(1111)
```
* 这是DOM xss；没有经过服务器，全部都在浏览器端发起，执行
  
* `注意，如果把script标签放到div标签中，那么新版的chrome不会解析执行对应的代码`
* url:
```html
http://localhost:63342/blog/%E5%B9%B3%E6%97%B6%E6%B5%8B%E8%AF%95.html?_ijt=s400drnq8g69bk0fuohsdh4c6m&params=<script>alert(1111)</script>
```
* 然后我们把html对应代码进行修改
```javascript
    let param = new URL(location.href).searchParams.get("params");
      let div = document.createElement("div");
      div.innerHTML = param;
      document.body.append(div);
```
* `发现没有执行URL中的script代码，但是浏览器中的确存在该标签。`

* 另外，如果我们直接在html中嵌套script标签，那么又是可以执行的
```html
    <div>
      <script>
        console.log("1111111");
      </script>
    </div>
```
* `可以发现，可以打印"1111111"`
