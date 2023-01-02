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




