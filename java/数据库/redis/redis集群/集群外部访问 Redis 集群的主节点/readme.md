# 部署 Redis 集群
kubectl apply -f redis-cluster.yaml

# 部署 NodePort 类型的 Service
kubectl apply -f redis-nodeport.yaml

# 访问 Redis 主节点
假设您的 Kubernetes 集群中有一个节点 IP 是 192.168.1.100，并且 NodePort 配置为 30001（在上面的示例中是 30001）。
要从外部访问 Redis 主节点，您可以使用 Redis 客户端工具（如 redis-cli）：
```redis
# 使用 redis-cli 连接到 Redis 主节点
redis-cli -h 192.168.1.100 -p 30001
```
