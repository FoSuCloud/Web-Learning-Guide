## UtilityClass
* `@UtilityClass 是 Lombok 提供的一个注解，用于标记一个类为工具类。`
* 使用该注解可以自动生成一些静态方法，简化工具类的编写。

* `使用 @UtilityClass 注解的类必须是 final 类型，并且不包含任何实例字段或实例方法，所有方法都必须是静态方法。`
* 在使用该注解后，Lombok 会自动生成一些常用的静态方法，例如：
private 构造函数，以防止该类被实例化。
static 方法，用于判断对象是否为 null。
static 方法，用于判断字符串是否为空或者空字符串。
static 方法，用于判断集合是否为空。


* `在下面的示例代码中，MyUtils 类被标记为工具类，add 和 subtract 方法都是静态方法。`
* `使用 @UtilityClass 注解可以省去写构造函数、判空等代码，使工具类的代码更加简洁易读。`
```java
import lombok.experimental.UtilityClass;

@UtilityClass
public final class MyUtils {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }
}
```





