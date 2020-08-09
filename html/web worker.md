## vue中使用web worker踩坑
### web worker介绍
  web worker是`h5的一个新特性`，主要是为了解决js在处理一些耗时任务时阻塞页面的渲染交互导致用户体验不好的问题，因为web worker可以`为页面额外开启一个线程`（js是单线程的），web worker开启一个额外线程靠的是浏览器支持。开启的这个线程用于`为js处理那些耗时任务`，然后js主线程继续处理页面渲染交互，用户体验就不会变差了。
  
### html文件使用web worker
在vue中使用web worker和在普通html文件中方法不太一样。在普通的html文件中， web worker使用方法为:
```javascript
 // index.html
 		<script type="text/javascript">
			// 参数1是页面路径，参数2是配置参数
			let worker=new Worker('worker.js');
			// postMessage发送消息
			worker.postMessage('hello world!')
			// onmessage接收消息
			worker.onmessage=function(e){
				console.log('test文件接收到:',e);
			}
		</script>
  // worker.js
  // self表示的是子线程自身，也就是当前worker的全局对象
  // 所以可以把self替换成this,或者直接onmessage,不需要xxx.onmessage
  self.onmessage=function(e){
    self.postMessage('worker发送消息啦~')
  }
```
* `需要注意，虽然new Worker()中的参数url指的是网络脚本文件，但是当index.html以进程形式运行（也就是占据了一个端口），那么此时相邻的worker.js文件也在本地网络上。url不能使用本地文件指的是Url为file://这种形式`
* 在普通html文件下的web worker就介绍到这里，有兴趣可以去看看 [阮一峰老师的教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

#### 在vue项目中使用web worker
1. 首先声明一下初始项目配置：vue-cli2.9,webpack3
2. 在vue中使用web worker的使用方法不一样，如：
```javascript
   // App.vue
    import Worker from './worker/web.worker'
   
   		// 参数1是页面路径，参数2是配置参数
		let worker=new Worker('./web.worker.js');
		// postMessage发送消息
		worker.postMessage('hello world!')
		// onmessage接收消息
		worker.onmessage=function(e){
			console.log('app.vue文件接收到:',e);
		}
    
  // web.worker.js
    // self表示的是子线程自身，也就是当前worker的全局对象
    // 所以可以把self替换成this,或者直接onmessage,不需要xxx.onmessage
    onmessage=function(e){
      postMessage('worker发送消息啦~')
    }
```
* 但是会报错，提示 _worker_web_worker__WEBPACK_IMPORTED_MODULE_9___default.a is not a constructor"
* 解决方法：（1）npm install worker-loader -D 安装worker.loader插件
（2）