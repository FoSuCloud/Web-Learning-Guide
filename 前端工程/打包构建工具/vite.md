## vite
* `基于rollup，vite是基于rollup的拓展！`,
* `使用了esbuild，但是用在开发时（包引入的时候），而不是生产时！`
`利用了esm的红利,现代浏览器天然支持esm规范`

webpack只要有一个文件改变了，全部文件都要改变，重新打包
webpack打包的过程较慢，在大型项目

`vite最大的优点就是在开发环境启动速度快！`
vite -> 缓存机制（空间换时间的方式）

#### commonjs 预编译为esm
* node_modules 下的文件有的包是 commonjs 的，并且可能有很多个模块，这时 vite 做了预构建也叫 deps optimize。
* 它用 esbuild 分析依赖，然后用 esbuild 打包成 esm 的包之后输出到 `node_modules/.vite` 下，
* 并生成了一个 metadata.json 来记录 hash。

#### chokidar 监听文件改变，做热更新

