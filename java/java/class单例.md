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

* `设置access=AccessLevel.PRIVATE 可以用来防止被外部代码实例化，外部就只能访问到该类的static属性`

##### 修改常量类的变量值的方法
```java
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Person {
    private String name;
    private int age;
    
    public static Person createPerson(String name, int age) {
        Person person = new Person();
        person.setName(name);
        person.setAge(age);
        return person;
    }
}
```
* Person 类的构造函数被声明为私有的，因此只能在该类内部使用。
* `外部代码不能直接创建 Person 对象，而是通过 createPerson 静态方法来创建。`



