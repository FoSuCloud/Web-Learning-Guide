### system

#### System.out.println和System.out.print
```java
public class PrintingStatements
{
   public static void main(String[] args)
   {
      System.out.println("This is the first message!");
      System.out.print("This is the second message.");
      System.out.print("This is the third message?");
   }
}
```
* 输出结果
```text
This is the first message!
This is the second message.This is the third message?
```
* `System.out.print 输出是不换行的`
* System.out.println会自动换行

#### system.getenv
* `system.env 和进入对应机器，输入env是同样的效果。`

#### System.getProperty
* `system.getProperty() 是Java中的一个函数，可以获取到Java JVM以及操作系统的一些参数，可以供程序判断等。`
* System.getProperty()方法中需要传递一个字符串的参数，表示需要获取那个环境配置。
* 例如，System.getProperty(“java.io.tmpdir”)可以获取系统临时目录。


