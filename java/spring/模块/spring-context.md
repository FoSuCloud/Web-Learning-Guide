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

#### @EnableCaching
* @EnableCaching注解用于启用Spring cache功能
* `在spring配置类上添加@EnableCaching注解时，spring将会自动创建一个缓存管理器，这个缓存管理器将会管理整个应用程序的缓存`
* 同时，`在方法上使用 @Cacheable、@CachePut、@CacheEvict 等注解，就可以实现对方法调用结果的缓存`，从而提高应用程序的性能。

```java
@Configuration
@EnableCaching
public class AppConfig {
   //...
}
```
* 使用@EnableCaching注解时，需要在配置文件中配置缓存的具体实现。比如redis,ehcache,cfaffeine等缓存实现
* `在配置文件中，需要配置一个cacheManager对象，这个对象用于管理缓存。`
* 同时，在使用缓存注解时，需要指定缓存的名字，这个名字将会在cacheManager中被使用
* 使用redis作为缓存实现的例子
```java
@Configuration
@EnableCaching
public class AppConfig {
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new JedisConnectionFactory();
    }

    @Bean
    public CacheManager cacheManager() {
        //首先配置了 Redis 连接工厂
//        然后通过 RedisCacheManager 创建了一个缓存管理器
//        最后将这个缓存管理器注入到 Spring 容器中
        RedisCacheManager cacheManager = RedisCacheManager.builder(redisConnectionFactory())
                .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofMinutes(10)))
                .build();
        return cacheManager;
    }
}
```
* 使用 @Cacheable、@CachePut、@CacheEvict 注解时，需要指定缓存名字。
```java
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Cacheable(value = "userCache", key = "#id")
    public User getUserById(Long id) {
        return userDao.getUserById(id);
    }
}
```
* `@Cacheable注解的value属性指定了缓存的名字为userCache，key指定了缓存的键值`

#### @Bean
* @Bean 注解是 Spring 框架中用来声明 bean 的注解之一。
* `当一个类被标注为 @Bean 时，Spring 容器会自动根据该类的定义创建一个 bean 实例，并将其纳入到容器中进行管理。`
* 相对于使用 @Component 注解来自动扫描并创建 bean，
* 使用 @Bean 注解可以更加精细地控制 bean 的创建过程，例如可以在方法内部进行条件判断、调用其他 bean 等操作。
* 下面是一个调用@Bean注解创建bean的例子：
```java
@Configuration
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserServiceImpl();
    }
}
```
* @Bean 注解标注在 userService 方法上，表示这个方法返回一个 bean 实例，并将其纳入到 Spring 容器中进行管理。
* 在这个例子中，`userService 方法返回一个 UserServiceImpl 类型的对象，表示这个对象将会被作为一个 bean 进行管理。`
* `在其他类中，可以通过 @Autowired 注解将这个 bean 注入到其他对象中进行使用。`

* `通过参数来指定bean的名称`
```java
@Configuration
public class AppConfig {

    @Bean("myUserService")
    public UserService userService() {
        return new UserServiceImpl();
    }
}
```
* @Bean 注解的参数为 "myUserService"，表示这个 bean 的名称为 "myUserService"，可以在其他地方通过名称进行注入。

* `@Bean 注解也可以指定依赖关系，表示这个 bean 需要依赖其他 bean 才能正常创建`
* `userService 方法的参数为 UserDao 类型的对象，表示这个 bean 依赖于 UserDao bean。`
* `在创建 userService bean 的时候，Spring 容器会自动将 UserDao bean 注入到 userService 方法中，从而创建一个完整的 UserService 实例。`
```java
@Configuration
public class AppConfig {
    @Bean
    public UserDao userDao() {
        return new UserDaoImpl();
    }

    @Bean
    public UserService userService(UserDao userDao) {
        return new UserServiceImpl(userDao);
    }
}
```

#### @Bean使用流程
* 假设我们有一个简单的应用程序，需要管理用户信息和商品信息。我们可以通过定义两个 Java 类来表示这些信息
```java
public class User {
    private int id;
    private String name;
    // getters and setters
}

public class Product {
    private int id;
    private String name;
    private double price;
    // getters and setters
}
```
* 使用spring的ioc机制，将这些类作为spring bean进行管理
```java
@Configuration
public class AppConfig {
    @Bean
    public User user() {
        User user = new User();
        user.setId(1);
        user.setName("Alice");
        return user;
    }

    @Bean
    public Product product() {
        Product product = new Product();
        product.setId(1001);
        product.setName("iPhone");
        product.setPrice(999.99);
        return product;
    }
}
```
* 在上面声明了两个方法 user, product，分别用于创建User和Product对象，并且将他们注册为Spring Bean,
* 然后我们可以在其他组件中通过@Autowired注解来注入这些Bean
```java
@Component
public class OrderService {
    @Autowired
    private User user;

    @Autowired
    private Product product;

    public void placeOrder() {
        System.out.println("Placing order for user " + user.getName() + " and product " + product.getName());
    }
}
```
* 通过使用 Spring Bean，我们可以实现组件之间的松耦合，提高代码的可维护性和可测试性。此外，Spring Bean 还提供了丰富的生命周期管理功能，
* 可以在 Bean 的创建、初始化和销毁阶段执行各种操作，以满足不同应用场景的需求。

#### @EnableScheduling
* @EnableScheduling 是 Spring 框架中的一个注解，`用于启用 Spring 中的定时任务功能`。
* 它可以标注在一个 `Spring 配置类上`，用于启用 Spring 对定时任务的支持。

* 在启用了 @EnableScheduling 注解后，`可以使用 @Scheduled 注解来定义定时任务，这样可以使得 Spring 自动定时执行相应的任务`。
* `@Scheduled 注解有多个属性，包括定时任务的时间间隔、定时任务的起始时间、定时任务的执行条件等`

* `在启用定时任务功能后，Spring 会自动创建一个 TaskScheduler 对象，并将其注册到 Spring 上下文中。`
* `TaskScheduler 是 Spring 定时任务的核心接口之一，用于管理所有定时任务的执行情况`
* `可以通过注入 TaskScheduler 对象来实现对定时任务的更加灵活的控制。`

#### 创建定时任务的例子
* 首先在spring配置类上添加@EnableScheduling注解
```java
@Configuration
@EnableScheduling
public class AppConfig {
   // 配置其他的 Bean
}
```
* `然后在需要定时执行的方法上添加 @Scheduled 注解,指定定时任务的时间间隔和起始时间等信息`
* `并且@Scheduled 可以使用cron表达式 来表示定时规则`
```java
@Component
public class MyTask {
    @Scheduled(fixedDelay = 5000) // 间隔 5 秒
    public void doSomething() {
        // 定时执行的任务
    }
}
```

#### @Aspect
*  @Aspect 注解，表示它是一个切面类，用于定义切点和切面的具体逻辑
```java
@Aspect
@Component
public class MyAspect {
 
    @Pointcut("execution(* com.example.demo.MyService.*(..))")
    public void myPointcut() {}
 
    @Before("myPointcut()")
    public void beforeAdvice() {
        System.out.println("Before Advice");
    }
 
    @After("myPointcut()")
    public void afterAdvice() {
        System.out.println("After Advice");
    }
}

```

#### @Service
* `@Service 是 Spring 框架中的一种注解，用于标注一个类为服务层组件。`
* `使用 @Service 注解标注一个类后，Spring 容器会自动将该类实例化并注入到其他需要使用该服务的组件中。`
```java
@Service
public class MyServiceImpl implements MyService {
 
    @Override
    public void myMethod() {
        System.out.println("My Method");
    }
}
```


#### @EnableAspectJAutoProxy
* @EnableAspectJAutoProxy用于`启用基于AspectJ 的自动代理功能`。该注解通常用于配置 Spring 应用程序中的切面和通知，以实现面向切面编程。

* 在使用 @EnableAspectJAutoProxy 注解时，`Spring 容器会自动扫描应用程序中的切面和通知，并基于 AspectJ 语法自动生成代理类。`
* 代理类在运行时会拦截被代理的目标对象方法的调用，并根据切面和通知的定义进行增强处理。
* 通过这种方式，`可以在不改变目标对象源码的情况下，对其方法进行增强，实现横切关注点的统一管理。`

* @EnableAspectJAutoProxy 注解可以通过以下属性进行配置：
1. proxyTargetClass：`指定是否使用 CGLIB 代理，默认为 false，表示使用 JDK 动态代理。`
2. exposeProxy：`指定是否将当前代理对象暴露为 ThreadLocal 变量`，默认为 false。
3. order：`指定代理对象在 Spring AOP 代理链中的顺序`，默认为 Ordered.LOWEST_PRECEDENCE。

* 如何使用@EnableAspectJAutoProxy 注解启用基于 AspectJ 的自动代理功能：
```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
    @Bean
    public MyAspect myAspect() {
        return new MyAspect();
    }
    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```
* @EnableAspectJAutoProxy 注解用于启用 AspectJ 自动代理，可以自动为标注了 @Aspect 注解的类创建代理对象，并将其作为 Spring Bean 注入到容器中。
* `当程序运行时，Spring 容器会自动为 MyAspect 类创建代理对象，并将它与 MyService 类关联起来。`
* `这样，当调用 MyService 类的方法时，AspectJ 会自动拦截并执行 MyAspect 类中定义的切面逻辑。`

#### @Repository
* `在Spring框架中，@Repository注解是用来标记数据访问层（DAO）类的注解。`
* 它是一个`在Spring上下文中启用数据访问层的组件扫描的注解，它的作用是让Spring框架知道这个类的作用`，以便进行适当的处理和管理。

* @Repository注解是Spring框架中的一个通用的注解，它和@Service和@Component注解一样，都是用来定义Spring bean的注解。

* @Repository注解的作用是：
1. 声明该类是数据访问层的组件，告诉Spring框架该类的作用。
2. 为该类提供异常转译的功能。该注解会将平台特定的异常（例如，JDBC SQLException）转换为Spring的数据访问异常，这样上层的代码就可以统一处理这些异常。
3. 自动处理持久化异常。使用该注解后，Spring会为DAO层提供自动处理的功能，当出现异常时，它会自动执行回滚操作。


#### 装配Bean
* 当需要在测试中使用一个真正的Bean实例时，可以`使用@Autowired注解将该实例注入到测试类中`。
* 当需要模拟一个Bean实例时，可以`使用@MockBean注解将其替换掉`。



