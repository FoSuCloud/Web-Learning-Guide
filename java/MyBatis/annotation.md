## annotation

#### @TableId
* `@TableId是一个注解，用于标注实体类中的主键字段`

* 主要有以下几个作用
* `标识主键字段`：使用@TableId注解标注的字段会被识别为实体类对应表的主键字段。
* `生成主键值`：如果主键值需要在插入数据库时由数据库自动生成（比如使用MySQL的自增主键），可以在标注了@TableId的字段上加上@TableId(type = IdType.AUTO)注解，MyBatis会自动将该字段忽略掉，以便数据库生成主键值。
* ``实现一些基于主键的内部处理``：MyBatis中提供了一些基于主键的操作，比如在批量更新、删除时可以根据主键列表进行操作。使用@TableId注解可以让MyBatis更方便地实现这些操作。
* `支持不同的主键生成策略`：@TableId注解提供了type属性，可以指定主键生成策略，如
* `@TableId(type = IdType.AUTO)表示使用数据库自增主键生成策略`，
* `@TableId(type = IdType.INPUT)表示使用手动输入主键值的方式(也就不是自增)`。
* MyBatis支持的主键生成策略还有UUID、SNOWFLAKE等。


#### @TableField
* 在MyBatis中，@TableField是一个注解，用于`标注实体类中的非主键字段`。
* 它可以指定实体类中的属性与数据库中的字段之间的映射关系，
* 包括字段名、是否为主键、是否为插入字段、是否为更新字段等。

* @TableField("parent_module")注解的作用
* `指定属性与数据库字段的映射关系`：在实体类中使用@TableField("parent_module")注解，可以将属性parentModule映射到数据库表中的parent_module字段。
* `自定义数据库字段名`：如果数据库表中的字段名和实体类中的属性名不一致，可以使用@TableField注解中的value属性来指定数据库表中的字段名。

```java
public class Module {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String module;
    
    // 这里不使用module_name无法映射到哦数据库的module_name字段，因为Java这里定义的变量是驼峰写法
    @TableField("module_name")
    private String moduleName;
    
    @TableField("parent_module")
    private Long parentModule;
}
```

#### @TableField(exist = false)
* `用于标识实体类中的一个字段在数据库表中不存在。`
* 在使用 MyBatis-Plus 进行实体类与数据库表的映射时，如果实体类中的一个属性对应的数据库表中没有对应的列，
* 就可以使用 @TableField(exist = false) 注解来标识该属性不存在于数据库表中，从而避免映射时出现错误或异常。

* 假设一个实体类有一个 totalPrice 属性，它是由 price 和 quantity 两个属性`计算得出的，而不是直接从数据库中获取的`。这时可以在 totalPrice 属性上
* `添加 @TableField(exist = false) 注解来告诉 MyBatis-Plus 不需要从数据库表中获取该属性的值。`





