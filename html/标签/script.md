## script标签引入export导出数据
```js
const mustache = 1;
export default mustache;
```
* `重点是设置type="module"表示这个script标签里面的内容是作为一个module模块来运行的！所以遵守es6 module规范`
```html
<script type="module">
    import mustache from "./mustache.js";
    console.log(mustache)
</script>
```

## text/template 存储html内容
* `当我们需要存储一个html结构数据的时候，可以存储在script标签中，书写方便，而且也有智能提示`
```html
<div id="app"></div>
<script type="text/template" id="myTemplate">
<ul>
   {{#arr}}
    <li>名字{{name}}</li>
    <li>年龄{{age}}</li>
    {{/arr}}
</ul>
</script>
<script type="module">
    // 使用cdn的es规范的mustache模板引擎渲染
    import mustache from "./lib/mustache.js";
    let app = document.getElementById('app')
    let myTemplate = document.getElementById('myTemplate')
    let obj ={
        arr:[{name:'a',age:11},{name:'b',age:12}]
    }
    let result = mustache.render(myTemplate.innerHTML,obj)
    app.innerHTML+=result
</script>
```
