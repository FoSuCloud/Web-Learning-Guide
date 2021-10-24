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
