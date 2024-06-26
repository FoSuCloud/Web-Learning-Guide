## rabbitmq
* RabbitMQ是一个开源的消息队列中间件，实现了高效的消息传递机制。它最初由Rabbit Technologies Ltd开发，后来成为Pivotal Software（现在是VMware的一部分）的一部分，并于2007年开源。RabbitMQ实现了AMQP（Advanced Message Queuing Protocol）协议，这是一个用于消息传递的开放标准协议。
* RabbitMQ基于生产者-消费者模式，其中生产者将消息发布到交换机（Exchange），而消费者从队列（Queue）中订阅并接收消息。消息可以以不同的方式进行路由和分发，例如直接发送到队列、基于主题的路由、发布/订阅模式等。RabbitMQ提供了灵活的路由、交换机和队列配置选项，使开发者能够根据特定需求灵活地定义消息的路由规则。

* RabbitMQ的主要特点包括：
1、`可靠性`：RabbitMQ确保消息的可靠传递，它支持持久化消息到磁盘，并提供消息确认机制和可靠的消息传输。
2、`弹性和可扩展性`：RabbitMQ允许通过集群部署来提供高可用性和负载均衡。它支持水平扩展，可以通过增加节点来处理更多的消息流量。
3、灵活的路由：RabbitMQ提供了多种交换机类型和路由策略，使开发者可以根据消息的特性和目标来选择适当的路由方式。
4、消息持久化：RabbitMQ支持将消息持久化到磁盘，即使在服务器重启或发生故障时，也能保证消息不会丢失。
5、`多语言支持`：RabbitMQ提供了多种客户端库，支持多种编程语言，如Java、Python、C#、Ruby等，使开发者能够使用自己熟悉的编程语言与RabbitMQ进行交互。
RabbitMQ广泛应用于分布式系统、微服务架构、任务队列、日志收集等场景。它具有良好的可靠性、灵活性和可扩展性，成为构建可靠消息传递系统的重要工具之一。

#### 为什么RabbitMQ正在成为消息通信架构的一种主流选择？
1、`高级消息队列`（`Advanced Messaging Queuing(AMQ)`）模型的基本要素，该模型构成了RabbitMQ的基础。
2、无论你的应用是位于云端还是位于自身的数据中心，RabbitMQ是一种轻量级的、功能非常强大的工具，
可用来构建十分简单抑或异常复杂的分布式软件架构。作为一款消息中间件， 在本章中你将学习RabbitMQ在处理和解决问题时如何为你提供强大的灵活性。
你将了解一些公司对RabbitMQ的使用方式，同时掌握RabbitMQ的关键特性，
正是这些关键特性促使RabbitMQ成为时下最流行的`消息代理服务器（message broker）`之一。

#### 教程
* https://www.rabbitmq.com/

#### 特性
1、开源
2、平台和供应商无关性——作为`实现了具有平台和供应商无关性的高级消息队列协议`
（Advanced Message Queuing Protocol，`AMQP`）规范的一种消息代理服务器，
RabbitMQ为`几乎全部开发语言`提供了`客户端工具`并能运行在所有主流计算机平台上。
3、轻量级——RabbitMQ是轻量级的，运行RabbitMQ核心功能以及诸如管理界面的插件`只需要不到40MB内存`。
请注意`往队列中添加消息可能会增加其内存使用量`。
4、面向大多数现代语言的客户端开发库——作为代理服务器，RabbitMQ提供了一种引人注目的编程模式，其客户端开发库的目标是支持绝大多数编程语言并能运行于多个平台。
当你通过编程与RabbitMQ进行通信时，不受任何供应商或开发语言的限制。
事实上，`当由不同语言实现的应用程序之间需要交互时，把RabbitMQ当作核心组件的场景并不少见。`
RabbitMQ为不同的开发语言之间进行跨操作系统和环境的数据共享提供了一种有用的桥梁，
这些语言包括Java、Ruby、Python、PHP、JavaScript和C＃等。
5、`灵活控制消息通信的平衡性——在消息吞吐量和性能上`，
RabbitMQ提供了一种灵活性用于控制这两者在可靠消息通信上的平衡。
因为它并不是一种“适合所有场景”的应用，`消息在投递之前可以指定为是否持久化到硬盘`；
如果在一个集群中，队列可以被设置成高可用，`即消息会存储在多台服务器中确保在某台服务器宕机时不会丢失`。
6、`高延迟性环境插件`——因为不是所有的网络拓扑和架构都是一样的，RabbitMQ既支持在低延迟环境下的消息通信机制，
也提供了针对如互联网的高延迟环境下的插件。这就使得RabbitMQ可以在同一个本地网络或者在跨越多个数据中心的
共享互联（federated）机制下构建消息集群。
7、第三方插件——作为应用集成的一个关键要素，`RabbitMQ提供了灵活的插件系统`。
例如，当需要RabbitMQ进行数据库直接写入时，就可以使用第三方插件把消息直接存储到数据库中。
8、多层安全——`在RabbitMQ的多个层次中包含着安全性设计`。
客户端连接可以通过使用SSL通信和客户端证书验证以提高安全性。
在虚拟主机（virtual-host）层可以管理用户访问，从而在较高层次实现消息和资源的隔离。
另外，通过配置可以使用正则表达式模式匹配的方式控制从队列中读取消息和把消息写入交换器的过程。
最后，使用插件可与类似LDAP的外部认证系统进行集成。

#### RabbitMQ与Erlang
* 作为一款高性能、稳定且支持集群化的消息代理服务器，RabbitMQ无疑是构建大规模消息架构的核心组件，并在一些重要应用环境中占有一席之地。
* `RabbitMQ基于Erlang语言开发`，该语言是20世纪80年代中后期由Ericsson计算机科学实验室设计的面向电信行业的函数式编程语言。Erlang被设计成一种分布式、高容错的软实时系统，用于构建99.999%可用性的应用系统。
* 作为一种开发语言和运行时系统，`Erlang专注于节点之间消息通信的轻量级进程`，`提供了状态无关的高并发性`。

* `基于并行处理和消息通信设计`，Erlang成为构建类似RabbitMQ的消息代理服务器的自然选择：
* 消息代理服务器作为一种应用程序，维护并发连接、实现消息路由（route）并管理它们的状态。
* 同时，Erlang的分布式通信架构天然可以用于构建RabbitMQ集群机制。
* RabbitMQ集群中的服务器充分利用`Erlang的进程间通信（Inter-Process Communication，IPC）系统`，
* 具备其他竞品消息代理服务器不得不去实现的集群功能

* RabbitMQ集群使用Erlang自带的进程间通信机制实现`虚拟机之间的跨节点通信`、共享状态信息
* 以及允许整个集群内进行消息的发布和消费

#### RabbitMQ与AMQP
* RabbitMQ首发于2007年，互操作性、性能和稳定性是其主要的实现目标。
* 同时，RabbitMQ也是最早实现AMQP规范的消息代理服务器之一。从各个方面来看，它都是一种参考实现。
* AMQP规范可以拆分成两部分，`不仅定义了与RabbitMQ交互的点对点协议`，`也提供了描述RabbitMQ核心功能的逻辑模型`。

* RabbitMQ在支持AMQP的同时，`也支持其他诸如MQTT、Stomp和XMPP等协议`。
* 与其他流行的消息代理服务器相比，RabbitMQ的`协议中立性和插件扩展性`使其成为构建多协议应用架构的明智选择。

#### rabbitmqctl
* RabbitMQ 提供了一个命令行工具 rabbitmqctl，它允许你在命令行中管理 RabbitMQ。
## 获取所有队列
* 要获取所有队列的列表，可以使用 `rabbitmqctl list_queues` 命令：

