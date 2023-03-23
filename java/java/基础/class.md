## class
* `class名称必须首字母大写！并且class类名要和文件名称保持一致，都是首字母大写`


#### final
1. 修饰类，表示`这个类不能被继承，不能有子类。`
2. 修饰方法，表示`这个方法不能被子类重写，但是可以被继承`
3. `修饰变量，表示变量不能被继承，是最终的，不可变得`

#### 创建一个class实例的方法
* 第一种是最常见的，就是在class中使用private，然后通过new Class类名的形式去创建实例
```java
public class Shoes
{
   //Instance attributes//
   private int size;
   private String color;

   public static void main(String[] args)
   {
      //I have brown moccasins size 31
      Shoes moccasins = new Shoes();
      moccasins.color = "brown";
      moccasins.size = 31;

      //I also have a pair of black boots size 32
      Shoes boots = new Shoes();
      boots.color = "black";
      boots.size = 32;

      System.out.println("I have moccasins size " + moccasins.size);
      System.out.println("I also have " + boots.color + " boots.");
   }
}
```
* 第二种是使用构造函数`还是和class名称一致`的形式，调用构造函数的方式去修改类内部的属性
```java
public class Constructors
{
   //Instance attributes//
   public String label;
   public double number;

   //Constructor//
   public Constructors(String valueOfLabel, double valueOfNumber)
   {
      label = valueOfLabel;
      number = valueOfNumber;
   }

   public static void main(String[] args)
   {
      //create an object and assign the values at the same time
      Constructors thing = new Constructors("HIS", 1.2);

      //let's see if it worked
      System.out.println("My thing's label is " + thing.label);
   }
}
```

#### 嵌套类
* 使用静态嵌套类来实现与外部类相关的工具类或者模型类是比较常见的，这种写法可以让代码结构更加清晰，降低类的复杂度。
```java
@UtilityClass
public class AuthTokenUtil {
    @Data
    public static class AuthToken {
        private String token;
        private String referer;

        public static AuthToken from(String jsonStr) {
            return JSON.parseObject(jsonStr, AuthToken.class);
        }
    }
    public static AuthToken from(String jsonStr) {
        return AuthToken.from(jsonStr);
    }
}
```
* `AuthToken 类是一个静态嵌套类，它与 AuthTokenUtil 类密切相关`
* 在 AuthToken 类中，定义了 token 和 referer 两个私有属性，以及 of 和 from 两个静态方法，用于创建和解析 AuthToken 对象。

* 静态嵌套类的优点
1. `静态嵌套类可以访问外部类的私有属性和方法`，这使得静态嵌套类可以更加方便地访问外部类的状态和行为。
2. `静态嵌套类的作用域限制在外部类中`，这使得代码结构更加清晰，避免了与外部类命名相冲突的问题。

#### getFields
* getFields()是Java反射API中的一个方法，它可以获取一个类或其父类中所有的public字段。
* getFields()方法返回一个Field对象数组，其中每个Field对象表示该类或其父类中声明的一个public字段。这些字段可以被其他类访问和操作。
```java
import java.lang.reflect.Field;

public class MyClass {
    public int myPublicField;
    private String myPrivateField;
    protected double myProtectedField;
    int myDefaultField;
    
    public static void main(String[] args) {
        Field[] fields = MyClass.class.getFields();
        for (Field field : fields) {
            System.out.println(field.getName() + " - " + field.getType());
        }
    }
}
```



#### getDeclaredFields
* getDeclaredFields()是Java中的一个`反射API方法，用于获取一个类中声明的所有字段`。
* getDeclaredFields()方法返回一个Field对象数组，其中每个Field对象表示该类中声明的一个字段。
* `这些字段可以是私有的、受保护的、公共的或默认访问级别的。`
* etDeclaredFields()方法返回所有字段，`包括私有字段和受保护字段`，而getFields()方法仅返回公共字段。
```java
import java.lang.reflect.Field;

public class MyClass {
    private int myPrivateField;
    public String myPublicField;
    protected double myProtectedField;
    int myDefaultField;
    
    public static void main(String[] args) {
        Field[] fields = MyClass.class.getDeclaredFields();
        for (Field field : fields) {
            System.out.println(field.getName() + " - " + field.getType());
        }
    }
}
```

#### 匿名内部类
* `使用了匿名内部类的方式重写了 LocalValidatorFactoryBean 类中的 validate 方法，实现了对目标对象是否为 BaseCondition 类型的判断并进行进一步验证。`
```java
@Configuration
public class ValidatorConfig {
 
 
    /**
     * 自定义参数校验工厂bean，扩展原有参数校验逻辑，支持对继承AbstractCondition类的所有条件参数对象进行统一校验
     *
     * @return
     */
    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    public LocalValidatorFactoryBean validator() {
        LocalValidatorFactoryBean factoryBean = new LocalValidatorFactoryBean() {
            @Override
            public void validate(Object target, Errors errors) {
                super.validate(target, errors);
                if (target instanceof BaseCondition) {
                   ((BaseCondition) target).checkField();
               }
           }
       };
        MessageInterpolatorFactory interpolatorFactory = new MessageInterpolatorFactory();
        factoryBean.setMessageInterpolator(interpolatorFactory.getObject());
        return factoryBean;
   }
}
```




