package com.example.springdemo.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisNode;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
@Configuration
public class RedisConfig {
    @Value("${spring.redis.password}")
    private String redisPassword;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisClusterConfiguration clusterConfiguration = new RedisClusterConfiguration();
        clusterConfiguration.addClusterNode(new RedisNode("10.1.1.1", 36379));// 对外ip&port
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.1", 6379)); // k8s node的ip&port
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.2", 6379));
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.3", 6379));
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.4", 6379));
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.5", 6379));
        clusterConfiguration.addClusterNode(new RedisNode("192.168.1.6", 6379));
        clusterConfiguration.setPassword(redisPassword);

        LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory(clusterConfiguration);
        connectionFactory.setValidateConnection(true); // 启用连接验证
        // 如果收到 "MOVED" 错误，它将自动重定向请求到正确的节点，并重新执行命令。
        return connectionFactory;
    }
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        // 可以添加其他配置，例如序列化器等
        return template;
    }
}

