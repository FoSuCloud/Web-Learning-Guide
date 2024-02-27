### loaders
* loaders用于将非JavaScript文件转换为Webpack可以处理的文件，
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

### 使用loaders
1. 配置（推荐）：在 webpack.config.js 文件中指定它们。
2. 内联：在每个 import 语句中显式指定它们。 `不推荐，几乎没看到有用到的，而且总会有问题`

#### 一、Configuration rules loaders
* `module.rules` 允许您在 Webpack 配置中指定多个加载器。
* 这是显示加载程序的简洁方法，有助于保持代码干净。它还为您提供了每个装载机的完整概览。

* 下载loader
* `npm install --save-dev css-loader ts-loader`
* 执行npm run build 得到  编译后的js文件
```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry:{
        index:{
            import: './src/index.ts'
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
};
```

* `加载程序从右到左（或从下到上）进行评估/执行。`
* 执行从 sass-loader 开始，继续使用 css-loader，最后以 style-loader 结束
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

#### 二、inline内联
* `类似于下面例子；但是不可用`
```javascript
import style from 'style-loader!css-loader?modules!./style.css';

console.log('style:',style);
function getComponent():void {
    import('./before.js').then((res)=>{
        console.log(res.add(1,3,5));
    })
    console.log('========');
}

getComponent()
```

#### loaders特点
1. 装载机可以链接。链中的每个加载程序都会将转换应用于已处理的资源。`链以相反的顺序执行`。
* 第一个加载程序将其结果（应用了转换的资源）`传递给下一个加载程序`，
* 依此类推。最后，webpack 期望 JavaScript 由链中的最后一个加载器返回。
2. `加载程序可以是同步的，也可以是异步的。`
3. `loader在Node.js运行，可以在那里做一切可能的事情。`
4. `插件可以为加载器提供更多功能`
5. `加载程序可以发出其他任意文件`
* 加载器提供了一种通过其预处理功能自定义输出的方法。用户现在可以更灵活地包含细粒度逻辑，例如压缩、打包、语言翻译等。

