## bean


#### MockBean 和 SpyBean
* @MockBean 和 @SpyBean 注解都是用于测试时用来模拟或者监视 Spring Bean 的行为的注解。
* 它们都是 spring-boot-test 模块提供的注解

* `@MockBean 注解用于模拟一个 Spring Bean，它会在 Spring 上下文环境中替换被模拟的 Bean，用于测试时，对被模拟的 Bean 的方法进行验证或者模拟它的行为。`
* `由于MockBean会影响Spring上下文环境，所以使用的时候需要注意，如果使用了，不一定可以，因为别的地方可能需要的是真实Bean`

  * `@SpyBean 注解则用于监视一个 Spring Bean，它会在 Spring 上下文环境中使用真实的 Bean，
* `并在该 Bean 上增加监视的行为，用于测试时，对 Bean 的方法调用进行监视，可以获取到真实的 Bean 执行结果，也可以修改 Bean 的行为，比如返回一个自定义的值等。`

* `@MockBean 注解是用于完全模拟一个 Bean，而 @SpyBean 注解是用于保留部分真实的 Bean 行为，并对其进行监视。`

```java
public interface UserService {
    User findById(Long id);
    User save(User user);
}

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @SpyBean
    private UserValidator userValidator;

    @Test
    public void testFindById() {
        Long userId = 1L;
        User user = new User(userId, "Alice");
        Mockito.when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User result = userService.findById(userId);

        assertEquals(user, result);
        Mockito.verify(userValidator).validate(user);
    }

    @Test
    public void testSave() {
        User user = new User(null, "Alice");

        User savedUser = new User(1L, "Alice");
        Mockito.when(userRepository.save(user)).thenReturn(savedUser);

        User result = userService.save(user);

        assertEquals(savedUser, result);
        Mockito.verify(userValidator).validate(savedUser);
    }
}
```
* @MockBean注解用于将UserRepository对象替换为Mock对象，Mock对象中的方法行为可以通过Mockito API进行控制；
* @SpyBean注解用于创建UserValidator对象的Spy对象，Spy对象中的方法行为与真实对象相同，但可以通过Mockito API对部分方法进行调整，例如跳过某些方法的执行。

