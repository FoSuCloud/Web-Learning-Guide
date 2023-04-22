## 删除pod
* kubectl delete pod xx (xx是pod的名字)

## 进入pod
* ` kubectl exec -it pod名称  bash`

#### 查看全局命名空间的pod
* `kubectl describe pod --all-namespaces -owide | grep xxx`

#### 查看实时日志
* `kubectl logs -f -n namespace pod-name`

#### 查看k8s中pod的实时资源使用情况
* `kubectl top pod pod-name -n namespace`

#### pod创建后状态异常，查看
* `kubectl describe pod pod-name -n namespace`
* 在文件最后会输出错误信息

#### 查看所有命名空间的pod
* `kubectl get pod --all-namespaces -owide`

