#### Getter
* @Getter 是 Lombok 提供的注解之一，用于自动生成类中属性的 Getter 方法。
* 在使用 @Getter 注解后，Lombok 会自动生成与该类中的非静态属性对应的 Getter 方法，以便我们可以更加方便地获取该类中的属性值，避免了手动编写 Getter 方法的重复工作。

```java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    private String name;
    private int age;
}

```
* `编译后，会自动生成对应代码`
```java
public class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```




