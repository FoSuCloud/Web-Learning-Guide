## pom.xml
* `pom.xml包含此项目的项目对象模型 (POM)`
* `POM 是 Maven 中的基本工作单元`
* `因为 Maven 本质上是以项目为中心的，因为一切都围绕着项目的概念。简而言之，POM 包含关于您的项目的所有重要信息`

#### 看一个初始pom.xml配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.0.4</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>spring-demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>demo</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
```
* project是所有 Maven pom.xml 文件中的顶级元素。
* modelVersion：指定 POM 模型的版本，固定为 4.0.0。
* parent：`定义了该项目的父级 Maven 项目的坐标（groupId、artifactId、version），表示该项目继承了父项目的配置。`
* `<relativePath/>元素指定了子模块 POM 文件相对于父模块 POM 文件的相对路径。如果子模块 POM 文件与父模块 POM 文件位于同一目录下，则可以省略该元素。`
  如果子模块 POM 文件位于父模块的子目录下，则需要指定该元素的值为相对路径，例如：
```xml
<parent>
  <groupId>com.example</groupId>
  <artifactId>parent</artifactId>
  <version>1.0.0</version>
  <relativePath>../child/pom.xml</relativePath>
</parent>
```
* groupId：定义了该项目的组织或者公司的唯一标识符。
* artifactId：定义了该项目的名称或者项目模块的名称。
* version：定义了该项目的版本号。
* name：定义了该项目的名称。
* description：定义了该项目的描述信息。
* properties：定义了该项目的一些属性，可以在项目中引用这些属性。
* dependencies：定义了该项目的依赖项，包括依赖的库和版本号等信息。
* build：`定义了项目的构建配置，包括插件和目标等信息。`
* plugins：定义了该项目所需要的 Maven 插件，例如用于构建、打包和发布项目的插件。

* `spring-boot-starter-parent是一个 Spring Boot 的父级 Maven 项目，它提供了一些默认的配置和依赖项，使得 Spring Boot 项目的构建变得更加简单。`
* `spring-boot-starter-web 是 Spring Boot 的 Web Starter，包含了一些常用的 Web 应用程序开发框架，例如 Spring MVC、Tomcat 等。`
* `spring-boot-starter-test 是 Spring Boot 的测试 Starter，包含了一些常用的测试框架，例如 JUnit、Mockito 等。`
* `spring-boot-maven-plugin 是 Spring Boot 的 Maven 插件，可以将 Spring Boot 应用程序打包为可执行的 JAR 文件，方便部署和运行。`

#### properties
* 在 Maven 项目中，可以使用 properties 标签来定义属性，这些属性可以在 POM 文件中的其他地方使用，例如 dependency 标签、build 标签等。
* 通常，`properties 标签用于指定某些依赖的版本、项目的源代码目录、Java 编译器版本等。`
* `在项目中，可以通过 ${propertyName} 的方式来引用定义的属性`
```xml
<properties>
    <project.version>1.0.0</project.version>
    <java.version>1.8</java.version>
</properties>

<!-- 在 dependency 中使用定义的属性 -->
<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>example</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>

<!-- 在 build 中使用定义的属性 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>${java.version}</source>
                <target>${java.version}</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```
* 还可以在别的地方用到properties的变量
1. `在 pom.xml 中的其他地方，如 dependencies 中使用变量定义版本号等。`
2. `在应用程序代码中使用变量`，可以通过 Maven Resource 插件将变量值注入到代码中。例如，在 Java 代码中可以使用 System.getProperty("java.version") 获取 Java 版本，
* 如果在 pom.xml 中定义了一个 java.version 属性，则该属性值可以在代码中使用。
3. `在其他 Maven 插件中使用变量`。例如，在 Maven 编译插件中，可以使用 ${project.build.outputDirectory} 来引用生成的 class 文件的目录。


#### packaging
* 在 Maven 中，packaging 是一个 POM（Project Object Model，项目对象模型） 的元素，`用于指定项目应该如何打包。`
  * 常见的 packaging 类型包括：
  jar：用于打包 Java 项目生成 JAR 文件。 `默认情况下，Maven 会将项目打包成 jar 文件`
  war：用于打包 Web 项目生成 WAR 文件。
  ear：用于打包 Enterprise 应用程序，生成 EAR 文件。
  pom：`用于定义父项目或聚合项目，没有实际的构建产物。`

* `如果一个项目不需要进行打包或构建（比如聚合项目或父项目），则可以使用 packaging 类型为 pom。这样 Maven 会将项目作为一个纯元素进行处理，而不进行构建或打包。`

#### dependencyManagement
* dependencyManagement 元素是 Maven POM 文件中的一个特殊元素，`用于管理项目中所有依赖项的版本号。`
* 在一个大型项目中，可能有很多模块和子模块，每个模块都有许多依赖项。
* 使用 dependencyManagement 可以在根 POM 文件中声明一个依赖项的版本号，`然后在所有子模块中继承该版本号，而不需要在每个子模块中都声明一次`

#### configuration
* 在Maven项目中，<configuration> 标签通常用于指定插件的配置。
* 在这个例子中，<configuration> 标签用于配置 maven-compiler-plugin 插件，指定源代码和目标代码的版本。
* `<source> 指定编译源代码时所使用的 JDK 版本，<target> 指定编译生成的目标代码的 JDK 版本。`
* 如果你去掉了这个 <configuration> 标签，编译插件将会使用默认值进行编译，这可能会导致在不同的环境中出现不兼容的问题。因此，建议在项目中明确指定所需的 JDK 版本来避免这些问题。
```xml
    <build>
        <plugins>
            <!-- Compile java -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

        </plugins>
    </build>
```

#### modules
* <modules>元素指定了Maven项目的子模块，`这些子模块通常是一个项目的独立组件，可以独立构建和测试，也可以作为一个整体进行构建和测试。`
* `在给定的示例中，<modules>元素包含了两个子模块wf-common-external和debug-service。这意味着这个父级项目将会在这两个子模块中执行Maven构建。`
* `具体来说，Maven将在父级项目和每个子模块的根目录下查找pom.xml文件，并在每个模块上执行相应的Maven生命周期阶段。`
* 在开发大型项目时，使用子模块能够更好地组织代码、提高可重用性，并使不同的团队能够并行开发不同的功能模块。
```xml
    <modules>
        <module>common-external</module>
        <module>debug-service</module>
    </modules>
```

#### 解决依赖冲突
* `exclusions用于从一个依赖项中排除其他依赖项，通常用于解决依赖项冲突的问题。`
* `如果一个项目的多个依赖项引用了同一个库的不同版本，就会出现冲突。在这种情况下，可以使用exclusions来指定哪些库需要从依赖项中排除，以解决冲突问题。`
* 这个依赖声明使用了一个 exclusions 子元素，`用于排除依赖关系树中的特定传递依赖`。
* 在这里，它`将 logback-classic 依赖从 spring-boot-starter-web 中排除`。
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```
* 例如，如果一个项目依赖于A库和B库，而B库依赖于C库的一个旧版本，而A库依赖于C库的新版本，
* 就可以在B库的依赖项中使用exclusions排除C库的旧版本，以确保使用的是新版本。

#### 限制依赖范围
* 类似于前端执行npm ci会只安装devDependencies，而不会安装dependencies，`Maven也可以通过scope来限制依赖范围。`
* `<scope>元素定义了依赖的范围，即指定依赖项在哪个阶段使用`，它具有以下几个取值
  compile：`这是默认值，表示在编译时需要使用该依赖项，并且它会随项目一起打包`。`如果不需要指定其他scope，则可以省略<scope>元素。`
  provided：表示该依赖项在编译和测试代码中需要使用，`但是在运行时不需要该依赖项`，因为它会由运行时环境（例如Java EE服务器）提供。
  runtime：表示该依赖项`在运行时需要使用`，但在编译时和测试代码中不需要使用。
  test：表示该依赖项仅在`测试代码中需要使用`，而不会随项目一起打包。
  system：表示该依赖项与provided类似，但需要手动提供路径，因为`它不在Maven仓库中`。

#### extensions
```xml
<extensions>
    <extension>
        <groupId>kr.motd.maven</groupId>
        <artifactId>os-maven-plugin</artifactId>
        <version>1.5.0.Final</version>
    </extension>
</extensions>
```
* os-maven-plugin是一个Maven插件，用于检测当前操作系统的类型和架构。通常，在一个多模块的Maven项目中，我们可能需要根据不同的操作系统和架构，编译不同的可执行文件。该插件可以方便地帮助我们完成这个工作。
* `在Maven项目中，extensions元素用于指定Maven插件扩展。使用os-maven-plugin插件，需要将其添加到extensions元素中，以便在Maven构建过程中使用该插件。`


#### extensions和plugins区别
* 在Maven中，plugins和extensions都是用来扩展和定制构建过程的。
1. `plugins是Maven的核心概念，它允许用户通过配置插件来执行各种任务。插件可以用来编译代码、运行测试、生成文档、打包应用程序等等`
2. `extensions是一种特殊的插件，它可以扩展Maven的核心功能。一些功能如操作系统相关的构建操作可能需要使用扩展。`
* 区别在于：
* plugins是用来`执行任务`的，而`extensions是用来扩展Maven本身的功能`。
* plugins是由Maven社区或第三方开发者编写和发布的，而extensions是由Maven社区编写和发布的。
* plugins和extensions的配置方式不同，plugins需要在build节点下配置，而extensions需要在build.extensions节点下配置。

#### plugins插件配置executions
* `<executions>元素用于配置插件的执行`，这里配置了两个<goal>，分别是compile和compile-custom，表示`在Maven的compile阶段执行插件的两个目标`。
* `<configuration>元素用于设置插件的配置参数`，这里设置了protocArtifact和pluginArtifact两个参数，分别指定了Protobuf编译器和gRPC插件的信息。
```xml
<plugin>
    <groupId>org.xolstice.maven.plugins</groupId>
    <artifactId>protobuf-maven-plugin</artifactId>
    <version>0.5.1</version>
    <configuration>
        <protocArtifact>com.google.protobuf:protoc:3.6.1:exe:${os.detected.classifier}</protocArtifact>
        <pluginId>grpc-java</pluginId>
        <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.37.0:exe:${os.detected.classifier}</pluginArtifact>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>compile</goal>
                <goal>compile-custom</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### goal
* 在Maven中，`goal是指插件中定义的一项任务或行为，它描述了插件将要执行的操作或目标`。
* 每个Maven插件都可以定义一个或多个goal，它们是可执行的独立单元。
* 当执行Maven命令时，指定要运行的插件和goal，例如“mvn clean install”，其中“clean”和“install”是goal，
* 它们属于maven-clean-plugin和maven-install-plugin插件，它们执行了clean和install操作。
* 可以在pom.xml中的插件配置中指定要运行的goal，也可以使用命令行选项进行指定。

* `对于每个插件，Maven规定了一组可用的goal，可以使用插件的帮助命令查看插件支持的所有goal。`
* `goal会依赖其他goal或插件的执行结果，以达到它的最终目的。`
```xml
<plugin>
    <groupId>org.xolstice.maven.plugins</groupId>
    <artifactId>protobuf-maven-plugin</artifactId>
    <version>0.5.1</version>
    <configuration>
        <protocArtifact>com.google.protobuf:protoc:3.6.1:exe:${os.detected.classifier}</protocArtifact>
        <pluginId>grpc-java</pluginId>
        <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.37.0:exe:${os.detected.classifier}</pluginArtifact>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>compile</goal>
                <goal>compile-custom</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
* protobuf-maven-plugin 插件提供了以下几个 goal：
    protobuf:compile：编译 .proto 文件生成 .java 文件，使用该 goal 编译的文件在生成的 Java 文件中有 static final int 类型的常量来标记每个字段的编号。
    protobuf:compile-custom：编译 .proto 文件生成 .java 文件，使用该 goal 编译的文件不会生成 static final int 类型的常量。
    protobuf:testCompile：编译测试 .proto 文件生成测试 .java 文件。
    protobuf:testCompile-custom：编译测试 .proto 文件生成测试 .java 文件，不生成 static final int 类型的常量。


