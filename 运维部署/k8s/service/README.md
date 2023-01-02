## 启动
*  `kubectl apply -f nginx-svc.yaml`
* 创建一个service服务

## 查看svc
* ` kubectl get svc` 就可以看到刚才创建的nginx service了
* `然后我们可以看到刚才的nginx服务被分配了一个10.108.115.150的虚拟cluster ip`
* `然后k8s集群中的其他服务就可以通过这个虚拟ip+端口80来访问他了`

## tomcat+mysql的例子
* `首先我们需要apply mysql和tomcat的rc`
* `然后apply mysql和tomcat的svc`
* `注意，在mac本地需要minikube image load加载对应的镜像`

