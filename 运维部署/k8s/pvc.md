## pvc
* 存储工程师把分布式存储系统上的总空间划分成一个一个小的存储块
* k8s管理员根据存储块创建与之一一对应的`pv资源(PV描述的是持久化存储卷)`
* pv属于集群级别资源  不属于任何名称空间 定义的时候不能指定名称空间
* 用户在创建pod的时候同时创建与`pv一一对应的pvc资源(PVC可以理解为持久化存储的 它提供了对某种持久化存储的描述,但不提供具体的实现)`
* 创建Pod的时候,系统里并没有合适的PV跟它定义的PVC绑定 也就是说此时容器想要使用的Volume不存在.这时候Pod的启动就会报错
* `我们会在Pod定义里指定创建好的PVC, 然后PVC会根据Pod的要求去自动绑定合适的PV给Pod使用。`

#### 查看pvc
* `kubectl get pvc`
* `kubectl get pvc -n business 查看business 命名空间的pvc`

### pv
* 在 Kubernetes 中，PersistentVolume（PV）是一种资源对象，用于提供持久化存储资源给应用程序使用。
* PV 可以表示任何一种支持动态或静态配置的存储技术，例如网络附加存储、本地磁盘、云存储等。

* 每个 PV 都有一个唯一的名称和一个特定的容量大小，可以被应用程序`通过 PVC 来进行申请和使用。`
* 当创建一个 PVC 时，Kubernetes 将根据 PVC 中所需的存储空间大小和其他参数，自动选择匹配的 PV，并将其绑定到该 PVC 上。

PV 对象具有以下属性：
name: PV 的名称，必须在集群范围内唯一。
capacity: PV 提供的存储容量大小。
accessModes: 定义 POD 如何访问 PV。例如，ReadWriteOnce 表示只能被一个 Pod 以读写模式挂载，ReadOnlyMany 表示可被多个 Pod 以只读模式挂载，ReadWriteMany 表示可被多个 Pod 以读写模式挂载。
storageClassName: PV 所属的存储类别别名，它会关联到对应的 StorageClass。
status: PV 的状态信息，包括当前使用情况、绑定状态等。

* 有两种方式来定义 PV：静态和动态。静态 PV 是手动预先创建的，
* 而动态 PV 是在 PVC 申请时自动创建的。无论是静态还是动态，都可以通过添加标签和注释等属性来进行分类和管理。


#### 查看pv
* `kubectl get pv`

#### 清除pv
* 在 Kubernetes 中，当 `PersistentVolume（PV）的状态为 Delete 或 Failed 时，表示该 PV 处于不可用状态。`

1. Delete 状态：表示`该 PV 已被标记为删除，并且正在等待 Kubernetes 的垃圾回收机制进行清理`。在这种情况下，PV 将不能被绑定到任何新的 PVC 上，但是它仍然可以被现有的 PVC 访问，直到垃圾回收完成并完全从系统中清除。
2. Failed 状态：表示`该 PV 在某些方面无法正常运行，例如由于存储故障、网络问题、权限问题等原因导致 PV 无法被正确挂载或访问`。在这种情况下，PV 将不能被任何 PVC 绑定，并且需要手动修复或替换。

* 如果您遇到了 Delete 或 Failed 状态的 PV，请采取以下措施：

1. 对于 Delete 状态的 PV，通常`只需要等待 Kubernetes 完成垃圾回收即可`。您可以使用 kubectl get pv 命令查看当前所有 PV 的状态，
* ` 并使用 kubectl delete pv <pv-name> 命令手动删除 PV。`

2. 对于 Failed 状态的 PV，需要查找错误原因，并对其进行修复或替换。
* 您可以使用 `kubectl describe pv <pv-name> 命令来查看 PV 的详细信息`，并检查与 PV 相关的其他资源
* （例如 StorageClass、节点等）是否存在问题。
