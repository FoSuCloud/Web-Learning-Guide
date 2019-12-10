## 导入web项目
1. 首先打开Mysql创建数据库，然后直接把sql文件拖到相应的数据库进行导入，刷新就能看到
2. 开启tomcat7.0,但是使用cmd的时候，提示JRE_HOME没有设置，导致汤姆猫开启失败
3. `解决方法，添加自定义的JRE_HOME,JAVA_HOME，这样就可以启动了，但是不是长久之计`
4. [参考](https://www.cnblogs.com/lijingran/p/9092212.html)
5. 开启tomcat提示`Unknown system variable 'tx_isolation'这是因为数据库用的是mysql.0,而Java项目使用的是mysql-connect5.7，所以需要更新版本`
6. `并且更新版本之后，Java 使用mysql的相关语法也需要改变！`
7. [参考](https://www.cnblogs.com/alsf/p/9346921.html)
8. 并且还尝试了修改MySQL，但是无效，先记录一下，以防以后出bug,`(https://blog.csdn.net/qq_31615049/article/details/80789884)`

## eclipse没有server配置
1. 根据教程添加[参考](https://www.cnblogs.com/xiaoxiaoweng/p/7298183.html)
2. `但是需要注意，name为版本号，提前查看eclipe的版本`
3. `一直停留在caculating进度条中？？？把Contact all update sites during install to find required software前面的√去掉！`

## eclipse没有web配置
1. [参考](https://blog.csdn.net/xiakexiaohu/article/details/75399735)
2. `提示冲突？试试先disabled之前命名的4.8.0的那个software!`

## 更改了eclipse的maven配置，记录一下
1. 以防后来出bug。。`添加了maven的 User Setting，从c/user/.m2/.setting改为使用d盘新增的maven`

## 不使用java web，改为用SSM框架
1. 虽然javaweb可以用来做后端，但是前后端分离不好做，而且目标是小程序，所以应该前后端分离，所以改为用SSM

## maven build下载失败
1. No goals have been specified for this build. You must specify 
2. `解决办法：在pom.xml的build标签里面加上<defaultGoal>compile</defaultGoal>`
3. [参考](https://blog.csdn.net/huangbaokang/article/details/78621145)

## SSM框架搭建成功！
1. 注意以下几点:
2. `数据库使用的包改为com.mysql.cj.jdbc.Driver`
3. `每次run maven项目都要选择同一个run,不要一次生成一个()...`
4. `targetProject填写为项目名称！！！`

