## HTML实体编码
* 首先通过一个例子来说明一下HTML实体编码的重要性
```html
//  前端
<!DOCTYPE html>
<html lang="en">
<meta charset="utf8" />
<head>
    <title>测试</title>
    <style></style>
</head>
<body>
<div id="test"></div>
<textarea name="" id="textarea" cols="30" rows="10"></textarea>
<input type="button" onclick="submit()" value="提交">
<script>
    function submit(){
        let test = document.getElementById("test");
        fetch("http://localhost:3000").then((res)=>{
            res.text().then((response)=>{
                test.innerHTML=response;
            });
        });
    }
</script>
</body>
</html>
```
```javascript
// 后端
const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 3000;

const server =http.createServer((req,res)=>{
res.statusCode = 200
let arr=['http://localhost:63342','http://localhost:3001']
if(arr.includes(req.headers.origin)){
res.setHeader('Cache-Control','no-cache')
res.setHeader('Connection','keep-alive')
res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
res.setHeader('Access-Control-Allow-Credentials', 'true')
}
res.end("<img src=@ onerror=alert(123) />")
})

server.listen(port,()=>{
console.log('start')
})
```
* `然后可以发现，把后端响应的值赋值给textarea,只会在textarea显示对应的文本，并不会执行`
* `然后把对应的响应内容赋值给div,就可以执行代码，弹出弹窗，不安全！`
---
* `但是我们把后端返回的内容修改一下，改为使用HTML实体编码`
```javascript
res.end("&lt;img src=@ onerror=alert(123) /&gt;")
```
* `可以发现div不会执行代码，textarea也不会，都只是显示一样的文本`
* <img src=@ onerror=alert(123) />
* `所以结论就是前端输入和输出的内容，如果需要复制给HTML标签且不经过HTML实体编码，那么会不安全`

## HTML实体编码介绍
* 通过上面的例子，我们可以知道，某些保留字符出现在文本节点和标签值里是不安全的
* 在XHTML中，这些保留字符出现在标签里会立刻报错，但是`HTML解析器太懒了，容错性大，并不会出现语法报错`
* 要想安全的使用`<,&,>,"等字符`，就需要使用一套实体编码(entity encoding)的简单编码策略
* `这套HTML实体编码策略是以&符号开头，以;分号结尾的`
---

* 在XML中只有少数几个这种编码，而在HTML中，存在数百个这种实体编码，`并且常用的浏览器都支持这种用法`
* HTML编码有以下几种方式
1. HTML实体编码，格式`以&符号开头，以;分号结尾的`
* [HTML实体编码参考手册]("https://www.w3school.com.cn/charsets/ref_html_8859.asp")
```html
<textarea name="" id="textarea" cols="30" rows="10">
    &lt;img src=&quot;localhost&quot;&gt;
  </textarea>
```
* 结果是： <img src="localhost">
2. 十进制的ASCLL编码,格式:`以符号&#开头，分号;结尾`
* [ascll编码对照表]("https://baike.baidu.com/item/ASCII/309296?fr=aladdin")
```html
<textarea name="" id="textarea" cols="30" rows="10">
    &#60;&#105;mg src&#61;"localhost"&#62;
  </textarea>
```
* 结果是："<img src="localhost">"
3. Unicode字符编码,格式:`以符号&#开头，分号;结尾`
* `另外，下面的unicode编码参考表的数字对应的是十六进制的，但是我们需要先转换为十进制再显示！`
* [unicode编码参考]("https://baike.baidu.com/item/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8/12022016?fr=aladdin")
* 首先把0022转换为十进制是0034;003D转换为十进制是0061
```html
  <textarea name="" id="textarea" cols="30" rows="10">
    <img src&#0061;&#0034;localhost&#0034;>
  </textarea>
```
* 结果是："<img src="localhost">"

4. 十六进制的ascll码，格式：`以&#x开头，分号;结尾`
* 参考上面的ascll表，但是注意需要先转换为十六进制。
```html
<textarea name="" id="textarea" cols="30" rows="10">
    <img src&#x3D;&#x0022;localhost&#x0022;>
  </textarea>
```
* 结果是：" <img src="localhost">"

* 最后综合几种写法看看
```html
  <textarea name="" id="textarea" cols="30" rows="10">
    &lt;&#64;&#0033;&#x3c;&gt;
  </textarea>
```
* `最后在textarea中显示`
```text
<@!<>
```
* 也就是&lt;被解析为"<";&#64被解析为"@";&#0033被解析为"!";&#x3c被解析为"<";&gt;被解析为">"

### HTML实体编码使用
1. 使用在标签的双引号内部
```html
 <img src="https://wangbase.com/blogimg/asset/202107/bg2021072117.png">
    <img src="&#104;ttps://wangbase.com/blogimg/asset/202107/bg2021072117.png">
```
* 我们可以发现，两种写法可以加载到图片！
2. 写在标签的属性中
```html
    <img sr&#99;="https://wangbase.com/blogimg/asset/202107/bg2021072117.png">
```
* `写在标签属性中，相当于破坏了标签的属性值，所以不会加载图片！`
3. 作为双引号，等于号
```html
    <img src&#x3D;"https://wangbase.com/blogimg/asset/202107/bg2021072117.png">
<img src=&#x22;https://wangbase.com/blogimg/asset/202107/bg2021072117.png">
```
* 作为等于号，导致浏览器识别为属性名称未结束，错误。不会加载图片
* 作为等双引号，结果被识别为：(`左边两个双引号`)
`""https://wangbase.com/blogimg/asset/202107/bg2021072117.png"`

### HTML实体编码不可用于js
* `HTML实体编码的范围是HTML文档，不包括javscript执行环境，因为javascript执行环境的解析器不是HTML解析器！`
* 接下来看个代码
```javascript
document.write('&lt;img src=@ onerror=alert(123) /&gt;') // <img src=@ onerror=alert(123) />
console.log('&lt;img src=@ onerror=alert(123) /&gt;') // &lt;img src=@ onerror=alert(123) /&gt;
console.log('\<img src=@ onerror=alert(123) \/\>') // <img src=@ onerror=alert(123) />_
```
* `1. document.write由于最后的字符串被输出到html页面，所以还是会被html实体解码为对应标签`
* `2. 由于只是在js环境中打印，所以最后没有进行html实体编码,字符串不变`
* `3. 由于js的自解码机制会对纯转义字符添加反斜号，所以最后被解析为没有反斜号的形式`


## 自解码机制

- `声明：参考了《Web前端黑客技术解密》这本书136页`
* `实际应用可以看js-xss这个库`

### html自解码机制

```html
<input
  type="button"
  value="自解码"
  id="btn"
  onclick="document.write('<img src=@ onerror=alert(123) />')"
/>
```

- 结果就是点击了这个按钮，弹出弹窗"123"

- 然后我们使用`HTMLEncode函数对document.write里面的内容进行处理`

```html
<body>
  <input type="button" value="自解码" id="btn" onclick="document.write(htmlEncode('<img src=@ onerror=alert(123) />'))">
    <script>
    function htmlEncode(str){
      let s=''
      if(!str.length){
        return s;
      }
      s=str.replace(/&/g,'&amp;')
      s=str.replace(/</g,'&lt;')
      s=str.replace(/>/g,'&gt;')
      s=str.replace(/\"/g,'&quot;')
      return s;
    }
    </script>
  </body>
```
* `根据代码逻辑，可以知道htmlEncode对img这段字符串编码之后的结果是`
`&lt;img src=@ onerror=alert(123) /&gt;`
  
* 既然如此，那么我们直接绑定这段代码行不行呢？就是不经过js转换
```html
  <input type="button" value="自解码" id="btn" onclick="document.write('&lt;img src=@ onerror=alert(123) /&gt;')">
```
* `最后的结果是是可以弹出弹窗123！`

#### 总结
1. html的自解码机制会在javascript代码出现在html标签内的时候触发，`也就是html标签里面的js可以进行html形式的解码`
2. html编码有两种：
1)进制编码，&#xH;(十六进制格式)，&#D;(十进制格式)`没明白。`
2)HTML实体编码`也就是html标签中使用&lt;这种实体编码，也会被html进行自解码`

### 具备HTMLEncode功能的标签
* 有以下几种：`div,title,iframe,noscript,npframes`
* `注意：textarea标签和input标签不具有htmlencode功能`
* 下面验证一下：
```html
    <input id="test" value="test" type="text"/>
    <textarea name="" id="test" cols="30" rows="10"></textarea>
<script>
    let test = document.getElementById('test')
    function fn(){
        test.value = '&lt;img src=@ onerror=alert(123) /&gt;'
    }
</script>
```
* `结果是没有生效，input输入框和textarea文本框都没有进行htmlencode编码。显示&lt;img src=@ onerror=alert(123) /&gt;`
* 然后试试div,title标签
```html
<!DOCTYPE html>
<html lang="en">
  <meta charset="utf8" />
  <head>
<!--    <title id="test">测试</title>-->
    <style></style>
  </head>
  <body>
    <input type="button" value="自解码" id="btn" onclick="fn()" />
<!--    <div id="test">test</div>-->
    <script>
      let test = document.getElementById("test");
      function fn() {
        test.innerHTML = "&lt;img src=@ onerror=alert(123) /&gt;";
      }
    </script>
  </body>
</html>
```
* `发现最后在html页面显示的是<img src=@ onerror=alert(123) />`

### javascript自解码机制
1. unicode形式：\uH（十六进制）
2. 普通十六进制；\xH
3. `纯转义：\',\",\<,\>,在这种特殊字符之前加转义`
* 也就是用户输入会被转义
```html
<img src=@ onerror=alert(123) />
<!-- 变为-->
'\<img src=@ onerror=alert(123) \/\>'
```
* 接下来看个代码
```javascript
document.write('&lt;img src=@ onerror=alert(123) /&gt;') // <img src=@ onerror=alert(123) />
console.log('&lt;img src=@ onerror=alert(123) /&gt;') // &lt;img src=@ onerror=alert(123) /&gt;
console.log('\<img src=@ onerror=alert(123) \/\>') // <img src=@ onerror=alert(123) />_
```
* `1. document.write由于最后的字符串被输出到html页面，所以还是会被html实体解码为对应标签`
* `2. 由于只是在js环境中打印，所以最后没有进行html实体编码,字符串不变`
* `3. 由于js的自解码机制会对纯转义字符添加反斜号，所以最后被解析为没有反斜号的形式`

## 转义字符串
* [参考]("http://114.xixik.com/character/")
* [w3c]("")
* [浏览器编码]("https://zhuanlan.zhihu.com/p/41945326")

