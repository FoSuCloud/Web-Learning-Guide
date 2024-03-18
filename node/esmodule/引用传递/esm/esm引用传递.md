* `对esmodule导出的基础数据类型，进行赋值会报错，因为esmodule导出的是const变量，不能被修改`

```shell
1
num = 2
^

TypeError: Assignment to constant variable.
```

使用 import 被导入的模块运行在严格模式下。
使用 import 被导入的变量是只读的，可以理解默认为 const 装饰，无法被赋值
使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 import 导入的变量无论是否为基本类型都是引用传递。
