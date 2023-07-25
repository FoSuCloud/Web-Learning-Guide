## 通过更新deployment更新镜像
1. 首先在流水线获取到镜像image名称，或者在所在节点通过docker image筛选自己要的镜像
2. 找到要更新的pod的deployment目录 `怎么获取？`
3. 把yaml文件的containers的image修改为自己期望的镜像名称
4. 进入对应的pod的node节点`kubectl get pod -n business -owide可以看到node`
5. `ssh node-name进去节点`
6. `docker pull docker-image-name拉取镜像`
7. `logout回到集群`
8. `执行kubectl apply -f xxx.yaml就可以更新pod了`












