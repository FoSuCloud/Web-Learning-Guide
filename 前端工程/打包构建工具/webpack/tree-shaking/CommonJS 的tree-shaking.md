在 CommonJS 模块规范中，Tree Shaking（摇树优化）通常与 ES6 模块规范不同。CommonJS 模块是动态导入的，导入的内容在运行时才被解析，而 ES6 模块是静态的，导入的内容在编译时就被确定。这就使得在 CommonJS 中实现 Tree Shaking 变得更加复杂。

通常，Tree Shaking 更适用于 ES6 模块，因为它们提供了更静态的导入和导出语法，使得编译工具可以更容易地识别未使用的代码并进行消除。但是，如果你确实需要在 CommonJS 中进行 Tree Shaking，可以考虑以下几种方法：

1. 使用 ES6 模块： 如果可能的话，将代码迁移到 ES6 模块，因为它们天生支持 Tree Shaking。

2. 使用 Rollup： Rollup 是一个专门用于打包 ES6 模块的工具，它对 Tree Shaking 有很好的支持。虽然 Rollup 本身不是专门为 CommonJS 设计的，但是它有一些插件，比如 rollup-plugin-commonjs 和 rollup-plugin-node-resolve，可以用于处理 CommonJS 模块。在使用 Rollup 时，你可能会获得更好的 Tree Shaking 效果。
安装 Rollup 和相应的插件：
`npm install rollup rollup-plugin-commonjs rollup-plugin-node-resolve --save-dev`
```javascript
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'your-entry-file.js',
  output: {
    file: 'bundle.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
};
```

* 使用 Rollup `将 CommonJS 规范的代码转换为 ES6 模块规范之后，确实可以进行 Tree Shaking`。Rollup 在设计时就注重支持 ES6 模块，并且具有强大的 Tree Shaking 能力。

3. 手动标记纯函数： 如果你无法迁移到 ES6 模块且使用 Rollup，你可以考虑手动标记纯函数。
通过注释或其他方式，明确告诉编译工具哪些函数是纯函数，可以帮助工具更好地进行代码优化。例如，在Webpack中，你可以使用 Terser 插件的 pure_funcs 选项，手动指定纯函数。


