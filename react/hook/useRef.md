## useRef
* useRef返回一个可变的ref对象，`对象的current属性被初始化为传入的参数`
* 传入的ref对象在组件的整个生命周期内保持不变
* `useRef每次渲染时返回的是同一个ref对象`
* `注意，当ref对象的内容发生变化时,useRef并不会通知到我们，并且变更current属性不会引发组件重新渲染`

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

