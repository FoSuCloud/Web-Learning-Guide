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

#### class.getName()
其实是获取包名加上文件名`packageName +ClassName`

#### class.getClassLoader()
```java
URL cert = Service.class.getClassLoader().getResource(CERT_FILE_PATH);
```
* CERT_FILE_PATH 是文件路径/名称，相对于resource来说的
这行代码的作用是从当前类（Service）所在的类加载器中获取资源（Resource）。
* `URL cert 的最终得到变量是file:/xxx/xxx 的绝对路径，表示文件路径`
具体解释如下：Service.class：表示Service类的类对象。在Java中，每个类都有一个对应的Class对象，可以通过.class语法获取。这里使用Service.class获取Service类的类对象。
* getClassLoader()：Class类中的一个方法，`用于获取加载该类的类加载器`。
* `类加载器负责加载类文件，并将其转换为可执行的Java类`。
getResource(CERT_FILE_PATH)：ClassLoader类的方法，用于从类路径中获取资源。CERT_FILE_PATH 是一个字符串常量，表示要获取的资源的路径。这个路径可以是相对于类路径的相对路径，也可以是绝对路径。
综合起来，这行代码的作用是从Service类的类加载器中获取名为 CERT_FILE_PATH 的资源的URL。这个资源可以是任何位于类路径下的文件，比如配置文件、属性文件等。
* 最后可以通过下面方式取得文件内容
```java
new File(cert.getFile())
```
