## enum
* `枚举类型实际上会被Java编译器转换为一个对应的类，这个类继承了Java API中的java.lang.Enum类。`

* Enum类有name和ordinal两个实例变量，在构造方法中需要传递，
* name()、toString()、ordinal()、compareTo()、equals()方法都是由Enum类根据其实例变量name和ordinal实现的。
* values和valueOf方法是编译器给每个枚举类型自动添加的

#### 枚举例子
```text
        public enum Size {
            SMALL, MEDIUM, LARGE
        }
```
* `实际上会被编译为一个class类`
```text
        public final class Size extends Enum<Size> {
            public static final Size SMALL = new Size("SMALL",0);
            public static final Size MEDIUM = new Size("MEDIUM",1);
            public static final Size LARGE = new Size("LARGE",2);
            private static Size[] VALUES = new Size[]{SMALL, MEDIUM, LARGE};
            private Size(String name, int ordinal){
                super(name, ordinal);
            }
            public static Size[] values(){
                Size[] values = new Size[VALUES.length];
                System.arraycopy(VALUES, 0, values, 0, VALUES.length);
                return values;
            }
            public static Size valueOf(String name){
                return Enum.valueOf(Size.class, name);
            }
        }
```


