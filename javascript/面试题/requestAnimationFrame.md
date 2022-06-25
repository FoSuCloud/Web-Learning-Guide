## 动画实现方式
* 在前端，想要实现动画，可以通过js的setTimeout/setInterval；或者css的transition/animation;
* 此外，使用h5提供的canvas也可以
* 另外h5还提供了一个专门请求动画的API，也就是requestAnimationFrame

## setTimeout/setInterval的缺点
* 使用定时器实现的动画，存在以下几个缺点：
1. 动画的时间间隔不好确认，时间长了不够平滑流畅；短了会达到浏览器绘制的瓶颈（可能掉帧/丢帧）
* 例如：
```css
 #box{
    width: 200px;
    height: 200px;
}
```
```html
<div id="box"></div>
```
```javascript
        var color = ['green', 'red', 'blue', 'yellow'];
        var element = document.getElementById('box');
        var index = 0;
        var animateCallback = function() {
            index++;
            element.style.backgroundColor = color[index];
            if (index === 3){
                clearInterval(interval);
            }
        }
        var interval = setInterval(animateCallback, 1000 / 100);
```
* 上面的动画切换我们设置了间隔10毫秒切换一次，假设此时的屏幕刷新频率为16.7ms(一般屏幕为60帧，也就是16.7毫秒刷新一次),
...
第0ms时，屏幕未刷新，等待中，setInterval也未执行，等待中；
第10ms时，屏幕未刷新，等待中，setInterval执行颜色切换为green
第16.7ms时： 屏幕刷新，屏幕的box颜色改变为green，setInterval未执行。继续等待
第20ms时：屏幕未刷新，等待中，setInterval执行颜色切换为red,
第30ms时，屏幕未刷新，等待中，setInterval执行颜色切换为blue,
第34.7ms时，屏幕刷新，屏幕的box颜色改变为blue,setTimeout未执行，继续等待中。
...

* 从上面的执行过程中，我们可以看出，在执行到20ms和30ms的时候，setInterval切换了两次颜色， 但是屏幕并没有执行一次刷新。
`但是在34.7ms时，屏幕上直接展示的就是blue颜色，而跳过了red颜色。这就是丢帧现象，这种现象也会引起页面卡顿。`

2. 定时器的任务会被添加到宏任务队列中，即使设置了调用时间，
* 也可能因为线程繁忙（例如一个for循环1亿亿次），那么定时器任务即使设置了时间也可能没法按时调用
* 例如：
```css
.text {
            width: 200px;
            height: 60px;
            border: 1px solid lightgrey;
            margin: 100px auto;
            font-size: 30px;
            display: grid;
            place-content: center;
            overflow: hidden;
            white-space: nowrap;
        }
        .btn {
            display: block;
            margin: 0 auto;
            width: 80px;
            height: 40px;
        }
```
```html

<div>
            <div class="text">Hello World!</div>
            <button class="btn">start</button>
        </div>
```
```javascript
        const start = () => {
            const text = document.querySelector('.text')
            const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)
            let w = 0
            const renderId = setInterval(() => {
                console.log(`do at ${performance.now()}`)
                for (let i = 0; i < 10000; i++) {
                    for (let j = 0; j < 10000; j++) {
                        const k = i * j
                    }
                }
                if (w < maxWidth) {
                    w++
                    text.style.width = `${w}px`
                } else {
                    console.log('animation finished')
                    clearInterval(renderId)
                }
            }, 16)
        }
        document.querySelector('.btn').addEventListener('click', start);
```

## requestAnimationFrame
* `而requestAnimationFrame会在下次动画刷新（重绘/回流）之前调用函数`
* `可以使用cancelAnimationFrame取消动画`
```javascript
var color = ['green', 'red', 'blue', 'yellow'];
        var element = document.getElementById('box');
        var index = 0;
        let interval;
        var animateCallback = function() {
            console.log(performance.now())
            index++;
            element.style.backgroundColor = color[index];
            if (index === 3){
                cancelAnimationFrame(interval);
            }else{
                requestAnimationFrame(animateCallback);
            }
        }
        element.addEventListener('click',()=>{
            interval=requestAnimationFrame(animateCallback);
        })
```
1. requestAnimationFrame在设置时间大于等于16.7ms的时候不会丢帧（假设屏幕刷新率是60hz）
* 但是没法设置时间小于屏幕刷新率。因为requestAnimationFrame函数的调用时机是浏览器控制的
* 下面是设置时间大于16.7ms的例子。（由于requestAnimationFrame函数的调用时机是浏览器控制的，所以设置的时间只是大于时间，并不是刚刚好的时间）
```javascript
        var color = ['green', 'red', 'blue', 'yellow'];
        var element = document.getElementById('box');
        var index = 0;
        let old=0;
        let interval;
        var animateCallback = function() {
            if(performance.now()-old<50){
                requestAnimationFrame(animateCallback);
                return;
            }
            old= performance.now()
            console.log(old)
            index++;
            element.style.backgroundColor = color[index];
            if (index === 3){
                cancelAnimationFrame(interval);
            }else{
                requestAnimationFrame(animateCallback);
            }
        }
        element.addEventListener('click',()=>{
            old=performance.now()
            interval=requestAnimationFrame(animateCallback);
        })
```
2. requestAnimationFrame也是一个宏任务，所以在主线程阻塞的时候也不能按照16.7ms这个特定时间执行
```javascript
const start = () => {
            const text = document.querySelector('.text')
            const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)
            let w = 0
            let renderId = requestAnimationFrame(draw)
            function draw(){
                console.log(`do at ${performance.now()}`)
                for (let i = 0; i < 10000; i++) {
                        for (let j = 0; j < 10000; j++) {
                            const k = i * j
                        }
                    }
                    if (w < maxWidth) {
                        w++
                        text.style.width = `${w}px`
                        renderId = requestAnimationFrame(draw)
                    } else {
                        console.log('animation finished')
                        cancelAnimationFrame(renderId)
                    }
            }
        }
        document.querySelector('.btn').addEventListener('click', start);
```

## requestAnimationFrame的优点
1. requestAnimationFrame会把每一帧的DOM操作集中在一次，在一次重绘或者回流中完成。重绘或者回流的时机是由浏览器确定的
2. 对于隐藏的元素，requestAnimationFrame不会进行重绘回流。对于后台脚本（浏览器最小化）也不会重绘回流。节省了cpu性能开销

#### 参考
* [https://blog.csdn.net/weixin_44691608/article/details/115315566]("区别")
* [https://juejin.cn/post/6844903877976981517](丢帧)
* [https://blog.csdn.net/think_A_lot/article/details/114165916](图片)

## requestAnimationFrame在每一帧的执行时机
