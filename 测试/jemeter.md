## jmeter
* 可用于测试静态和动态资源、Web 动态应用程序的性能。
* 它可用于模拟服务器、服务器组、网络或对象上的重负载，以测试其强度或分析不同负载类型下的整体性能。

## 常用组件
1. 测试计划：起点，所有组件的容器
2. 线程组：代表一定数量的用户
3. 取样器：向服务器发送请求的最小单元
4. 逻辑控制器：结合取样器实现一些复杂的逻辑
5. 前置处理器：在请求之前的工作
6. 后置处理器：在请求之后的工作
7. 断言：用于判断请求是否成功
8. 定时器：负责在请求之间的延迟间隔。固定，高斯，随机
9. 配置元件：配置信息
10. 监听器：负责收集结果

* 使用顺序：
* `测试计划-线程组-配置元件-前置处理器-定时器-取样器-后置处理器-断言-监听器`

* 作用域：

