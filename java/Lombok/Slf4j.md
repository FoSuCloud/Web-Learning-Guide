### Slf4j
* `全称是Simple Logging Facade for Java 简单的java日志外观`
* @Slf4j注解是Lombok提供的一个用于`自动生成日志对象的注解`，
* 它会`在编译期自动生成一个名为"logger"的静态成员变量，`
* 然后你可以`使用该成员变量来记录日志。`
* 具体来说，@Slf4j注解使用时只需要在Java类上添加即可
```java
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MyController {
    // ...
    public void doSomething() {
        log.debug("This is a debug message");
        log.info("This is an info message");
        log.error("This is an error message");
    }
}
```






