## 必填字段
* 在.yaml文件中，我们需要在创建的kubernetes对象的文件中，设置以下字段值
1、`apiVersion:使用哪个版本的kubernetes API来创建此对象`
2、`kind:想要创建什么类型的对象（例如rc）`
3、`metadata:对象的唯一标识，包括name,uid,namespace`
4、`spec:希望对象处于什么状态`


## yaml配置
* [参考]("https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/")



## imagePullPolicy
* `imagePullPolicy: IfNotPresent,默认是alaways, 表示每次创建pod都去拉取镜像`
1)Always 总是拉取镜像
2)ifNotPresent 本地有则使用本地镜像,不拉取
3)Never 只使用本地镜像，从不拉取，即使本地没有
* 如果设置为 IfNotPreset，有下面两种情况。
  1、当本地不存在所需的镜像时，会从远程仓库中拉取。
  2、如果我们需要的镜像和本地镜像内容相同，只不过重新打了tag。此tag镜像本地不存在，而远程仓库存在此tag镜像。这种情况下，Kubernetes 并不会拉取新的镜像。
