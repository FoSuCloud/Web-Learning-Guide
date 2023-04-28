#### Replication Controller（RC）
* 在 Kubernetes 中，Replication Controller（RC）是一种控制器对象，用于确保在集群中始终有指定数量的 Pod 实例正在运行。
* RC 可以根据需要创建、删除和替换 Pod，以便在容器出现故障或需要进行扩展时自动进行管理。

每个 RC 对象指定了以下参数：
* `replicas: 指定要创建的 Pod 副本数量。`
* selector: 用于标识要关联到 RC 的 Pod 的标签选择器。
* template:` 用于定义要创建的 Pod 的模板。`

* 当创建一个 RC 对象后，Kubernetes 将会对其所选中的 Pod 进行监控，并且将根据 RC 中的配置信息
* 来确保 Pod 的数量符合预期。如果 Pod 数量少于预期，则 RC 将启动新的 Pod 实例以满足要求；
* 如果 Pod 数量超过预期，则 RC 将删除一些 Pod 实例以确保数量符合预期。

* RC 能够确保在集群中始终有指定数量的 Pod 实例正在运行，从而提高应用程序的可靠性和可伸缩性。
* 但是，由于 RC 只能检测 Pod 实例的整体状态，无法感知内部组件的具体健康状况，
* 因此在实际使用时需要结合其他控制器对象（如 Deployment、StatefulSet 等）来进行更为精细和灵活的管理和扩展。


## 启动
* 首先启动k8s
* 由于本地环境问题，需要先启动minikube,`minikube start`
* `执行kubectl get nodes 看到有name为minikube的节点就可以了`
* `然后执行kubectl apply -f nginx-rc.yaml创建rc`
* `执行kubectl describe replicationcontroller/nginx 就可以看到对这个rc的描述了`

## 查看rc的所有pod
* pods=$(kubectl get pods --selector=app=nginx --output=jsonpath={.items..metadata.name})
* `echo $pods,最后就可以看到终端输出了对应nginx服务的名称了`

## 查看rc描述信息
* `kubectl describe rc nginx`
* 然后就可以看到yaml文件的内容了

## rc.yaml配置文件
* 和其他k8s的配置文件一样，`replicationController需要apiVersion,kind,metadata字段`

## 启动一个mysql的rc
* `kubectl apply -f mysql-rc.yaml`




