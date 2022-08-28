## demo

```
worker_processes  1;
error_log logs/error.log;
events {
    worker_connections 1024;
}
http {
    server {
        listen 8085;
        location / {
            default_type text/html;
            access_by_lua_block {
                local ngx = require "ngx";
                ngx.say("<p>hello, world</p>")
            }
        }
    }
}

```

* 注意需要先安装openresty,lua
* 启动命令 `sudo openresty -p `pwd` -c nginx.conf`
* 停止命令 `openresty -p `pwd` -c nginx.conf -s stop`
