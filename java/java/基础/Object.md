### Object


#### Objects.equals和Object.equals
* Objects.equals是Java 7中引入的一个工具类方法，它可以处理空指针异常。
* 如果其中一个参数是null，Objects.equals方法会返回true.当且仅当两个参数都为null；
* 否则，它会调用o1.equals(o2)方法进行比较。
* `Objects.equals方法可以比较两个不同类型的对象，而不会抛出ClassCastException异常`
* `如果两个对象的类型不同，Objects.equals方法会返回false。`
```java
import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        String str1 = "abc";
        String str2 = "def";
        Object obj1 = new Object();
        Object obj2 = new Object();

        System.out.println(Objects.equals(str1, str2)); // false
        System.out.println(Objects.equals(obj1, obj2)); // false
    }
}
```

* 而`Object.equals方法是一个实例方法`，需要在对象上调用，
* 如果对象是null，它会抛出一个NullPointerException异常，它不会处理空指针异常。
```java
public class Main {
    public static void main(String[] args) {
        String str1 = "abc";
        String str2 = "def";
        Object obj1 = new Object();
        Object obj2 = new Object();

        System.out.println(str1.equals(str2)); // false
        System.out.println(obj1.equals(obj2)); // false

    }
}
```

#### spring-beans的copyProperties
* copyProperties是Spring Framework中的一个工具方法，位于org.springframework.beans.BeanUtils类中。
* `它用于将一个Java对象的属性值复制到另一个Java对象中的对应属性`。
具体而言，copyProperties方法提供了以下功能：

属性复制：copyProperties方法根据属性名称匹配，将源对象中的属性值复制到目标对象中的对应属性。源对象和目标对象的属性名称和类型需要匹配或兼容。
批量复制：copyProperties方法支持批量复制，可以一次复制多个属性。
自定义类型转换：如果源对象和目标对象的属性类型不完全匹配，copyProperties方法会尝试进行自动类型转换。如果自动类型转换不可行，你可以自定义类型转换器来处理特定属性的复制。
忽略空值：copyProperties方法默认情况下会复制源对象中的所有属性，即使它们的值为null。如果你想在复制时忽略源对象中的空值属性，可以通过设置ignoreNullValues参数为true来实现。

```java
import org.springframework.beans.BeanUtils;

public class Person {
    private String name;
    private int age;
    private int num;

    // 省略构造函数、getter和setter方法

    public static void main(String[] args) {
        Person source = new Person();
        source.setName("John");
        source.setAge(25);

        Person target = new Person();
        target.setName("Alice");
        target.setNum(100);

        BeanUtils.copyProperties(source, target);

        System.out.println(target.getName()); // 输出：John
        System.out.println(target.getAge()); // 输出：25
        System.out.println(target.getNum()); // 输出：100，目标对象的num属性保持不变
    }
}
```
