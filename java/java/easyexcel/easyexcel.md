## easyexcel
* EasyExcel 是一个基于 Java 的开源框架，用于快速读写 Excel 文件。
* `它可以读取、写入 Excel 2003、2007 和 2010 格式的文件，并支持大量的数据读写操作，如单个 sheet 最多支持 100 万行数据的读写，多线程读写等。`

* EasyExcel 可以通过注解的方式将 Java 对象与 Excel 文件进行映射，使得开发者可以直接将 Java 对象写入 Excel 文件或者将 Excel 文件读取为 Java 对象。
* 同时，EasyExcel 还提供了监听器模式，开发者可以通过监听器监听 Excel 文件的读写过程，实现对数据的自定义处理和校验等操作。

* EasyExcel 的主要特点包括：
  支持读取和写入 Excel 2003、2007 和 2010 格式的文件；
  支持大量数据的读写操作，如单个 sheet 最多支持 100 万行数据的读写；
  支持多线程读写，可以提高读写的效率；
  支持注解的方式将 Java 对象与 Excel 文件进行映射，简化开发流程；
  提供了监听器模式，可以监听 Excel 文件的读写过程，并进行自定义处理和校验等操作；
  支持 Excel 样式的读取和写入，如字体、颜色、边框等；
  提供了丰富的 API，如合并单元格、隐藏列、自定义表头等；
  支持流式读取和写入，可以节省内存开销；
  易于集成到 Spring Boot 项目中。

#### 写入excel文件例子
```java
public class WriteExcelDemo {
    public static void main(String[] args) throws IOException {
        String fileName = "test.xlsx";
        // EasyExcel.write 方法用于创建一个写入器对象，User.class 用于指定要写入的数据类型
        EasyExcel.write(fileName, User.class).sheet("用户信息").doWrite(getData());
    }

    private static List<User> getData() {
        List<User> userList = new ArrayList<>();
        userList.add(new User("张三", 20)); // User 类为自定义的 Java 对象，表示用户信息
        userList.add(new User("李四", 30));
        userList.add(new User("王五", 25));
        return userList;
    }
}
```









