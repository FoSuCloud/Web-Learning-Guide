## 生命周期
组件生命周期具有三个不同的生命周期阶段：
1. `挂载`：组件已准备好挂载到浏览器 DOM 中。此阶段涵盖
* constructor()、getDerivedStateFromProps()、render()和componentDidMount()生命周期方法的初始化。

2. `更新`：在此阶段，组件以两种方式更新，发送新的 props 并从setState()或更新状态forceUpdate()。
* 此阶段涵盖getDerivedStateFromProps()、shouldComponentUpdate()、render()和生命周期getSnapshotBeforeUpdate()方法componentDidUpdate()。

3. 卸载：在最后一个阶段，组件不再需要，并从浏览器 DOM 中卸载。
* 此阶段包括componentWillUnmount()生命周期方法。

* 值得一提的是，当对 DOM 进行更改时，React 内部有一个阶段的概念。它们的分离如下
* 渲染组件将渲染，没有任何副作用。这适用于纯组件，在此阶段，React 可以暂停、中止或重新启动渲染。
* `预提交`在组件实际`将更改应用到 DOM 之前`，有一个时刻允许 React 通过`getSnapshotBeforeUpdate()`.
* Commit React 与 DOM 一起工作，并分别执行componentDidMount()安装、componentDidUpdate()更新和componentWillUnmount()卸载的最终生命周期。
![react16生命周期](./react16生命周期.png)

### getDerivedStateFromProps
* getDerivedStateFromProps存在的目的只有一个。它`使组件能够根据props 的变化来更新其内部状态`。
* React 将在调用render之前 调用它，无论是在初始安装还是后续更新时。
* 它应该`返回一个对象`来`更新状态state`，或者`null不更新任何内容`。

* 通过打印可以看到 先执行getDerivedStateFromProps 再执行 render
```javascript
import UserProfileControl from "./components/form/UserProfileControl";
import LifeCycle from "./components/lifecycle/LifeCycle";

export default function App() {
    // 定义 count 初始值
    const initialCount = 5;
    return (
        <div>
            <LifeCycle count={initialCount}></LifeCycle>
        </div>
    );
}
```
```javascript
import React, { Component } from 'react';

export default class LifeCycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 初始化 state
            count: 0
        };
    }

    // 通过 getDerivedStateFromProps 更新状态
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps')
        // 如果新的 props 中包含 count 属性，则更新 count 状态
        // 当前state.count为0， nextProps.count为5，所以更新state，返回5
        if (nextProps.count !== prevState.count) {
            return { count: nextProps.count };
        }
        // 否则返回 null，表示不需要更新状态
        return null;
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
            </div>
        );
    }
}
```


### forceUpdate(callback?)
* 强制组件重新渲染。
* 通常，这是没有必要的。如果您的组件的render方法仅从this.props、this.state或读取this.context，
* setState则当您在组件或其父组件之一内部调用时，它将自动重新呈现。
* 但是，如果组件的render方法直接从外部数据源读取，则必须告诉 React 在该数据源更改时更新用户界面。
* 这就是forceUpdate你可以做的。

* 如果你调用forceUpdate，React 将`重新渲染`而`不调用shouldComponentUpdate`。


