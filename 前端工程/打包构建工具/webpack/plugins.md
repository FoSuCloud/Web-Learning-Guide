### plugins
* plugins则用于在Webpack编译过程中执行一些额外的任务，
* 例如压缩、合并、优化代码、环境变量的注入等。
* `plugins可以在Webpack运行过程中访问到整个编译过程，`
* 可以获取到所有模块和chunks的构建状态，从而进行更加精细的控制和操作。

#### 例如压缩插件
```javascript
new TerserPlugin({
                    minify: terserMinimizer,
                    sourceMap: shouldUseSourceMap
                })
```

#### html-webpack-plugin
* 在上面的示例中，为 html-webpack-plugin 应用程序生成一个 HTML 文件，并自动将所有生成的捆绑包注入到此文件中。
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
