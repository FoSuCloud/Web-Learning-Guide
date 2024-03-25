## useRef
* useRef返回一个可变的ref对象，`对象的current属性被初始化为传入的参数`
* 传入的ref对象在组件的整个生命周期内保持不变
* `useRef每次渲染时返回的是同一个ref对象`
* `注意，当ref对象的内容发生变化时,useRef并不会通知到我们，并且变更current属性不会引发组件重新渲染`

* `ref,useRef 返回元素的引用，例如 组件元素`

```javascript
import { useRef } from 'react';
export default function Hook() {
    let inputEl = useRef<HTMLInputElement>(null);
    const focus = () => {
        if (inputEl.current) {
            inputEl.current.focus();
        }
    };
    const blur = () => {
        if (inputEl.current) {
            inputEl.current.blur();
        }
    };
    return (
        <div>
            <input type="text" ref={inputEl} />
            <button onClick={focus}>聚焦</button>
            <button onClick={blur}>失焦</button>
        </div>
    );
}
```

* 如果我们想要在react绑定或者解绑DOM节点时运行代码，就要通过`回调ref实现`
* `ref除了接受一个useRef生成的对象，还可以接收一个函数`
```javascript
import { useCallback, useState } from 'react';

export default function Hook() {
    let [height, setHeight] = useState(100);
    const inputEl = useCallback(
        (node) => {
            if (node !== null) {
                console.log(node);
            }
        },
        [height]
    );

    return (
        <div>
            <input type="text" ref={inputEl} style={{ height }} />
            <button onClick={() => setHeight(++height)}>增加</button>
            <button onClick={() => setHeight(--height)}>减小</button>
        </div>
    );
}
```
* `在这个例子中，使用useCallBack存储一个回调函数，在DOM绑定和解绑的时候会触发`
`另外绑定了依赖数组，height改变的时候，useCallback函数也会调用，例如height改变和height减小`

#### ref作为一个函数
```tsx
import React, {Component} from "react";

export default function App() {
    return (
        <>
            <SearchBar />
        </>
    )
}
class SearchBar extends Component {
    private txtSearch: any;
    private setInputSearchRef: (e) => void;
    constructor(props) {
        super(props);
        this.txtSearch = null;
        this.state = { term: "" };
        this.setInputSearchRef = (e) => {
            console.log(e); // input元素
            this.txtSearch = e;
        };
    }
    onInputChange(event) {
        // 设置为input元素的值，所以才能更新term，也就是更新输入框内容
        this.setState({ term: this.txtSearch?this.txtSearch.value:'' });
    }
    render() {
        return (
            <input
                // @ts-ignore
                value={this.state.term}
                onChange={this.onInputChange.bind(this)}
                ref={this.setInputSearchRef}
            />
        );
    }
}
```


#### 在大多数情况下，应该避免使用ref
原因如下：
1. `破坏组件的封装性`： 使用 ref 可能会破坏组件的封装性，因为它允许父组件直接操作子组件内部的 DOM 结构或方法，从而导致组件之间的耦合度增加。

2. `难以理解和维护`： 当组件使用 ref 来直接访问 DOM 元素时，会使得代码变得难以理解和维护。
* 这是因为组件的渲染逻辑和 DOM 操作逻辑被混杂在一起，使得代码变得杂乱不堪。

3. `影响性能优化`： 使用 ref 可能会影响 React 的性能优化策略，因为 React 不再能够完全掌握组件树的结构，从而导致难以对组件进行优化和调整。

4. `可能导致 bug 和内存泄漏`： 不正确地使用 ref 可能导致 bug 和内存泄漏。例如，在组件卸载时没有正确地释放 ref，可能会导致对已卸载组件的引用，从而造成内存泄漏。

5. `违反 React 的哲学`： React 的设计哲学是将界面分解成可组合的组件，每个组件负责自己的状态和渲染逻辑。
*  直接访问 DOM 元素或组件实例可能违反了这种哲学，使得组件变得不可预测和不可控。

