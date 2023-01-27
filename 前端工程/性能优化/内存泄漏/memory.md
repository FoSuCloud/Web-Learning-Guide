## memory
* `memory收集依赖有三种方式`
1. `Heap Snapshot:用以打印堆快照，堆快照文件显示页面的 javascript 对象和相关 DOM 节点之间的内存分配`
2. `Allocation instrumentation on timeline - 在时间轴上记录内存信息，随着时间变化记录内存信息。`
3. `Allocation sampling - 内存信息采样，使用采样的方法记录内存分配。此配置文件类型具有最小的性能开销，可用于长时间运行的操作。它提供了由 javascript 执行堆栈细分的良好近似值分配。`

### memory面板
* 查看方式有以下几种：

```text
Summary：摘要视图.可以显示按构造函数名称分组的对象。使用此视图可以根据按构造函数名称分组的类型深入了解对象（及其内存使用），适用于跟踪 DOM 泄漏。
Comparison：对比视图，与其它快照对比，看增、删、Delta数量及内存大小
Containment - 此视图提供了一种对象结构视图来分析内存使用，由顶级对象作为入口。
Statistic - 内存使用饼状的统计图。
```
* 列信息有以下几种
```text
列头
Shallow Size   ： 对象本身占用的内存
Retained Size ： 对象本身及其引用总共占用的内存
Distance ：当前对象到根的引用层级距离
Alloc. Size : 新分配的内存
Freed  Size ： 释放的内存

Constructor构造函数：用于构造一组对象的 JavaScript 函数。
#New：创建了多少个新对象。
#Deleted：删除了多少个对象。
#Delta：对象总数的变化。
```

#### classFilter
* `中间的 Class filter 只能够按照列出来的 Constructor 值进行筛选。`

#### containment入口
* 入口有：
```text
DOMWindow - 是被视为 JavaScript 代码 "全局" 对象的对象。
GC - VM 的垃圾使用的实际 GC 根。GC 根可以由内置对象映射、符号表、VM 线程堆栈、编译缓存、句柄作用域和全局句柄组成。
原生对象 - 是 "推送" 至 JavaScript 虚拟机内以允许自动化的浏览器对象，例如 DOM 节点和 CSS 规则。
```

#### 搜索
* `注意：图中最最下面那块最有用，就是搜索，ctrl/command + f 唤出`

