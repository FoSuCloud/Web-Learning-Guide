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

####  LoggerFactory.getLogger
* `LoggerFactory.getLogger是slf4j框架提供的一个用于获取Logger实例的静态方法。`
* Logger是一个简单的日志接口，它提供了输出日志消息的方法（例如，debug、info、warn、error等），并允许你在输出消息时指定消息级别、消息内容和异常对象等信息。
* `使用该实例来调用日志方法是一种打日志的方式，但是还有一种方法是直接使用@Slf4j注解`
```java
public static Logger getLogger(Class<?> clazz)
```
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyClass {
    private static final Logger logger = LoggerFactory.getLogger(MyClass.class);

    public void myMethod() {
        logger.debug("Debug message");
        logger.info("Info message");
        logger.warn("Warning message");
        logger.error("Error message");
    }
}
```





