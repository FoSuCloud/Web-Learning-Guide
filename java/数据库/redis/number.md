## 数字
* 每当用户将一个值存储到字符串键里面的时候，Redis都会对这个值进行检测，
* 如果这个值能够被解释为以下两种类型的其中一种，那么Redis就会把这个值当作数字来处理：

1。 第一种类型是能够使用C语言的long long int类型存储的整数，在大多数系统中，这种类型存储的都是64位长度的有符号整数，
取值范围介于-9223372036854775808和9223372036854775807之间。

2。第二种类型是能够使用C语言的long double类型存储的浮点数，在大多数系统中，
这种类型存储的都是128位长度的有符号浮点数，取值范围介于3.36210314311209350626e-4932和1.18973149535723176502e+4932L之间。

#### 加减法操作
* 当字符串键存储的值能够被Redis解释为整数时，用户就可以通过INCRBY命令和DECRBY命令对被存储的整数值执行加法或减法操作。
* `incrby增加`
```c
127.0.0.1:6379> set num 10
OK
127.0.0.1:6379> incrby num 1
(integer) 11
127.0.0.1:6379> get num
"11"
127.0.0.1:6379> incrby num 20
(integer) 31
127.0.0.1:6379> get num
"31"
```
* `decrby减少`
```c
127.0.0.1:6379> decrby num 2
(integer) 29
127.0.0.1:6379> get num
"29"
```
* `当字符串键的值不能被Redis解释为整数时，对键执行INCRBY命令或是DECRBY命令将返回一个错误：`
```c
127.0.0.1:6379> incrby message 10
(error) ERR value is not an integer or out of range
```
* decrby,incrby都只能用于整数
```c
127.0.0.1:6379> decrby num 2.33
(error) ERR value is not an integer or out of range
```

#### INCR、DECR：对整数值执行加1操作和减1操作
```c
127.0.0.1:6379> incr num
(integer) 30
127.0.0.1:6379> get num
"30"
127.0.0.1:6379> decr num
(integer) 29
127.0.0.1:6379> get num
"29"
```

#### INCRBYFLOAT：对数字值执行浮点数加法操作
* 用于执行浮点数加法操作的INCRBYFLOAT命令：
```c
127.0.0.1:6379> set floatNum 3.14
OK
127.0.0.1:6379> get floatNum
"3.14"
127.0.0.1:6379> incrbyfloat floatNum 2.22
"5.36"
```
* `INCRBYFLOAT命令在遇到不存在的键时，会先将键的值初始化为0，然后再执行相应的加法操作。`

#### 使用INCRBYFLOAT执行浮点数减法操作
```c
127.0.0.1:6379> incrbyfloat floatNum -2.22
"3.14"
```

● `INCRBYFLOAT命令既可用于浮点数值，也可以用于整数值`。
●INCRBYFLOAT命令的增量既可以是浮点数，也可以是整数。
●当INCRBYFLOAT命令的执行结果可以表示为整数时，命令的执行结果将以整数形式存储。

* `虽然Redis并不限制字符串键存储的浮点数的小数位长度，但是在使用INCRBYFLOAT命令处理浮点数的时候，命令最多只会保留计算结果小数点后的17位数字，超过这个范围的小数将被截断：`

