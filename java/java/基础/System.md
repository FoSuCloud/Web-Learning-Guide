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
