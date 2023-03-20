## int
* Int是基本数据类型


### Integer
* `Integer是Int的包装类Wrapper class`

* `Int是基本数据类型，占用4个字节（32位），可以直接存储整数值，没有任何方法或属性。而Integer是对象类型，它包含一个int类型的字段value，并提供了一些方法来操作这个值。`
* `Int可以直接参与数值计算，而Integer需要使用intValue()方法将其转换为int类型后才能进行计算。`
* `Int是值类型，即变量保存的是实际的数值，而Integer是引用类型，即变量保存的是对象的地址，指向堆内存中的对象。`
* `在Java 5及以上版本中，可以使用自动装箱和拆箱的特性来方便地将int和Integer类型相互转换，使得它们之间的转换更加简单和方便。`


#### 两个int整数的除法
```java
public class Main{
    public static void main(String[] args) {
        int year = 213;
        int num = 6;
        // 两个int 除法 结果就是int
        System.out.println(year / num); // 35
        // 先执行两个Int的除法，再转换为double
        System.out.println((double) (year / num)); // 35.0
        
        // 把其中一个int转换为Double再执行除法
        // 把year转换为double
        System.out.println((double) year / num); // 35.5
        // 把num转换为double
        System.out.println( year / (double) num); // 35.5
    }
}
```



