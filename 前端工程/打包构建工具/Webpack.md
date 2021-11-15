## webpack
* 原理：递归地构建

## 使用webpack创建项目
* https://webpack.docschina.org/guides/getting-started/

#### .staging
* `.staging文件夹是下载过程中产生的链接目录，在下载完成后会自动销毁`

#### .cache
* `.cache文件夹是启动之后产生的缓存目录，代码的增量更新也是更新该部分的代码，并且运行状态实际使用的也是该部分的代码`

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

## webpack启动webpack-dev-server
* `如果一个项目只安装了webpack-dev-server`
* 那么想要让index.html的资源路径指向正确，那么一定要配置`publicPath`
```js
const path = require('path');
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // 打包输出路径
        path: path.resolve(__dirname, 'dist'),
        // 虚拟路径,webpack-dev-serve启动index.html引入的资源路径可以为/dist
        // 也就是即使没有执行过npm run build ，但是依旧可以使用该路径，因为只是一个虚拟的！
        // 不一定需要和打包的path一一对应
        // 只要和index.html中的路径对应就可以了！
        // <script src="/assest/bundle.js"></script>
        // 那么publicPath就可以使用assest，这个路径是我们在source控制台看到的目录名称和位置！
        // todo 如果不配置 那么只能获取到404
        publicPath: '/assest'
    },
    devServer: {
        // 静态资源文件夹
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};
```
* index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>init</h1>
    <script src="/assest/bundle.js"></script>
    <script>
        window.init()
    </script>
</body>
</html>

```
