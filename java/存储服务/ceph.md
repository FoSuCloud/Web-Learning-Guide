## Ceph
* Ceph是一个`分布式的对象存储系统`，可以存储和管理海量的数据。Ceph提供了强大的数据可靠性和可扩展性，
* 具有自动故障恢复和自我管理等特性。Ceph还提供了针对不同应用场景的多种接口，
* `包括S3、Swift、NFS等。`
* Ceph可以在标准硬件上运行，也可以在虚拟化环境和公有云环境中运行。


### ceph和obs
* `ceph是一个开源的分布式存储系统，它可以提供对象存储、块存储和文件系统三种服务`
* `ceph中的对象存储服务（RGW）可以兼容obs的接口，也就是说，可以用obs的客户端或SDK来访问ceph中的对象数据`

* `obs数据存储在ceph分布式存储系统上，然后通过aws-java-sdk可以建立连接访问`


#### CEPH集群
* `ceph可以用来做集群，里面是多个oss节点`
* `业务数据存储接口 -> 存储服务 -> ceph集群`

* 也就是存储数据，先走存储服务，再走ceph集群，再存储到具体的oss节点上
* 获取数据也是一样的














