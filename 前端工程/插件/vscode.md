## 安装
* [参考]("https://github.com/microsoft/vscode/wiki/How-to-Contribute")
* 下载好源码后，yarn install
* `注意如果失败则走下面的步骤`
* 切换到v14版本的node
* git commit xxx; 把vscode切换到14版本的tag
* rm -rf ～/.node-gyp
* 根目录的.yarnrc添加
```text
registry "https://registry.npm.taobao.org"
electron_mirror "https://npm.taobao.org/mirrors/electron/"
vscode-sqlite3_mirror "https://npm.taobao.org/mirrors/vscode-sqlite3/"
playwright_mirror "https://npm.taobao.org/mirrors/playwright/"
vscode-ripgrep_mirror "https://npm.taobao.org/mirrors/vscode-ripgrep/"
husky_mirror "https://npm.taobao.org/mirrors/husky/"
vscode-nsfw_mirror "https://npm.taobao.org/mirrors/vscode-nsfw/"
spdlog_mirror "https://npm.taobao.org/mirrors/spdlog/"
```
* `执行yarn install`
* `貌似是因为mac版本太高了,paylight不支持，所以安装一直错误`

## web调试
* `npm run web`

## vscode-jupyter
* nvm use v12
* npm i
* `npm run open-in-browser`
* `可以打开chrome浏览器，在vscode中安装jupyter插件，打开ipynb文件，然后文件系统就是项目根目录`

## 线上地址
* https://github.dev/github/dev

## 语言拓展插件
* https://code.visualstudio.com/api/language-extensions/overview
* `当python版本不同时，语言拓展的自动补全可能不同。。因为语法等可能会有改变`

