## url编码
* `一般来说，只有数字，英文字母，特殊标点符号可以不经编码，直接用于URL`
* `这就意味着，如果URL中有中文，那么就必须经过编码才能使用`
* 但是不同的浏览器有不同的编码方式。
* 例子1，我们开启一个node服务
```javascript
// 请求url地址是:http://localhost:3000/%E6%98%A5%E8%8A%82

// 然后我们在node服务打断点可以看到实际上到达后端拿到的url是：
// http://localhost:3000/%E6%98%A5%E8%8A%82

// 然后我们使用encodeURI得到
// encodeURI("春节")
// "%E6%98%A5%E8%8A%82"
```
`所以即使我们在浏览器地址栏输入中文，然后地址栏没有encodeURI编码，但是在后端得到的也是编码之后的结果！`
1、由于不同的浏览器，不同的操作系统，可能我们在地址栏输入中文，可能会被转换为gbk,utf-8等等，所以解决方案是：
首先前端发送过去的时候，就先用encodeURI把sValue进行编码，然后后端也通过decodeURI进行解码，然后就保持了一致性！
```javascript
// node
const http=require('http')
const Util = require("./util");
const port = 3000;

const server =http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin','*')
    // res.setHeader('Content-Type', 'text/html; charset=gbk')
    res.setHeader('set-cookie','a="aa";expires="2021-07-13T01:32:05.572Z";HttpOnly')
    if(req.url === '/'){
        res.end(JSON.stringify(Util.process()))
    }else{
        res.end(decodeURI(req.url))
    }
})

server.listen(port,()=>{
    console.log('start')
})
// 前端
//     <body>
//     <div>
//     <button onclick="toUrl()">点击</button>
//     </div>
//     <script>
//     function toUrl(){
//     let xhr=new XMLHttpRequest();
//     xhr.open('get','http://localhost:3000/'+ encodeURI('春节'))
//     xhr.onload=function (res){
//     if(xhr.readyState === 4){
//     if(xhr.status === 200){
//     console.log(xhr.response) // 春节
//     }
//     }
//     }
//     xhr.send()
//     }
//     </script>
//     </body>
```

* 参考['http://www.ruanyifeng.com/blog/2010/02/url_encoding.html']("参考")

### url编码的三种方式
1、首先是escape，这个方法现在是浏览器不推荐使用的。
* escape不是直接用于url编码的，而是用于返回字符串的unicode编码值
2、然后是encodeURI，encodeURI是js中真正用于url编码的函数
  `着眼于对整个url进行编码，所以不会对&?这些特殊字符进行编码，一般用于对中文进行编码，输出值的utf-8形式，并且在每个字符前面添加%`
```javascript
        console.log(encodeURI('http://127.0.0.1/3/中午?wd=中文&sValue=中文'))
    //    http://127.0.0.1/3/%E4%B8%AD%E5%8D%88?wd=%E4%B8%AD%E6%96%87&sValue=%E4%B8%AD%E6%96%87
// 我们可以看到?,&特殊字符并没有被编码
```
* [参考]("https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI")
* `需要额外注意，encodeURI和encodeURIComponent编码的范围哦是不一样的！`
* `encodeURI无法产生用于get,post请求的uri；因为对于xhr,&+不会被编码；但是对于get,post请求，他们是特殊字符，所以使用decodeURIComponent进行编码`
3、然后是encodeURIComponent方法，这个方法`用于对url的个别组成部分进行编码，所以会对?&这些特殊符号进行编码`
* `对除了以下字符之外的字符进行编码：A-Z a-z 0-9 - _ . ! ~ * ' ( )`
* 例如，空格就会被编码
* `encodeURIComponent编码的结果是成对的数字或者字母，(%[\dA-F]{2})+`
```html
    console.log(encodeURIComponent('http://127.0.0.1/3/中午?wd=中文&sValue=中文'))
    //    http%3A%2F%2F127.0.0.1%2F3%2F%E4%B8%AD%E5%8D%88%3Fwd%3D%E4%B8%AD%E6%96%87%26sValue%3D%E4%B8%AD%E6%96%87
```
* 我们可以看到很明显的，所有特殊字符都被编码了!
---
* 所以对于同一个字符串，encodeURI和encodeURIComponent会得到不同的结果
```js
decodeURI("%20%2B%2F") // ' %2B%2F' 
decodeURI("%20%2B%2F")  // ' +/'
```

### 那么body数据是否也需要先encode？
* 不需要，因为请求体的数据发送到后端是只读流对象
* 也就是不会因为中文导致乱码
```javascript
// node
const http=require('http')
const Util = require("./util");
const port = 3000;


const server =http.createServer((req,res)=>{
  // 在node.js中，请求报文部分被抽象为一个只读对象
  // 如果后端需要读取报文数据，那么需要在数据流结束之后才能进行操作
  // 但是需要先在data读取阶段存储chunk字符，然后在end结束阶段编码为对应格式返回给前端
  let buffers=[]
  req.on('data',function (chunk){
    buffers.push(chunk)
  }).on('end',function (){
    let buffer=Buffer.concat(buffers).toString('utf-8')
    res.end(buffer)
  })

  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('set-cookie','a="aa";expires="2021-07-13T01:32:05.572Z";HttpOnly')
})


server.listen(port,()=>{
  console.log('start')
})


// <div>
// <button onclick="toUrl()">点击</button>
// </div>
// <script>
// function toUrl(){
// let xhr=new XMLHttpRequest();
// xhr.open('post','http://localhost:3000/')
// //发送合适的请求头信息
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhr.onload=function (res){
// if(xhr.readyState === 4){
// if(xhr.status === 200){
// console.log(xhr.response) // 可以拿到正确的数据
// }
// }
// }
// xhr.send("name=测试&age=11")
// }
// </script>
```
