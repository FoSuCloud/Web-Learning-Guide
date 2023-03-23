### validation


#### @Valid
* 在Java中，@Valid是一个注解，用于在实体类中声明属性的约束条件，以便在使用数据校验器时对这些属性进行验证。
* `在使用@Valid注解后，数据校验器会自动根据属性上声明的约束条件进行校验，并在发现违反约束条件时抛出异常。`
```java
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // 使用 @Valid 验证参数
    @PostMapping("/users")
    public ApiResponse createUser(@RequestBody @Valid UserForm form) {
        User user = userService.createUser(form);
        return ApiResponse.success(user);
    }

    // 使用 @Valid 验证返回值
    @GetMapping("/users/{id}")
    public ResponseEntity<@Valid User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }
}
```


#### @Validated 和 @Valid区别
* @Validated 和 @Valid 都是用于 Bean Validation 的注解，可以在 Spring MVC 中使用
1. @Validated 可以对方法级别的参数进行验证，支持分组校验，还可以在验证时使用` SpEL 表达式`进行条件校验。
2. @Valid 可以对方法参数、`方法返回值`以及`类级别的对象进行验证`，不支持分组校验和条件校验。







