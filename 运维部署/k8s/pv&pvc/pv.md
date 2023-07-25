## kubectl get pv

#### 删除Pv
删除 Deployment：如果 Deployment 仍在使用 PV，那么 PV 处于“Bound”状态，因此无法直接删除。首先需要删除使用该 PV 的 Deployment。
`kubectl delete deployment <deployment-name>`
删除与 PV 绑定的 PVC（如果有的话）：
`kubectl delete pvc <pvc_name>`
删除 PV：
`kubectl delete pv <pv-name>`


