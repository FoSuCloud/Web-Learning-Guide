#### ES Modules 和 CommonJS的一些区别
1. esmodule使用export导出和import导入，commonjs使用require导入和module.exports导出
2. esmodule导出的是`值的引用(而且是只读的，也就是const)`，可以直接修改值来影响其他使用该值的地方
* commonjs导出的是值的拷贝，例如导出的基本数据类型，我们调用导出的其他add函数之类的，无法改变这个值
* 只能通过赋值来改变对象属性的方式来改变
3. commonjs的模块导出有缓存机制，导出过一次下次就会直接使用导出的拷贝.而esmodule没有
4. esmodule的顶层this默认指向undefined,而commonjs的顶层作用域this默认指向模块 module.exports的导出对象
5. esmodule的import 语句在编译阶段就提前执行了，可以同于静态分析依赖，是tree-shaking的一个基础
* commonjs是动态加载依赖的，到了执行代码阶段才执行. 不过esmodule也有import函数做动态加载







