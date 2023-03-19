### annotation
* `在Java中，@符号通常用于标记注解（Annotation）`
* 注解是一种特殊的接口，它定义了一组元数据，可以被应用到程序中的各个部分中，如类、方法、字段等
* 注解可以提供一些元数据，用于描述程序中的各个部分的属性、行为和使用方法等。
```java
public @interface MyAnnotation {
    // ...
}
```
* `给某个class使用我们定义的注解接口`
```java
@MyAnnotation
public class MyClass {
    // ...
}
```







