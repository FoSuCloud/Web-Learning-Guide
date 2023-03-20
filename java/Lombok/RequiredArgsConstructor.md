## RequiredArgsConstructor
* `@RequiredArgsConstructor 是 Lombok 框架提供的一个注解，用于自动生成包含 final 类型字段（还有@NonNull的）的构造函数。`
* 该注解可以用于类级别，可以帮助程序员减少手动编写构造函数的工作量，提高代码的可读性和可维护性。

* `当在类上使用 @RequiredArgsConstructor 注解时，Lombok 会自动生成一个构造函数，该构造函数会包含所有被 @NonNull 或 final 修饰的字段。`
* `这些字段作为构造函数的参数，可以在对象创建时初始化`
* `如果该类中存在一个无参构造函数，则 Lombok 不会生成构造函数。`

* @RequiredArgsConstructor 注解提供了以下选项：
* `access：指定构造函数的访问级别，默认为 public。`
* `staticName：指定生成静态工厂方法的名称，如果未指定则不会生成静态工厂方法。`

```java
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Person {
    @NonNull
    private final String name;
    private final int age;
}
```
* 相当于
```java
public class Person {
    private final String name;
    private final int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}
```









