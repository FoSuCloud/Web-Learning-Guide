#### AllArgsConstructor注解
* @AllArgsConstructor 是 Lombok 提供的一个注解，
* `用于自动生成包含所有类成员变量的构造函数，即生成一个包含所有参数的构造函数。`


```java
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Example {
    private int id;
    private String name;
    private double salary;
}

// 生成的构造函数
public Example(int id, String name, double salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}
```





