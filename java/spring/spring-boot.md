## spring
* spring的核心是提供了一个`容器container`，通常被称为`spring应用上下文Spring application context,会创建和管理应用的组件`。
* 这些组件也称为bean,会在spring应用上下文中装配在一起，从而形成一个完整的应用程序，类似于砖块、木材、管道、电线组合在一起，形成一个房子。

* `将bean装配在一起的行为是通过一种基于依赖注入(Dependency Injection,DI)的模式实现的`
* 此时，组件不会再去创建它所依赖的组件并管理他们的生命周期，使用依赖注入的应用依赖于单独的实体（容器）来创建和维护的组件
* 并将其注入到需要他们的bean中.通常这是通过构造器参数和属性访问方法(property accessor)来实现的

* 在核心容器之上，Spring及其一系列的相关库提供了Web框架、各种持久化可选方案、安全框架、与其他系统集成、运行时监控、微服务支持、反应式编程模型，以及众多现代应用开发所需的其他特性。

#### spring上下文和bean装配在一起的方式
1. `使用一个或多个xml文件描述各个组件和他们与其他组件的关联关系`
* 如下的XML描述了两个bean —— InventoryService bean和ProductService bean，并且通过构造器参数将InventoryService装配到ProductService中：
```xml
<bean id = "inventoryService"
      class = "com.example.InventoryService" />

<bean id = "productService"
      class = "com.example.ProductService" />
    <constructor-arg ref = "inventoryService" />
</bean>
```
2. `最近比较流行的是java配置`
* `@Configuration注解会告知Spring这是一个配置类，它会为Spring应用上下文提供bean。`
* 这个配置类的方法上使用@Bean注解进行了标注，这表明`这些方法所返回的对象会以bean的形式添加到Spring的应用上下文中`
* （默认情况下，这些bean所对应的bean ID与定义它们的方法名称是相同的）。
```java
@Configuration
public class ServiceConfiguration {
    @Bean
    public InventoryService inventoryService() {
        return new InventoryService();
    }

    @Bean
    public ProductService productService() {
        return new ProductService(inventoryService());
    }
}
```

#### 自动装配技术
* `不管是使用Java还是使用XML的显式配置，都只有在Spring不能自动配置组件的时候才具有必要性。`
* 在Spring技术中，自动配置起源于所谓的自动装配(autowiring)和组件扫描(component scanning)。借助组件扫描技术，Spring能够自动发现应用类路径下的组件，
* 并将它们创建成Spring应用上下文中的bean。`借助自动装配技术，Spring能够自动为组件注入它们所依赖的其他bean。`
* 没有代码就是自动装配的本质，也是它如此美妙的原因所在。

### 创建spring boot程序
* 安装cli
```shell
$ brew tap spring-io/tap
$ brew install spring-boot
```
* 创建一个基于maven的spring boot的web程序
* `spring init --dependencies=web --build maven spring-demo`
* 初始化spring-boot项目之后，我们可以在项目结构根目录下发现
* `mvnw和cmd`: 这是maven(wrapper)脚本，借助这些脚本，即使我们的机器上没有安装maven也可以构建项目
* `pom.xml`：这是maven构建规范文件
* `src/main/resources/application.properties`: 这个文件开始是空的，但是我们可以在这里配置配置属性

#### @SpringBootApplication
* `@SpringBootApplication 注解就是 Spring Boot 的核心注解之一，用于标注 Spring Boot 应用程序的启动类。`
* @SpringBootApplication 注解实际上是一个组合注解，包含了以下三个注解的元注解：
1.  @SpringBootConfiguration：`标注当前类为 Spring Boot 的配置类`，相当于在传统的 Spring 配置文件中使用 @Configuration 注解的作用。
2.  @EnableAutoConfiguration：`启用 Spring Boot 的自动配置机制`，相当于在传统的 Spring 配置文件中使用 <context:annotation-config /> 和 <context:component-scan /> 等标签的作用。
3.  @ComponentScan：`启用组件扫描，会自动扫描当前包及其子包中的组件，并将其注册到 Spring 容器中。`
* 通过在 Spring Boot 应用程序的启动类上添加@SpringBootApplication 注解，就可以实现以上三个注解的功能。
* 例子
```java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```


#### @ServletComponentScan
* `ServletComponentScan注解用于自动扫描并且注册Servlet、Filter、Listener等Web组件。`

* 在传统的 Servlet 开发中，需要在 web.xml 配置文件中手动添加 Servlet、Filter 和 Listener 等组件的声明和配置，这样可能会导致配置繁琐、不易维护。
* 而使用 @ServletComponentScan 注解可以自动扫描并注册这些组件，从而简化了配置，提高了开发效率。

* `@ServletComponentScan 注解通常被用于 Spring Boot 应用程序中，可以在 Spring Boot 启动类上添加该注解，从而启用自动扫描和注册 Web 组件。`
* `在扫描和注册完成后，Spring 容器就会自动将这些组件注册到 Servlet 容器中，以供应用程序使用。`

* 例子：
```java
@SpringBootApplication
@ServletComponentScan(basePackages = "com.example.web")
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```
* 在上面的示例中，@ServletComponentScan 注解标注在 Spring Boot 启动类上，指定了要扫描的 Web 组件所在的包路径。这样，在应用程序启动时，Spring 容器就会自动扫描并注册这些组件。
* `在代码中就可以直接使用这些组件，而不需要手动配置 web.xml 文件。`





