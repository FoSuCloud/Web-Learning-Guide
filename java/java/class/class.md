### 内部类
* Java 的静态内部类、成员内部类和方法内部类都是在需要将一个类定义在另一个类的内部并且与外部类有一定的关联性时使用的。

* 静态内部类通常用于封装辅助功能或实现某种策略模式，使得外部类不必创建新的对象即可调用其内部类中的方法或访问其内部类中的静态变量。

* 成员内部类通常用于表示某个外部类的一部分或扩展其功能，可以访问外部类的所有成员变量和方法，并且可以被外部类的对象实例化进行调用。

* 方法内部类通常用于表示某个方法的一部分或者提供辅助功能，只能在其所在方法中被访问，且不能声明任何静态成员或接口。


#### 匿名内部类
```java
        public class Outer {
            public void test(final int x, final int y){
                Point p = new Point(2,3){
                    @Override
                    public double distance() {
                        return distance(new Point(x, y));
                    }
                };
                System.out.println(p.distance());
        }
    }
```
