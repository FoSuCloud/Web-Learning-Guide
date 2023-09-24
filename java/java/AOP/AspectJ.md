#### AOP
* AspectJ 是一种功能强大的 AOP（面向切面编程）框架，它可以在运行时`动态地将横切关注点`（cross-cutting concerns）`织入到应用程序中`。
* AOP 可以帮助`解耦和增强应用程序`，使得横切关注点（比如`日志记录、性能监控、事务管理`等）可以在整个应用程序中`进行统一的管理`。AspectJ 是实现 AOP 功能的主要解决方案之一。


#### EnableAspectJAutoProxy
* @EnableAspectJAutoProxy 注解是用来开启 Spring 框架对 AspectJ 的支持。
* 它的作用是启用 AspectJ 自动代理机制，自动在 Spring 容器中扫描和代理标记了 @Aspect 注解的类。

* 使用 @EnableAspectJAutoProxy 注解后，Spring `将会在应用程序上下文中自动创建相应的代理对象`，
* 以便在调用被 @Aspect 注解标记的方法时，能够在方法执行前、执行后或方法抛出异常时执行相关的切面逻辑。
```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
    // 其他配置...
}
```

#### @Around
* @Around 是 AspectJ 框架中的一个注解，用于定义一个环绕通知（Around advice）。
* 环绕通知是 AOP（面向切面编程）中的一种通知类型，它可以在方法`执行前和执行后都被调用`。
* 使用 @Around 注解可以将一个方法标记为环绕通知，并指定切入点表达式来确定在何处应用该通知。

* @Around 注解常用于 AspectJ 切面类中的方法上，它能够控制目标方法的执行过程，可以完全取代目标方法的执行，并且具有更灵活的控制能力。
* 环绕通知可以在目标方法执行前预处理输入参数、在目标方法执行后处理返回结果或异常，并且可以决定是否调用目标方法。
```java
@Aspect
@Component
public class LoggingAspect {

    @Around("execution(* com.example.service.*.*(..))")
    public Object logMethodExecution(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        // 在目标方法执行前的逻辑
        System.out.println("Before method execution");

        Object result = proceedingJoinPoint.proceed(); // 执行目标方法

        // 在目标方法执行后的逻辑
        System.out.println("After method execution");

        return result;
    }
}
```






