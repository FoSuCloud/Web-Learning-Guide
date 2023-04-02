#### Redis 哨兵支持
* Redis Sentinel是Redis的高可用性解决方案，它提供了自动故障转移和配置中心的功能。Redis Sentinel可以监视Redis主服务器和从服务器的状态，并在主服务器下线时自动将从服务器提升为新的主服务器。Redis Sentinel还可以自动重新配置客户端以使用新的主服务器，并通知其他Redis Sentinel实例进行更新。
* Redis Sentinel是通过Redis Sentinel进程来实现的。Redis Sentinel进程是一个独立的进程，它运行在与Redis服务器不同的进程中，并监视Redis服务器的状态。当Redis服务器下线时，Redis Sentinel进程会自动将从服务器提升为新的主服务器，并通知其他Redis Sentinel进程进行更新。Redis Sentinel进程还可以自动重新配置客户端以使用新的主服务器。
* Redis Sentinel支持以下功能：
1. `自动故障转移`：当Redis主服务器下线时，Redis Sentinel可以自动将从服务器提升为新的主服务器，并通知其他Redis Sentinel进行更新。
2. 配置中心：Redis Sentinel可以作为Redis服务器的配置中心，它可以自动检测Redis服务器的配置更改，并通知其他Redis Sentinel进行更新。
3. 监视：Redis Sentinel可以监视Redis服务器的状态，并在Redis服务器出现故障时自动执行故障转移。
4. 通知：Redis Sentinel可以向客户端发送通知，以便客户端可以及时了解Redis服务器的状态。
5. 多个Redis Sentinel：`Redis Sentinel支持多个Redis Sentinel实例，以提高可用性和可靠性。`


* 为了处理高可用的 Redis，Spring Data Redis 支持Redis Sentinel，使用RedisSentinelConfiguration，如下例所示：
```java
/**
 * Lettuce
 */
@Bean
public RedisConnectionFactory lettuceConnectionFactory() {
  RedisSentinelConfiguration sentinelConfig = new RedisSentinelConfiguration()
  .master("mymaster")
  .sentinel("127.0.0.1", 26379)
  .sentinel("127.0.0.1", 26380);
  return new LettuceConnectionFactory(sentinelConfig);
}
```


```java
/**
 * Jedis
 */
@Bean
public RedisConnectionFactory jedisConnectionFactory() {
  RedisSentinelConfiguration sentinelConfig = new RedisSentinelConfiguration()
  .master("mymaster")
  .sentinel("127.0.0.1", 26379)
  .sentinel("127.0.0.1", 26380);
  return new JedisConnectionFactory(sentinelConfig);
}
```