## lua脚本
* redis它可以让用户在Redis服务器`内置的Lua解释器`中执行指定的Lua脚本。
* `被执行的Lua脚本可以直接调用Redis命令`，`并使用Lua语言及其内置的函数库处理命令结果`。

* Lua脚本特性的出现给Redis带来了很大的变化，其中最重要的就是使得用户可以按需对Redis服务器的功能进行扩展：
* 在Lua脚本特性出现之前，用户如果想要给Redis服务器增加新功能，那么只能自行修改Redis服务器源码

* Lua脚本带来的第二个变化与它的执行机制有关：Redis服务器以原子方式执行Lua脚本，
* `在执行完整个Lua脚本及其包含的Redis命令之前，Redis服务器不会执行其他客户端发送的命令或脚本`，
* `因此被执行的Lua脚本天生就具有原子性。`

* 乐观锁事务使用起来并不容易，一不小心就会导致程序出错或者加锁失效，如果我们使用天生具有原子性的Lua脚本来编写相同的程序，那么实现代码将会变得简单很多。

* Lua脚本的另一个好处是它能够`在保证原子性的同时，一次在脚本中执行多个Redis命令`：
* 对于需要在客户端和服务器之间往返通信多次的程序来说，使用Lua脚本可以有效地提升程序的执行效率。
* 虽然使用流水线加上事务同样可以达到一次执行多个Redis命令的目的，`但Redis提供的Lua脚本缓存特性能够更为有效地减少带宽占用`。

#### EVAL 执行脚本
* `可以使用EVAL命令来执行给定的Lua脚本：`
`        EVAL script numkeys key [key ...] arg [arg ...]`
  其中：
* ●script参数用于传递脚本本身。因为Redis目前内置的是Lua 5.1版本的解释器，所以用户在脚本中也只能使用Lua 5.1版本的语法。
* ●`numkeys参数用于指定脚本需要处理的键数量，而之后的任意多个key参数则用于指定被处理的键`。
* 通过key参数传递的键可以在脚本中通过KEYS数组进行访问。根据Lua的惯例，KEYS数组的索引将以1为开始：
* 访问`KEYS[1]可以取得第一个传入的key参数`，访问KEYS[2]可以取得第二个传入的key参数，以此类推。
* ●任意多个`arg参数用于指定传递给脚本的附加参数(排除掉前numkeys个参数后(给KEYS的)，剩下的都是ARGV参数)`，这些参数可以在脚本中通过ARGV数组进行访问。
* 与KEYS参数一样，ARGV数组的索引也是以1为开始的。`ARGV[1]可以取得第一个传入的ARGV参数`

* 例子：
```redis
127.0.0.1:6379> eval "return 'hello world'" 0
"hello world"
```
* `0表示没有参数，return 'hello world'表示直接返回字符串'hello world'`

#### 使用脚本执行redis命令
* Lua脚本的强大之处在于它可以让用户直接在脚本中执行Redis命令，
* 这一点可以通过在`脚本中调用redis.call()函数或者redis.pcall()函数来完成`：
```redis
redis.call(command, ...)
redis.pcall(command, ...)
```
* `例子：注意KEYS[1]可以取得第一个传入的key参数,注意大小写严格！`
```redis
127.0.0.1:6379> eval "return redis.call('set',KEYS[1],ARGV[1])" 1 msg 'my msg'
OK
127.0.0.1:6379> get msg
"my msg"
```

* 除了numkeys需要的前num个参数外，剩下的都是argv参数
```redis
127.0.0.1:6379> eval "return redis.call('set',KEYS[1],ARGV[2])" 1 msg 'my msg' 3333
OK
127.0.0.1:6379> get msg
"3333"
```
* `可以看到我们只改了newmsg参数，因为我们设置的是KEYS[2],ARGV[2]`
```redis
127.0.0.1:6379> eval "return redis.call('set',KEYS[2],ARGV[2])" 2 msg newmsg 'old msg' 'new message'
OK
127.0.0.1:6379> get newmsg
"new message"
127.0.0.1:6379> get msg
"3333"
```

#### redis.call()和redis.pcall()的区别
* redis.call()函数和redis.pcall()函数都可以用于执行Redis命令，它们之间唯一不同的就是处理错误的方式。
* 前者在执行命令出错时会引发一个Lua错误，迫使EVAL命令向调用者返回一个错误；
* `而后者则会将错误包裹起来，并返回一个表示错误的Lua表格：`

```redis
-- Lua的type()函数用于查看给定值的类型
redis> EVAL "return type(redis.call('WRONG_COMMAND'))" 0
(error) ERR Error running script (call to f_2c59998e8c4eb7f9fdb467ba67ba43dfaf8a6592): @user_script:1: @user_script: 1: Unknown Redis command called from Lua script 
redis> EVAL "return type(redis.pcall('WRONG_COMMAND'))" 0
"table"
```

#### 值转换
* 在EVAL命令出现之前，Redis服务器中只有一种环境，那就是Redis命令执行器所处的环境，这一环境接受Redis协议值作为输入，然后返回Redis协议值作为输出。

* 但是随着EVAL命令以及Lua解释器的出现，使得Redis服务器中同时出现了两种不同的环境：
* 一种是Redis命令执行器所处的环境，而另一种则是Lua解释器所处的环境。因为这两种环境使用的是不同的输入和输出，所以在这两种环境之间传递值将引发相应的转换操作：

1）当Lua脚本通过redis.call()函数或者redis.pcall()函数执行Redis命令时，
传入的Lua值将被转换成Redis协议值；比如，当脚本调用redis.call('SET', KEYS[1],ARGV[1])的时候，`'SET'、KEYS[1]以及ARGV[1]都会从Lua值转换为Redis协议值`。
2）当redis.call()函数或者redis.pcall()函数执行完Redis命令时，命令返回的Redis协议值将被转换成Lua值。
比如，`当redis.call('SET', KEYS[1], ARGV[1])执行完毕的时候`，`执行SET命令所得的结果OK将从Redis协议值转换为Lua值`。
3）当Lua脚本执行完毕并向EVAL命令的`调用者返回结果`时，Lua值将被转换为Redis协议值。
比如，`当脚本"return 'hello world'"执行完毕的时候，Lua值’hello world’将转换为相应的Redis协议值`。

* `转换过程中会有意外情况，值内容可能发生了变化`
* 例如lua的3.14 这个数字值，转换为redis协议值后，变成了3
```redis
127.0.0.1:6379> eval "return 3.14" 0
(integer) 3

[//]: # 解决方式 tostring 转换为字符串()
127.0.0.1:6379> eval "return tostring(3.14)" 0
"3.14"
```

#### 全局变量保护
* 为了防止预定义的Lua环境被污染，`Redis只允许用户在Lua脚本中创建局部变量而不允许创建全局变量，尝试在脚本中创建全局变量将引发一个错误。`

* `以下代码通过Lua的local关键字，在脚本中定义了一个临时变量database：`
```redis
127.0.0.1:6379> eval "local database='redis';return database" 0
"redis"
```

* 定义全局变量会报错
```redis
127.0.0.1:6379> eval "num = 1" 0
(error) ERR Error running script (call to f_40cb7589fe4aff696c77f1eaa292a5676473f79b): @enable_strict_lua:8: user_script:1: Script attempted to create global variable 'num' 
```

#### 在脚本中切换数据库
* 与普通Redis客户端一样，Lua脚本也允许用户通过执行SELECT命令来切换数据库，
* 但需要注意的是，不同版本的Redis在脚本中执行SELECT命令的效果并不相同：
  ●在Redis 2.8.12版本之前，用户在脚本中切换数据库之后，客户端使用的数据库也会进行相应的切换。
  ●在Redis 2.8.12以及之后的版本中，`脚本执行的SELECT命令只会对脚本自身产生影响，客户端的当前数据库不会发生变化。`

```redis
127.0.0.1:6379[3]> select 1
OK
127.0.0.1:6379[1]> set a 1
OK
127.0.0.1:6379[3]> select 0
OK
127.0.0.1:6379> eval "redis.call('select',KEYS[1]); return redis.call('get',ARGV[1])" 1 1 'a'
"1"
127.0.0.1:6379> get a
(nil)
```

#### 脚本的原子性
* Redis的Lua脚本与Redis的事务一样，都是以原子方式执行的：
* 在Redis服务器开始执行EVAL命令之后，直到EVAL命令执行完毕并向调用者返回结果之前，
* `Redis服务器只会执行EVAL命令给定的脚本及其包含的Redis命令调用，至于其他客户端发送的命令请求则会被阻塞, 直到EVAL命令执行完毕为止。`

* 基于上述原因，`用户在使用Lua脚本的时候，必须尽可能地保证脚本能够高效、快速地执行，`
* `从而避免因为独占服务器而给其他客户端造成影响。`

#### 以命令方式执行脚本
* 用户除了可以在redis-cli客户端中使用EVAL命令执行给定的脚本之外，
* 还可以`通过redis-cli客户端的eval选项，以命令行方式执行给定的脚本文件`。
* 在使用eval选项执行Lua脚本时，用户不需要像执行EVAL命令那样指定传入键的数量，只需要在传入键和附加参数之间使用逗号进行分割即可。

* 创建一个get.lua 脚本文件
```redis
        redis.call("SET", KEYS[1], ARGV[1])
        return redis.call("GET", KEYS[1])
```
* `进入redis容器，在外面执行命令（相当于调用redis解释器的同时指定执行lua脚本）`
```redis
# redis-cli --eval get.lua 1 'msg' , '1'
"1"
```


