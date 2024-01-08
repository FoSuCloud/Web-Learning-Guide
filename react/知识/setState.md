#### setState是同步的
* 正是因为 setState 是同步的，当同时触发多次 setState 时浏览器会一直被JS线程阻塞，
* 那么那么浏览器就会掉帧，导致页面卡顿，
* 所以 React 才引入了`批处理机制`，`主要是为了将同一上下文中触发的更新合并为一个更新`。

```react
import React from "react";
interface ExampleState{
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
        return <div>example {val}</div>;
    }
};
```



