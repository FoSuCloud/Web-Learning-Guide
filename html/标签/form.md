## 阻止form标签的提交事件及阻止记录(取消form标签的自动完成功能)
```
			<form action="" onsubmit="return false;" autocomplete="on" >
				<label for="one">name</label><input type="text" id="one"/>
				<label for="two">age</label><input type="text" id="two"/>
				<input type="submit"  value="提交" />
			</form>
```
* `取消提交就给form添加 onsubmit="return false;"`
* `取消form记录之前输入过的内容就用oncomplete="off",开启就用on`

## action
* 表单提交的url

### enctype
* `enctype在post请求时是用来定义请求头Content-Type属性的MIME类型的，用来说明发送给服务器的数据类型`
* 默认值是`application/x-www-form-urlencoded`
---
* `请求为post,表单中存在type=file的表单项时，使用enctype="multipart/form-data"`
---
* 这个值可被 <button>、<input type="submit"> 或 <input type="image"> 元素上的 formenctype 属性覆盖。

### method
* method默认为get请求,有三种可能
1. get请求，表单数据会附在action属性的url中，`并以?为分隔符`
2. post请求，表单数据会被包含在请求体中发送给服务器
3. dialog,如果表单在弹窗中，那么可以提交后关闭弹窗
* 此值可以被 <button>、<input type="submit"> 或 <input type="image"> 元素中的 formmethod 属性覆盖。

## target
* `target表示表单被提交后，在哪里响应信息。`，有以下选项：
1. `_self:默认值，在当前上下文响应`
2. _blank,在新的未命名的上下文响应，`如果当前是主页面window,那么就是打开一个新的tab页面`
3. _parent,在当前上下文的父级上下文响应，如果没有父级上下文响应，那么就和_self表现一样
4. _top,在最顶级的上下文响应，如果没有父级上下文，那么和_self表现一致

## 例子
1. 默认
```html
<form action="http://localhost:3000">
      <input type="text" name="test" placeholder="名称"/>
      <input type="submit" value="提交">
    </form>
```
* `此时method默认是get请求，由于不是post请求，所以不需要发送MIME类型给服务器`
* `实际上发送的数据格式是query参数，如：http://localhost:3000/?test=test`
2. post请求，默认enctype
```html
    <form action="http://localhost:3000" method="post">
      <input type="text" name="test" placeholder="名称"/>
      <input type="submit" value="提交">
    </form>
```
* `此时可以看到network中发送出去的数据，请求头:Content-Type:application/x-www-form-urlencode`
3. 请求为post,表单中存在type=file的表单项时（不设置enctype）
* `如果不设置或者设置的enctype不为multipart/form-data,那么file部分发送出去的是文件名称`
```html
    <form action="http://localhost:3000" method="post">
      <input type="text" name="test" placeholder="名称"/>
      <input type="file">
      <input type="submit" value="提交">
    </form>
```
* 后端node.js对应代码为
```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 3000;

const server =http.createServer((req,res)=>{
    res.statusCode = 200
    let arr=['http://localhost:63342','http://localhost:3001']
    if(arr.includes(req.headers.origin)){
        res.setHeader('content-type','text/event-stream; charset=utf-8')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin) // req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    let chunk = ''
    req.on('data',(c)=>{
        chunk+=c;
    })
    req.on('end',()=>{
        console.log(chunk) 
        res.end(chunk); // 把接收到的数据返回去
    })
})
server.listen(port,()=>{
    console.log('start')
})
```
* `如果没有设置enctype,那么默认就是application/x-www-form-urlencoded;`
* `后端接收到的数据就是（xxx:文件名）：test=111&myFile=%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx`
4. 请求为post,表单中存在type=file的表单项时（enctype为multipart/form-data）
```html
<form action="http://localhost:3000" method="post" enctype="multipart/form-data">
      <input type="text" name="test" placeholder="名称"/>
      <input type="file" name="myFile">
      <input type="submit" value="提交">
    </form>
```
* `由于设置了正确的enctype,所以发送出去的content-type为multipart/form-data`
```html
------WebKitFormBoundaryWBCBtHYrLYNYw2r3
Content-Disposition: form-data; name="test"

444
------WebKitFormBoundaryWBCBtHYrLYNYw2r3
Content-Disposition: form-data; name="myFile"; filename="操作日志-20210726161002083.csv"
Content-Type: text/csv

时间,用户,来源IP,模块,日志内容,结果,备注,时间,用户,来源IP,模块,日志内容,结果,时间,用户,来源IP,
```
* `如果没有选择文件，直接发送，那么发送出去的值是`
```html
------WebKitFormBoundarykXVNVrRGxCAHVz1S
Content-Disposition: form-data; name="test"

11
------WebKitFormBoundarykXVNVrRGxCAHVz1S
Content-Disposition: form-data; name="myFile"; filename=""
Content-Type: application/octet-stream


------WebKitFormBoundarykXVNVrRGxCAHVz1S--
```
* `可以看到文件这一部分的content-type就使用了默认值application/octet-stream`

### multipart/form-data和application/x-www-form-urlencoded的使用区别
* [form使用]("https://www.cnblogs.com/gaocy/p/9667510.html")
* 使用form表单提交，使用post请求方式，那么默认MIME-Type是application/x-www-form-urlencoded
* 但是如果form表单中存在一个类型是文件的选项，那么MIME-Type就是multipart/form-data
* 表示该表单内容是复合文件
* `可以参考字段中的MIME-TYPE这一部分说明`
