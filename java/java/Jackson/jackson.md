## jackson
* `Jackson是一个基于Java的高性能JSON处理库，它可以用于将Java对象序列化为JSON格式的数据，也可以将JSON格式的数据反序列化为Java对象。`
* Jackson库的设计目标是提供高效、灵活和易于使用的JSON处理解决方案，它支持多种JSON格式、数据绑定方式和序列化、反序列化配置选项。

1. 快速和高效：Jackson框架采用基于流的方式处理JSON数据，具有很高的性能和处理效率。同时，它也支持多种JSON格式的解析和生成方式，包括树形结构、流式处理、数据绑定等。
2. 灵活和易用：Jackson框架提供了丰富的API和注解，可以灵活地控制JSON数据的序列化和反序列化过程。它可以自动根据Java对象的结构生成JSON数据，也可以将JSON数据反序列化为Java对象。
* 在此基础上，Jackson还提供了一些高级功能，如类型转换、数据格式化等，使得JSON数据的处理更加方便和易用。
3. 强大和可扩展：Jackson框架可以处理包含复杂数据类型、嵌套结构和自定义数据格式的JSON数据。它还支持多种插件和扩展机制，可以扩展框架的功能和支持自定义的数据格式。



#### JsonIgnoreProperties
* `@JsonIgnoreProperties是Jackson框架中的一个注解，用于在序列化和反序列化JSON数据时忽略指定的属性。`
* `@JsonIgnoreProperties注解可以标记在类上，也可以标记在属性上，用来指定哪些属性应该被忽略。`

* 在序列化JSON数据时，如果某个属性被标记了@JsonIgnoreProperties注解，Jackson框架将不会将该属性的值包含在序列化结果中。
* 同样，在反序列化JSON数据时，如果JSON数据中包含了被标记了@JsonIgnoreProperties注解的属性，Jackson框架将会忽略该属性的值，不会将其反序列化为Java对象的属性值。


* @JsonIgnoreProperties注解有两个参数：value和ignoreUnknown。
1. `value参数用于指定一个字符串数组，表示需要忽略的属性名称。`
2. `ignoreUnknown参数用于控制在反序列化JSON数据时是否忽略未知的属性。`

```java
@JsonIgnoreProperties(value = { "id", "createTime" }, ignoreUnknown = true)
public class User {
    private String name;
    private Integer age;
    private String email;
    // getters and setters
}
```

* `如果在使用@JsonIgnoreProperties注解时不指定任何参数，则注解将不会起到任何作用。`





