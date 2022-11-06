## 版本控制符号
1. ^插入符号：`会把当前库的版本更新到最新的版本，但是不会更改第一位数字的版本`
* 例如 vue:"^2.3.3",最多升级到2.xxx.xx;而不会升级到vue3!
2. ~波浪符号：只会更改到最后一位数字的最新版本， 
* 例如 vue:"~2.3.4", 最多升级到2.3.xx,而不会升级到vue2.4.xx

### engines
* engines指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。
* 该字段也可以指定适用的npm版本。

## 生成美化的readme.md文件
*  npx readme-md-generator

## package.json配置"type": "module"
* `让js文件中也可以使用esm规范！也就是可以import fs from "fs""`
* // todo: package.json添加，"type": "module"；否则fs无法使用esm
  
## publishConfig
* 配置发布的配置信息
* registry:NPM注册表的基本URL。
```json
  "publishConfig": {
    "registry": "https://af-biz.qianxin-inc.cn/artifactory/api/npm/data-security-npm-local-dev/"
  }
```

## 解决安全漏洞-更新嵌套依赖项
1. scripts添加命令 preinstall
```
"scripts": {
  "preinstall": "npx npm-force-resolutions"
}
```
2. preinstall会去寻找Package.json中的resolutions强制依赖版本项,如
```
"resolutions": {
  "hoek": "4.2.1"
}
```
* resolutions会去修改package-lock.json文件以强制安装特定版本的依赖传递
3. 最后再npm install
4. 顺序
* 首先应该删除resolutions，然后npm i ;用于生成package-lock.json文件
* 然后添加resolutions，执行npm preinstall
* 最后再执行一次npm i

## 打补丁-修改三方插件
* `yarn和npm可以使用patch-package去修改三方插件代码！！！`
1. 首先在项目中打开需要修改的node_module里面的项目，进行修改。如：
`const a=1; => const a=2;` 
2. 在项目中安装patch-package `npm i patch-package -D`
3. `把patch-package绑定到安装命令上，每次安装依赖后都会执行该插件`
`"script":{"postinstall": "patch-package"}`
4. `最重要的一步：打补丁 npx patch-package xxx; xxx是要修改的三方插件名称。打完补丁后，会生成一个patches目录，下面记录了对应的patch修改`
5. `另外需要注意。需要修改的三方插件需要固定版本，因为patch是针对特定版本进行更改的！ 如："core-js": "3.6.5"`
6. `删除node_nodule,重新安装`
7. `安装成功后，查看对应的三方插件代码。如果是 const a=2; 那么就成功了。`


