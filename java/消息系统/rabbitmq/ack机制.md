## ack
* 在 RabbitMQ 中，ack（acknowledgment，确认）是一种机制，`用于确保消费者成功处理了从队列中获取的消息`。
* 当消息被消费者获取后，RabbitMQ 将等待消费者发送确认消息（ack）来告知它已经成功处理了该消息。
* 如果消费者在处理消息时出现错误，或者处理后的结果无法被确认，可以发送拒绝消息（nack）或拒绝并重新入队消息（reject and requeue）。

* Ack 机制在 RabbitMQ 中起到了确保消息可靠传递的作用，`并且在确保消息不会丢失的同时`，`也可以防止消息被重复消费`。
* 下面是一些关键概念和使用场景：
1、`BasicAck（确认消息）`：当消费者成功处理了从队列中获取的消息后，会向 RabbitMQ 发送 BasicAck 消息来确认。RabbitMQ 收到确认后，会将该消息从队列中删除。这样确保了消息已经被成功处理，并且不会再次被消费。
2、`BasicNack（拒绝消息）`：如果消费者在处理消息时遇到错误或者无法处理该消息，可以发送 BasicNack 来拒绝该消息。拒绝消息时可以选择是否将消息重新放回队列，以便稍后重新处理。
3、`BasicReject（拒绝并重新入队消息）`：与 BasicNack 类似，当消费者无法处理消息时，可以发送 BasicReject 拒绝消息。不同的是，BasicReject 只能将消息重新放回队列，不能选择不重新入队。

#### 手动ack的demo
* 在application.yml中配置 `acknowledge-mode: manual  # 手动ack`
```yml
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 15672
    username: root
    password: 123456
    listener:
      simple:
        acknowledge-mode: manual  # 手动ack
        retry:
          enabled: true
          max-attempts: 3
          max-interval: 10000   # 重试最大间隔时间
          initial-interval: 2000  # 重试初始间隔时间
          multiplier: 2 # 间隔时间乘子，间隔时间*乘子=下一次的间隔时间，最大不能超过设置的最大间隔时间
```
* 生产者代码
```java
@Configuration
public class AssessmentMetricMqConfig {

    public static final String ASSESSMENT_METRIC_EXCHANGE = "assessment_metric_exchange";
队列名称
    public static final String ASSESSMENT_METRIC_QUEUE    = "assessment_queue";
    public static final String ASSESSMENT_ROUTING_KEY     = "assessment_routing_key";

    // 定义持久化队列
    @Bean
    public Queue assessmentMetricQueue() {
        return new Queue(ASSESSMENT_METRIC_QUEUE, true);
    }

    // 这个方法创建了一个直连交换机（Direct Exchange）。同样，交换机也被标记为持久化（true），并且不设置自动删除（false）。
    @Bean
    DirectExchange assessmentMetricDirectExchange() {
        return new DirectExchange(ASSESSMENT_METRIC_EXCHANGE,true,false);
    }
    // 创建了一个绑定关系，将名为 assessment_queue 的队列绑定到名为 assessment_metric_exchange 的直连交换机上，
    // 并且使用 assessment_routing_key 作为绑定的路由键。
    @Bean
    Binding bindingAssessmentMetricExchangeMessage(
            @Qualifier("assessmentMetricQueue") Queue queue,
            @Qualifier("assessmentMetricDirectExchange") DirectExchange exchange
    ) {
        return BindingBuilder.bind(queue).to(exchange).with(ASSESSMENT_ROUTING_KEY);
    }
}
```
* 发送消息代码
```java
@Component
@EnableScheduling
public class MetricPublisher {

    @Autowired
    private AmqpTemplate amqpTemplate;

    private static final Log log = Log.get();
    // 10秒创建一个消息
@Scheduled(cron = "0/10 * * * * ? ")
public void publisherComputeResult() {
    // 创建消息
    MessageProperties messageProperties = new MessageProperties();
    messageProperties.setDeliveryMode(MessageDeliveryMode.PERSISTENT); // 设置持久化属性
    String d = DateUtil.format(new Date(), DatePattern.NORM_DATETIME_PATTERN);
    log.warn(">>>>>>>>>> MetricPublisher 发布消息 测试 >> " + d);
    String message = "RabbitMQ direct ..." + d;
    Message rabbitMessage = new Message(message.getBytes(), messageProperties);
    // 发送消息
    amqpTemplate.convertAndSend(AssessmentMetricMqConfig.ASSESSMENT_METRIC_EXCHANGE,
            AssessmentMetricMqConfig.ASSESSMENT_ROUTING_KEY,
            rabbitMessage);
}
}
```
* `然后我们在消费者代码手动ack响应,channel.basicAck(deliveryTag, false);`
```java
@Component
public class AssessmentMetricListener {
    private static final Log log = Log.get();

    @RabbitListener(queues = AssessmentMetricMqConfig.ASSESSMENT_METRIC_QUEUE, ackMode = "MANUAL")
    public void listen(String msg, @Header(AmqpHeaders.CHANNEL) Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) Long deliveryTag) throws InterruptedException, IOException {
    //
        log.warn("AssessmentMetricListener listen 接收到消息：" + msg);
        // 手动确认消息接收, 第二个参数 false 表示只确认当前消息，不确认之前未确认的消息
        channel.basicAck(deliveryTag, false);
    }
}
```


