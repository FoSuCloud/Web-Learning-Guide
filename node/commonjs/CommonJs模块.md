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

#### 核心模块
* `核心模块的优先级仅次于缓存加载，在 Node 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。`

## 同名模块
* 当存在核心模块和自定义模块同名，那么require总会优先加载核心模块

## 循环引用
* 当循环调用require时，一个模块可能在未完成执行时返回
```javascript
// a.js
console.log('a 开始');
exports.done = false;
const b = require('./b.js');
console.log('在 a 中，b.done = %j', b.done);
exports.done = true;
console.log('a 结束');
//b.js
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
在 b 中，a.done = false
b 结束
在 a 中，b.done = true
a 结束
在 main 中，a.done=true，b.done=true
```
* 关键点就在于`模块在未完成执行的时候就返回了`，否则会一直循环！

* `如果b函数存在setTimeout呢，那么会在最后执行，因为放入任务队列了`

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

#### exports 和 module.exports
* `exports 就是传入到当前模块内的一个对象，本质上就是 module.exports。`

* 理想情况下是通过 exports = {} 直接赋值，不需要在 exports.a = xxx 每一个属性，但是如上我们看到了这种方式是无效的

* `因为Commonjs 规范下的包装函数是一个对象，我们直接更改对象其实不行，因为不在同一个作用域(赋值相当于重新声明一个新的对象)，只能更改对象的属性`

* 两者同时存在，则会存在覆盖的情况
```javascript
exports.name = 'alien' // 此时 exports.name 是无效的
module.exports ={
    name:'《React进阶实践指南》',
    author:'我不是外星人',
    say(){
        console.log(666)
    }
}
```
####  既然有了 exports，为何又出了 module.exports ?
* 如果我们不想在 commonjs 中导出对象，`而是只导出一个类或者一个函数再或者其他属性的情况`，
* 那么 module.exports 就更方便了，如上我们知道 `exports 会被初始化成一个对象`，
* 也就是我们只能在对象上绑定属性，但是我们可以通过 `module.exports 自定义导出出对象外的其他类型元素`。

```javascript
let a = 1
module.exports = a // 导出函数

module.exports = [1,2,3] // 导出数组

module.exports = function(){} //导出方法

```

#### 与 exports 相比，module.exports 有什么缺陷 ？
* module.exports 当导出一些函数等非对象属性的时候，也有一些风险，就比如循环引用的情况下。
* 对象会保留相同的内存地址，就算一些属性是后绑定的，也能间接通过异步形式访问到。
* 但是`如果 module.exports 为一个非对象其他属性类型，在循环引用的时候，就容易造成属性丢失的情况发生了。`

### esmodule和commonjs有什么区别?
静态引入与动态引入：`ESModule支持静态引入，这意味着在编译时就能确定模块的依赖关系`。而CommonJS采用的是动态引入的方式，只有在运行时才能确定模块的依赖关系。
静态分析与可靠静态分析：`由于ESModule的静态特性，它可以进行可靠的静态分析，这是Tree Shaking的前提`。而CommonJS由于其动态特性，无法进行这样的静态分析。
加载机制：ESModule在编译时就能确定模块的输入和输出变量，因此可以做到Tree Shaking，即只加载用到的模块部分内容，从而删除无用代码。而CommonJS需要加载整个模块，然后再取内容。
异步与同步：ESModule中的import是异步加载，而CommonJS中的require是同步加载。

