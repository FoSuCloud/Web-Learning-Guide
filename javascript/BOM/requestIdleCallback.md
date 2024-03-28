## requestIdleCallback
* requestIdleCallBack和requestAnimationFrame有什么区别呢？
* requestAnimationFrame是每一帧都会执行，`然而requestIdleCallback是在每一帧的最后`，进行判断，如果有空闲时间则执行，没有就等待
* 也就是 requestIdleCallback 是使用浏览器的空闲时间来利用的
* `每一帧的最后指的是paint绘制之后，当前帧是否还有时间`
* [参考](https://www.w3.org/TR/requestidlecallback/)

#### requestIdleCallback 使用场景
1. 优化性能： requestIdleCallback() 可以在浏览器空闲时段执行一些低优先级的任务，如图片懒加载、缓存预加载、资源清理等。
* 通过利用空闲时间执行这些任务，可以提高页面的加载速度和响应性能。
2. 降低主线程负载： 主线程负载过高可能导致页面的卡顿和响应延迟。
* requestIdleCallback() 可以帮助将一些不紧急的任务延迟到空闲时段执行，从而降低主线程的负载，提高页面的流畅度和用户体验。
3. 增强用户体验： 在用户与页面进行交互时，页面的响应速度至关重要。通过 requestIdleCallback()，
* 可以在用户空闲时段执行一些与交互无关的任务，从而提高页面的响应速度和用户体验。

#### 不适合使用requestIdleCallback的情况
1. 关键任务`例如DOM操作`： 如果任务对页面的渲染或交互产生重大影响，就不适合使用 requestIdleCallback()。
* 关键任务应该优先在主线程执行，以保证任务的及时完成和页面的稳定性。

2. `高优先级任务`： requestIdleCallback() 并不保证在所有情况下都能按时执行，
* 特别是在`主线程负载过高`或`页面处于活跃交互状态`时。因此，对于高优先级的任务，最好不要依赖 requestIdleCallback() 的执行。

3. 对执行时间敏感的任务： 如果任务对执行时间有严格要求，就不适合使用 requestIdleCallback()。
* 因为它无法保证在特定时间内执行，可能会因为主线程负载过高或其他原因而延迟执行。

#### 如果浏览器一直不空闲，requestIdleCallback 就一直不执行？
* 不是，requestIdleCallback可以设置一个timeout来保证至少在这个时间内执行一次

* `触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低`

* 每次事件循环完成时，即处理完宏任务、清空微任务队列中所有任务并且UI渲染完成后，
* 会等待`下一个宏任务来再次开启事件循环机制`，而这段`等待的时间我们称为空闲时间`。
* 目前，timeRemaining() 有一个 50 ms 的上限时间，`也就是即使中间的空闲时间有3min,也会被分为多个50ms的requestIdleCallback空闲周期`

### 空闲期
#### 帧间空闲期
1. 在完成给定帧的输入处理、渲染和合成之后，用户代理的`主线程通常会变得空闲`，`直到下一帧开始`；
* 另一个挂起的任务有资格运行；或者收到用户输入。该规范提供了一种通过 API 在空闲时间内安排回调执行的方法 。
2. `当空闲回调运行时，将给出一个与当前空闲期结束相对应的截止时间。`
3. 空闲期的一个示例是在活动动画期间将给定帧提交到屏幕和开始处理下一帧之间的时间，如图所示。
* 此类空闲期会在活动动画和屏幕更新期间频繁出现，
* 但`通常非常短`（即，对于具有 60Hz 垂直同步周期的设备，小于 16 毫秒）。
![帧间空闲期](./img/帧间空闲期.png)

#### 没有挂起的帧更新时的空闲期
* 当用户代理空闲且没有发生屏幕更新时
* 在这种情况下，用户代理可能没有即将到来的任务来限制空闲期的结束。
* 为了避免在`不可预测的任务`（例如处理`用户输入`）中造成用户`可感知的延迟`，
* 这些空闲周期的长度应限制为最大值50ms。一旦空闲期结束，用户代理可以安排另一个空闲期（如果它仍然空闲），
* 如图所示，使后台工作能够在较长的空闲时间内继续进行。
![没有挂起的帧更新时的空闲期](./img/没有挂起的帧更新时的空闲期.png)
* 在空闲期间，用户代理将以 FIFO 顺序运行空闲回调，直到空闲周期结束或没有更多空闲回调有资格运行。
* 因此，用户代理`不一定会在单个空闲期内运行所有当前发布的空闲回调`。
* 任何剩余的空闲任务都`可以在下一个空闲期间运行`。

* 只有在当前空闲期开始之前发布的空闲任务才有资格在当前空闲期期间运行

* 当用户代理确定网页对用户不可见时，它可以限制空闲期以减少设备的功耗，例如，仅每 10 秒而不是连续触发空闲期。

#### 使用语法
* `var handle = window.requestIdleCallback(callback[, options])`
  其中：
  handle 表示返回的 ID，可以把它传入 Window.cancelIdleCallback() 方法来结束回调
  callback 表示一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
* options 表示`可选的配置参数`，目前只有一个 timeout，如果指定了 timeout，并且有一个正值，
* 而回调在 timeout 毫秒过后还没有被调用，那么回调任务将`放入事件循环中排队`。


#### 兼容性
* 目前只有chrome,firefox支持这个api
* 针对兼容性，mdn给出了一个解决方案，在50ms内执行一次任务
```ts
if ((window as any).requestIdleCallback === undefined) {
  // On Safari, requestIdleCallback is not available, so we use replacement functions for `idleCallbacks`
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#falling_back_to_settimeout
  // eslint-disable-nextjs-line @typescript-eslint/ban-types
  (window as any).requestIdleCallback = function (handler: Function) {
    let startTime = Date.now();
    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        }
      });
    }, 1);
  };

  (window as any).cancelIdleCallback = function (id: number) {
    clearTimeout(id);
  };
}
```

### 队列任务处理
#### 空闲时间足够，多个任务会在同一帧执行
```tsx
let taskHandle = null;
let taskList = [
  () => {
    console.log('task1')
  },
  () => {
    console.log('task2')
  },
  () => {
    console.log('task3')
  }
]

function runTaskQueue(deadline) {
  console.log(`deadline: ${deadline.timeRemaining()}`)
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
    let task = taskList.shift();
    task();
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000} );
  } else {
    taskHandle = 0;
  }
}

requestIdleCallback(runTaskQueue, { timeout: 1000 })
```
* 结果是：
```shell
deadline: 6.6
task1
task2
task3
```

#### 空闲时间不够，会分别在不同的空闲周期执行
```tsx
const sleep = delay => {
  for (let start = Date.now(); Date.now() - start <= delay;) {}
}

let taskHandle = null;
let taskList = [
  () => {
    console.log('task1')
    sleep(50)
  },
  () => {
    console.log('task2')
    sleep(50)
  },
  () => {
    console.log('task3')
    sleep(50)
  }
]

function runTaskQueue(deadline) {
  console.log(`deadline: ${deadline.timeRemaining()}`)
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
    let task = taskList.shift();
    task();
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000} );
  } else {
    taskHandle = 0;
  }
}

requestIdleCallback(runTaskQueue, { timeout: 1000 })
```
* 根据 deadline 被 console 了三次，我们可以判断出任务分别被放在了三个空闲时期执行
```tsx
deadline: 12.1
task1
deadline: 16.9
task2
deadline: 16.4
task3
```










