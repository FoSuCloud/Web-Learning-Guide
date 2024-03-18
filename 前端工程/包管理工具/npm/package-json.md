## 版本控制符号
1. ^插入符号：`会把当前库的版本更新到最新的版本，但是不会更改第一位数字的版本`
* 例如 vue:"^2.3.3",最多升级到2.xxx.xx;而不会升级到vue3!
2. ~波浪符号：只会更改到最后一位数字的最新版本， 
* 例如 vue:"~2.3.4", 最多升级到2.3.xx,而不会升级到vue2.4.xx

### engines
* engines指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。
* 该字段也可以指定适用的npm版本。

### workspaces
* package.json 中的 workspaces 字段用于`定义一个多包存储库（multi-package repository）`。
* 这是一个包含多个相关的 npm 包的项目，`这些包可能在同一个存储库中进行版本管理`，协同开发或共享代码。
* 通过指定 workspaces，你可以将这些包组织在一起，以便于在它们之间共享依赖、执行脚本或者进行版本控制。

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
* 然后添加resolutions，执行 npm run preinstall
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


### 7. commit规范
* commit格式 <type>(<scope>): <subject>
* 类型(type)：
* feat: 新功能、新特性；
* fix: 修改 bug；
* perf: 更改代码，以提高性能；
* refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）;
* docs: 文档修改；
* style: 代码格式修改, 注意不是 css 修改（例如分号修改）；
* test: 测试用例新增、修改;
* build: 影响项目构建或依赖项修改；
* revert: 恢复上一次提交；
* ci: 持续集成相关文件修改；
* chore: 其他修改（不在上述类型中的修改）;
* release: 发布新版本;
* workflow: 工作流相关文件修改
* 如：
```
feat(抽样任务): 列表添加人员列
```
`注意：type冒号之后需要一个空格`
* [rules]("https://commitlint.js.org/#/reference-rules?id=type-enum")

## stylelint
* stylelint 检查样式格式并修复
