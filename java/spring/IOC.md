## IOC
* IOC（Inversion of Control）即控制反转，是一种设计模式，也是 Spring 框架的核心概念之一。
* `在传统的程序设计中，对象的创建、依赖关系的维护、对象的销毁等操作都由程序员手动完成。`
* 而在 IOC 的设计中，这些操作都被交由容器自动完成，`程序员只需要在配置文件中指定需要创建的对象及其依赖关系，`
* `容器会自动按照配置文件的内容创建对象，并维护它们之间的依赖关系。`

* 在 Java 中，IOC 机制主要由两个核心技术实现：`依赖注入（Dependency Injection，DI）和控制反转（Inversion of Control，IoC）。`

### 依赖注入 Dependency Injection
* 依赖注入（DI）是指`通过构造函数、Setter 方法或成员变量的方式，将需要的依赖对象注入到目标对象中，从而实现对象之间的松耦合。`


### 控制反转 Inversion of Control
* 控制反转（IoC）是指容器负责创建对象及其依赖关系，而不是由程序员手动创建和维护对象之间的依赖关系。
* 程序员只需要在配置文件中指定需要创建的对象及其依赖关系，容器会自动按照配置文件的内容创建对象，并维护它们之间的依赖关系。

#### IOC实现
* 在 Spring 框架中，IOC 机制的实现主要依赖于 `BeanFactory 和 ApplicationContext` 两个核心接口。
* `BeanFactory 是 Spring 的核心接口之一，负责创建和管理对象及其依赖关系；`
* `ApplicationContext 是 BeanFactory 的子接口，增加了更多的企业级功能，如 AOP、事务管理、国际化、消息发送等。`







