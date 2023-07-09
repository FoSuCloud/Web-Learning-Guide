## lua脚本调试
* 在早期支持Lua脚本功能的Redis版本中，用户为了对脚本进行调试，
* `通常需要重复执行同一个脚本多次，并通过查看返回值的方式来验证计算结果`

* 为了解决上述问题，Redis从3.2版本开始新引入了一个`Lua调试器，这个调试器被称为Redis Lua调试器，简称LDB`，
* `用户可以通过LDB实现单步调试、添加断点、返回日志、打印调用链、重载脚本等多种功能`。

* `调试器是从 Redis 6.0 版本开始引入的，如果你使用的是旧版本的 Redis，调试器可能不可用。`
* `目前看来， 5.0版本的可以用，但是有挺大问题的，总是出问题`

#### 例子
* `执行--ldb选项之后，可能会卡顿等待很久才会出现lua debugger>，也可能出不来，需要重新打开`
* `参数不需要numkeys了，直接输入key,argv即可`
```redis
# redis-cli -a 123456 --ldb --eval debug.lua "msg" , "ok"
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
Lua debugging session started, please use:
quit    -- End the session.
restart -- Restart the script in debug mode again.
help    -- Show Lua script debugging commands.

* Stopped at 1, stop reason = step over
-> 1   local ping_result = redis.call("PING")
lua debugger> next
<redis> PING
<reply> "+PONG"
* Stopped at 2, stop reason = step over
-> 2   local set_result  = redis.call("SET", KEYS[1], ARGV[1])
lua debugger> print
<value> ping_result = {["ok"]="PONG"}
lua debugger> next
<redis> SET msg ok
<reply> "+OK"
* Stopped at 3, stop reason = step over
-> 3   return {ping_result,set_result}
lua debugger> print
<value> ping_result = {["ok"]="PONG"}
<value> set_result = {["ok"]="OK"}
lua debugger> next

1) PONG
2) OK

(Lua debugging session ended -- dataset changes rolled back)
```

#### 调试模式
* Redis的Lua调试器支持两种不同的调试模式，一种是异步调试，另一种则是同步调试。
* `当用户以ldb选项启动调试会话时，Redis服务器将以异步方式调试脚本：`


