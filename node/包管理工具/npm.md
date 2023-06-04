## npm install
`npm install --production 表示安装生产依赖`

## npm config edit
* 修改npmrc配置

## npm依赖的解决方案
* 三个解答：
1）cnpm提供 bug-versions,用于安装时忽略问题库
2）patch-package.代码侵入式的修复问题依赖。可以直接改第三方库代码
3）resolution配置。锁定指定配置的版本
但是其实这三种方法都是临时解决方案。最后还是要靠package-lock.json锁定全部依赖！

## npm 的缓存机制
* [参考]("https://blog.csdn.net/qdthn/article/details/122861959")
* `首先查看本地缓存位置 npm config get cache`
* /Users/xxx/.npm
* 然后我们打开该目录可以看到有以下三个目录
* `index-v5,content-v2,tmp`
---
1. `content-v2里面存放的就是一些二进制文件。我们直接点开sha1,或者sha512`
* 然后点击00或者其他目录，继续点开00或者其他目录，知道找到文件
* `然后得到的是一个没有后缀的文件，对文件进行压缩，再进行解压，就可以看到一个文件夹，这个文件夹就是我们缓存的三方库！`
2. `index-v5里面存放的是缓存的三方库的描述性文件（也就是package-lock.json中对应的描述）`
* 例如key，integrity，metadata等。`描述完整性校验(npm以前是使用sha1,现在改为使用sha512)`
3. `tmp意味着临时缓存，是由程序自动生成的。一般是下载没有成功才会生成`
---
#### 缓存机制
* 当执行npm install的时候，首先检查有没有package-lock.json文件，如果没有 lock文件，那么就获取包信息
* 构建依赖树，进行扁平化处理，然后再检查缓存，如果有则`由对应缓存就从content-v2目录下获取对应的二进制文件，解压到node_modules中`
* 然后生产对应lock文件`key和缓存的一致！`，如果没有对应缓存，那么就下载对应依赖包，然后再检查完整性(`sha512`)，然后再保存到缓存中，产生lock文件
---
* 如果由lock文件，那么首先判断lock文件的版本versions是否和package.json的版本一致。然后继续走上面的分支！

## 开发依赖和生产依赖的区别！
* [参考]("https://juejin.cn/post/7031181878380118047")
* 首先我们来看官方文档对于 devDependencies 和 Dependencies 的区别说法
* https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file
* `Dependencies是我们需要用在生产阶段的包`
* `devDependencies是我们只需要用在开发阶段或者测试阶段的包(生产阶段不需要的包)`
---
* `但是如果我们只是执行npm install，那么程序是不会知道我们当前是在哪个阶段的。。所以`
---
1、`production导致的是否安装区别`
* https://docs.npmjs.com/cli/v8/commands/npm-install
* `使用 npm install --production（或者将process.env.NODE_ENV环境变量设置为production时），NPM将不会安装DevDepentencies中列出的模块。`
* 要安装依赖关系和DevDepenties中列出的所有模块时，NODE_ENV环境变量设置为生产，则可以使用-production = false (`其实执行npm install默认就是这样了`)。
---
2、`作为组件的区别`
* `例如antd是一个组件库，我们把这个三方库加载进我们的项目中，我们去查看这个lock.json文件可以看到`
* `在"antd"这个对象里面的requires只有Dependencies对应的三方库，只有生产依赖，也就是我们只需要生产依赖，antd的开发依赖我们是完全不需要的`

### package-lock.json
* requires 和dependencies的区别
* `require 可以被所有其他顶级依赖所共享，而 dependencies 是独立的，只属于需要它的模块`
* 例子
```json
    {
  "antd": {
    "version": "4.19.3",
    "resolved": "/antd/-/antd-4.19.3.tgz",
    "integrity": "sha512==",
    "requires": {
      "@ant-design/colors": "^6.0.0",
      "@ant-design/icons": "^4.7.0",
      "@ant-design/react-slick": "~0.28.1",
      "@babel/runtime": "^7.12.5",
      "@ctrl/tinycolor": "^3.4.0",
      "classnames": "^2.2.6",
      "copy-to-clipboard": "^3.2.0",
      "lodash": "^4.17.21",
      "memoize-one": "^6.0.0",
      "moment": "^2.25.3",
      "rc-cascader": "~3.2.1",
      "rc-checkbox": "~2.3.0",
      "rc-collapse": "~3.1.0",
      "rc-dialog": "~8.6.0",
      "rc-drawer": "~4.4.2",
      "rc-dropdown": "~3.3.2",
      "rc-field-form": "~1.24.0",
      "rc-image": "~5.2.5",
      "rc-input": "~0.0.1-alpha.5",
      "rc-input-number": "~7.3.0",
      "rc-mentions": "~1.6.1",
      "rc-menu": "~9.3.2",
      "rc-motion": "^2.4.4",
      "rc-notification": "~4.5.7",
      "rc-pagination": "~3.1.9",
      "rc-picker": "~2.6.4",
      "rc-progress": "~3.2.1",
      "rc-rate": "~2.9.0",
      "rc-resize-observer": "^1.2.0",
      "rc-select": "~14.0.2",
      "rc-slider": "~10.0.0-alpha.4",
      "rc-steps": "~4.1.0",
      "rc-switch": "~3.2.0",
      "rc-table": "~7.23.0",
      "rc-tabs": "~11.10.0",
      "rc-textarea": "~0.3.0",
      "rc-tooltip": "~5.1.1",
      "rc-tree": "~5.4.3",
      "rc-tree-select": "~5.1.1",
      "rc-trigger": "^5.2.10",
      "rc-upload": "~4.3.0",
      "rc-util": "^5.19.3",
      "scroll-into-view-if-needed": "^2.2.25"
    },
    "dependencies": {
      "memoize-one": {
        "version": "6.0.0",
        "resolved": "https://registry.npmjs.org/memoize-one/-/memoize-one-6.0.0.tgz",
        "integrity": "sha512-+=="
      }
    }
  },
  "memoize-one": {
    "version": "5.2.1",
    "resolved": "/memoize-one/-/memoize-one-5.2.1.tgz",
    "integrity": "sha1-="
  },
  "react-window": {
    "version": "1.8.6",
    "resolved": "/react-window/-/react-window-1.8.6.tgz",
    "integrity": "",
    "requires": {
      "@babel/runtime": "^7.0.0",
      "memoize-one": ">=3.1.1 <6"
    }
  }
}
```
* `例如antd需要的"memoize-one"版本是6.0.0，而"react-window"需要的"memoize-one"小于6.0.0，所以在antd里面，"memoize-one"就是dependencies（不能共享）`

#### .npmignore
* `npm publish发包的时候忽略某些目录或者文件`
* https://docs.npmjs.com/cli/v8/using-npm/developers#testing-whether-your-npmignore-or-files-config-works

### npm钩子函数
* preinstall: 在install之前执行
* postinstall: 在install之后执行
* preuninstall: 在uninstall包卸载之前执行
* postuninstall: 在uninstall包卸载之后执行
* poststop: 在npm stop之后触发
* poststart: 在npm start之后触发
* posttest: 在npm test之后触发

#### postinstall
* `我们有时候会下载失败，就是因为有三方库在下载成功后需要执行postinstall，再去下载一些其他依赖或者执行某些脚本，但是失败导致的`
* 例如electron就会在下载成功后，通过postinstall去下载其他依赖，但是因为网络问题超时失败了

### depcheck
* 检查项目中没有用的依赖 depcheck

#### .npmrc文件的认证信息
* `auth 字段在 npm v7.0.0 中被弃用，并在后续版本中被移除。`
* `从 Node.js v15.0.0 开始，npm v7 已经成为默认的包管理器。`
* //registry.npm.xxx.cn/:_auth 字段是新版本的身份验证字段，
* 与 auth 不同的是它可以支持更复杂的认证方式，例如 token 认证。
  `//registry.npm.xxx.cn/:_authToken=TOKEN_VALUE`

#### & 和 &&
* `& 和 && 都是 shell 中的命令分隔符，用于将多个命令放在同一行中执行`。但是它们之间有一些区别。
* & 表示在后台运行命令，而 `&& 表示只有前一个命令成功执行后才会执行下一个命令。`
