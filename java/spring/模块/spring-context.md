## spring-context

#### @Validated
* @Validated注解，用于标注方法、构造函数或类，并`指示Spring 在调用这些方法、构造函数或类之前进行参数校验`。
* @Validated 注解的作用是`在方法、构造函数或类中校验输入参数的有效性，从而避免无效的数据进入应用程序。`

* `@Validated 注解通常与其他注解一起使用，例如 javax.validation.constraints 包中的注解，用于对输入参数进行限制和约束`
* `也就是如果经过RequestBody处理后的输入参数如果不符合validate校验，那么就会报错`
```text
@PostMapping("/users")
public void createUser(@RequestBody @Validated User user) {
    // 处理用户创建操作
}
```
* `校验逻辑在User class中定义`
* `例如Validated @NotNull表示username参数不能为空，@Size(min = 6, max = 20)表示password字符长度必须在6-20个长度之间`
```java
public class User {
    @NotNull
    private String username;

    @Size(min = 6, max = 20)
    private String password;

    // getter 和 setter 方法省略
}
```







