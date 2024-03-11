### web worker
* javascript语言是单线程的，也就是所有任务都只能在一个线程里面完成，但是也是异步的`只是异步任务都是等待一个执行结果，然后再放到执行栈等待线程执行的`
* `可以去看eventloop`。所以本质上还是一个任务执行完了，才能执行下一个任务。
* 在单核CPU的时代，js使用单线程好像也不浪费性能；但是现在是`多核CPU时代，单线程导致没法充分发挥计算机的性能`
---
* web worker是html5的一个新特性，`为javascript创造一个多线程的环境，允许主线程来创造worker线程，将一些任务分配给worker线程执行，解放主线程的生产力`
* `主线程在运行任务的时候，worker线程也可以运行任务，两者互相不干扰，属于并行执行`，worker任务执行完毕会把结果告诉主线程
* 一般使用worker线程来完成一些计算密集型的任务,`例如后端一次性返回几十万条数据，就可以把一部分计算任务交给worker线程去处理`
* 这样主线程就可以专心去处理`UI交互等任务，就可以解决我们获取到大数据量时，初次渲染卡顿的问题`。
---
* 另外,worker线程只要开始运行，就不会被主线程所打断(`例如请求，点击事件等`)，所以我们一定要记住`及时销毁worker线程，因为worker线程也比较耗费资源`

#### web worker的事件循环
* web worker有自己的`heap、call stack、web apis、task queue、miscro tsak queue`

### 注意事项
1. `同源限制`,分配给web worker的脚本文件必须和主线程同源
2. `DOM限制,无法读取到主线程所在网页的DOM对象`，worker线程无法获取到主线程所在的window对象,document对象,parent对象。`但是可以获取到navigator，location`
```javascript
// index.html
let work1 = new Worker('./worker.js')
work1.postMessage('主线程发送消息')

// worker.js
onmessage=function(e){
    console.log(e.data) // 主线程发送消息
}
let {log} = console
// log(window) // Uncaught ReferenceError: window is not defined
// log(parent) // worker.js:6 Uncaught ReferenceError: parent is not defined
// log(document) // worker.js:7 Uncaught ReferenceError: document is not defined
log(navigator) // 可以获取到 WorkerNavigator
log(location) // WorkerLocation对象
```
3. `worker和主线程的通信必须通过消息完成`，可以观察到，worker没有window对象，也没有parent，`也就可以看出，worker线程和主线程是不同的执行上下文环境`
4. `worker线程不能使用alert,comfirm方法，但是可以使用ajax请求`
```javascript
// worker
let {log} = console
// log(alert('1')) // Uncaught ReferenceError: alert is not defined
// log(confirm('2')) // Uncaught ReferenceError: confirm is not defined
let xhr = new XMLHttpRequest()
log(xhr) // XMLHttpRequest 实例
```
5. `无法读取本地文件`，也就是不能打开本机的文件系统`file://`,`例子：无法读取本地图片展示，只能展示网上的图片`
```javascript
    let {log} = console
    let img = new Image()
    img.src='./images/6.jpg'
    log(img)
```
* `但是上面的代码在index.html执行可以获取到图片，在worker会执行失败，因为Image is undefined`
* 所以不知道要怎么验证文件限制
---
* 但是我们可以使用importScripts来执行外部的脚本(`本地的`),网络上的脚本不可以通过importScripts加载，可以通过ajax请求来获取！
```javascript
// log(importScripts('./text.js'))
// log(importScripts('https://code.jquery.com/jquery-3.6.0.js')) // worker.js:6 Uncaught DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope': 
```

### 基本使用
1. postMessage
* postMessage可以发送文本，json,二进制等数据，`可以发送各种数据类型的数据`
* `worker线程通过data属性获取onmessage监听获取到的数据，也就是postMessage发送过来的数据`
```javascript
// index.html
    let work1 = new Worker('./worker.js')
    work1.postMessage('主线程发送消息')
    work1.postMessage('发送字符串')
    work1.postMessage({name:'json',data:'发送json'})
    let parts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
    let blob = new Blob(parts, {type : 'text/html'}); // 得到 blob
    work1.postMessage(blob)

// worker.js
onmessage=function(e){
    console.log(e.data) // data属性·获取接收到的数据
}
// 结果是：
/**
 主线程发送消息
 发送字符串
 {name: "json", data: "发送json"}
 Blob {size: 32, type: "text/html"}
 * */
```
2. worker与主线程的双向通信
```javascript
// index.html
    let work1 = new Worker('./worker.js')
    work1.postMessage('主线程发送的消息')
    work1.onmessage = function (e){
        console.log('主线程接收到',e.data)
        if(e.data === 'end'){
            work1.terminate() // 关闭worker线程，之后的postMessage也就没用了，因为workery已经关闭
        }
    }
    // work1.postMessage('end')
    // work1.postMessage('worker关闭之后再发送')

// worker.js
onmessage=function(e){
    console.log(e.data) // 主线程发送消息
    if(e.data === 'end'){
        console.log('worker自己关闭自己')
        self.close() // worker关闭自身
    }
}

self.postMessage('我是worker1') // 可以使用self代表子线程自身
postMessage('worker也可以不使用self')
postMessage('end') 
```
3. 注意，为了节省系统资源，worker使用完毕一定要关闭!
* worker线程自己关闭使用close,主线程关闭worker线程使用terminate
4. 通信传输的数据
* `worker线程和主线程之间通信，传输的数据是拷贝的，不是同一个内存地址！`
* `浏览器内部处理机制是，先将postMessage的内容串行化，然后把串行化之后的字符串！字符串！发送给worker，然后worker把这个字符串还原为之前的格式`
* 但是如果我们有一个5G的文件，需要把这个文件交给worker去处理，如果需要先交给浏览器完成串行化，那么需要耗费很久
* `为了解决这个问题，提供了一个技术,允许主线程把二进制数据转移给worker线程，注意是转移，转移完成后，主线程就无法再获取到该数据！！！`
* 一般用在高性能大数据表格，视频，3d等场景中。`这种技术叫 transferable objects，注意只能转移二进制数据！！！`
```javascript
// 写法 worker.postMessage(arrayBuffer, [arrayBuffer]);
// index.htmml
let work1 = new Worker('./worker.js')
const buffer = new ArrayBuffer(8);
let  data = new Int8Array(buffer);
data[0] = 2
data[1] = 4
work1.postMessage(buffer,[buffer])
console.log('buffer转移之后：',buffer) // ArrayBuffer(0)

// worker.js
onmessage=function(e){
    console.log(new Uint8Array(e.data)) // [2, 4, 0, 0, 0, 0, 0, 0]
}
```
* `转移之后，虽然之前的二进制数据对象还可以获取，但是获取到的是空！`
5. worker线程还有一个常用的场景是`完成轮询操作！`

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
    onmessage=function(e){
      postMessage('worker发送消息啦~')
    }
```
* 但是会报错，提示 _worker_web_worker__WEBPACK_IMPORTED_MODULE_9___default.a is not a constructor"
* 解决方法：（1）npm install worker-loader -D 安装worker.loader插件
（2）[](https://www.cnblogs.com/gerry2019/p/11456035.html)
