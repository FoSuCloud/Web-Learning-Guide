## lerna
* Lerna 是一个快速、现代的构建系统，
* 用于`管理和发布`来自`同一存储库的``多个 JavaScript/TypeScript 包`
* `本地开发的时候，依赖都放在根目录；然后package下面的包被别的包引用了，那么通过软链接指向(lerna做这一步)`

Lerna 主要做三件事
1、为单个包或多个包运行命令 (lerna run)
2、管理依赖项 (lerna bootstrap)
3、发布依赖包，处理版本管理，并生成变更日志 (lerna publish)

Lerna 能解决什么问题？
1、代码共享，调试便捷：`一个依赖包更新，其他依赖此包的包/项目无需安装最新版本，因为 Lerna 自动 Link`
2、安装依赖，减少冗余：`多个包都使用相同版本的依赖包时，Lerna 优先将依赖包安装在根目录`
3、规范版本管理： `Lerna 通过 Git 检测代码变动，自动发版、更新版本号`；两种模式管理多个依赖包的版本号
4、自动生成发版日志：使用插件，根据 Git Commit 记录，自动生成 ChangeLog

### Lerna 工作模式
* Lerna 允许您使用两种模式来管理您的项目：固定模式(Fixed)、独立模式(Independent)

####  固定模式（Locked mode）
* Lerna 把`多个软件包当做一个整体工程`，每次发布所有软件包版本号`统一升级`（版本一致），无论是否修改
* 项目初始化时，lerna init `默认是 Locked mode`

#### 独立模式（Independent mode）
* Lerna 单独管理每个软件包的版本号，每次执行发布指令，Git 检查文件变动，`只发版升级有调整的软件包`
* 项目初始化时，lerna init --independent
* 当满足下面两个条件，可以使用独立模式：
1、`多个包相互独立`：
  当你的项目由多个相互独立的包组成，`每个包有自己独立的版本号时`，可以考虑使用独立模式。在这种情况下，每个包都有自己的版本号，并且可以单独发布。
2、`版本管理需求`：
  `当你希望每个包都有自己独立的版本管理和发布流程时`，独立模式是一个很好的选择。每个包可以根据自己的需求独立进行版本管理和发布，而不会受到其他包的影响。

## 常用指令
#### 初始化：init
* 进入新项目/旧项目，执行命令：`lerna init`
执行后，目录为
```markdown
 - packages(目录)
 - lerna.json(配置文件)
 - package.json(工程描述文件)
```

#### 创建包
* `lerna create package1`
* 会创建packages目录，并在下面创建package1文件夹，这里面是默认的子包内容

####  给 package 添加依赖
* 以前存在一个命令lerna add来添加依赖，但是被移除了
* 现在还是只能给要添加的包一个个添加依赖，也就是在package.json手动添加

#### 使用子包
* 在根目录创建一个js文件
```javascript
const a = require('package1')
console.log('a:',a());
```
* 引入了创建的子包package1
* 执行后发现调用成功了 `a: Hello from package1`
