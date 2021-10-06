## rollup
* `rollup天然支持esm，就是基于esm去实现的`

* require的缺点，他是自定义的，动态的，在编译阶段分析不出来，在runtime阶段才能分析出来
* esm在静态ast的时候就可以分析出代码的信息


* 先是esm规范代码 转换为ast得到抽象语法树，然后生成对应的代码

`// rollup实现思路：代码读取 -ast 解析 -生成对应代码`

// github  rollup-plugin查看官方发插件

* rollup.config.js配置external
`external:['vue'] // todo 删除vue这个不想要打包的依赖`
