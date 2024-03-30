## Fragment
* `<></>` 也被称为 "空标签" 或 "空Fragment"，它和 `<Fragment></Fragment>` 的效果是一样的。
* 它们都用于在`不引入额外 DOM 节点`的情况下`包裹多个子元素`。
```javascript
export default function App() {
    return (
        <>
            <h1>Hello</h1>
            <p>World</p>
        </>
    );
}
```
* 或者
```javascript
import {Fragment} from "react";

export default function App() {
    return (
        <Fragment>
            <h1>Hello</h1>
            <p>World</p>
        </Fragment>
    );
}
```
* 最后渲染的结果是，#root根节点下面挂着 hello和world两个子节点
* 并且中间`没有` #app 这样的`组件根节点`

#### 实现原理
* Fragment 实现通常是一个简单的函数或者变量，用于在`编译阶段``将 Fragment 替换为子元素`。
* 这样做的目的是为了避免在`最终的 DOM 结构`中`添加额外的节点`，以`减少 DOM 操作`和`提高性能`。

#### 为什么Fragment比容器 div 更好？
1. 由于`不创建额外的 DOM 节点`，片段`速度更快`，并且`使用更少的内存`。这只对非常大和很深的树有真正的好处。
2. 一些 CSS 机制（例如Flexbox和CSS Grid）具有特殊的父子关系，在中间添加 div 会很难保持所需的布局。
3. DOM 检查器不再那么混乱。

