### 查看deploy
* kubectl get deploy -n xxx 的意思是使用kubectl命令来获取名为 xxx 的命名空间中的所有部署。
* `deploy部署是Kubernetes中用于声明式地更新Pods和ReplicaSets的资源`。
* 例如，您可以使用部署来创建新的ReplicaSets，或者回滚到之前的部署版本。
* 要使用kubectl的deploy命令，您需要先编写一个YAML文件，来描述您的部署的名称、标签、副本数、选择器、模板等信息

```text
NAME READY UP-TO-DATE AVAILABLE AGE nginx-deployment 3/3 3 3 40s

这表示在 xxx 命名空间中有一个名为nginx-deployment的部署，它创建了3个副本的Pods，并且都是可用的。
```

#### 根据deployment创建pod
* 在 Kubernetes 中，创建 Pod 和创建 Deployment 是两种不同的方法来部署应用程序。

1. 如果您`只想创建单个 Pod，而不需要复杂的管理和控制，可以直接创建 Pod 对象`。
* 您可以`编写一个 Pod 的 YAML 文件，然后使用 kubectl create 命令来创建 Pod`。
* 例如
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: mycontainer
      image: myimage:latest
      ports:
        - containerPort: 8080

```
* 然后使用以下命令创建pod `kubectl create -f pod.yaml`
* 这将直接在 Kubernetes 集群中创建一个名为 "mypod" 的 Pod, 注意 `kind: Pod`。


2. `根据deployment创建pod`
* 对应的yaml文件，例子, 注意 `kind: Deployment`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydeployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: mycontainer
          image: myimage:latest
          ports:
            - containerPort: 8080
```
* 然后根据以下命令创建deployment `kubectl create -f deployment.yaml`
* 这将在 Kubernetes 集群中创建一个名为 "mydeployment" 的 Deployment，并`自动创建并管理副本数为 3 的 Pod。`

总结来说，如果您只需要创建单个 Pod，可以直接创建 Pod 对象；如果您需要更高级的部署、管理和控制功能，可以使用 Deployment。
`Deployment 可以创建和管理多个 Pod 副本，并提供了应用程序的自动管理和扩展功能`。

#### 查看 deployment
`kubectl get deployment -n xxx` 
* 如果使用 deployment创建的pod，如果get pod获取不到，可以通过get deployment 获取到某些有用信息，用于排查



使用 hostPath 类型的 PV 来持久化存储证书和私钥文件。然而，使用 hostPath 类型的 PV 在实际生产环境中并不推荐，
因为它`受限于单个节点，不具备可移植性，也没有数据冗余和故障转移能力`。
`其实没有问题，修改了证书文件之后，直接apply重新应用就好了`

在 Kubernetes 中，推荐使用其他类型的持久化存储解决方案，比如使用云提供商的持久化存储卷（如 AWS EBS、Azure Disk、Google Persistent Disk）
或使用 CSI（Container Storage Interface）插件来提供持久化存储功能。

* [k8s管理集群中的 TLS 认证]("https://kubernetes.io/zh-cn/docs/tasks/tls/managing-tls-in-a-cluster/")

