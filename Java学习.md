## 导入web项目
1. 首先打开Mysql创建数据库，然后直接把sql文件拖到相应的数据库进行导入，刷新就能看到
2. 开启tomcat7.0,但是使用cmd的时候，提示JRE_HOME没有设置，导致汤姆猫开启失败
3. `解决方法，添加自定义的JRE_HOME,JAVA_HOME，这样就可以启动了，但是不是长久之计`
4. [参考](https://www.cnblogs.com/lijingran/p/9092212.html)
5. 开启tomcat提示`Unknown system variable 'tx_isolation'这是因为数据库用的是mysql.0,而Java项目使用的是mysql-connect5.7，所以需要更新版本`
6. `并且更新版本之后，Java 使用mysql的相关语法也需要改变！`
7. [参考](https://www.cnblogs.com/alsf/p/9346921.html)
8. 并且还尝试了修改MySQL，但是无效，先记录一下，以防以后出bug,`(https://blog.csdn.net/qq_31615049/article/details/80789884)`
