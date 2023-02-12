## async_hooks
* async_hooks提供了一个api来跟踪异步资源
`const async_hooks = require('async_hooks');`
* `异步资源表示具有关联回调的对象`。此回调可能会被调用多次，例如，事件'connection' in net.createServer()，或者只是一次，如 in fs.open()。
* 也可以在调用回调之前关闭资源。AsyncHook没有明确区分这些不同的情况，而是将它们表示为作为资源的抽象概念。
* `如果Worker线程使用async_hooks，每个线程都有一个独立的async_hooks 接口，每个线程都会使用一组新的async ID。`

### 和线程池结合
* task_processor.js , 线程代码
```js
const { parentPort } = require('worker_threads');
parentPort.on('message', (task) => {
    parentPort.postMessage(task.a + task.b);
});

```
* worker_pool.js ,线程池代码
```js
const { AsyncResource } = require('async_hooks');
const { EventEmitter } = require('events');
const path = require('path');
const { Worker } = require('worker_threads');

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

class WorkerPoolTaskInfo extends AsyncResource {
    constructor(callback) {
        super('WorkerPoolTaskInfo');
        this.callback = callback;
    }

    done(i, result) {
        // 在异步资源的执行上下文中使用提供的参数调用提供的函数。
        // 这将建立上下文，在回调前触发AsyncHooks，调用函数，在回调后触发AsyncHooks，然后恢复原来的执行上下文。
        console.log(`这是第${i}个线程`)
        this.runInAsyncScope(this.callback, null, i, result);
        this.emitDestroy();  // `TaskInfo`s are used only once.
    }
}

class WorkerPool extends EventEmitter {
    // 子线程数量
    constructor(numThreads) {
        super();
        this.workers = []; // 线程总数组
        this.freeWorkers = []; // 当前空闲的线程数组
        this.tasks = []; // 任务列表

        for (let i = 0; i < numThreads; i++)
            this.addNewWorker(i);

        // Any time the kWorkerFreedEvent is emitted, dispatch
        // the next task pending in the queue, if any.
        this.on(kWorkerFreedEvent, () => {
            if (this.tasks.length > 0) {
                const { task, callback } = this.tasks.shift();
                this.runTask(task, callback);
            }
        });
    }
    /*
    * 添加一个新的子线程
    * */
    addNewWorker(i) {
        const worker = new Worker(path.resolve(__dirname, 'task_processor.js'));
        // 监听子线程消息
        worker.on('message', (result) => {
            // In case of success: Call the callback that was passed to `runTask`,
            // remove the `TaskInfo` associated with the Worker, and mark it as free
            // again.
            worker[kTaskInfo].done(i, result);
            worker[kTaskInfo] = null;
            this.freeWorkers.push(worker);
            this.emit(kWorkerFreedEvent);
        });
        worker.on('error', (err) => {
            // In case of an uncaught exception: Call the callback that was passed to
            // `runTask` with the error.
            if (worker[kTaskInfo])
                worker[kTaskInfo].done(err, null);
            else
                this.emit('error', err);
            // Remove the worker from the list and start a new Worker to replace the
            // current one.
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.addNewWorker();
        });
        this.workers.push(worker);
        this.freeWorkers.push(worker);
        this.emit(kWorkerFreedEvent);
    }
    /*
    * 执行任务
    * */
    runTask(task, callback) {
        if (this.freeWorkers.length === 0) {
            // No free threads, wait until a worker thread becomes free.
            this.tasks.push({ task, callback });
            return;
        }

        const worker = this.freeWorkers.pop();
        worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
        worker.postMessage(task);
    }
    /*
    * 销毁子线程
    * */
    close() {
        for (const worker of this.workers) worker.terminate();
    }
}

module.exports = WorkerPool;
```
* 工作代码，入口文件
```js
const WorkerPool = require('./worker_pool.js');
const os = require('os');

const pool = new WorkerPool(os.cpus().length);

let finished = 0;
let sum = 100;
for (let i = 0; i < sum; i++) {
    pool.runTask({ a: 42, b: 100 }, (err, result) => {
        console.log(i, err, result);
        if (++finished === sum)
            pool.close();
    });
}
/*
* 工作流程：首先new WorkerPool 创建线程池
* 1. 执行任务runTask，在线程池中寻找一个空闲线程执行操作
* 2. 在操作执行完之前执行runInAsyncScope，调用回调函数，主线程的callback函数被执行
* 3. 执行了10次之后，销毁线程池pool.close()
* */
```





