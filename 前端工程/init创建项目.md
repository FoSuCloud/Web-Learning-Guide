## 为什么使用rollup
* 对于简单的项目，不需要webpack那么复杂的配置
* webpack会在编译出来的代码中添加很多自己的代码（例如webpackJson[0]），导致代码体积增大
* 

## 创建
1. npm init
* 创建package.json文件
2. npm i typescript -D 添加typescript
3. npm install rollup --save-dev 添加rollup
* 在根目录添加一个文件rollup.config.js
```javascript
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    }
};
```
* 在package.json添加命令：  "build": "rollup --config"
4. npm install eslint --save-dev 添加eslint
5. ./node_modules/.bin/eslint --init 生成 eslint配置文件
* 对应的选项要注意，选择brower,esm,typescript
* [https://www.npmjs.com/package/@typescript-eslint/eslint-plugin]("typescript-eslint规则文档参考")
* [https://eslint.org/docs/rules/]("eslint规则文档参考")
6. rollup集成babel等工具
* [https://rollupjs.org/guide/en/#with-npm-packages]("rollup集成其他工具")
* `最后测试导入 the answer库 来判断是否集成完成`
7. rollup安装sass
* npm install rollup-plugin-sass -D
```javascript
// rollup.config.js
import sass from 'rollup-plugin-sass';
// ...
plugins: [ resolve(),sass(),babel({ babelHelpers: 'bundled' }),commonjs() ]
```
* 添加postcss,autoprefixer
```javascript
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// ...
plugins:[
    sass({
        output: 'bundle.css',
        insert: true,
        processor: css => postcss([autoprefixer])
            .process(css)
            .then(result => result.css)
    })
]
```
8. 创建一个ts文件，执行npm run build报错
```javascript
// Unexpected token (Note that you need plugins to import files that are not JavaScript)
// 因为使用了ts的static!
```
* 安装：npm install @rollup/plugin-typescript --save-dev   `rollup的对等依赖项`
* 在rollup.config.js添加
```javascript
import typescript from '@rollup/plugin-typescript';
// ...
plugins: [ resolve(),sass(),typescript(),babel({ babelHelpers: 'bundled' }),commonjs() ]
```
9. 安装运行插件，用于在npm run build的时候可以启动浏览器实现页面渲染
* npm install --save-dev rollup-plugin-serve
```javascript
// rollup.config.js
serve({
            open: true,
            contentBase: 'public',
            host: 'localhost',
            port: 10001,
        })
```
* `由于打包出现路径错误问题，暂时先把css,js输出到public`
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import typescript from '@rollup/plugin-typescript';
import  serve  from  'rollup-plugin-serve'

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        name:'test',
        format: 'umd'
    },
    plugins: [
        serve({
            open: true,
            contentBase: 'public',
            host: 'localhost',
            port: 10001,
        }),
        resolve(),
        sass({
            output: 'public/bundle.css',
            insert: true, // 输出css到index.html的head标签
            processor: css => postcss([autoprefixer])
                .process(css)
                .then(result => result.css)
        }),
        typescript(),
        babel({ babelHelpers: 'bundled' }),
        commonjs() ]
};
```
* 虽然这样是可以，但是存在一个问题！
* `sass中使用了insert把样式插入到head标签中，导致js文件中存在一份样式代码，css文件中也存在一份，冗余了`
---

10. 拆分为dev,build两个命令
* dev: 只生成css,js文件`js文件没有对css文件的引用，需要外部额外通过import引入该css文件`
* build: 在执行dev的配置上添加一个serve配置，并且需要提前写好index.html文件
* `因为使用import/export 方式没有办法设置process(node环境才有) ，所以修改为commonJs规范`
* `注意部分导入需要添加花括号，因为除了export default还有export function,识别有问题`
* `另外注意:dev是运行在public/index.html中，如果省略这部分无法加载bundle.css,bundle.js`
```javascript
// rollup.config.js
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const {babel} = require('@rollup/plugin-babel')
const sass = require('rollup-plugin-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const typescript = require('@rollup/plugin-typescript')

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        name:'bundle',
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        sass({
            output: 'dist/bundle.css',
            // insert: true, // 不要插入head标签，冗余了
            processor: css => postcss([autoprefixer])
                .process(css)
                .then(result => result.css)
        }),
        typescript(),
        babel({ babelHelpers: 'bundled',exclude: '**/node_modules/**' }),
        commonjs() ]
};
```
```javascript
// rollup.config.dev.js
const serve =  require("rollup-plugin-serve")

const config = require('./rollup.config.js')
process.env.NODE_ENV = 'development';

const indexPath = 'public/index.html'
config.plugins = [
    ...config.plugins,
    serve({
        host: 'localhost',
        port: 3000,
        onListening: function (server) {
            const address = server.address()
            const host = address.address === '::' ? 'localhost' : address.address
            // by using a bound function, we can access options as `this`
            const protocol = this.https ? 'https' : 'http'
            console.log(`Server listening at ${protocol}://${host}:${address.port}/${indexPath}`)
        }
    })
]

module.exports =  config
```
```javascript
// rollup.config.prod.js
const config = require('./rollup.config.js')
process.env.NODE_ENV = 'production';

config.output.sourcemap = false;
config.plugins = [
    ...config.plugins
]
module.exports =  config
```
11. 编译代码混淆插件：rollup-plugin-uglify
* npm i rollup-plugin-uglify --dev
* 在rollup.config.prod.js修改
```javascript
const { uglify } = require('rollup-plugin-uglify');
config.plugins = [
    ...config.plugins,
    uglify({sourcemap:false})
]
```

* 改变port,切换为下一个port
`http://localhost:3000 is in use, either stop the other server or use a different port.`

* 监听文件变化：rollup-watch
* 开启本地服务：rollup-plugin-serve
* 实时刷新页面：rollup-plugin-livereload
* [https://www.cnblogs.com/tugenhua0707/p/8179686.html]("参考")

* es,umd,cjs,life区别
* [https://github.com/shfshanyue/Daily-Question/issues/475]("模块化")
* 由于兼容性(`ie 不支持es module`) [https://caniuse.com/?search=es%20module]("es module")
* 最后还是选择使用umd

* 

* [https://chenshenhai.github.io/rollupjs-note/note/chapter03/02.html]("参考博客")
