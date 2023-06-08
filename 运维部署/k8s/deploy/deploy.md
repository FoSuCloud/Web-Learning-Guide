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

