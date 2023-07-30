## maven
* maven是java的项目构建工具,`类似js的webpack`
* [入门]("https://juejin.cn/post/7051407711308627981")
* ant是java的另一个项目构建工具

## pom.xml
* groupId：公司或者是组织的id
* packaging：项目打包的类型，默认是 jar。一般 java 程序打包成 jar，web 程序打包成 war。
* version：项目的版本号，通常使用三位数字标识，例如 2.2.5。如果项目还在开发中，通常在版本后加上 SNAPSHOT。如果项目很稳定，已经发布，一般会在版本后加上 RELEASE。

## gradle
* gradle是和maven对应的另一种构建工具

#### 从官方制品库下载依赖
* `mvn dependency:get` 命令是用来`获取依赖项的 POM 文件`，并不用于下载实际的依赖 JAR 文件。
* `mvn dependency:get -Dartifact=io.kubernetes:client-java:10.0.0 -DremoteRepositories=https://repo.maven.apache.org/maven2/`
* 从官方制品库下载io.kubernetes:client-java:10.0.0

* `-Dartifact=groupId:artifactId:version`
