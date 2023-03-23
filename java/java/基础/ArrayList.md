## ArrayList
* 在Java中，ArrayList是一种基于动态数组实现的数据结构，可以在运行时动态增加或缩减其大小。
* ArrayList`实现了Java集合框架中的List接口，因此它支持丰富的集合操作，如添加、删除、查找、排序、过滤等。`

```java
import java.util.ArrayList;
public class ArrayLists
{
   public static void main(String[] args)
   {
      ArrayList<String> weekdays;
      weekdays = new ArrayList<String>(5);
      weekdays.add("Monday");
      weekdays.add("Tuesday");
      weekdays.add("Thursday");
      weekdays.add("Friday");
      System.out.println(weekdays);

      //Add at index 2 (3rd place) the String "Wednesday"
      weekdays.add(2, "Wednesday");
      System.out.println(weekdays);
   }
}
```

#### ArrayList注意事项
1. `ArrayList中只能存储对象，而不能存储基本数据类型，如int、float等。`如果需要存储基本数据类型，可以使用对应的包装类，如Integer、Float等。
2. ArrayList是基于数组实现的，因此插入或删除元素时，`需要移动数组中的其他元素，可能会影响性能。`
3. 如果`需要频繁插入或删除元素，可以考虑使用LinkedList`，因为它插入和删除元素的性能更好。


#### 什么时候使用ArrayList
* 在Java中，使用ArrayList的情况有以下几种
1. `需要动态调整数组大小`：ArrayList可以动态增长和缩减，因此在需要动态调整数组大小的情况下，使用ArrayList比使用固定大小的数组更加方便。
2. `需要使用集合操作`：ArrayList实现了Java集合框架中的List接口，因此它支持丰富的集合操作，如添加、删除、查找、排序、过滤等。如果需要进行这些操作，使用ArrayList比使用简单的数组更加方便。
3. `需要存储对象`：ArrayList可以存储任意类型的对象，而不仅仅是基本数据类型，因此在需要存储对象的情况下，使用ArrayList比使用基本数据类型数组更加方便。

* 相比之下，使用简单的数组(String[],int[])主要在以下情况：
* `确定数组大小`：如果需要一个固定大小的数组，可以使用简单的数组来创建，这样可以提高程序的效率。
* `仅需要存储基本数据类型`：如果只需要存储基本数据类型，如整数或字符，使用简单的数组可能比使用ArrayList更加简单和高效。



#### 下面是一些ArrayList的常用方法：
add(E e)：将元素添加到ArrayList的末尾。
add(int index, E e)：在指定位置插入一个元素。
remove(int index)：移除指定位置的元素。
remove(Object o)：移除指定的元素。
get(int index)：获取指定位置的元素。
set(int index, E e)：将指定位置的元素替换为新的元素。
size()：返回ArrayList中元素的数量。
clear()：移除ArrayList中的所有元素。
contains(Object o)：如果ArrayList包含指定的元素，则返回true。
indexOf(Object o)：返回指定元素第一次出现的位置，如果不包含该元素，则返回-1。

#### Arrays.asList
* `Java中的Arrays.asList是一个将数组转换为List的方法。`
* `该方法接受一个数组作为输入参数，并返回一个List。数组元素将成为List中的元素。`
* public static <T> List<T> asList(T... a)
```java
// 创建一个包含三个元素的字符串数组
String[] myArray = {"Hello", "World", "!"};

// 将字符串数组转换为List
List<String> myList = Arrays.asList(myArray);

// 输出List中的元素
System.out.println(myList);  // [Hello, World, !]

// 修改原始数组
myArray[0] = "Goodbye";

// 输出修改后的List中的元素
System.out.println(myList);  // [Goodbye, World, !]

// 修改List中的元素
myList.set(1, "Everyone");

// 输出修改后的数组中的元素
System.out.println(Arrays.toString(myArray));  // [Goodbye, Everyone, !]
```




