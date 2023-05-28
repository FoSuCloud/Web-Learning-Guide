## redis
* [参考](https://docs.spring.io/spring-data/data-redis/docs/current/reference/html/#redis:setup)
* Spring Redis 需要 Redis 2.6 或更高版本，并且 Spring Data Redis 与Lettuce和Jedis集成，这两个流行的 Redis 开源 Java 库。

### 进入redis
* `redis-cli 输入改命令，启动redis-cli客户端

#### (error) NOAUTH Authentication required.
* `提示需要进行身份验证`
* `输入命令：AUTH your_password 进行身份验证`

### RedisConnection
* RedisConnection为 Redis 通信提供核心构建块，`因为它处理与 Redis 后端的通信。`
* 它还`会自动将底层连接库异常转换为 Spring 一致的 DAO 异常层次结构`，以便您可以在不更改任何代码的情况下切换连接器，因为操作语义保持不变。

* `活动RedisConnection对象是通过创建的RedisConnectionFactory`

### lettuce连接器
* `Lettuce是一个基于Netty的开源连接器,由 Spring Data Redis 通过包支持org.springframework.data.redis.connection.lettuce。`
* 创建新的 Lettuce 连接工厂
```java
@Configuration
class AppConfig {
  @Bean
  public LettuceConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory(new RedisStandaloneConfiguration("server", 6379));
  }
}
```
* `Lettuce 与 Netty 的原生传输集成，让您使用 Unix 域套接字与 Redis 通信。确保包含与您的运行时环境相匹配的适当的本机传输依赖项。`

### jedis连接器
* `Jedis是一个社区驱动的连接器，由 Spring Data Redis 模块通过包支持org.springframework.data.redis.connection.jedis`
```java
@Configuration
class RedisConfiguration {
    @Bean
    public JedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration("server", 6379);
        return new JedisConnectionFactory(config);
    }
}
```

#### Lettuce和Jedis区别
* `Lettuce和Jedis都是Java连接Redis服务器的客户端库`。它们都提供了一种简单的方式来与Redis进行交互。但是，它们之间有一些区别。
* Lettuce是一个基于Netty的开源库，它提供了异步和同步的API，支持集群，Sentinel，管道和事务等功能。
* Lettuce的异步API是非阻塞的，它使用Netty的`事件驱动模型来处理I/O操作`。这使得`Lettuce在高并发环境下表现更好，因为它可以处理更多的连接和请求`。

* Jedis是一个基于Java的开源库，它提供了同步和异步的API，但不支持集群，Sentinel，管道和事务等功能。
* Jedis的同步API是阻塞的，它使用Java的`阻塞I/O模型来处理I/O操作。这使得Jedis在高并发环境下表现不佳，因为它不能处理更多的连接和请求`。

* 您不需要同时使用Lettuce和Jedis。您可以根据您的需求选择其中一个。
* 如果您需要处理高并发环境下的大量连接和请求，则应该使用Lettuce。
* 如果您只需要处理少量连接和请求，则可以使用Jedis。
* 但是，如果您需要使用Redis的集群，Sentinel，管道或事务等功能，则必须使用Lettuce，因为Jedis不支持这些功能。


#### getExpire
* `getExpire是一种在RedisTemplate中提供的方法，用于获取指定key的剩余生存时间`
```text
RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
redisTemplate.setConnectionFactory(jedisConnectionFactory);

// 获取key的剩余生存时间（单位为秒）
Long expire = redisTemplate.getExpire("myKey");
```










