### secret
* `k8s的secret是一种用来保存小片敏感数据的k8s资源，例如密码，token，或者秘钥。`
* 这类数据当然也可以存放在Pod或者镜像中，但是放在Secret中是为了更方便的控制如何使用数据，并减少暴露的风险。
* 用户可以创建自己的secret，系统也会有自己的secret。
* Pod需要先引用才能使用某个secret，Pod有2种方式来使用secret：

1. `作为volume的一个域被一个或多个容器挂载`
2. `在拉取镜像的时候被kubelet引用`

* Secret有不同的类型，根据类型不同，Secret中可以包含不同的数据。
* 例如，kubernetes.io/service-account-token类型的Secret包含用来访问API server的token和公钥；
* kubernetes.io/dockerconfigjson类型的Secret包含用来拉取私有镜像仓库的认证信息。

* 用户可以通过`kubectl create secret`命令或者yaml文件来创建自己的Secret。
* 创建时需要指定Secret的名称、类型和数据。数据可以是文件或者字符串，需要用base64编码。

#### 查看secret
* `kubectl get secret -n namepace`

#### 传递环境变量
* [参考]("https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/distribute-credentials-secure/")
