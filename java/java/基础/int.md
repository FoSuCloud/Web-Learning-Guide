## int
* Int是基本数据类型
* `Integer.parseInt(xxx) 转换为int`

### Integer
* `Integer是Int的包装类Wrapper class`

* `Int是基本数据类型，占用4个字节（32位），可以直接存储整数值，没有任何方法或属性。而Integer是对象类型，它包含一个int类型的字段value，并提供了一些方法来操作这个值。`
* `Int可以直接参与数值计算，而Integer需要使用intValue()方法将其转换为int类型后才能进行计算。`
* `Int是值类型，即变量保存的是实际的数值，而Integer是引用类型，即变量保存的是对象的地址，指向堆内存中的对象。`
* `在Java 5及以上版本中，可以使用自动装箱和拆箱的特性来方便地将int和Integer类型相互转换，使得它们之间的转换更加简单和方便。`

#### 可以通过以下两种方式将int类型转换为Integer类型
* 自动装箱
```text
int i = 123;
Integer integer = i; // 自动装箱
```
* valueOf
```text
int i = 123;
Integer integer = Integer.valueOf(i);
```

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

#### 生成随机数
* new Random().nextInt(100) 生成的是一个介于 0（含）和 100（不含）之间的伪随机数，
* 加上 1 后得到的是一个介于 1（含）和 101（不含）之间的随机数，
* 所以可以说该表达式表示的是一个`范围为 1 到 100 的随机数`。
`new Random().nextInt(100)+1`

#### 生成浮点随机数
`new Random().nextDouble() 生成一个介于 0（含）和 1（不含）之间的伪随机数`

#### 进制转换
```java
public class Main{
    public static void main(String[] args) {
        // 110010010101
        System.out.println(Integer.toBinaryString(3221)); // 输出二进制
        // 6225
        System.out.println(Integer.toOctalString(3221)); // 输出8进制
        // c95
        System.out.println(Integer.toHexString(3221)); // 输出16进制
        // 12833
        System.out.println(Integer.parseInt("3221",16)); // 按照16进制解析！！！
    }
}
```

#### 常用常量
```java
        public static final Boolean TRUE = new Boolean(true);
        public static final Boolean FALSE = new Boolean(false);
```
* 所有数值类型都定义累最大值和最小值，如Integer
```text
        public static final int    MIN_VALUE = 0x80000000;
        public static final int    MAX_VALUE = 0x7fffffff;
```
* float和double还有一些其他类型常量
```text
        public static final double POSITIVE_INFINITY = 1.0 / 0.0; //正无穷
        public static final double NEGATIVE_INFINITY = -1.0 / 0.0; //负无穷
        public static final double NaN = 0.0d / 0.0; //非数值
```

#### reverse和reverseBytes
```java
public class Main{
    public static void main(String[] args) {
        int a = 0x12345678;
        // 10010001101000101011001111000 这样看是不对的。需要补全32位再看，0补在前面
        // 00010010001101000101011001111000
        System.out.println(Integer.toBinaryString(a));
        // 位翻转就是将int当作二进制，左边的位与右边的位进行互换，reverse是按位进行互换
        int r = Integer.reverse(a);
        // 11110011010100010110001001000
        // 00011110011010100010110001001000
        
        /*
        * 00010010001101000101011001111000
        * 00011110011010100010110001001000 这样看起来就对了！
        * */
        
        System.out.println(Integer.toBinaryString(r));
        // reverseBytes是按byte进行互换，按照字节翻转
        // 78，56，34，12 都是一个字节
        int rb = Integer.reverseBytes(a);
        // 78563412
        System.out.println(Integer.toHexString(rb));
        // 1111000010101100011010000010010
        System.out.println(Integer.toBinaryString(rb));
        /*
        * 00010010001101000101011001111000 原始的
        * 01111000010101100011010000010010
        * */
    }
}
```


