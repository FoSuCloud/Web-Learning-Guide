从 ES6 开始， JavaScript 才真正意义上有自己的模块化规范
Es Module 的产生有很多优势，比如:
1. `借助 Es Module 的静态导入导出的优势，实现了 tree shaking。`
2. `Es Module 还可以 import() 懒加载方式实现代码分割。`

* `node12开始支持esmodule, 在package.json配置"type": "module"即可使用`

#### 普通方式
```javascript
const name = '《React进阶实践指南》' 
const author = '我不是外星人'
export { name, author }
export const say = function (){
    console.log('hello , world')
}
```
```javascript
// name , author , say 对应 a.js 中的  name , author , say
import { name , author , say } from './a.js'
```
* export { }， 与变量名绑定，命名导出。
* import { } from 'module'， 导入 module 的命名导出 ，module 为如上的 ./a.js
* 这种情况下 import { } 内部的变量名称，要与 export { } 完全匹配。

#### export default
```javascript
const name = '《React进阶实践指南》'
const author = '我不是外星人'
const say = function (){
    console.log('hello , world')
}
export default {
    name,
    author,
    say
}
```
```javascript
import mes from './a.js'
console.log(mes) //{ name: '《React进阶实践指南》',author:'我不是外星人', say:Function }
```
* export default anything 导入 module 的默认导出。 `anything 可以是函数，属性方法，或者对象。`
* 对于引入默认导出的模块，import anyName from 'module'， `anyName 可以是自定义名称。`


#### 异步加载&提前加载
* ES6 模块`提前加载并执行模块文件`
* 并且是静态语法，所以需要写在文件头部
* `ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块`
* `两个阶段都采用深度优先遍历，执行顺序是子 -> 父。`




