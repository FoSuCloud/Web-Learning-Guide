## AOF持久化
* 与`全量式的RDB持久化`功能不同，`AOF提供的是增量式的持久化功能`，这种持久化的核心原理在于：
* 服务器`每次` `执行完写命令之后，都会以协议文本的方式将被执行的命令追加到AOF文件的末尾`。
* 这样一来，服务器在停机之后，`只要重新执行AOF文件中保存的Redis命令，就可以将数据库恢复至停机之前的状态`。

* `在实际的AOF文件中，命令都是以Redis网络协议的方式保存的`
* 例子
```redis
＊2\r\n$6\r\nSELECT\r\n$1\r\n0\r\n
＊3\r\n$3\r\nSET\r\n$2\r\nk1\r\n$2\r\nv1\r\n
＊3\r\n$3\r\nSET\r\n$2\r\nk2\r\n$2\r\nv2\r\n
＊5\r\n$5\r\nRPUSH\r\n$3\r\nlst\r\n$1\r\na\r\n$1\r\nb\r\n$1\r\nc\r\n
```

#### 打开aof持久化功能
* `用户可以通过服务器的appendonly选项来决定是否打开AOF持久化功能：`
```redis
127.0.0.1:6379> config set appendonly yes
OK
```
* 关闭
```redis
127.0.0.1:6379> config set appendonly no
OK
```
* `当AOF持久化功能处于打开状态时，Redis服务器在默认情况下将创建一个名为appendonly. aof的文件作为AOF文件。`

#### 设置AOF文件的冲洗频率
* 为了提高程序的写入性能，现代化的操作系统`通常`会把针对硬盘的多次写操作优化为一次写操作。
* 具体的做法是，当程序调用write系统调用对文件进行写入时，系统并不会直接把数据写入硬盘，
* 而是会先将数据写入位于`内存的缓冲区`中，`等到指定的时限到达或者满足某些写入条件时`，
* `系统才会执行flush系统调用，将缓冲区中的数据冲洗至硬盘。`

* 这种优化机制虽然提高了程序的性能，但是也给程序的写入操作带来了不确定性，特别是对于AOF这样的持久化功能来说，
* `AOF文件的冲洗机制将直接影响AOF持久化的安全性`。为了消除上述机制带来的不确定性，
* `Redis向用户提供了appendfsync选项，以此来控制系统冲洗AOF文件的频率`：
  appendfsync选项拥有always、everysec和no 3个值可选，它们代表的意义分别为：
* ●always——`每执行一个写命令，就对AOF文件执行一次冲洗操作。`
* ●everysec——`每隔1s，就对AOF文件执行一次冲洗操作。`
* ●no——`不主动对AOF文件执行冲洗操作，由操作系统决定何时对AOF进行冲洗。`

这3种不同的冲洗策略不仅会直接影响服务器在停机时丢失的数据量，还会影响服务器在运行时的性能：
●在使用always值的情况下，服务器在停机时`最多只会丢失一个命令的数据`，但使用这种冲洗方式将使Redis服务器的性能降低至传统关系数据库的水平。
●在使用everysec值的情况下，服务器在停机时`最多只会丢失1s之内产生的命令数据`，这是一种兼顾性能和安全性的折中方案。
●在使用no值的情况下，服务器在停机时将`丢失系统最后一次冲洗AOF文件之后产生的所有命令数据`，
至于数据量的具体大小则取决于系统冲洗AOF文件的频率。

* `Redis使用everysec作为appendfsync选项的默认值。`

#### AOF文件的重写
* 随着服务器不断运行，被执行的命令将变得越来越多，而负责记录这些命令的AOF文件也会`变得越来越大`。
* 与此同时，如果服务器曾经对相同的键执行过多次修改操作，那么AOF文件中还会出现多个`冗余命令`。

* 冗余命令的存在不仅增加了AOF文件的体积，并且因为Redis服务器在`停机之后需要通过重新执行AOF文件中保存的命令来恢复数据`，
* 所以`AOF文件中的冗余命令越多，恢复数据时耗费的时间也会越多`。

* 为了减少冗余命令，让AOF文件保持“苗条”，并提供数据恢复操作的执行速度，Redis提供了AOF重写功能，该功能能够
* `生成一个全新的AOF文件，并且文件中只包含恢复当前数据库所需的尽可能少的命令`。

* 例子
```redis
        SELECT 0
        SET msg "hello world! "
        SET msg "good morning! "
        SET msg "happy birthday! "
        SADD fruits "apple"
        SADD fruits "banana"
        SADD fruits "cherry"
        SADD fruits "dragon fruit"
        SREM fruits "dragon fruit"
        SADD fruits "durian"
        RPUSH job-queue 10086
        RPUSH job-queue 12345
        RPUSH job-queue 256512
```
* redis重写之后，苗条变为
```redis
SELECT 0
SET msg "happy birthday! "
SADD fruits "apple" "banana" "cherry" "durian"
RPUSH job-queue 1008612345256512
```

* 用户可以通过执行 `BGREWRITEAOF` 命令或者设置相关的配置选项来触发AOF重写操作

* 首先我们看下appendonly.aof文件内容
```shell
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctimemused-memؾ
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msg,newmsg
                           new messagetitlesssa"*2
$6
SELECT
$1
0
*3
$3
set
$5
title
$1
1
*3
$3
set
$5
title
$1
2
*3
$3
set
$3
msg
$2
11
*3
$3
set
$3
msg
$7
45532aa
```
* 执行优化命令
```redis
127.0.0.1:6379> bgrewriteaof
Background append only file rewriting started
```
* 再看一次
```shell
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctime]oused-memH
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msg45532aanewmsg
                                 new messagetitleaL)
```

* BGREWRITEAOF (`background rewrite aof`)命令是一个异步命令，Redis服务器在接收到该命令之后会创建出一个`子进程`，由它`扫描整个数据库并生成新的AOF文件`。
* 当新的AOF文件生成完毕，子进程就会退出并通知Redis服务器（父进程），然后Redis服务器就会使用新的AOF文件代替已有的AOF文件，借此完成整个重写操作。

* 首先，如果用户发送BGREWRITEAOF命令请求时，服务器`正在创建RDB文件，那么服务器将把AOF重写操作延后到RDB文件创建完毕之后再执行`，
* `从而避免两个写硬盘操作同时执行导致机器性能下降`；其次，如果服务器在执行重写操作的过程中，又接收到了新的BGREWRITEAOF命令请求，那么服务器将返回以下错误：
```redis
redis> BGREWRITEAOF
(error) ERR Background append only file rewriting already in progress
```

#### AOF重写配置选项
* 用户除了可以手动执行BGREWRITEAOF命令创建新的AOF文件之外，还可以通过设置以下两个配置选项让Redis自动触发BGREWRITEAOF命令：
```redis
        auto-aof-rewrite-min-size <value>
        auto-aof-rewrite-percentage <value>
```
* auto-aof-rewrite-min-size选项用于设置`触发自动AOF文件重写所需的最小AOF文件体积`，
* 当AOF文件的体积小于给定值时，服务器将不会自动执行BGREWRITEAOF命令。在默认情况下，该选项的值为：
```redis
        auto-aof-rewrite-min-size 64mb
```
* 也就是说，如果AOF文件的体积小于64MB，那么Redis将不会自动执行BGREWRI-TEAOF命令。

* 至于另一个选项，它控制的是触发自动AOF文件重写所需的文件体积增大比例。举个例子，对于该选项的默认值：
```redis
        auto-aof-rewrite-percentage 100
```
* `表示如果当前AOF文件的体积比最后一次AOF文件重写之后的体积增大了一倍（100%），那么将自动执行一次BGREWRITEAOF命令。`

* 如果Redis服务器刚刚启动，还没有执行过AOF文件重写操作，那么启动服务器时使用的AOF文件的体积将被用作最后一次AOF文件重写的体积。

#### AOF持久化的优缺点
* 与RDB持久化可能会丢失大量数据相比，`AOF持久化的安全性要高得多`：通过使用everysec选项，用户可以将数据丢失的时间窗口限制在1s之内。

* 但是与RDB持久化相比，AOF持久化也有相应的缺点：
  ●首先，因为AOF文件存储的是协议文本，所以它的体积会比包含相同数据、二进制格式的RDB文件要大得多，并且生成AOF文件所需的时间也会比生成RDB文件所需的时间更长。
* ●其次，因为RDB持久化可以直接通过RDB文件恢复数据库数据，而AOF持久化则需要通过执行AOF文件中保存的命令来恢复数据库（前者是直接的数据恢复操作，而后者则是间接的数据恢复操作），所以RDB持久化的数据恢复速度将比AOF持久化的数据恢复速度快得多，并且数据库体积越大，这两者之间的差距就会越明显。
* ●最后，因为AOF重写使用的BGREWRITEAOF命令与RDB持久化使用的BGSAVE命令一样都需要创建子进程，所以在数据库体积较大的情况下，进行AOF文件重写将占用大量资源，并导致服务器被短暂地阻塞。




