## bean
* 在java中，bean通常用来表示一个可重用的，自包含的组件，可以是任何Java对象
* 但是通常有以下特点：
1.  具有无参构造方法，以便通过 Java 反射机制实例化。
2.  具有私有字段（属性），并提供公共的 getter 和 setter 方法以访问这些属性。
3.  具有实现序列化接口（Serializable）的能力，以便支持跨进程的通信和持久化存储。
4.  被设计为可重用的组件，可以在多个应用程序中进行部署和使用。
* 在 Spring 框架中，"bean" 一词通常指 Spring 容器中所管理的对象。
* `Spring 容器通过读取配置文件或注解来创建和管理这些对象，同时也负责解决这些对象之间的依赖关系。`
* `使用 Spring 的 IOC（Inversion of Control）机制，我们可以将组件之间的依赖关系配置在容器中，从而实现松耦合、可扩展和可重用的设计。`

#### 哪些是Bean
* 接口（interface）、枚举（enum）和类（class）,注解（Annotation）,值对象（Value Object）,工具类（Utility Class）


### validate规范

#### @NotNull 和 @NotBlank 区别
1. 适用范围：@NotNull 适用于任何类型的参数或字段，而 `@NotBlank 只适用于字符串类型的参数或字段`。
2. 验证规则：@NotNull 验证参数或者字段的值不能为 null，
* `而 @NotBlank 验证参数或者字段的值不能为 null 或者空字符串，即只包含空格的字符串也是无效的`。
3. 错误提示：如果验证失败，@NotNull 默认的错误提示为 "{javax.validation.constraints.NotNull.message}"，可以通过 message 属性进行自定义。
* 而 @NotBlank 的默认错误提示为 "{javax.validation.constraints.NotBlank.message}"，也可以通过 message 属性进行自定义。
* `如果需要验证一个字符串既不为 null，也不为空字符串，可以使用以下代码：`
```java
@NotNull
@NotBlank
private String name;
```




