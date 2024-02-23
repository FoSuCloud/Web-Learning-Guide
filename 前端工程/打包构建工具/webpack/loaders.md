### loaders
* loaders用于将非JavaScript文件转换为Webpack可以处理的模块，
* 例如 将CSS、图片、字体等文件转换为JavaScript模块。
* loaders处理这些文件时可以在编译过程中进行预处理，例如将CSS文件中的样式转换为JS对象，或是压缩图片等。

* `文件转换器。例如把es6转为es5，scss转为css等`

* 概括地说，加载器在 webpack 配置中有两个属性：
1. 该 test 属性标识应转换的一个或多个文件。
2. 该 use 属性指示应使用哪个加载程序进行转换。
* 在下面例子的作用类似于： 
* 嘿 webpack 编译器，当你遇到一个路径，该路径解析为 require() / import 语句中的'.txt'文件时，请在将其添加到捆绑包之前使用 raw-loader 对其进行转换。
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```


