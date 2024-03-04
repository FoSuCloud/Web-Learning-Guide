## swc
* `在node环境的产物是 .node文件；在浏览器环境的产物是.wasm文件`

* node-swc/src/binding.js
* `nativeBinding = require('./swc.darwin-x64.node')`
`const { bundle, minify, minifySync, parse, parseSync, parseFileSync, parseFile, print, printSync, transform, transformSync, transformFile, transformFileSync, getTargetTriple, initCustomTraceSubscriber, Compiler } = nativeBinding`
* `swc.darwin-x64.node是swc的rust代码的编译产物，是二进制的机器码`

### 为什么swc比babel快
* 首先swc是使用rust实现的，babel是使用js实现的
* 而rust对应的代码是机器码，不需要在内存中动态解释代码
* `rust的编译过程`
  `源代码-->词法分析tokens-->抽象语法树AST-->高层中间语言HIR-->中层中间语言MIR-->底层语言虚拟机中间语言LLVM IR-->机器码`
* `rust编译过程 https://www.cnblogs.com/gaozejie/p/16950786.html`
* Swc 通过调用 Rust 语言的 API 来进行编译，
* 因此 Swc 可以比 Babel 更快地编译 JavaScript 代码。
* `也就是swc其实实际上执行编译操作是通过调用 rust去做的，而rust是c++实现的，在执行的时候直接使用机器码就可以了`
* `而bable是js实现的，执行的时候需要在内存中动态解释之后，才可以被cpu理解执行，所以比较慢`
---
* Rust 和 JavaScript 都是编程语言，但 C++ 是一种编译型语言，而 JavaScript 是一种解释型语言。因此，在速度上 Rust 比 JavaScript 快。
* Rust 程序在编译时，编译器将代码转换为机器码，机器码在 CPU 上运行时非常快。而 JavaScript 程序在运行时，需要在内存中动态解释，因此 JavaScript 程序的执行速度比 C++ 程序慢。
* 因此，当使用 Rust 实现 JavaScript 编译器时，它们的编译速度通常比使用 JavaScript 实现的编译器快。
* SWC 是一个使用 Rust 实现的 JavaScript 编译器，因此它的编译速度比 Babel 快，尤其是当编译大量代码时。
---
* 在swc的源码中可以找到loadBinding函数，其实是在获取需要加载二进制文件路径，`这个文件就是 swc写的rust编译js代码的项目产物 `
* `node_modules/@swc/core-darwin-x64/swc.darwin-x64.node`
---
* `而babel在执行编译js项目的时候，需要调用自己的js代码，但是自己的js代码也需要进行解释之后才可以执行，所以就多了一个步骤`
* js引擎的编译，执行流程  https://juejin.cn/post/6844903953981767688

#### .node文件
* `swc-loader 的产物 .node 文件是一种编译后的本地模块文件`，通常用于 `Node.js 环境中`。
* 它是由 swc（SuperWebAssembly Compiler）编译器生成的，用于提供更快的 WebAssembly 代码执行速度。

* ` .node 文件可以被 CPU 直接执行。`

* `.node 文件包含了编译后的本地代码，可以直接在 Node.js 环境中加载和使用`，
* 而不需要经过 WebAssembly 运行时的解释执行。
* 这种本地模块文件通常比 WebAssembly 二进制文件更小、更快，并且提供了更好的性能和更高的安全性。

#### .wasm
* 虽然 .wasm 文件是低级的类汇编语言，但它们并不是直接在 CPU 上执行的。
* `它们通过 WebAssembly 运行时在浏览器中解释执行`，利用现代计算机的虚拟化技术实现高效的性能和安全性。

#### swc-loader的产物
解析：将源代码转换为 AST（抽象语法树）。
转换：对 AST 进行各种优化和转换，例如删除未使用的代码、内联函数等。
输出：将优化后的 AST `转换回 JavaScript 代码`，`并生成最终的输出文件`。

