## Sentinel管理命令

#### SENTINEL masters
* 获取所有被监视主服务器的信息

#### SENTINEL master
* 获取指定被监视主服务器的信息
* `        SENTINEL master <master-name>`

#### SENTINEL slaves
* 获取被监视主服务器的`从服务器`信息
* `SENTINEL slaves <master-name>`

#### SENTINEL sentinels
* 获取监视同一master的其他Sentinel的相关信息
* `SENTINEL sentinels <master-name>`

#### SENTINEL get-master-addr-by-name
* 获取给定主服务器的IP地址和端口号，通过给定主服务器的名字来获取该服务器的IP地址以及端口号：
* `        SENTINEL get-master-addr-by-name <master-name>`
* 例如
```redis
        127.0.0.1:26379> SENTINEL get-master-addr-by-name website_db
        1) "127.0.0.1"
        2) "6379"
```

#### SENTINEL reset
* 重置主服务器状态,reset命令接受一个glob风格的模式作为参数，接收到该命令的Sentinel将重置所有与给定模式相匹配的主服务器：

* 接收到SENTINEL reset命令的Sentinel除了会`清理被匹配主服务器的相关信息`之外，
* 还会`遗忘被匹配主服务器目前已有的所有从服务器`，`以及正在监视被匹配主服务器的所有其他Sentinel`。
* 在此之后，这个Sentinel将会`重新搜索正在监视`被匹配主服务器的其他Sentinel，以及该服务器属下的各个`从服务器`，
* `并与它们重新建立连接`。

* 例子
```text
127.0.0.1:26379> SENTINEL reset website_db
(integer) 1     --有一个主服务器被重置了
```

* 例子，匹配
```text
127.0.0.1:26379> SENTINEL reset website_＊
(integer) 1
```
* 因为SENTINEL reset命令可以让Sentinel忘掉主服务器之前的记录，并重新开始对主服务器进行监视，
* 所以它通常只会在Sentinel网络或者被监视主从服务器的结构出现`重大变化时使用。`

#### SENTINEL failover
* 强制执行故障转移,用户可以强制对指定的主服务器实施故障转移，就好像它已经下线了一样：
* `        SENTINEL failover <master-name>`
* 接收到这一命令的Sentinel会`直接对主服务器执行故障转移操作(不投票！)`，
* 而不会像平时那样，先在Sentinel网络中进行投票，然后再根据投票结果决定是否执行故障转移操作。

#### SENTINEL ckquorum
* `检查可用Sentinel的数量`, 检查Sentinel网络当前可用的Sentinel数量是否达到了`判断主服务器客观下线并实施故障转移所需的数量`：
* `        SENTINEL ckquorum <master-name>`

#### SENTINEL flushconfig
* 强制写入配置文件,让Sentinel将它的`配置文件重新写入硬盘中`：

* 因为Sentinel在被监视服务器的状态发生变化时就会自动重写配置文件，
* 所以这个命令的作用就是`在配置文件基于某些原因或错误而丢失时`，`立即生成一个新的配置文件`。
* 此外，当Sentinel的配置选项发生变化时，Sentinel内部也会使用这个命令创建新的配置文件来替换原有的配置文件。


