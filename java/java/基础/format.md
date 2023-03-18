### format
* Java的format语法是通过%符号实现的，它用来格式化字符串。其中，%后面的字符指定了需要被格式化的数据类型，比如字符串、整数、浮点数等
* 下面是一些常见的格式化语法：
  %s：字符串类型
  %d：整数类型
  %f：浮点数类型
  %c：字符类型
  %b：布尔类型
```java
public class Main {
    public static void main(String[] args) {
        String message = String.format("Hello, %s! Today is %s.", "Bob", "Monday");
        System.out.println(message); // Hello, Bob! Today is Monday.
    }
}
```

* `注意：不要使用大括号{}作为占位符，在jdk17就不支持。因为它们在字符串字面量中是合法的字符。`


