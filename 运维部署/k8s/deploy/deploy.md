### 查看deploy
* kubectl get deploy -n xxx 的意思是使用kubectl命令来获取名为 xxx 的命名空间中的所有部署。
* `deploy部署是Kubernetes中用于声明式地更新Pods和ReplicaSets的资源`。
* 例如，您可以使用部署来创建新的ReplicaSets，或者回滚到之前的部署版本。
* 要使用kubectl的deploy命令，您需要先编写一个YAML文件，来描述您的部署的名称、标签、副本数、选择器、模板等信息

```text
NAME READY UP-TO-DATE AVAILABLE AGE nginx-deployment 3/3 3 3 40s

这表示在 xxx 命名空间中有一个名为nginx-deployment的部署，它创建了3个副本的Pods，并且都是可用的。
```



