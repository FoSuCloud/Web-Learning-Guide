### worker_threads模块
* `worker_threads可以用于创建js线程，用于并行执行`
* `通过postMessage在线程之间传输数据，传输的数据需要经过序列化`

### 例子
* 首先进到对应目录  ~/Documents/nodeProject/demo/thread
* 我们直接执行对应脚本文件worker-simple.js `node worker-simple.js`
```js
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
if (isMainThread) {
    // 刚开始处于主线程
    const worker = new Worker(__filename, {workerData: {num: 5}});
    // 创建一个子线程(当前文件作为子线程，传递数据为workerData)，监听消息
    worker.once('message', (result) => {
        console.log('square of 5 is :', result); // square of 5 is : 25
    })
} else {
    // 给主线程发送消息
    parentPort.postMessage(workerData.num * workerData.num)
}
```
* `首先是处于主线程阶段,走if (isMainThread)开启一个子线程`
* `该子线程对应的位置是当前文件路径，所以还会有一个else,此时是子线程执行阶段！`
* `然后我们可以看到最后会有一个打印：square of 5 is : 25`
* `因为主线程接收到子线程传输的数据了！`
---
* 接着看下官方的例子
* `首先我们看下worker-parent.js，这个文件就是我们的主线程执行作用域`
```js
const mainThread = require('./worker.js')
let user = {
    name: 'parent',
    age:11
}
// 开启多线程
mainThread(user).then((res)=>{
    console.log('mainThread res',res,user)
    // mainThread res { name: 'workerData', age: 11 } { name: 'parent', age: 11 }
    // 由此可以看出，主线程和子线程传输的是数据的值，子线程改变了对应的值不会影响到主线程的值
})
```
* `然后会引用一个worker.js开启子线程`
```js
const {Worker,isMainThread,parentPort,workerData} = require("worker_threads")
if(isMainThread){
    // 现在是主线程执行这段代码
    module.exports=function parseJSAsync(script){
        return new Promise((resolve, reject)=>{
            const worker = new Worker(__filename,{
                workerData: script
            })
            worker.on('message',(data)=>{
                console.log('message',data) // message { name: 'workerData', age: 11 }
                resolve(data)
            })
            worker.on('error',reject)
            worker.on('exit',(code)=>{
                if(code!==0){
                    reject(new Error(`worker stopped with exit code ${code}`))
                }
            })
        })
    }
}else{
    // 现在是子线程执行这段代码
    console.log("workerData:",workerData) // 接收到主线程传输过来的值 workerData: { name: 'parent', age: 11 }
    workerData.name="workerData"
    parentPort.postMessage(workerData);
}
```
* `主线程和子线程传输的是数据的值，子线程改变了对应的值不会影响到主线程的值!`


### resourceLimit
* resourceLimit是用来限制子线程可以使用的资源数量的，其主要的资源设置有以下几个:
* maxOldGenerationSizeMb：子线程中栈的最大内存
* maxYoungGenerationSizeMb：子线程中创建对象的堆的最大内存
* codeRangeSizeMb：生成代码消耗的内存
* stackSizeMb：该线程默认堆的大小




