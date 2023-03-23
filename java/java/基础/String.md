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







