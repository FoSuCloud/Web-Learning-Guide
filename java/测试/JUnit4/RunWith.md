#### RunWith
* @RunWith 是 JUnit4 中的一个注解，它`指定了运行测试时所使用的测试运行器（Test Runner）。`
* @RunWith(SpringRunner.class)在这个注解中，SpringRunner 是一个 Spring 框架提供的测试运行器，`用于运行基于 Spring 框架的单元测试。`
```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class MyServiceTest {

    @Autowired
    private MyService myService;

    @Test
    public void testMyService() {
        // 使用 myService 进行测试
        // ...
    }

}
```








