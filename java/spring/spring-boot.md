## spring


### 创建spring boot程序
* 安装cli
```shell
$ brew tap spring-io/tap
$ brew install spring-boot
```
* 创建一个基于maven的spring boot的web程序
* `spring init --dependencies=web --build maven spring-demo`

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





