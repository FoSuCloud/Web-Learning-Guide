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
* [w3c]("https://www.w3school.com.cn/html/html_entities.asp")
* [浏览器编码]("https://zhuanlan.zhihu.com/p/41945326")

