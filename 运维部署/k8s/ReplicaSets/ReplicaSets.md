### ReplicaSets
* ReplicaSets是Kubernetes中用于`维持一组稳定的副本Pods运行的控制器`。
* 它们可以`保证在任何时候，都有指定数量的相同Pods可用，以防止Pods失败或不可访问`。
* `ReplicaSets可以在Pods失败时创建新的Pods，或者在副本数不足或过多时进行扩缩容。`

* 要创建一个ReplicaSet，您需要编写一个YAML文件，来描述您的ReplicaSet的名称、标签、副本数、选择器、模板等信息








