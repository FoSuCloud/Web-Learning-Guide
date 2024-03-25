## requestIdleCallback
* requestIdleCallBack和requestAnimationFrame有什么区别呢？
* requestAnimationFrame是每一帧都会执行，`然而requestIdleCallback是在每一帧的最后`，进行判断，如果有空闲时间则执行，没有就等待
* 也就是 requestIdleCallback 是使用浏览器的空闲时间来利用的
* `每一帧的最后指的是paint绘制之后，当前帧是否还有时间`
* [参考](https://www.w3.org/TR/requestidlecallback/)

#### 如果浏览器一直不空闲，requestIdleCallback 就一直不执行？
* 不是，requestIdleCallback可以设置一个timeout来保证至少在这个时间内执行一次

* `触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低`

* 每次事件循环完成时，即处理完宏任务、清空微任务队列中所有任务并且UI渲染完成后，
* 会等待`下一个宏任务来再次开启事件循环机制`，而这段`等待的时间我们称为空闲时间`。
* 目前，timeRemaining() 有一个 50 ms 的上限时间，`也就是即使中间的空闲时间有3min,也会被分为多个50ms的requestIdleCallback空闲周期`

#### 使用语法
* `var handle = window.requestIdleCallback(callback[, options])`
  其中：
  handle 表示返回的 ID，可以把它传入 Window.cancelIdleCallback() 方法来结束回调
  callback 表示一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
* options 表示`可选的配置参数`，目前只有一个 timeout，如果指定了 timeout，并且有一个正值，
* 而回调在 timeout 毫秒过后还没有被调用，那么回调任务将`放入事件循环中排队`。



## 兼容性
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
