## service

* service分为以下几种类型，分别是
* `Clusterip默认类型`，自动分配一个仅Cluster内部可以访问的虚拟ip,一般用作集群内部负载均衡
* `NodePort(service向外暴露)`，在clusterip基础上为service在每台机器上绑定一个映射端口，外网客户端可以通过NodeIp，NodePort访问 `也就是svc (service name)`
* `LoadBalancer(service向外暴露)`，在NodePort基础上借助cloud provider创建一个外部负载均衡器，并将请求转发到NodeI和NodePort
* `ExternalName`,把集群外部的服务引入到集群内部来，在集群内部直接使用。没有任何类型的代理被创建，只有1.7版本之后的kube-dns支持
