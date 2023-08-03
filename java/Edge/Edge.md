## Edge
* "Edge"（边缘计算）不是一个特定的软件或中间件，而是一种`计算架构和概念`。边缘计算是一种分布式计算模型，
* 它将`计算和数据处理`推向`离用户设备和数据源更近的边缘位置`，而不是传统的集中式云计算模型。


#### 连接两个物理机环境
* 边缘计算集群可以用于`连接两个物理机环境`。在这种情况下，边缘计算集群`充当桥梁`，将两个物理机环境连接起来，
* `使它们能够共享数据和资源`，`并协同执行任务`。
* 边缘计算集群可以分布在不同的地理位置，比如两个位于不同地区的物理机环境。它们通过网络相互连接，形成一个分布式的计算集群。
* 这种架构可以用于各种应用场景，比如跨地区数据备份与同步、高可用性和容错性的设计、资源共享等。
* 当两个物理机环境连接成一个边缘计算集群时，可以通过集群管理软件来管理和协调集群中的各个节点，实现任务调度、资源分配和故障恢复等功能。
* 通过边缘计算集群的协同工作，可以提高系统的整体性能和可用性。
* 总的来说，边缘计算集群可以用于连接两个物理机环境(`也可以是两个集群`)，`将它们组织成一个高效、灵活和可靠的分布式计算架构`。

#### Edge集群的优势包括
`降低延迟`：由于边缘节点距离用户设备更近，可以减少数据传输时间和计算延迟，提供更快的响应速度。
`减轻网络压力`：将计算任务在边缘节点上执行，可以减少对核心网络的流量负载，节约带宽资源。
`提高数据隐私与安全性`：有些敏感数据可能不希望传输到云端，边缘计算可以在本地处理这些数据，降低数据泄露风险。
`支持离线工作`：由于边缘节点可以独立运行，即使在网络不稳定或断开连接的情况下，也可以继续执行部分任务。
`适应物联网需求`：随着物联网设备的增多，边缘计算可以更好地处理海量的传感器数据和智能设备产生的信息。

#### 重启edge
1. 获取两个edge进程pid(环境a,环境b)
`ps -ef|grep -i edge`
2. kill掉进程
`kill -9 18412 18458`
3. 再执行,没有看到edge对应的两个进程即可
`ps -ef|grep -i edge`
4. 进入对应配置文件所在目录
`cd /application/`
5. 修改a环境和环境b对应的配置文件(如果有修改)
```shell
vi edge_debug.yaml
vi edge_run.yaml
```
6. 删除对应db,log文件
`rm -rf edge_debug.db edge_debug.log edge_run.db edge_run.log`
7. 执行启动命令
`nohup ./edge2-service -edge2_tcp_addr="0.0.0.0:16725" -edge2.proxy.tcp.addr="10.1.1.1:3443" -logger.type=file -logger.min_level=all -logger.file.path=edge_debug.log   -grpc_test=1  -db="sqlite:///./edge_debug.db" -edge2.id.prefix="edge_debug" -config.file.type="yaml" -config.type=file -config.file.path="./edge_debug.yaml" &`
`nohup ./edge2-service -edge2_tcp_addr="0.0.0.0:16715" -edge2.proxy.tcp.addr="10.1.1.1:3443" -logger.type=file -logger.min_level=all -logger.file.path=edge_run.log  -grpc_test=1  -db="sqlite:///./edge_run.db" -edge2.id.prefix="edge_run" -config.file.type="yaml" -config.type=file -config.file.path="./edge_run.yaml" &`
8. 执行命令,看到新的进程,表示重启成功
`ps -ef|grep -i edge`

