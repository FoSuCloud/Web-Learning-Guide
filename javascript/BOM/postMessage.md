## postMessage(跨文档通信)
* postMessage可以发送文本，json,二进制等数据，`可以发送各种数据类型的数据`
* `一般 MessageChannel 和 postMessage 会进行对比`

  postMessage(`跨文档通信`) 适用于简单的`跨文档、跨域通信`，操作简单，灵活性较强。
  MessageChannel(`通道通信`) 适用于需要`更精确、高效的任务调度场景`，提供了更高的控制性和性能。

#### 特点
1. 基于`事件循环`的`异步通信`机制。
2. 可以在不同的浏览器上（包括`不同的窗口、iframe、Web Workers`）进行`跨线程或跨文档通信`。
3. 可以`传递任意的数据`，包括对象、数组等。
4. `可以广播，一对多通信，也可以一对一通信(指定host:port)`

#### 优缺点
* 优点：
跨平台、跨文档，灵活性强。
支持传递复杂的数据结构。

* 缺点：
异步通信，`无法确定消息何时被接收`。
没有建立专门的通道，`可能与其他消息混淆`。

#### 使用场景
* 跨域通信：在不同的窗口、iframe 之间进行通信。
* 与 Web Workers 通信：主线程与 Worker 线程之间进行消息传递。

#### postMessage是异步通信的
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postMessage Demo</title>
</head>
<body>
<!-- 接收消息的 iframe -->
<iframe id="receiver" src="receiver.html" style="display:none;"></iframe>
<div onclick="start()">start</div>
<script>
    // 获取 iframe 窗口
    const iframe = document.getElementById('receiver').contentWindow;
    function start() {
        // 向 iframe 发送消息
        console.log("Before postMessage");
        iframe.postMessage("Hello from parent!", "*");
        console.log("After postMessage");
    }

    // 监听来自 iframe 的消息
    window.addEventListener("message", function(event) {
        console.log("Received message from iframe:", event.data);
    });
</script>

</body>
</html>
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receiver</title>
</head>
<body>

<script>
    // 监听来自父窗口的消息
    window.addEventListener("message", function(event) {
        console.log("Received message from parent:", event.data);
        // 回复消息给父窗口
        event.source.postMessage("Hello from iframe!", event.origin);
    });
</script>

</body>
</html>
```
* 结果是
```shell
Before postMessage
After postMessage
Received message from parent: Hello from parent!
Received message from iframe: Hello from iframe!
```
* 如果是同步的，那么"After postMessage" 应该在 "Received message from parent: Hello from parent!" 之后

### iframe同域通信
```html
<!DOCTYPE html>
<html lang="en">
  <meta charset="utf8" />
  <head>
    <title>测试</title>
    <style></style>
  </head>
  <body>
  <iframe src="./iframe.html" frameborder="0" id="iframe"></iframe>
  <script>
  window.addEventListener('message',(e)=>{
    if(e.origin === 'http://localhost:63342'){
      console.log(e.data)
    }
  })
  let iframe =document.getElementById('iframe')
  iframe.onload=()=>{
    iframe.contentWindow.postMessage(' i am index.html')
  }
    </script>
  </body>
</html>
```
* iframe.html
```html
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document </title>
</head>
<body>

<script>
    top.postMessage('i am iframe', 'http://localhost:63342')

    window.addEventListener('message',(e)=>{
        if(e.origin === 'http://localhost:63342'){
            console.log('iframe accept', e.data)
        }
    })
</script>
</body>
</html>
```

### iframe跨域通信
```html
<!--// index.html,运行在本地的端口63342-->
<!DOCTYPE html>
<html lang="en">
    <meta charset="utf8" />
    <head>
        <title>测试</title>
    </head>
    <body>
        <iframe src="http://localhost:3001/" frameborder="0" id="iframe"></iframe>
        <script>
            const iFrame = document.getElementById("iframe");
            let start = true;
            iFrame.onload = function () {
            if (start) {
            iFrame.contentWindow.postMessage(
        { id: window.location.search, name: "dsadasads" },
            "http://localhost:3001"
            );
            start = false;
        }
        };
            window.addEventListener("message", (e) => {
            if (e.origin === "http://localhost:3001") {
            console.log(e.data);
        }
        });
        </script>
    </body>
</html>
```
* 然后iframe页面是前端vue项目生成
```javascript
// 运行在30001端口
window.addEventListener("message",e=>{
      if(e.origin==="http://localhost:63342"){
        console.log(e.origin); //父页面URL，这里是http://a.index.com
        console.log(e.data);  //父页面发送的消息
        window.parent.postMessage({status:401,msg:"ssss"},"http://localhost:63342");
      }
    });
```

