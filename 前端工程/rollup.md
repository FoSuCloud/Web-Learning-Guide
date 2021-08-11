## 为什么使用rollup
* 对于简单的项目，不需要webpack那么复杂的配置
* webpack会在编译出来的代码中添加很多自己的代码（例如webpackJson[0]），导致代码体积增大

#### [https://github.com/FoSuCloud/rollup-demo/tree/main]("rollup-demo")

## 创建rollup项目（项目初始化）
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
* 注意babel的配置文件位置，官方说法是:`我们将.babelrc.json文件放在src，而不是项目根目录中。这允许我们对.babelrc.json测试之类的事情有不同的看法`

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
* postcss是一个转译css的工具，可以对css进行lint,转换未来的语法等，可以和scss等预处理器一起使用
* [https://webdesign.tutsplus.com/tutorials/using-postcss-together-with-sass-stylus-or-less--cms-24591]("结合文档")

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
* `当对应的端口被其他进程占用了，直接就报错，而没有帮我们去占用下一个端口。。(源码逻辑就这样的)`
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
* `但是注意到rollup-plugin-uglify只能转译es5语法，但是项目会使用es6语法，为了转译简洁，改为使用推荐的tester`
```javascript
const config = require('./rollup.config.js')
const {terser} = require('rollup-plugin-terser')
process.env.NODE_ENV = 'production';

config.output.sourcemap = false;
config.plugins = [
    ...config.plugins,
    terser()
]
module.exports =  config
```
12. 监听文件变化：rollup-watch
* `本来想下载的，但是下载后发现和直接使用-w 一样的效果。。。在github翻译可以看到已经弃用了`
13. 实时刷新页面(热更新)：rollup-plugin-livereload
`热更新原理，看看源码[https://github.com/thgh/rollup-plugin-livereload]("热更新源码")`
* [https://www.cnblogs.com/tugenhua0707/p/8179686.html]("参考")
* 在rollup.config.dev.js修改
```javascript
const livereload = require('rollup-plugin-livereload')
config.plugins = [
    livereload(),
    // 省略
]
```
* `但是现在只能监听到js文件的修改并实时生效，无法监听到scss文件的修改...(因为修改js文件才会重新编译，修改scss文件不会重新编译。。。)`
* `serve和livereloa都需要再看看源码，理清楚原理，看看怎么改进，如果是自己写这种插件的话`

14. 添加别名：@rollup/plugin-alias, [https://github.com/rollup/plugins/tree/master/packages/alias]("git地址有点奇怪")
* `注意，添加了@，但是在编写的时候还是有黄色下划线，警告。但是运行成功`
* 在rollup.config.js添加
```javascript
const alias = require('@rollup/plugin-alias')
const customResolver = nodeResolve({
    extensions: [ '.js', '.ts', '.json', '.scss']
});
alias({
    entries: [
        {
            find: '@',
            replacement: path.resolve(projectRootDir,'..','src')
        },
        {
            find: 'src',
            replacement: path.resolve(projectRootDir,'..','src')
        }
    ],
    customResolver
})
```
```javascript
import {A} from "@/a.ts";
// todo 这里会有警告，因为@还是有问题，但是运行成功。。。
// 并且没法通过点击进入对应的文件
```
15. 在ts文件中使用接口报错，提示no javascript,在网上查找之后找到rollup-plugin-typescript2
* 这是对rollup-plugin-typescript的重写，会比之前的慢一些，试一下是否可以解决接口interface报错问题
* `但是发现了tslib，然后再看一遍rollup-plugin-typescript,找到问题是没有安装tslib`
* 安装tslib,npm run dev，这时不会报错
* `问题解决，暂时不使用rollup-plugin-typescript2（可以打印出语法错误和语义诊断信息）`
* 但是编译速度会变慢？[https://juejin.cn/post/6935762549472231438]

16.rollup-plugin-prettier(格式化，代码美化)
* npm install -D prettier rollup-plugin-prettier
* 在rollup.config.js修改
```javascript
const prettier = require('rollup-plugin-prettier');

prettier({
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    tabWidth: 4,
    arrowParens: 'always'
})
```
* 考虑到prettier部分代码可能很多，所以修改一下,创建一个文件:.prettierrc.js
```javascript
const prettierFile = path.resolve(projectRootDir,'..','.prettierrc.js')
plugins:[prettier(prettierFile)]
```

17. 添加忽略文件
* 首先添加.eslintignore
```markdown
dist/**
node_modules/**
```
* 添加.gitignore,直接使用其他项目的配置文件，把没用的删除就可以了，例如vue.config.js就可以删除

18. 添加lint命令
* 并且需要在dev,build都添加lint，在package.json修改
```json
  "scripts": {
    "dev": "npm run lint && rollup -w -c ./config/rollup.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run lint && rollup -c ./config/rollup.config.prod.js",
    "lint": "eslint --fix --ext .ts,.js src"
  }
```

19. babel-polyfill
* 首先在代码使用Map等新的api,(`babel默认只转换新的js句法,例如class,箭头函数`)
```javascript
// main.js
let map = new Map([['a',1],['name',33]])
console.log(map)
// 打包后的bundle.js
var map = new Map([
    ['a', 1],
    ['name', 33]
]);
console.log(map);
```
* 可以看到打包后还是Map数据结构，并没有进行转换，这样是不行的！因为ie不支持map数据结构
* [https://www.babeljs.cn/docs/babel-polyfill]("官网说明")
* 另外注意babel-polyfill只是针对js的，对于css,html无法进行兼容,所以兼容性还是要考虑，同时css的兼容性是依靠postcss的
---
* `注意：babel官网特意说明，在babel7.4.0之后，@babel/polyfill将被弃用，改为使用core-js和regenerator-runtime实现polyfill`
* 首先安装
`npm install core-js regenerator-runtime -D`
* 在.babelrc.json配置
```json
{
    "presets": [
        [
            "@babel/env",
            {
                "useBuiltIns": "usage", // 按需加载polyfill
                  "corejs": {
                    "version": 2
                  } // 使用3版本不行，默认是2.0
              // [rollup-plugin-prettier] This may take a moment (depends on the size of your bundle)
              // 会卡住
            }
        ]
    ]
}
```
* 可以在bundle.js看到打包后的结果是导入了`'core-js/modules/es6.map.js'`这种的代码， 提供了es6 api的环境
* prettier格式化时间长是因为格式化前后需要进行diff对比，但是修改了配置发现还是会进行对比
`prettier({ cwd: prettierFile, sourcemap: false });// 没用`
* 注意，使用npm run dev之后，回提示警告:`Unresolved dependencies`
* 这是因为我们引入了es6.string.iterator.js，web.dom.iterable.js等文件，但是并没有使用（在rollup看来）

20. 添加浏览器兼容目标
* [https://github.com/browserslist/browserslist#configuring-for-different-environments]("browserslist")
* 在根目录添加一个.browserslistrc文件，babel/pretitter/postcss等工具都会自动去获取浏览器兼容要求
```markdown
>0.25%
not op_mini all
```
* 使用`npx browserslist查询当前项目支持的浏览器版本`

* 怎么打包出多个js,css文件？

* 处理svg, @rollup/plugin-image

* 处理web worker [rollup-plugin-web-worker-loader]("需要？")

* soucemap作用?开发环境需要，作为开发辅助。生产环境不需要，因为不想暴露出去。
* [https://chenshenhai.github.io/rollupjs-note/note/chapter03/02.html]("参考博客")

* es,umd,cjs,life,mjs区别
* [https://github.com/shfshanyue/Daily-Question/issues/475]("模块化")
* 由于兼容性(`ie 不支持es module`) [https://caniuse.com/?search=es%20module]("es module")
* 最后还是选择使用umd

* 生成.bak文件的意义是什么？
