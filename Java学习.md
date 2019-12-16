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
```
package com.ssm.test;

import java.io.InputStream;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import com.ssm.dao.CustomerMapper;
import com.ssm.domain.Customer;

public class Mybatis {
	/**
	 * 创建测试类
	 */
	@Test
	public void test() throws Exception{
//		创建sql工厂实例的构造器
		SqlSessionFactoryBuilder builder=new SqlSessionFactoryBuilder();
//		加载sqlMapconfig.xml文件
		InputStream is=Resources.getResourceAsStream("mapper/SqlMapConfig.xml");
//		创建sql工厂实例
		
		SqlSessionFactory factory=builder.build(is);
//		打开sqlSession
		SqlSession sqlsession=factory.openSession();
//		获取Mapper接口的对象
		CustomerMapper customermapper= sqlsession.getMapper(CustomerMapper.class);
//		操作
		Customer customer=new Customer();

		customer.setName("张三");
		customer.setGender("男");
		customer.setTelephone("134546865");
		customer.setAddress("北京路");
//		保存该customer对象
		customermapper.saveCustomer(customer);
		
//		提交事务
		sqlsession.commit();
//		关闭资源
		sqlsession.close();
	}
}
需要注意的是，sqlMapConfig.xml配置文件
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<!-- mybatis初始化环境的配置，可以配置多个环境 spring tools suit -->
<environments default="development">
<!-- 配置当前自己的运行环境 -->
<environment id="development">
<!-- jdbc事务，Mybatis负责管理 -->
<transactionManager type="JDBC"/>
<!-- jdbc数据源，Mybatis进行管理 -->
<dataSource type="POOLED">
<property name="driver" value="com.mysql.cj.jdbc.Driver"/>
<property name="url" value="jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8"/>
<property name="username" value="root"/>
<property name="password" value="123456"/>
</dataSource>
</environment>
</environments>
<mappers>
<mapper resource="mapper/CustomerMapper.xml"/>
</mappers>
</configuration>

```
* `Error setting driver on UnpooledDataSource. Cause: java.lang.ClassNotFoundException: Cannot find class: com.mysql.cj.jdbc.driver`
* `虽然在lib中导入了该包。。但是好像找不到，还是要通过library导入，在referenced library中显示才有效！`
* `经过测试，不需要在webapp/WEB_INF中加入lib..这个文件夹的包并没有被用到，直接删除吧！`

## Mybatis整合Spring
1. `有Mapper实现类`
2. 没有Mapper实现类
3. `现在使用的，最好用的，就是去扫描类`
4. 但是需要先从第一种开始做起

## Mybatis整合Spring(有Mapper接口)
1. 导入必须包
* 把包导入到reference library中
2. 编写mapper实现类
* 首先创建一个包com.ssm.dao.impl,再创建一个类CustomerMapperimpl,继承接口CustomerMapper
```
package com.ssm.dao.impl;
import com.ssm.dao.CustomerMapper;
import com.ssm.domain.Customer;
public class CustomerMapperImpl implements CustomerMapper {
	public void saveCustomer(Customer customer) {
		// TODO Auto-generated method stub
	}
}
```
* 在创建的时候，选择好接口就出现上面的初始代码
3. 编写applicationContext.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    	http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx.xsd
        ">

	<!-- 读取jdbc.properties -->
	<context:property-placeholder location="classpath:jdbc.properties"/>
	
	<!-- 创建DataSource -->
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
	    <property name="url" value="${jdbc.url}"/>
	    <property name="username" value="${jdbc.username}"/>
	    <property name="password" value="${jdbc.password}"/>
	    <property name="driverClassName" value="${jdbc.driverClass}"/>
	     <property name="maxActive" value="10"/>
	     <property name="maxIdle" value="5"/>
	</bean>
	<!-- 创建sqlSessionFactory对象 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	    <!-- 关联连接池 -->
	    <property name="dataSource" ref="dataSource"/>
	    <!-- 加载sql映射文件,注意classpath在此为src.main.java --> 
	    <property name="mapperLocations" value="classpath:mapper/*.xml"/>
	</bean>
	<!-- 创建CustomerMapperImpl对象，注入sqlSessionFactory -->
	<bean id="customerMapper" class="com.ssm.dao.impl.CustomerMapperImpl">
	    <!-- 关联sqlSessionFactory -->
	    <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
	</bean>
</beans>
```
4. 编写测试类
```
package com.ssm.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ssm.dao.CustomerMapper;
import com.ssm.domain.Customer;

public class Mybatis_Spring {
	@Test
	public void test() {
//		加载spring配置
		ApplicationContext ac=new ClassPathXmlApplicationContext("config/applicationContext.xml");
//		获取对象
		CustomerMapper customermapper=(CustomerMapper)ac.getBean("customerMapper");
		
//		调用方法
		Customer customer=new Customer();
		customer.setName("李四");
		customer.setGender("男");
		customer.setTelephone("904546865");
		customer.setAddress("天津路");
		customermapper.saveCustomer(customer);
	}
}

```

## WARN No appenders could be found for logger 
1. `解决方法，把log4j.prperties文件放到src/main/resource文件夹下`

## 近几天的错误总结。。
1. `ssm框架有两种风格，用maven/javaweb,我选择了maven,便于jar包管理；但是如果用的IDE是idea的话，那么构建方式又不同了`
2. `选择maven的话，首先就要理清步骤，两种方式乱了！以后不要再乱了`
3. `首先new>maven project>设置group id和activity id最好保持一致！；然后finish`
4. `maven项目的优点在于，需要导入的jar包都放在pom.xml中写好了依赖，然后会有一个maven libraries`
5. `写好src文件夹下的代码后，如果有test类，就juit test一下，可以看看错误`
6. `测试完了就要使用 maven build再次测试一下？或者直接maven install也可以，生成 .war文件`
7. `把.war文件移动到tomcat的webapps目录下，然后解压，最后Tomcat输入startup.bat就可以运行项目了！`
---
* maven项目和javaweb项目是不一样的，`maven项目一开始是没有run server的maven项目一开始是没有run server的`

## jdbc错误
1. `jdbc:mysql://localhost:3306/ssm?useSSL=false&amp;serverTimezone = GMT&amp;useUnicode=true&amp;characterEncoding=UTF-8`
2. 上面是一条比较好的数据库连接方式，考虑到了时区。ssl.`注意，amp; 不一定需要有，如果报错说缺少;才加`
3. `PASSWORD YES???密码没错，但是还是提示错误？不要使用root用户，会提示密码错误。。新建一个用户`
4. `还有可能是空格，使用向右箭头检查，或者没设置编码`
5. 版本是8.0.11左右就要用`com.mysql.cj.jdbc.Driver而不是com.mysql.jdbc.Driver`

## JRE错误
1. `每次maven install失败都看看是不是用了jre,要使用jdk18!`

## ibatis错误
1. `ibatis和mybatis可能会有冲突，所以去掉了ibatis包`
2. `如果不冲突还报错，可能就是版本不一致`

## 设置跨域
```
pom.xml
<!-- 跨域支持-->
<dependency>
    <groupId>com.thetransactioncompany</groupId>
    <artifactId>cors-filter</artifactId>
    <version>2.5</version>
</dependency>

web.xml
<!--  提供跨域支持 -->
<filter>
    <filter-name>CORS</filter-name>
    <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
    <init-param>
        <param-name>cors.allowOrigin</param-name>   <!--配置授信的白名单的域名！ -->
        <param-value>*</param-value>
    </init-param>
    <init-param>
        <param-name>cors.supportedMethods</param-name>
        <param-value>GET, POST, HEAD, PUT, DELETE</param-value>
    </init-param>
    <init-param>
        <param-name>cors.supportedHeaders</param-name>
        <param-value>Accept, Origin, X-Requested-With, Content-Type, Last-Modified</param-value>
    </init-param>
    <init-param>
        <param-name>cors.exposedHeaders</param-name>
        <param-value>Set-Cookie</param-value>
    </init-param>
    <init-param>
        <param-name>cors.supportsCredentials</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CORS</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
* [参考](https://blog.csdn.net/Hack_Different/article/details/88637281)
* 如果还是有问题，那么可能是返回的数据不是json,而是html,jsp这种

## json依赖配置
```
pom.xml
	<!-- json依赖 -->
	<dependency>
		<groupId>net.sf.json-lib</groupId>
		<artifactId>json-lib</artifactId>
		<classifier>jdk15</classifier>
		<version>2.4</version>
	</dependency>
	
	<dependency>
		<groupId>org.apache.commons</groupId>
		<artifactId>commons-lang3</artifactId>
		<version>3.1</version>
	</dependency>
	
	<dependency>
		<groupId>commons-beanutils</groupId>
		<artifactId>commons-beanutils</artifactId>
		<version>1.8.3</version>
	</dependency>
	
	<dependency>
		<groupId>commons-logging</groupId>
		<artifactId>commons-logging</artifactId>
		<version>1.1.1</version>
	</dependency>
	
	<dependency>
		<groupId>commons-collections</groupId>
		<artifactId>commons-collections</artifactId>
		<version>3.2.1</version>
	</dependency>

	<dependency>
		<groupId>net.sf.ezmorph</groupId>
		<artifactId>ezmorph</artifactId>
		<version>1.0.6</version>
	</dependency>
```
* `需要注意，第一个包的版本较低，不能被找到，提示missing,所以改为下面这样使用编译后的版本`
```
<dependency>
		<groupId>net.sf.json-lib</groupId>
		<artifactId>json-lib</artifactId>
		<classifier>jdk15</classifier>
		<version>2.4</version>
	</dependency>
```
* [参考](https://blog.csdn.net/duanjw1988/article/details/53411458)

## 本地编辑jsp出错？
1. `javax.servlet.jsp.JspException cannot be resolved to a type`
2. `这是因为缺少两个包，分别是一个是jsp-api.jar，一个是servlet-api.jar`
3. 导入就好了，但是这两个包在tomcat的libs目录下同样存在，所以需要设置仅在测试和编译阶段使用
4. [参考](https://blog.csdn.net/weisubao/article/details/72763249)

## 项目在tomcat部署后包冲突
1. `这是因为在本地测试和编译阶段有些包导入了，但是这些包在Tomcat的libs目录下同样存在`
2. `然后发布到tomcat后就会因为包冲突导致出错！`
3. 解决方法:`在pom.xml中设为`
```
<dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.0</version>
            <scope>provided</scope>
        </dependency>
```
* `注意清除项目和更新项目（对于maven）`

## 如果前端发送给服务器的数据乱码
1. 这是因为使用了ISO编码的原因，可以在web.xml中配置编码过滤器！
```
<!-- utf8编码过滤器 -->
	<filter>
	    <filter-name>CharacterEncodingFilter</filter-name>
	    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
	    <init-param>
	        <param-name>encoding</param-name>   <!--配置授信的白名单的域名！ -->
	        <param-value>utf-8</param-value>
	    </init-param>
	</filter>
	<filter-mapping>
	    <filter-name>CharacterEncodingFilter</filter-name>
	    <url-pattern>/*</url-pattern>
	</filter-mapping>
```

## 404问题找到啦！！！(能访问tomcat首页，但是却访问不了项目)
1. `极有可能是因为使用struts2错误`
2. 使用方法：
```
1.首先在pom.xml导入
	<!--struts2整合spring的插件包 -->  
    <dependency>  
        <groupId>org.apache.struts</groupId>  
        <artifactId>struts2-spring-plugin</artifactId>  
        <version>2.5-BETA3</version>  
    </dependency> 
	
2. 在web.xml设置过滤器
<!-- 去除.action后缀名 -->
	<filter>  
        <filter-name>struts2</filter-name>  
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>  
    </filter>  
    <filter-mapping>  
        <filter-name>struts2</filter-name>  
        <url-pattern>/*</url-pattern>  
    </filter-mapping>  

```
* [参考](https://blog.csdn.net/bwh0520/article/details/78786918)