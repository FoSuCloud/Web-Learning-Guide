#### 查看是master还是slave
* `kubectl exec -it pod-name -n namespace-name -- redis-cli -a password info replication`
* 输出, `role:slave表示是从服务器`
```text
Defaulted container "redis" out of: redis, exporter
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
# Replication
role:slave
```

#### 查看容器日志
* `kubectl logs -f pod-name -c redis -n namespace-name`

#### redis-operator-cluster-operator
* redis-operator-cluster-operator Pod的存在表明您的环境中使用了一个Redis集群运算符，`它负责管理Redis集群的操作和状态`。

#### 删除redis命名空间的所有pod测试持久化功能
* `Kubectl delete pod --all -n namespace-name`

### 测试高可用性
1. 模拟故障：停止一个主节点的Redis实例，模拟故障。
您可以使用redis-cli连接到`主节点`并`执行SHUTDOWN命令来停止Redis实例`。
2. 监控状态：使用redis-cli的`CLUSTER INFO`命令来`获取集群的状态信息`。以下是一个示例命令：
* `redis-cli -p <port> CLUSTER INFO`
3. 故障转移测试：`在模拟故障后`，使用redis-cli连接到集群的其他节点，`发送写操作命令`（如SET、INCR等），
* 并观察它们`是否能够继续处理请求`。


