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

## js异步加载之defer/async/ type="module"
1. defer(延缓):1.如果script标签设置了该属性，则浏览器会异步加载文件且不会影响到后续DOM的渲染
*  `2. 如果有多个defer,那么会按照顺序去执行所有的script`
* `3. defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行(所以会阻塞DOMContentLoaded事件)`
2. async(异步):`异步加载脚本，但是不会按照顺序去执行！谁先加载完谁先执行，并且在执行脚本的时候停止渲染页面，执行完才继续执行渲染`
* `也就是async的话就不会等待页面渲染完成，而是异步加载完毕就会去执行脚本`
3. `type="module"`:`和defer情况很类似，区别在于会在提取的时候加载多个js文件`
4. `同时设置async和type="module"，此时会异步加载，并且当做模块加载多个js文件，但是不必等到页面渲染完毕就可以执行`
5. `在同时设置defer和async的时候，async的优先级更高`
6. `async和defer都只在script标签的src属性存在时才有效，而type="module"则不需要`
