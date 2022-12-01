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

