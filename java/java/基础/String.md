## String

#### 创建一个固定长度的字符串，里面的值修改
* 可以使用 String.join() 方法和 Collections.nCopies() 方法来生成一个长度为 24*7 的字符串，其中每个字符都是 '1'。
`String hours = String.join("", Collections.nCopies(24*7, "1"));`
* `Collections.nCopies(24*7, "1") 会生成一个长度为 24*7 的 List`


#### Collections.nCopies
* Collections.nCopies(int n, T o) 是 Java 集合框架中的一个静态方法，用于创建一个指定大小并且每个元素都相同的集合。
* 该方法返回一个 List，该 List 的大小为 n，并且所有元素都是 o 对象的引用。这意味着修改其中一个元素将影响所有元素。
```text
List<String> list = Collections.nCopies(5, "apple");
System.out.println(list); // [apple, apple, apple, apple, apple]
```

#### StringBuilder
* StringBuilder是Java中的一个可变字符串类，它可以动态地添加、删除和修改字符串内容
* `类似于StringBuffer，但比StringBuffer更加高效。`
* `StringBuilder是线程不安全的`，适用于单线程环境下的字符串构建任务。
append()：向字符串末尾添加新的字符、字符串或其他数据类型的值。
insert()：在指定位置插入新的字符、字符串或其他数据类型的值。
delete()：删除指定位置或范围内的字符。
replace()：替换指定位置或范围内的字符为新的字符、字符串或其他数据类型的值。
toString()：将StringBuilder对象转换为String类型的字符串。
* `使用StringBuilder可以避免频繁创建新的String对象，提高字符串操作的效率和性能。`
* 由于StringBuilder是非线程安全的，因此在多线程环境下需要使用ThreadLocal或者使用线程安全的StringBuffer类。

#### char
* `基本数据类型char的包装类是Character`

