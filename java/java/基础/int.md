## int



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



