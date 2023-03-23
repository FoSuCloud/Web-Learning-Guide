## redis




#### getExpire
* `getExpire是一种在RedisTemplate中提供的方法，用于获取指定key的剩余生存时间`
```text
RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
redisTemplate.setConnectionFactory(jedisConnectionFactory);

// 获取key的剩余生存时间（单位为秒）
Long expire = redisTemplate.getExpire("myKey");
```










