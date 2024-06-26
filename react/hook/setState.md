#### setState的回调函数
* 当 setState 完成并且组件被渲染时，将调用回调函数。
* 由于 setState()是批处理更新的，因此`回调函数`可用于任何后期更新后的操作。

* `但是建议使用生命周期方法而不是此回调函数(如果多的话，代码会非常丑陋)`

* setState其实就是通过闭包实现的，返回的 setXxxx 函数访问外部作用域的上次渲染state或者初始值

#### setState实现
1、闭包 保留上次渲染state, 不存在则使用initail初始化值
2、数组存储setState,避免多个state
3、批量处理state,只渲染一次
4、setState的参数是函数，那么把state当前值传递过去作为参数；如果不是函数，那么包装一下为() => action，也就是直接赋值

* 下面是一个简单的实现思路，具体还是看react官网
```javascript
// 每次调用function component 都会重新初始化render,stateHooks,stateIndex
function useState(initial) {
    let currentFiber = wipFiber;
    const oldHook = currentFiber.alternate?.stateHooks[stateIndex]; // 上次渲染的state快照
    const stateHook = {
        state: oldHook ?oldHook.state: initial, // 不是初始化则取上次渲染的快照，否则取初始化值
        queue: oldHook ?oldHook.queue: []
    };
    // fiber.type()的时候会调用到这里
    // console.log("queue:",stateHook.queue)
    stateHook.queue.forEach((action) =>{
        stateHook.state = action(stateHook.state);
    })
    stateHook.queue = [];

    stateHooks.push(stateHook);
    stateIndex++;
    currentFiber.stateHooks = stateHooks;

    function setState(action) {
        // memo才会开启，相同值则不更新
        const eagerState = typeof action === "function" ? action(stateHook.state) : action;
        if (eagerState === stateHook.state) return;

        if (typeof action === "function") {
            stateHook.queue.push(action);
        } else {
            stateHook.queue.push(() => action);
        }
        // 渲染el
        wipRoot = {
            ...currentFiber,
            alternate: currentFiber // 设置 alternate 备用树
        };
        console.log("setState wipRoot:",wipRoot);
        // 记录下本次渲染的根节点
        nextWorkOfUnit = wipRoot;
    }

    return [stateHook.state, setState]
}
```


#### setState是同步的
* 正是因为 setState 是同步的，当同时触发多次 setState 时浏览器会一直被JS线程阻塞，
* 那么那么浏览器就会掉帧，导致页面卡顿，
* 所以 React 才引入了`批处理机制`，`主要是为了将同一上下文中触发的更新合并为一个更新`。

```tsx
import React from "react";
interface ExampleState {
    val: number;
}
export default class Example extends React.Component<any,ExampleState> {
    constructor(props:any) {
        super(props);
        this.state = {
            val: 0
        };
    }

    componentDidMount() {
        this.setState({val: this.state.val + 2});
        console.log(this.state.val); // 0
        this.setState({val: this.state.val + 1});
        console.log(this.state.val); // 0

        setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val); // 1, 是因为到了第二次宏任务，react执行更新state的操作
            // 不是3是因为第一次的更新this.state.val + 2,其实被丢弃了，生效的是第二次this.state.val + 1
            for(let i=0;i<1000000000;i++) {
            }
            this.setState({val: this.state.val + 1});
            console.log(this.state.val); // 1
            // 还是1，因为还在同一个上下文中，还没到更新state的时候
            // 即使因为for循环等待超过16.7ms的时间，还是不会更新，因为执行权还在js中，而且还在同一上下文中
        }, 0);
    }

    render() {
        const {val} = this.state;
        return <div>example {val} </div>;
    }
};
```

* `react的setState批更新会在稍后的某个阶段，也就是下一个更新阶段进行`
* React应用的更新过程是通过"调和"（Reconciliation）机制完成的，
* 它负责比较新旧虚拟DOM树的差异，并将这些差异应用到实际的DOM上。

* React会在一个事件循环的"下一个循环周期"中，或者在某些异步操作（比如网络请求）之后，触发更新阶段。
* 这是React为了提高性能而采用的一种策略，通过批处理状态更新，可以避免不必要的重复渲染，提高效率。

#### 原生js单独处理
* `通过打断点我们可以看到其实原生的js，只要dom变化了就立即渲染，而不需要进行批处理`
* `因为我们每次更新dom的操作都是很昂贵的，批处理一次更新多个更加划算`
```html
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8" />
    <style>
    </style>
</head>
<body>
<div>
    <div id="box">btn</div>
    <div id="box2">==========</div>
</div>
<script>
    const box = document.getElementById("box");
    box.style.color = 'red'

    const box2 = document.getElementById("box2");
    box2.style.color = 'yellow'
</script>
</body>
</html>
```
