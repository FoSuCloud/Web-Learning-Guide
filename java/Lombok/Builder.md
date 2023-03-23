## Builder
* Lombok的`Builder模式是一种快速构建复杂对象的方法。`

* 在传统的Java中，要创建一个复杂对象通常需要多个构造函数，并且每个构造函数都需要手动编写代码来初始化每个属性。
* Lombok的Builder模式可以帮助我们解决这个问题。`它使用注释来自动生成一个Builder类，可以通过链式调用的方式快速构建对象。`

* 我们可以在Java类上添加@Builder注释，然后Lombok会自动生成一个Builder类，
* 这个类可以通过一系列的set方法来设置对象的属性，`最后通过build方法来构建对象`。
* Builder模式还支持很多其他的特性，例如默认值、校验等。

```java
import lombok.Builder;

@Builder
public class Person {
    private String name;
    private int age;
    private String address;
}

// 创建Person对象的方式：
Person person = Person.builder()
    .name("Tom")
    .age(18)
    .address("China")
    .build();
```












