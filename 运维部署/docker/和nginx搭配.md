## njs
* `点击镜像详情中的cli（第二个图标）`
* `会出现命令行界面，输入njs,发现可以获取到njs的功能`
* `输出globalThis`
```text
global {
 console: Console {
  log: [Function: log],
  dump: [Function: dump],
  time: [Function: time],
  timeEnd: [Function: timeEnd]
 },
 njs: njs {
  version: '0.6.2'
 },
 print: [Function: log],
 $262: $262 {
  
 },
 global: [Circular],
 process: process {
  argv: [
   'njs',
   ''
  ],
  env: {
   HOSTNAME: '9d969789dffc',
   HOME: '/root',
   PKG_RELEASE: '1~buster',
   TERM: 'xterm',
   NGINX_VERSION: '1.21.3',
   PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
   NJS_VERSION: '0.6.2',
   PWD: '/'
  }
 }
}
```

## 加入第三方模块
* 在dockerfile中写配置导入
* [参考]("https://www.bbsmax.com/A/pRdBQran5n/")

## 案例
* [参考]("https://github.com/javanan/tms-nginx-finder")
* [redis例子]("https://jishuin.proginn.com/p/763bfbd658c5")
* [nginx+lua+redis鉴权]("https://blog.csdn.net/suewar3/article/details/88752965?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.opensearchhbase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.opensearchhbase")
* `调用后端接口或者连接redis服务器进行token鉴权！`
## 使用docker-compose可以更加便捷的便携配置文件！
