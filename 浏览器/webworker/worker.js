onmessage = function(event) {
    const sharedBuffer = event.data;
    const sharedArray = new Int32Array(sharedBuffer);

    // 在 worker 线程中修改共享内存
    Atomics.add(sharedArray, 0, 1);

    // 向主线程发送消息
    postMessage(sharedArray[0]);
};