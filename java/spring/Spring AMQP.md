## Spring AMQP
* Spring AMQP（Advanced Message Queuing Protocol）是一个基于 Spring 框架的开源消息传递框架，`用于在应用程序之间传递消息。`
* 它是在 AMQP 协议之上构建的，`支持多种消息代理（如 RabbitMQ、ActiveMQ 等）`，提供了一个高级的抽象层，使得使用者可以更加方便地使用消息队列和消息主题。

* Spring AMQP 提供了一个易于使用的模型，其中生产者发送消息到消息队列或主题，而消费者从消息队列或主题中接收消息。
* `Spring AMQP 通过监听消息队列或主题中的消息，并自动调用注册的处理程序（消息监听器）来实现消息的接收和处理。`

Spring AMQP 的核心组件包括：
1. RabbitTemplate：用于发送和接收消息。
2. SimpleMessageListenerContainer：用于管理消息监听器和消费者，以便在消息到达时自动调用消息监听器。
3. @RabbitListener：用于在 Spring Boot 应用程序中定义消息监听器。
4. MessageConverter：用于序列化和反序列化消息，以便消息可以在网络上传输。



condition 一般是用户请求参数
vo 是响应参数



