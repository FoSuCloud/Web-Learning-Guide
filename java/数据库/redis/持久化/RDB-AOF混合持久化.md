## RDB-AOF混合持久化
* Redis的两种持久化方式，它们都有各自的优点和缺点：
●RDB持久化可以生成紧凑的RDB文件，并且使用RDB文件进行数据恢复的速度也非常快，但是RDB的全量持久化模式可能会让服务器在停机时丢失大量数据。
●与RDB持久化相比，AOF持久化可以将丢失数据的时间窗口限制在1s之内，
* 但是协议文本格式的`AOF文件的体积将比RDB文件要大得多`，并且`数据恢复过程也会相对较慢`。


* `Redis从4.0版本开始引入RDB-AOF混合持久化模式，这种模式是基于AOF持久化模式构建而来的——如果用户打开了服务器的AOF持久化功能`

`        aof-use-rdb-preamble <value>`
* 选项的值设置成了yes，那么Redis服务器在执行AOF重写操作时，就会像执行BGSAVE命令那样，
* `根据数据库当前的状态生成出相应的RDB数据，并将这些数据写入新建的AOF文件中`，
* 至于那些在`AOF重写开始之后执行的Redis命令`，则会`继续以协议文本的方式追加到新AOF文件的末尾`，即`已有的RDB数据的后面`。

* `在开启了RDB-AOF混合持久化功能之后，服务器生成的AOF文件将由两个部分组成，`
* `其中位于AOF文件开头的是RDB格式的数据，而跟在RDB数据后面的则是AOF格式的数据`

```redis
127.0.0.1:6379> config set aof-use-rdb-preamble yes
OK
127.0.0.1:6379> set msg "abc"
OK
127.0.0.1:6379> set title 4565
OK
127.0.0.1:6379> set newmsg "[[[["
OK
127.0.0.1:6379> bgrewriteaof
Background append only file rewriting started
```
* 重写之后我们看下appendonly.aof
```angular2html
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctimexused-mem8
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msgabcnewmsg[[[[titlea+ϲ`# ^[[A^C
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctimexused-mem8
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msgabcnewmsg[[[[titlea+ϲ`# ls
appendonly.aof  debug.lua  dump.rdb  get.lua
# cat dump.rdb
REDIS0009       redis-ver5.0.14
redis-bits@ctimexused-mem°
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msgabcnewmsg[[[[titlea 9m# ls
appendonly.aof  debug.lua  dump.rdb  get.lua
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctimexused-mem8
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msgabcnewmsg[[[[titlea+ϲ`
```
* `然后我们在重写之后再修改一下数据，看看AOF文件的变化`
* `可以看到，新的AOF文件中，RDB数据的后面又追加了一条AOF格式的数据`

```redis
```redis
# cat appendonly.aof
REDIS0009       redis-ver5.0.14
redis-bits@ctimexused-mem8
aof-preamble
            mini-stream
k1k1
ministream%@@Bk1         v1 "k2v2 ! &@3 3 -4 4 0/(5 5-#6 6#<7 G8 8`]5l@Tk10v [myset
1.333.2221o!51.13msgabcnewmsg[[[[titlea+ϲ`*2
$6
SELECT
$1
0
*3
$3
set
$3
msg
$8
after bg
```

* `通过使用RDB-AOF混合持久化功能，用户可以同时获得RDB持久化和AOF持久化的优点：服务器既可以通过AOF文件包含的RDB数据来实现快速的数据恢复操作，又可以通过AOF文件包含的AOF数据来将丢失数据的时间窗口限制在1s之内。`

* `Redis目前默认是没有打开RDB-AOF混合持久化功能的：`
`        aof-use-rdb-preamble no`


