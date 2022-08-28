# openresty

### [文档](https://github.com/openresty/lua-nginx-module)

https://www.nginx.com/resources/wiki/modules/lua/

### openresty中nginx引入lua方式

1）xxx_by_lua   --->字符串编写方式
2) xxx_by_lua_block ---->代码块方式
3) xxx_by_lua_file  ---->直接引用一个lua脚本文件

我们案例中使用内容处理阶段，用content_by_lua演示

-----------------编辑nginx.conf-----------------------

第一种：content_by_lua

location /testlua {
content_by_lua "ngx.say('hello world')";
}

输出了hello world

content_by_lua 方式，参数为字符串，编写不是太方便。

---

第二种：content_by_lua_block
location /testlua {
content_by_lua_block {
ngx.say("hello world");
}
}

content_by_lua_block {}  表示内部为lua块，里面可以应用lua语句

---

第三种：content_by_lua_file

location /testlua {
content_by_lua_file /usr/local/lua/test.lua;
}

content_by_lua_file 就是引用外部lua文件

* test.lua

ngx.say("hello world");

## tengine

* 需要编译 ngx_http_dyups_module 的话需安装tengine
* https://github.com/alibaba/tengine
* http://soft.dog/2016/07/08/nginx-module/

## 编译安装

/usr/local/Cellar/openresty-1.21.4.1

https://openresty.org/cn/installation.html

但是没有卸载干净？

## docker部署openresty

```
-v $(pwd)/nginx.conf:/usr/local/openresty/nginx/conf/nginx.conf \
```
