## guava
* Guava是一个流行的Java开发库，由Google开发和维护。它提供了许多工具和实用程序，使得Java编程更加简单、高效和易用。
* Guava库包含许多模块，包括集合框架、缓存、字符串处理、IO、并发和函数式编程等。其中，集合框架是Guava最重要和广泛使用的模块之一。
* `Guava的集合框架提供了比Java标准库更强大和灵活的集合实现`，包括Immutable集合、Multiset、Multimap、BiMap等。

* `Guava中的缓存模块也非常流行和实用。它提供了基于内存的缓存实现，可以用于缓存常用的数据或计算结果，以提高应用程序的性能和响应速度。`


### Guava中的缓存模块

#### Guava中的缓存模块的getIfPresent
* `getIfPresent方法用于从缓存中获取指定的缓存值。`
`V getIfPresent(Object key)`
* 其中，key参数表示要获取值的键，返回值V表示与键相关联的缓存值。如果该值不存在，则返回null。
* 使用getIfPresent方法，`可以避免缓存中已经存在的值被重复计算或重新加载，从而提高程序性能。`

* `我们可以在调用某个方法之前，先从缓存中查找是否已经计算过该方法的结果，如果存在，则直接返回缓存中的结果，否则再进行计算并将结果放入缓存中，以便下次使用。`

#### Enums.getIfPresent
* `Enums.getIfPresent` 是 Guava 中的一个工具方法，用于`将给定的字符串名称映射到指定的枚举类型中的元素`，
* 如果匹配成功则返回对应的元素，否则返回 null。
```java
import com.google.common.base.Enums;
import java.util.Optional;

public class Example {
    public enum Color {
        RED,
        GREEN,
        BLUE
    }

    public static void main(String[] args) {
        // 根据字符串名称获取枚举元素
        Optional<Color> color = Enums.getIfPresent(Color.class, "RED");
        if (color.isPresent()) {
            System.out.println("Found color: " + color.get());
        } else {
            System.out.println("Color not found");
        }
    }
}
```
* 在上面的代码中，我们首先定义了一个枚举类型 Color，其中包含了三个元素 RED、GREEN 和 BLUE。然后在 main 方法中，我们使用 Enums.getIfPresent 方法来获取字符串 "RED" 对应的枚举元素。
* 如果匹配成功，则输出 "Found color: RED"，否则输出 "Color not found"。

#### Lists.partition
* Lists.partition(List<T> list, int size) 是 Google Guava 库中的一个静态方法，
* `用于将指定列表按照指定大小进行分割，返回一个分割后的 List 集合。`
* 如果分割后的最后一部分元素不足 size 个，也会将它们作为一个子集合返回。

* `该方法不会修改原始列表，而是返回一个新的列表。如果原始列表是不可变的，那么返回的子列表也是不可变的。`
```java
List<String> list = Arrays.asList("a", "b", "c", "d", "e", "f", "g");
List<List<String>> subLists = Lists.partition(list, 3);
System.out.println(subLists); // [[a, b, c], [d, e, f], [g]]
```



