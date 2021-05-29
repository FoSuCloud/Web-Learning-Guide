## CommonJS 模块
* [http://nodejs.cn/api/modules.html](node.js中文网)
* 在node.js模块系统中，每个文件都被视为单独的模块。
* 在node.js环境中使用的是CommonJS模块系统，而在浏览器中则还在实现ES模块标准
* 例子：通过exports导出属性，然后通过require获取导出的对象，通过对象.属性取执行方法
* `这种方式将函数和对象添加到模块的根部;并且对模块变量可以执行更改！也就是通过CommonJS模块规范得到的是对象，而不是对象的拷贝`
```javascript
// circle.js
let a=10;
const update=(val)=>{
    a=val;
}
const getVal=()=>{
    return a;
}
exports.getVal=getVal;
exports.update=update;

// a.js
module.exports=function (){
    const circle=require('./circle.js')
    console.log(circle.getVal()) // 10
}

// 通过node test.js执行，得到的结果如下：
// test.js
const circle=require('./circle.js')
console.log(circle.getVal()) // 10
console.log(circle.update(3)) //undefined
console.log(circle.getVal()) // 3
let a=require('./a.js')
a() // 3
```

## 缓存机制
* 模块在第一次加载后会被缓存，意味着每次调用require('./foo.js')都会`解析到同一个文件`,并返回同一个对象
* `多次调用require()不会导致模块的代码被执行多次`
```javascrip
// circle.js
let a=10;
const getVal=()=>{
    a++;
    return a;
}
exports.getVal=getVal;

// test.js
const circle=require('./circle.js')
console.log(circle.getVal()) // 11

const circle2=require('./circle.js')
console.log(circle2.getVal()) // 12
```
* 即使第二次调用require,使用的还是之前缓存的模块，所以第二次调用getVal方法得到的是上一个require对应方法调用之后的新的值
* 而不是11，也就和第一次调用require不一样

## 缓存的机制
* 注意`缓存是根据解析到的文件名称进行缓存的`
* 所以如果调用模块的位置不同，模块可能被解析为不同的文件名，这样返回的就不是同一个对象了。
* 就好像在node_modules中，如果两个模块互相依赖，可能解析为不同的文件名，得到的也就不是同一个对象
---
* 另外node是不区分大小写的，`也就是foo.js和FOO.js会被指向同一个文件！但是解析得到的文件名是不一样的，`
* 所以会被视为不同的模块，多次执行重新加载。
```javascript
const a=require('./circle.js')
const b =require('./CIRCLE.js')
console.log(a.getVal()) // 11
console.log(b.getVal()) // 11
// 所以a和b其实得到的是不同的对象
```

## 同名模块
* 当存在核心模块和自定义模块同名，那么require总会优先加载核心模块

## 循环
* 当循环调用require时，一个模块可能在未完成执行时返回
```javascript
// a.js
console.log('a 开始');
exports.done = false;
const b = require('./b.js');
console.log('在 a 中，b.done = %j', b.done);
exports.done = true;
console.log('a 结束');
// b.js
console.log('b 开始');
exports.done = false;
const a = require('./a.js');
console.log('在 b 中，a.done = %j', a.done);
exports.done = true;
console.log('b 结束');
// main.js
console.log('main 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);
```
// 最后得到的结果是：
```javascript
main 开始
a 开始
b 开始
a 开始
在 b 中，a.done = false
b 结束
在 a 中，b.done = true
a 结束
在 main 中，a.done=false，b.done=true
```
* 关键点就在于模块在未完成执行的时候就返回了，否则会一直循环！

## 文件模块
* 如果按照确切的文件名称找不到模块，那么node.js会尝试带上.js,.node,.json拓展名再加载
`.node 文件会被解析为通过 process.dlopen() 加载的编译后的插件模块。`
1. 以'/'为前缀的模块是文件的绝对路径
2. 以'./'，'../'为前缀的模块是文件的相对路径
3. `当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。`

## 目录作为模块
* 可以把程序和库放在一个单独的目录下，然后提供单一的入口来指定它。
* 例如我们在package.json文件中设置main字段来指定入口文件，如果在a目录下，那么
```json
{ "name" : "a",
  "main" : "./lib/a.js" }
```
* 这个main字段指定的入口文件就是a/lib/a.js。
* 如果找不到这个文件，那么node默认会加载目录下的index.js或者index.node文件

## 模块作用域
1. __dirname
* 当前模块的目录名，相当于path.dirname(__filename)
```javascript
console.log(__dirname) // /Users/xielipei/Documents/vueProject/Myhxsj/node
let path=require('path')
console.log(path.dirname(__filename)) // /Users/xielipei/Documents/vueProject/Myhxsj/node
```
2. __filename
* 当前模块的文件名，这里得到的是当前的模块文件的绝对路径+文件名
`console.log(__filename) // /Users/xielipei/Documents/vueProject/Myhxsj/node/test.js`
