const worker = new Worker('./worker.js');

const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

// 在主线程中修改共享内存
Atomics.store(sharedArray, 0, 0);

// 向 worker 发送消息
worker.postMessage(sharedBuffer);

// 监听 worker 的消息
worker.addEventListener('message', (event) => {
    console.log('Received message from worker:', event.data);
});