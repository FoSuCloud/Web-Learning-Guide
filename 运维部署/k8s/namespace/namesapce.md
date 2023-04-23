### 查看namespace
* `kubectl get ns | grep xxxx`

#### 查看某个命名空间的资源配额
* `kubectl describe quota -n namespace 格式会好看些`
* `kubectl get quota --namespace=namespace 这样也可以`

### quota
* k8s的`quota是一种在K8s中限制每个命名空间的资源消耗的对象`。
* 例如，你可以把你的团队分成不同的K8命名空间，然后为每个命名空间创建quota，以防止资源过度使用。
* quota可以限制命名空间中可以创建的对象的数量和类型，以及该命名空间中的资源可以消耗的总计算资源量。
* 如果创建或更新一个资源违反了quota的约束，请求将失败，并返回HTTP状态码403 FORBIDDEN，
* 并附带一条解释哪个约束被违反了的消息。

#### quota字段含义
* quota的requests.cpu和limits.cpu是两种在k8s中为pod或容器分配CPU资源的方式。它们的含义和区别如下：
  requests.cpu：表示pod或容器需要的`最小CPU资源`，用于调度时确定pod可以放置在哪些节点上。如果节点上可用的CPU资源小于pod的requests.cpu，那么pod将无法在该节点上运行12。
  limits.cpu：表示pod或容器可以使用的`最大CPU资源`，用于运行时限制pod或容器的CPU使用量。如果pod或容器超过了limits.cpu，那么它将被k8s限制或抢占，以保证其他pod或容器的正常运行12。

* requests.cpu和limits.cpu的单位可以是核数（如1，2，0.5等），也可以是毫核数（如100m，200m，500m等）。
* `1核等于1000毫核。`

* `hard是最大限制，表示命名空间中可以使用的资源的总量`。
* `used是正在使用的，表示命名空间中已经创建或消耗的资源的数量`。


#### CFS
* k8s使用`CFS（完全公平调度器）的配额机制来实现limits.cpu`。
* CFS会根据每个cgroup（控制组）的配额和周期来分配CPU时间片。
  配额和周期可以在cgroup目录下的cfs_quota_us和cfs_period_us文件中查看。
  例如，如果一个cgroup的cfs_quota_us为250000，cfs_period_us为1000000，那么表示这个cgroup在每个1000000微秒（1秒）的周期内，
  最多可以使用250000微秒（0.25秒）的CPU时间。


