## process
```javascript
        // return process.env // 环境变量对象
        // return process.version // node版本信息
        // return process.argv
        /*
        // 注意: process.argv返回的是一个数组(包括启动node进程时传入的命令行参数)
        // 第一个参数是process.execPath。如果要访问argv[0]的原始值，那么要使用argv0
        // 第二个元素是正在执行的JS文件的路径。剩余参数才是命令行参数
        */
```


## process.env设置
1. 可以在.env文件中设置
* 例如：`NODE_ENV=production`
2. 可以在package.json文件中通过不同的命令去配置
* 例如vue源码中，`"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"`
* 就是把`process.env.TARGET设置为了 web-full-dev`
* 后续就可以直接在对应的html,js,vue文件中通过process.env访问对应的变量


