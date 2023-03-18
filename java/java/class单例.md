#### 创建一个单例的常量类
```java
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuditConstant {
    public static final String DES = "描述";
    public static final String EPOCHS = "epochs";
} 
```
* `@NoArgsConstructor(access = AccessLevel.PRIVATE) 表示 Lombok 会为该类生成一个无参构造函数，`
* `并将其访问级别设置为 private，也就是说只有在该类内部才能够被调用。`
* `这通常用于实现单例模式，即只能通过类内部的静态方法获取实例对象。`
* 在别的地方就可以通过 AuditConstant.DES 类似这样去获取对应的常量值






