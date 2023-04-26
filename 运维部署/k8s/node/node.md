
#### 通过node节点名称获取node 的ip
`kubectl get node <node-name> -o jsonpath='{.status.addresses[?(@.type=="InternalIP")].address}'`


#### kubectl describe node node-name
* `kubectl describe node node-name获取某个node节点的cpu,memory,gpu使用情况`


