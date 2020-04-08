// 1. setTimeout和setImmediate都是宏任务，都会在下一轮宏任务执行
// 两者执行顺序不一定的！
setTimeout(function(){
	console.log("虽然是第一个宏任务，但是需要等待的时间较长，所以先执行其他阶段，之后重新进入timers阶段")
},3000)
setTimeout(function(){
	console.log('setTimeout')
},0)
setImmediate(function(){
	console.log('immediate')
})
// 虽然promise和process.nextTick都是属于异步任务，但是process.nextTick是异步任务中最快的！
// 所以一直都是先输出3，再输出1
new Promise((res,rej)=>res(1)).then(res=>console.log(res))
process.nextTick(()=>console.log("3"))
console.log("第一轮宏任务")

// 事件循环分为以下几个阶段:
// 1. timers:定时器阶段,处理setTimeout和setInterval的回调函数,如果定时器和计时器是属于本轮宏任务的话,否则就执行下个阶段,
// 2. I/O callback阶段:`执行非计时器的回调函数，也就是除了setTimeout/setInterval/setImmediate`,
// 3. idle,prepare:`只是node.js的libuv内部调用，可以忽略`,
// 4. Poll:轮询阶段,等待未返回的I/O事件,比如`服务器的响应,用户鼠标移动`等,
// 轮询阶段一般时间比较长,如果没有其他异步任务要处理,会一直停留在此处,等待I/O返回结果
// 5. check阶段:执行setImmediate的回调函数,
// 6. close callback:执行关闭请求的回调函数,如关闭套接字

// 由于setTimeout在timers阶段执行，而setImmediate在check阶段执行，所以理论上setTimeout会比setImmediate先执行
// 虽然setTimeout可以设置时间为0，但是node服务器做不到0毫秒，最少也要1毫秒
// 所以实际上，在等待timers阶段会结束，先执行其他阶段，去执行setImmediate,之后再去执行setTimeout
// 因此，输出顺序不一定！
