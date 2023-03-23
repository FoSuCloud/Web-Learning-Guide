## 2D array
* 在Java中，2D数组是一种二维的数组，由多个一维数组组成，每个一维数组又包含多个元素。

### 基础数据类型实现二维数组
```java
public class Arrays2D
{
   public static void main(String[] args)
   {
      //Create a 2D array of Strings, with 3 rows and 4 columns
      String[][] letters = new String[3][4];
      letters[0] = new String[]{"a", "b", "c", "d", "e"};
      letters[1] = new String[]{"f", "g", "h", "i", "j"};
      letters[2] = new String[]{"k", "l", "m", "n", "o"};

      //Enhanced for loop where every iteration, row is a 1D array of Strings.
      for (String[] row: letters)
      {
         //Enhanced for loop where letter is each element of the current row.
         for (String letter: row)
         {
            System.out.print(letter);
         }
         System.out.println();
      }

      int[][] numbers = {{1,2}, {3,4}, {5,6}, {7,8}};
      for (int y=0; y < numbers.length; y++)
      {
         for (int x = 0; x < numbers[0].length; x++)
         {
            System.out.print(numbers[y][x]);
         }
         System.out.println();
      }
   }
}
```


#### ArrayList实现二维数组
* 下面是使用ArrayList实现2D数组的步骤：
1. 创建一个ArrayList对象，用于存储一维数组。
2. 创建一维数组，并将其添加到ArrayList中。
3. 重复步骤2，直到所有一维数组都添加到ArrayList中。
4. 访问2D数组中的元素时，可以使用get()方法访问ArrayList中的一维数组，并使用数组下标访问一维数组中的元素。

```java
import java.util.ArrayList;

public class Main{
    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> arrList2D = new ArrayList<>();

        //创建第一行数组并添加到ArrayList中
        ArrayList<Integer> row1 = new ArrayList<>();
        row1.add(1);
        row1.add(2);
        row1.add(3);
        arrList2D.add(row1);

        //创建第二行数组并添加到ArrayList中
        ArrayList<Integer> row2 = new ArrayList<>();
        row2.add(4);
        row2.add(5);
        row2.add(6);
        arrList2D.add(row2);

        //访问2D数组中的元素
        int element = arrList2D.get(1).get(2);  //获取第二行第三列的元素
        System.out.println(element);  //输出6
    }
}
```











