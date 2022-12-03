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


