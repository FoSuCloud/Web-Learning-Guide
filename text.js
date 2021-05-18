// 参数1是页面路径，参数2是配置参数
let worker=new Worker('worker.js');
// postMessage发送消息
worker.postMessage('hello world!')
// onmessage接收消息
worker.onmessage=function(e){
	console.log('test文件接收到:',e);
}

