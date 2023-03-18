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







