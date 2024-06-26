#### Serializable
* Serializable 是 Java 中一个重要的接口之一，它用于标记一个类的实例可以被序列化
* `（即可以被转化成一系列字节的数据流）`，从而可以方便地在网络上传输或者存储到本地磁盘中。

* 当一个类实现了 Serializable 接口后，该类的实例可以被序列化。
* 当这些实例被写入到文件或者通过网络传输时，`它们的字节表示可以被读取并还原为原始的对象。`
* `这个过程称为反序列化。`通过序列化和反序列化，Java 程序可以方便地进行跨平台数据传输。

* `如果一个类实现了 Serializable 接口，那么该类的所有非静态成员变量都将被序列化。`
* 但是，如果某个成员变量不希望被序列化，则可以将其标记为 `transient。`

* 一个类实现了Serializable接口，这意味着它可以被序列化和反序列化。
* 序列化是将对象转换为字节流的过程，反序列化是将字节流转换回对象的过程。
* `通过实现Serializable接口，您可以将对象保存到文件中或通过网络发送。`
* 在Java中，所有的基本类型和String类型都是可序列化的，但是其他类型需要实现Serializable接口才能被序列化。

#### 一个例子
```java
class Person implements Serializable {
    private String name;
    private transient int age;
    public static final ArrayList<Integer> tests = new ArrayList<>(Arrays.asList(1,2));

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

```java
import java.io.*;

public class Main{
    public static void main(String[] args) {
        // 创建一个Person对象
        Person person = new Person("Tom", 25);

        // 序列化Person对象
        try {
            FileOutputStream fileOut = new FileOutputStream("person.ser");
            ObjectOutputStream out = new ObjectOutputStream(fileOut);
            out.writeObject(person);
            out.close();
            fileOut.close();
            System.out.println("Serialized data is saved in person.ser");
        } catch (IOException i) {
            i.printStackTrace();
        }

        // 反序列化Person对象
        try {
            FileInputStream fileIn = new FileInputStream("person.ser");
            ObjectInputStream in = new ObjectInputStream(fileIn);
            Person deserializedPerson = (Person) in.readObject();
            in.close();
            fileIn.close();
            System.out.println("Deserialized Person:");
            System.out.println("Name: " + deserializedPerson.getName()); // Name: Tom
            System.out.println("Age: " + deserializedPerson.getAge()); // Age: 25
            System.out.println("tests: " + Person.tests); // tests: [1, 2]
        } catch (IOException i) {
            i.printStackTrace();
        } catch (ClassNotFoundException c) {
            System.out.println("Person class not found");
            c.printStackTrace();
        }
    }
}
/**
 *
全部都是非静态对象：
�� sr Person6���t@ I ageL namet Ljava/lang/String;xp   t Tom
添加一个静态成员变量后，发现没有改变
�� sr Person�{�)��) I ageL namet Ljava/lang/String;xp   t Tom
把Age改为transient之后，发现改变了，并且得到的Age的值是0！！
�� sr Person��k:B% L namet Ljava/lang/String;xpt Tom
 * */
```



