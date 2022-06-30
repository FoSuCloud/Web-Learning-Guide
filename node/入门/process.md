## process.env设置
1. 可以在.env文件中设置
* 例如：`NODE_ENV=production`
2. 可以在package.json文件中通过不同的命令去配置
* 例如vue源码中，`"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"`
* 就是把`process.env.TARGET设置为了 web-full-dev`
* 后续就可以直接在对应的html,js,vue文件中通过process.env访问对应的变量


