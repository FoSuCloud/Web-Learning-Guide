## primitives
* primitives指的是原语，或者说原始数据类型

### 标准数据类型
* 有符号整数：i8,i16,i32,i64,i128,isize(指针大小)
* `8位有符号整数，取值范围：-128 ~ +127`
* 无符号整数：u8,u16,u32,u64,u128,usize(指针大小)
* `8位无符号整数，取值范围（0000 0000-1111 1111）：0 ~ 255 `
* 浮点数：f32,f64
* char Unicode标量值，如 "a","A",">"
* bool 为 true false
* unit type,唯一可能的值是一个空元组  ()

### 组合类型



* 性能测评 https://zhuanlan.zhihu.com/p/451184900
* 源码分析 https://kdy1.dev/posts/2022/6/minifier

* 为什么node擅长做高并发？
Web 业务开发中，如果你有高并发应用场景那么 Node.js 会是你不错的选择。 在单核 CPU 系统之上我们采用 单进程 + 单线程 的模式来开发。
在多核 CPU 系统之上，可以通过 child_process.fork 开启多个进程(Node.js 在 v0.8 版本之后新增了 Cluster 来实现多进程架构) ，即 多进程 + 单线程 模式。
* `开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。`
* NodeJS的多进程架构
* 面对单进程单线程对多核使用率不高的问题，按照之前的经验，每个进程各使用一个CPU即可，以此实现多核CPU的利用。Node提供了child_process模块，并且也提供了fork()方法来实现进程的复制(只要是进程复制，都需要一定的资源和时间。Node复制进程需要不小于10M的内存和不小于30ms的时间)。
* 这样的解决方案就是linux系统上最经典的Master-Worker模式，又称为主从模式。这种典型并行处理业务模式的分布式架构具备较好的可伸缩性（可伸缩性实际上是和并行算法以及并行计算机体系结构放在一起讨论的。某个算法在某个机器上的可扩放性反映该算法是否能有效利用不断增加的CPU。）和稳定性。主进程不负责具体的业务处理，而是负责调度和管理工作进程，工作进程负责具体的业务处理，所以，工作进程的稳定性是开发人员需要关注的。

* 通过fork()复制的进程都是一个独立的进程，这个进程中有着独立而全新的V8实例。虽然Node提供了fork()用来复制进程使每个CPU内核都使用上，但是依然要记住fork()进程代价是很大的。
* `好在Node通过事件驱动在单个线程上可以处理大并发的请求。`

---
* [ ] node升级到14,试下 worker_threads 多线程，babel是否会快很多
* 使用 worker threads 来执行 CPU 密集的代码操作. `每个 worker 都有其自己的 libuv event loop。`
* https://developers.cloudflare.com/workers/learning/how-workers-works/
```text
现在，最大的问题就是，，既然 JavaScript 本身并不支持并行，那么两个 Node.js workers 是如何并行 执行的呢？
答案就是 V8 Isolates 。
V8 Isolates 是一个独立的 chrome V8 运行实例，其有独立的 JS 堆和微任务队列。这就为 每一个 Node.js worker 独立运行提供了保障。其缺陷就是，workers 之间没法直接访问对方的堆。
由于这个原因，每个 worker 都有其自己的 libuv event loop。
```

* [ ] 即使在单核同步基准测试中，swc也比 babel 快 16 到 20 倍。
* `请注意，实际性能差距更大，因为 swc 在工作线程上工作，而 babel 在事件循环线程上工作。`
* https://swc.rs/blog/perf-swc-vs-babel
* https://github.com/swc-project/node-swc/blob/bf7718049d67148e2094d0e431d71d4a21993ec7/benches/multicore.js
* https://zhuanlan.zhihu.com/p/167920353

