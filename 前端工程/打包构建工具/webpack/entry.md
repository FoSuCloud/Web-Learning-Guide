## entry
* entry可以是多入口，也就是数组，或者对象
* 下面是多入口，单出口，表示打包到同一个文件bundle.js
```javascript
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```
* 多入口，多文件是下面这样,打包结果是file_1_bundle.js，file_2_bundle.js
```javascript
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
  },
};
```

### entry入口点对象
* dependOn ：当前入口点所依赖的入口点。`在加载此入口点之前，必须加载它们`。
* filename ：指定磁盘上每个输出文件的名称。
* import ：`启动时加载的模块`。
* library ：指定库选项以从当前条目捆绑库。
* runtime ：运行时区块的名称。设置后，将创建一个新的运行时区块。它可以设置为 false 避免自 webpack 5.43.0 以来出现新的运行时块。
* publicPath ：在浏览器中引用此条目的输出文件时，`为这些文件指定公共 URL 地址`。另请参阅 output.publicPath。
  
* 看个例子
```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry:{
        before: './src/before.js', // 只是为了被index入口提前加载才添加的
        index:{
            dependOn: 'before', // 使用入口名称即可
            import: './src/index.js'
        },
        other:'./src/other.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

### 分离应用和三方库
```javascript
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
};
```
* 这种配置一般用于 Webpack 打包时分离应用代码和第三方库代码的场景，常见于生产环境的构建配置中。
* vendor: './src/vendor.js'：第三方库的入口文件。这个入口点用于打包第三方库，例如 React、jQuery 等。将第三方库与应用程序的代码分离开来，有助于缩小主应用程序的体积，并利用浏览器的缓存机制，提高页面加载速度。

#### 多页应用程序
* 根据经验：对每个 HTML 文档只使用一个入口点
* 多页应用程序则多个入口点

