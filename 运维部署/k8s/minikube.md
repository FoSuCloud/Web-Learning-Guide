## minikube
* `minikube 是本地 Kubernetes，专注于让 Kubernetes 易于学习和开发。`
* `所以生产环境其实不使用minikube`

## 查看仪表盘
* `minikube dashboard`

## minikube启动服务
* 由于镜像仓库或者别的原因，minikube内部pod拉取镜像失败。所以改为 https://juejin.cn/post/7078318591438749726
* `首先所有yaml文件的containers配置imagePullPolicy: Never， 拉取本地镜像`
* `minikube image pull xxx, minikube image load xxx,我们yaml文件里面需要的镜像，我们先提前加载好`
---
* `疑似是因为本地hosts文件写死了docker 对应的ip`
---
* `最后我们通过虚拟机ip访问tomcat,tomcat再去访问mysql`
* `minikube ip 获取虚拟机ip`
* `http:// xxx:30001/demo/，访问地址，最后的结果应该是 Error:java.sql.SQLException: Unable to load authentication plugin 'caching_sha2_password'.`
* 由于访问到mysql就行了，我们就不管为什么了.

