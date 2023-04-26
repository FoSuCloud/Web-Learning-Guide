## Pod状态
Pending：当您创建一个新的Pod时，它将进入“Pending”状态。在此状态下，Kubernetes正在分配资源并等待容器启动。
Running：如果Pod中的所有容器都已经启动并正在运行，则该Pod将进入“Running”状态。
Succeeded：如果Pod中的所有容器已完成其工作并成功退出，则该Pod将进入“Succeeded”状态。在这种情况下，Pod将保留其资源（例如存储卷），但不再消耗任何CPU或内存。
Failed：如果Pod中的任何一个容器因错误而失败，则该Pod将进入“Failed”状态。
Unknown：如果Kubernetes无法确定Pod的状态，则该Pod将进入“Unknown”状态。这通常发生在与API服务器的通信出现问题时。

* 除了这些基本状态之外，Pod还可以具有其他状态和事件
ContainerCreating：当容器正在创建时，Pod将进入“ContainerCreating”状态。在此状态下，Kubernetes正在下载镜像、准备容器，并为其分配资源。
Terminating：当Pod正在停止或终止时，它将进入“Terminating”状态。在此状态下，Kubernetes正在清理Pod实例并回收资源。
CrashLoopBackOff：如果Pod中的容器反复失败，则该Pod可能会进入“CrashLoopBackOff”状态。在这种情况下，Kubernetes将尝试自动重启容器，但如果容器继续失败，则Pod将保持在此状态下。


