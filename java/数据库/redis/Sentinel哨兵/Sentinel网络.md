## Sentinel网络
* 只使用单个Sentinel监视主从服务器并不合适，因为：
1、●单个Sentinel可能会形成`单点故障`，当唯一的Sentinel出现故障时，针对主从服务器的自动故障转移将无法实施。
* 如果同时有多个Sentinel对主服务器进行监视，那么即使有一部分Sentinel下线了，
* 其他Sentinel仍然可以继续进行故障转移工作。

2、●单个Sentinel可能会因为网络故障而无法获得主服务器的相关信息，并因此错误地将主服务器判断为下线，
继而执行实际上并无必要的故障转移操作。如果同时有多个Sentinel对主服务器进行监视，
那么即使有一部分Sentinel与主服务器的连接中断了，`其他Sentinel仍然可以根据自己对主服务器的检测结果做出正确的判断`，以免执行不必要的故障转移操作。


* 为了避免单点故障，并让Sentinel能够给出真实有效的判断结果，我们可以使用`多个Sentinel`组建一个`分布式Sentinel网络`，
* 网络中的各个Sentinel可以通过互通消息来更加准确地判断服务器的状态。
* 在一般情况下，只要Sentinel网络中有`半数以上的Sentinel在线`，`故障转移操作就可以继续进行`。

* 当Sentinel网络中的其中一个Sentinel认为某个主服务器已经下线时，它会将这个主服务器标记为`主观下线`（Subjectively Down, SDOWN），
* 然后`询问`网络中的其他Sentinel，是否也认为该服务器已下线
* （换句话说，也就是其他Sentinel是否也将这个主服务器标记成了主观下线）。
* 当同意主服务器已下线的Sentinel数量达到`sentinel monitor配置选项中quorum参数所指定的数量时`，
* Sentinel就会将相应的主服务器标记为`客观下线`（objectively down, ODOWN），然后开始对其进行`故障转移`。

* 因为Sentinel网络使用客观下线机制来判断一个主服务器是否真的已经下线了，所以为了让这种机制能够有效地运作，
* 用户需要将`quorum参数`的值设置为Sentinel数量的`半数以上，从而形成一种少数服从多数的投票机制`。
* 举个例子，在一个拥有3个Sentinel的网络中，quorum参数的值至少需要设置成2；
* 而在一个拥有5个Sentinel的网络中，quorum参数的值至少需要设置成3；
* 诸如此类。因为构成少数服从多数机制至少需要3个成员进行投票，
* 所以用户至少需要使用3个Sentinel才能构建一个`可信的Sentinel网络`。

#### 组建Sentinel网络
* 组建Sentinel网络的方法非常简单，与启动单个Sentinel时的方法一样：
* `用户只需要启动多个Sentinel`，并使用sentinel monitor配置选项指定Sentinel要监视的主服务器，
* 那些监视相同主服务器的Sentinel就会自动发现对方，`并组成相应的Sentinel网络`。

* 举个例子，如果我们想要构建一个由3个Sentinel组成的Sentinel网络，
* 并让这些Sentinel去监视主服务器website_db，那么可以启动3个Sentinel，并让它们分别载入以下3个Sentinel文件：
```text
# 文件sentinel26379.conf
port 26379
sentinel monitor website_db 127.0.0.16379 2

# 文件sentinel26380.conf
port 26380
sentinel monitor website_db 127.0.0.16379 2

# 文件sentinel26381.conf
port 26381
sentinel monitor website_db 127.0.0.16379 2
```
* 因为在这个例子中，我们需要在同一台机器上启动3个Sentinel，而Sentinel在默认情况下将使用26379作为自己的端口号，
* 所以我们在配置文件中通过port配置选项为3个Sentinel分别指定了各自的端口号，以免造成端口冲突。
* 与各不相同的端口号相反，我们为3个Sentinel设置了相同的sentinel monitor配置选项，并将quorum参数的值设置成了2。
* 这样一来，当Sentinel网络中有两个Sentinel都认为主服务器website_db已经下线时，针对该服务器的故障转移操作就会开始实施。

* 在实际应用中，`用户应该将Sentinel和被监视的Redis服务器放到不同的机器上运行`，
* `并且各个Sentinel也应该放到不同的机器上运行`，这样Sentinel网络才能够`更准确、有效地`判断出服务器的实际状态。


