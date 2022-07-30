
kubectl get ingress -A 查看ingress域名映射
kubectl get pod -n nginx-ingress 查看名为nginx-ingress的pod (名称不对)

kla | grep nginx查看nginx的ingress-controller
kubectl exec -it nginx-ingress-controller-86t8x bash -n ingress-nginx
进入某个ingress-nginx中
ps -ef 查看当前进程

top：查看目前cpu,网络等，类似任务管理器
cat /etc/nginx/nginx.conf 修改nginx配置
nginx -s reload 重启
但是需要修改所有的nginx-ingress

ingress中nginx.conf配置了
proxy_temp_path                 /tmp/proxy-temp;
