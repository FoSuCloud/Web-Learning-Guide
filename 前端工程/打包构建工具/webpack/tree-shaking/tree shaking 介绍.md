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




