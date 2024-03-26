### setTimeout 和 clearTimeout 的伪代码
* 下面伪代码不一定正确，但是可以说明  clearTimeout 为什么可以销毁setTimeout形成的闭包
```tsx
let timers = {}; // 用于存储定时器的对象

function setTimeout(callback, delay) {
    // 生成一个唯一的定时器ID
    const timerId = generateUniqueId();
    
    // 设置定时器，执行回调函数
    timers[timerId] = setTimeoutCallback(callback, delay);
    
    // 返回定时器ID
    return timerId;
}

function clearTimeout(timerId) {
    // 检查定时器是否存在
    if (timers[timerId]) {
        // 清除定时器
        clearTimeoutCallback(timers[timerId]);
        delete timers[timerId]; // 从存储对象中移除定时器
    }
}

// 内部函数，用于执行定时器的回调函数
function setTimeoutCallback(callback, delay) {
    // 获取当前时间
    const startTime = getCurrentTime();
    
    // 在指定延迟后执行回调函数
    const timer = {
        id: generateUniqueId(), // 用于取消定时器的ID
        callback: callback, // 回调函数
        delay: delay, // 延迟时间
        startTime: startTime // 定时器开始时间
    };

    // 设置定时器
    startTimer(timer);

    return timer;
}

// 内部函数，用于清除定时器
function clearTimeoutCallback(timer) {
    // 取消定时器
    cancelTimer(timer);
}

// 其他辅助函数
function generateUniqueId() {
    // 生成唯一ID的逻辑
}

function getCurrentTime() {
    // 获取当前时间的逻辑
}

function startTimer(timer) {
    // 启动定时器的逻辑
}

function cancelTimer(timer) {
    // 取消定时器的逻辑
}
```


#### setTimeout最小间隔
* 可以看到结果是最小时间间隔为4ms左右
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo</title>
    <style>
        #test {
            width: 100px;
            height: 100px;
            background: #333333;
        }
    </style>
</head>
<body>
    <div id="test"></div>
    <button id="button">start</button>
    <script>
        document.querySelector('button').addEventListener('click', () => {
            animation()
        });
        let previousTimeStamp = 0;
        const now = () => performance.now();
        let count = 0;
        function animation() {
            if (count > 200) return;

            test.style.marginLeft = `${count}px`;
            count++;

            const elapsed = now() - previousTimeStamp;
            console.log(elapsed);
            previousTimeStamp = now()

            setTimeout(animation, 0);
        }
    </script>
</body>
</html>
```


