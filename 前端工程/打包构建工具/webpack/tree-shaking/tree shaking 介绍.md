* Tree Shaking 在 Webpack 中的实现，`是用来尽可能的删除没有被使用过的代码`，一些被 import 了但其实没有被使用的代码。
* 比如以下场景：
```javascript
export let num = 1
export const addNumber = ()=>{
    num++
}
export const delNumber = ()=>{
    num--
}
```

```javascript
import {  addNumber } from './a'
addNumber()
```
* 如上 a.js 中暴露两个方法，addNumber和 delNumber，但是整个应用中，只用到了 addNumber，
* 那么构建打包的时候，`delNumber将作为没有引用的方法，不被打包进来`。

* `ESM规范就要求import/export语句必须在模块顶层；ESM 下模块之间的依赖关系是高度确定的，与运行状态无关`，
* `编译工具只需要对 ESM 模块做静态分析`，就`可以从代码字面量中推断出哪些模块值未曾被其它模块使用`，
* `这是实现 Tree Shaking 技术的必要条件。`

#### 介绍
* Tree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，
* 它会在运行过程中`静态分析模块之间的导入导出`，
* 确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化。
*  Tree Shaking `较早前由 Rich Harris 在 Rollup 中率先实现`，Webpack 自 2.0 版本开始接入，至今已经成为一种应用广泛的性能优化手段。

#### webpack开启
* 在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件：
1. 使用 ESM 规范编写模块代码
2. 配置 optimization.usedExports 为 true，启动标记功能
3. 启动代码优化功能，可以通过如下方式实现：
`配置 mode = production
配置 optimization.minimize = true (默认为true)
提供 optimization.minimizer 数组`

* optimization.usedExports(`是否开启标记`)。当 `usedExports 设置为 true `时，Webpack 会认为你可能只使用了模块的一部分导出。
* 这意味着即使一个模块被导入，但`只要它导出的内容没有被使用，Tree Shaking 仍然可以去除该模块。`

* usedExports(`是否进行tree-shaking`) 设置为 false，Webpack 会认为你使用了模块的所有导出。
* `这意味着只有当你明确地导入和使用模块的所有导出时，Tree Shaking 才会移除该模块。`

#### sideEffects
* `在 webpack 中，默认情况下，"sideEffects" 被设置为 false`。
* 这意味着 webpack 默认假设所有模块都没有副作用，并且会尝试进行代码摇树优化，剔除未使用的代码。
* 这种默认配置通常适用于大多数 JavaScript 模块，因为大部分模块的导入和导出仅涉及纯粹的函数和变量引用，而不会对其他模块或环境产生副作用。

* `在react项目的index.tsx文件中import 'core-js/stable';
  import 'regenerator-runtime/runtime'; 是否也会被tree shaking 去掉?`
* 在一般情况下，像 import 'core-js/stable'; 和 import 'regenerator-runtime/runtime'; 这样的导入语句不会被代码摇树优化（tree shaking）去掉。
* 这是因为 import 'core-js/stable'; 和 import 'regenerator-runtime/runtime';
* `这样的导入语句本身并没有导出任何具体的变量或函数，它们只是执行了一些副作用操作，例如在全局范围内扩展 JavaScript 运行时环境，以确保代码的兼容性。`
* `由于这些导入语句没有具体的导出，代码摇树优化过程无法确定它们是否被使用，因此它们通常不会被剔除。`


### webpack5的tree shaking
#### 跟踪对导出的嵌套属性的访问
* webpack5能够`跟踪对导出的嵌套属性的访问`，可以改善导出命名空间对象时的tree shaking (清除未使用的导出和混淆导出)
```javascript
// inner.js
export const a = 1;
export const b = 2;
```
```javascript
//module.js 
export * as inner from './inner.js';
```
```javascript
// user.js
import * as module from './module.js'
console.log(module.inner.a);
```
* `在这个例子，webpack5会删除导出的b`

#### 内部模块的tree shaking
* webpack4没有分析模块的导出和引用之间的依赖关系。webpack5有一个新的选项；optimization.innerGraph
* 在生产模式下默认是启用的，它可以对模块中的标志进行分析，找到导出和引用之间的依赖关系。
```javascript
import {something} from './something';
function usingSomeThing(){
    return something;
}
export function test(){
    return usingSomeThing();
}
```
* `webpack5的内部依赖图算法会找出something只有在test被导出时才会被使用，这允许更多的出口标记为未使用`
* `从而从代码包中省略更多的代码`



