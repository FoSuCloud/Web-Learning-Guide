#### 通过 RedisTemplate 使用对象
* 大多数用户可能会使用RedisTemplate及其对应的包，org.springframework.data.redis.core. 
* `由于其丰富的功能集，模板实际上是 Redis 模块的核心类。`
* 该模板为 Redis 交互提供了高级抽象
* 虽然RedisConnection提供了接受和返回二进制值（数组）的低级方法byte，`但该模板负责序列化和连接管理，使用户无需处理此类细节。`


#### redisTemplate通用接口
* 此外，该模板提供了操作视图（根据 Redis 命令参考中的分组），这些视图提供了丰富的通用接口，用于处理特定类型或特定键（通过接口KeyBound）
* https://redis.io/commands/

* 配置后，该模板是线程安全的，可以跨多个实例重复使用。
* RedisTemplate它的大部分操作都使用基于 Java 的序列化程序。这意味着模板写入或读取的任何对象都通过 Java 进行序列化和反序列化。

* 对于需要特定模板视图的情况，将视图声明为依赖项并注入模板。容器自动执行转换，消除opsFor[X]调用，如以下示例所示：
```java
@Configuration
class MyConfig {

  @Bean
  LettuceConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory();
  }

  @Bean
  RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

    RedisTemplate<String, String> template = new RedisTemplate<>();
    template.setConnectionFactory(redisConnectionFactory);
    return template;
  }
}
```
```java
public class Example {

  // inject the actual template
  @Autowired
  private RedisTemplate<String, String> template;

  // inject the template as ListOperations
  @Resource(name="redisTemplate")
  private ListOperations<String, String> listOps;

  public void addLink(String userId, URL url) {
    listOps.leftPush(userId, url.toExternalForm());
  }
}
```



