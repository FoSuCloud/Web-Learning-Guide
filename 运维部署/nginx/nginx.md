## 介绍
* nginx有一个主进程和多个工作进程。
* 主进程主要负责读取和评估配置，以及维护工作进程
* 工作进程对请求进行实际处理。
---
* `nginx采用基于事件的模型和依赖于操作系统的机制来有效地在工作进程之间分配请求`
* 工作进程的数量在配置文件中定义，`并且可以针对配置固定或者自动调整为可用的CPU内核数量`
---
* nginx的配置文件是nginx.conf
---
* [参考]("http://nginx.org/en/docs/")
* nginx最初的设计是称为一个http服务器，旨在设计一个同时连接处理10000连接数的web处理器
* 为了可以实现同时连接处理10000连接数的web服务器，nginx通过`基于事件的连接-处理机制`

## 安装
* `安装方式有本地安装，还有docker安装，由于本机就有docker容器，所以就直接使用docker来运行nginx`
* docker安装，通过脚本的形式，
* pull.sh, 让本地的docker先拉取nginx
```bash
#!/bin/bash
docker pull nginx
```
* start.sh, 启动docker
```bash
#!/bin/bash
docker run --name test-nginx-container \
        -v $(pwd)/config/nginx.conf:/etc/nginx/nginx.conf:ro \
        -v $(pwd)/config/js:/etc/nginx/js:ro \
        -v $(pwd)/html:/usr/share/nginx/html \
        -p 80:80 -d nginx
```
*  `  // todo 172.17.0.1是docker的默认地址。。。`
* `所以nginx中配置代理，如果使用localhost可能会出错，要使用ifconfig找到的ip地址，否则可能localhost指向错误！`
* [本地安装]("https://www.cnblogs.com/meng1314-shuai/p/8335140.html")
---
* `由于本地安装需要手动编译，需要安装很多东西才可以使用njs等功能，所以使用docker安装方式`


## nginx运行后
* 执行可执行文件，就可以启动nginx了
* nginx运行后！`通过s(信号)来控制它`
1、nginx -s reload `重新加载配置文件`
2、nginx -s stop 快速关闭
`关闭提示没有pid，可能是因为还没有开启，所以获取不到进程id(pid)`
3、nginx -s quit 优雅关闭
4、nginx -s reopen `重新加载日志文件`

## reload
* `修改配置文件nginx.conf后需要执行nginx -s reload 去重载配置`
* 一旦主进程收到重新加载配置的信号，将检查配置文件的语法，并尝试应用其中的配置
* 如果成功，`主进程将启动新的工作进程，并向旧的工作进程发送信号，请求它们关闭`
* 如果失败，`主进程将回滚更改并继续使用旧的配置`。

## 配置
* 如果安装好了nginx，需要开启debug
* `cd /usr/local/etc/nginx`
* `./configure --with-debug`

## 信号执行
* 默认情况下，主进程的pid将会写入nginx.pid文件中
* 我们可以通过`ps -ax | grep nginx`，查看nginx进程的pid信息（主进程和工作进程）
* 例如主进程的pid是4697
* 可以执行`sudo kill -s QUIT 4697`，向主进程发送信号，退出主进程

## nginx -c /usr/local/etc/nginx/nginx.conf
* `nginx -c xxx 指定配置文件路径`
* `在pid文件找不到或者not number的时候使用`

## vue项目部署
* [参考]("https://blog.csdn.net/mocoe/article/details/83932268")

## 例子
* [参考]("https://github.com/dunwu/nginx-tutorial/blob/master/docs/nginx-configuration.md")

## 403
* Nginx出现403 forbidden
* `在nginx.conf首行添加 user root owner`


## 注意：
* `$() 是括号`
* `nginx.conf每条语句结束要添加 ; 分号`
* `$upstream_http_x_backend是html中 r.headersOut['X-backend'] = backend;`
* `如果是使用docker部署服务，那么可以点开详情，查看控制台日志调试`

## 变量
* 将请求重定向到的 URL。支持NGINX变量：$scheme\，$http_x_forwarded_proto\，$request_uri\， $host。
* 变量必须用花括号括起来。例如：${host}${request_uri}。

##  前端路由内部重定向
```text
        location / {
                try_files $uri $uri/ @router;
                }
 
        location @router  {
                rewrite ^.*$ /index.html last;
                }
```


