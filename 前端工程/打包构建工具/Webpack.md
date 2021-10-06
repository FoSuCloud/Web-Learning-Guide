## webpack
* 原理：递归地构建

## loader和plugins的区别
* loader是转换文件格式的工具
* plugins是可以执行其他功能的插件,`拓展webpack的能力`

`webpack相当于一条流水线，在编译执行等不同的阶段会抛出不同的事件 插件根据抛出的这些钩子完成不同的动作`

## 打包原理
* [参考]("https://github.com/cuixiaorui/mini-pack")

代码拆分 splitChunks
两个文件用到的同样的库打包两次？改为只打包一个,例如a.js和b.js都用到了loadsh

多入口，main.js , another.js

懒加载("动态加载")`和按需引入不一样`
* 懒加载就是动态加载，也就是需要该部分代码文件再加载进入

* 按需引入是我们使用第三方库的时候就只引入需要的部分

* webpackChunkName配置打包之后的文件名称

[comment]: <> (htmlwebpackplugin自动生成html)

                // css -> js
                // loader(css-loader style-loader)
                // 还需要style-loader这个转换器
                // 从后往前执行。 前面的输出就是后面的输入
                // 转换流程： source-> css-loader -> style-loader -> webpack

任务：
1. 支持css的解析
2. 支持parse5的解析
3. 当调用yarn dev可以起到一个服务器来辅助开发
4. 自动清理dist
5. 自动生成html
6. `user.js 可以懒加载`
