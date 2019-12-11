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

## SSM各类注解
1. [参考](https://blog.csdn.net/yuexianchang/article/details/53352246)

## eclipse文档注释(生成作者) 使用art shift j

## 单独使用Mybatis
1. 导入必须包
* 导入mybatis.jar核心包，mysql8.0.13数据库包，还有lib包，导入到WEB-INF文件夹下面
* 创建一个和src同级的文件夹config,放置log4j.properties配置文件(自己百度标准版配置)
* 其中log4j.properties文件中的`log4j.appender.File.File是设置Log日志文件存放位置`
* 配置日志路径参考`[参考](https://blog.csdn.net/rugaxm/article/details/17915371)`
2. 建立数据库和表
```
首先打开navicat 新建库ssm
然后在查询中输入
create table t_customer(
	id int primary key auto_increment,
	name varchar(20),
	gender char(1),
	telephone varchar(20),
	address varchar(50)
);
创建表
```
3. 建立实体类
```
首先在src目录下点击创建other,选择class,但是需要先写包名再写类名
不要创建在resource目录下
	private Integer id;
	private String name;
	private String gender;
	private String telephone;
	private String address;
	
	注意！在上方的source点击generate getter and setter可以生成get和set方法！
```
4. 建立Mapper接口
```
创建一个com.ssm.dao文件夹，创建一个CusomerMapper 接口文件！接口interface

public interface CustomerMapper {
//	添加客户
	public void saveCustomer(Customer customer);
}

```
5. 建立sql映射文件
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 该文件是给mybatis中的mapper接口编写方法的 ,也即是提供对应的sql语句-->
<!--namespace表示的该xml sql映射文件所对应的接口路径，也就是包名+类名  -->
<mapper namespace="com.ssm.dao.CustomerMapper">
    <!-- 添加客户,方法名就是语句的id -->
    <!-- parameterType也就是该sql语句所用到的条件，也就是对应的接口文件的对应的方法所用的参数实例的类 -->
    <insert id="saveCustomer" parameterType="com.ssm.domain.Customer">
        insert into t_customer(
			id,
			name,
			gender,
			telephone,
			address
		)values(
			#{id},
			#{name},
			#{gender},
			#{telephone},
			#{address}
		)
    </insert>
</mapper>
```
6. 建立sqlMapConfig.xml文件(mybatis核心配置)
```
<?xml version="1.0" encoding="UTF-8"?>
<!-- 引入约束 -->
<!DOCTYPE configuration  
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"  
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
  
<configuration>

　　<properties/> <!--配置属性信息--->

　　<setting/>      <!--设置-mybatis 运行参数-->

　　<typeAliases /><!--类型命名 别名-->

　　<typeHandlers/><!--类型处理器--->

　　<objectFactory/><!--对象工厂-->

　　<plugins/>          <!--插件--->
<!-- 和spring整合后environments将被废置 -->
　　<environments default="development">  <!--配置环境-->

　　　　<environment id="development"><!--环境变量-->

　　　　　　<transactionManager type="JDBC"/><!--事务管理器-->
				
			   <dataSource type="POOLED">
				    <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
				    <prperty name="url" value="jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8" />
				    <property name="username" value="root"/>
				    <property name="password" value="123456"/>
　　　　　　　　<dataSource /><!--数据源-->

　　　　</environment>

　　</environments>

　　<databaseIdProvider/><!--数据库厂商标识-->

<!-- 扫描sql映射文件 -->
	<mappers>
	    <mapper resource="mapper/CustomerMapper.xml"/>
　　<mappers/><!--映射器-->
</configuration>

```
* `注意:执行顺序是先执行sqlMapConfig.xml，在这里连接到数据库，扫描到CustomerMapper.xml sql映射文件`
* `sql映射文件会指向所用到的类所在的路径，然后不同的语句也是指向该类的不同方法`
* `当该方法执行了，那么就会逆着顺序去执行sql操作！`
7. 编写测试类