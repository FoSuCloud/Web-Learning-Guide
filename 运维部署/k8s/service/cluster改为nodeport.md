#### 开放端口
* 有时候我们需要把某个服务端口放开，让后才可以在外部访问
* 然后才能有可视化界面，才能进行一些测试
* 这时候就需要把clusterIP改为NodePort


1. `kubectl get svc -n business`
* 获取svc对应服务名称
2. 修改svc `kubectl edit svc gitlab -n business`
* 例如svc名称gitlab, 修改配置文件。
* ports中添加nodePort: 30080， 
* type修改为： NodePort
```yaml
  ports:
    - nodePort: 30080
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: demo
    tier: gitlab
  sessionAffinity: None
  type: NodePort
```


