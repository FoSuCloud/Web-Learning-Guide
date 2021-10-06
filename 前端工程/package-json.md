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
  
