## tree shaking
* `由于ESModule的静态特性，它可以进行可靠的静态分析，这是Tree Shaking的前提`


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


