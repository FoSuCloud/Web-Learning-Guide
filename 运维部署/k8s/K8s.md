## k8s

* kubernetes简称k8s,是一个开源的，`用于管理云平台上多个主机上的容器化的应用，有助于声明式配置和自动化`

  * k8s让部署容器化的应用简单而又高效，k8s提供了应用部署，规划，更新，维护的一种机制
* [参考]("https://mp.weixin.qq.com/s/EDcNF6uC5n59eDNoh9ZdWg")
* k8s的一个核心特点：
* 能够自主的管理容器来保证云平台上的容器按照用户的期望状态运行着
* `例如想让一个apache服务一直运行，那么用户不需要关心怎么做，k8s会自动去监控，然后去重启，新建，总之，让apache服务一直提供服务`
* k8s目前着重于`提供不间断的服务状态（例如web服务器和缓存服务器）和云原生平台(noSql)`
* 在k8s中，`所有容器均在pod中运行`，一个pod可以承载一个或者多个相关的容器
* 同一个pod中的容器会部署到同一台物理机器上并且能够共享资源
* k8s支持一种特殊的网络模型，k8s创建了一个地址空间，并且不动态的分配端口，可以允许用户选择任何想使用的端口，
* `为了实现这个目的，k8s为每个pod分配ip地址`

## k8s组件

* `k8s集群由代表控制平面的组件和一组称为节点的机器组成`

## k8s对象

* k8s对象是k8s系统中的持久实体，k8s使用这些实体来表示集群的状态

## k8s架构图

* [参考]("https://www.kubernetes.org.cn/kubernetes%e8%ae%be%e8%ae%a1%e6%9e%b6%e6%9e%84")

## pod概念

* `pod是k8s最小的管理元素，pod是最小的，管理，计划，创建的最小单元`
* `pod相当于一个逻辑主机，可能包含一个或者多个关系密切的应用`
* pod的context可以理解为多个Linux空间的集合

1. pid空间（同一个pod中，应用可以看到其他进程）
2. 网络 命名空间（同一个pod中的应用对相同的ip地址和端口有权限）
3. ipc命名空间（同一个pod中的应用可以通过vpc或者posix进行通信）
4. uts命名空间（同一个pod中的应用共享一个主机名称）
5. 同一个pod中的应用可以共享磁盘，磁盘是pod级的，应用可以通过文件系统调用

* pod的生命周期是短暂的，当master node被删除时，在node上面挂载的pod也会随着销毁

## node概念

* `node是真正运行的主机，可以是虚拟机，也可以是物理机`
* `一个node上可以有多个pod(逻辑主机)。为了管理pod,一个node节点上至少要运行container,runtime,kubelet和kube-proxy服务`
* 每个node都具有以下信息：

1. 地址：包括hostname,外网ip,内网ip
2. 条件condition: 包括OutOfDisk、Ready、MemoryPressure和DiskPressure
3. 容量:node上的可用资源，包括内存，cpu和pod总数
4. 基本信息：包括内核版本，容器引擎版本，os类型等

* 如果node被删除，所拥有的pod会自动分流到其他的node
* `有多个node节点，那么就可以ssh进入多个机器。通过kubectl get node -owide获取到节点ip`

## 集群

* 部署Kubernetes时，您会获得集群。
* Kubernetes集群由一组名为Nodes的工作机器组成，该计算机运行包含容器化的应用程序。每个群集至少有一个`工人(worker)节点`。
* Worker节点（s）主持属于应用程序工作负载的组件的POD。控制平面管理群集中的工作节点和吊舱。在生产环境中，控制平面通常跨多台计算机运行，并且群集通常运行多个节点，提供容错和高可用性。
* `Master只是作为控制节点，占用资源不高，但是Node节点(worker节点)进行实际的业务处理等，占用资源较高。`

## ingress

* Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP。
* Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。
* `通俗来讲，就是提供了外网入口`
* Ingress 控制器有多种实现，比较常见的是基于 Nginx 实现的。也就是ingress-nginx

## service (svc)

Kubernetes [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/) 是转瞬即逝的。 Pod 实际上拥有 [生命周期](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/)。 当一个工作 Node 挂掉后, 在 Node 上运行的 Pod 也会消亡。 [ReplicaSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/) 会自动地通过创建新的 Pod 驱动集群回到目标状态，以保证应用程序正常运行。 换一个例子，考虑一个具有3个副本数的用作图像处理的后端程序。这些副本是可替换的; 前端系统不应该关心后端副本，即使 Pod 丢失或重新创建。也就是说，Kubernetes 集群中的每个 Pod (即使是在同一个 Node 上的 Pod )都有一个唯一的 IP 地址，因此需要一种方法自动协调 Pod 之间的变更，以便应用程序保持运行。

Kubernetes 中的服务(Service)是一种抽象概念，它定义了 Pod 的逻辑集和访问 Pod 的协议。Service 使从属 Pod 之间的松耦合成为可能。 和其他 Kubernetes 对象一样, Service 用 YAML [(更推荐)](https://kubernetes.io/zh-cn/docs/concepts/configuration/overview/#general-configuration-tips) 或者 JSON 来定义. Service 下的一组 Pod 通常由 *LabelSelector* (请参阅下面的说明为什么你可能想要一个 spec 中不包含`selector`的服务)来标记。

尽管每个 Pod 都有一个唯一的 IP 地址，但是如果没有 Service ，这些 IP 不会暴露在集群外部。Service 允许你的应用程序接收流量。Service 也可以用在 ServiceSpec 标记`type`的方式暴露

* *ClusterIP* (默认) - 在集群的内部 IP 上公开 Service 。这种类型使得 Service 只能从集群内访问。
* *NodePort* - 使用 NAT 在集群中每个选定 Node 的相同端口上公开 Service 。使用`<NodeIP>:<NodePort>` 从集群外部访问 Service。是 ClusterIP 的超集。
* *LoadBalancer* - 在当前云中创建一个外部负载均衡器(如果支持的话)，并为 Service 分配一个固定的外部IP。是 NodePort 的超集。
* *ExternalName* - 通过返回带有该名称的 CNAME 记录，使用任意名称(由 spec 中的`externalName`指定)公开 Service。不使用代理。这种类型需要`kube-dns`的v1.7或更高版本。

## kube-dns

* kube-dns负责为整个集群提供dns服务

## pvc

* 存储工程师把分布式存储系统上的总空间划分成一个一个小的存储块
* k8s管理员根据存储块创建与之一一对应的`pv资源(PV描述的是持久化存储卷)`
* pv属于集群级别资源  不属于任何名称空间 定义的时候不能指定名称空间
* 用户在创建pod的时候同时创建与`pv一一对应的pvc资源(PVC可以理解为持久化存储的 它提供了对某种持久化存储的描述,但不提供具体的实现)`
* 创建Pod的时候,系统里并没有合适的PV跟它定义的PVC绑定 也就是说此时容器想要使用的Volume不存在.这时候Pod的启动就会报错
* `我们会在Pod定义里指定创建好的PVC, 然后PVC会根据Pod的要求去自动绑定合适的PV给Pod使用。`

## nfs

* NFS是Network File System的简写，即网络文件系统。NFS基于RPC(Remote Procedure Call)远程过程调用实现。
* 由操作系统的内核，将 NFS 文件系统的调用请求通过 TCP/IP 发送至服务端的 NFS 服务。NFS服务器执行相关的操作，并将操作结果返回给客户端
* [参考]("https://blog.csdn.net/zhonglinzhang/article/details/90636704")
