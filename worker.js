// self表示的是子线程自身，也就是当前worker的全局对象
// 所以可以把self替换成this,或者直接onmessage,不需要xxx.onmessage
onmessage=function(e){
	postMessage('worker发送消息啦~')
}