## 在线配置Sentinel
* 手动修改配置文件并重启的做法不仅`麻烦`、`容易出错`，而且在运行过程中停止Sentinel还`可能导致主服务器失去有效的监控`。

* 为此，Redis从2.8.4版本开始为SENTINEL命令新添加了一组子命令，这些子命令可以在线地修改Sentinel对于被监视主服务器的配置选项，
* `并把修改之后的配置选项保存到配置文件中`，整个过程`完全不需要停止Sentinel`，`也不需要手动修改配置文件`，非常方便。

#### SENTINEL monitor
* `监视给定主服务器,用户可以让Sentinel开始监视一个新的主服务器：`
* `        SENTINEL monitor <master-name> <ip> <port> <quorum>`

* SENTINEL monitor命令本质上就是SENTINEL monitor配置选项的命令版本，当我们想要让Sentinel监视一个新的主服务器，
* `但是又不想重启Sentinel并手动修改Sentinel配置文件时`就可以使用这个命令。

* 例如，我们可以通过执行以下命令，让Sentinel 26379开始监视名为message_queue_db的主服务器，这个主服务器目前的IP地址为127.0.0.1，端口号为10086：
* `        127.0.0.1:26379> SENTINEL monitor message_queue_db 127.0.0.110086 2`

#### SENTINEL remove
* 取消对给定主服务器的监视,接收到这个命令的Sentinel会`停止对给定主服务器的监视`，
* 并`删除Sentinel内部以及Sentinel配置文件中与给定主服务器有关的所有信息`，然后返回OK表示操作执行成功。
* `        SENTINEL remove <masters-name>`

#### SENTINEL set
* 修改Sentinel配置选项的值,用户可以`在线修改Sentinel配置文件中与主服务器相关的配置选项值`：
* `        SENTINEL set <master-name> <option> <value>`
* 只要是Sentinel配置文件中与主服务器有关的配置选项，都可以使用SENTINEL set命令`在线进行配置`。
* 命令在成功修改给定的配置选项值之后将返回OK作为结果。

#### 只会对接收到命令的单个Sentinel生效
* 以上介绍的各个在线配置命令`只会对接收到命令的单个Sentinel生效`，`但并不会对同一个Sentinel网络的其他Sentinel产生影响`。
* 为了将新的配置选项传播给整个Sentinel网络，用户需要对同一个Sentinel网络中的所有Sentinel都执行相同的命令。

#### Sentinel网络中的各个Sentinel可以拥有不同的quorum值
* Redis Sentinel允许用户为Sentinel网络中的每个Sentinel分别设置主服务器的quorum值，
* 而不是让所有Sentinel都共享同一个quorum值，
* 这种做法使得用户可以在有需要时，灵活地根据各个Sentinel所处的环境来调整自己的quorum值。

* 如果一部分Sentinel与被监视主服务器的`网络连接情况较好`，`或者两者在网络上的距离较近`，
* 那么这些Sentinel对于主服务器的`下线判断就会更为准确`，用户就可以把它们的`quorum值调得小一些`，
* 使得这些Sentinel可以`快速地对下线的主服务器进行故障转移`。

* 相反，如果一部分Sentinel与被监视主服务器的网络连接情况较差，或者两者在网络上的距离较远，
* 那么这些Sentinel对于主服务器的下线判断的准确性就会差一些，如果把它们的quorum值设置得太小，
* 可能会错误地触发故障转移操作。为此，
* 用户可以把这些Sentinel的quorum值`调大一些`，确保`只有在多个Sentinel都认为主服务器已下线时，才执行故障转移操作`。




