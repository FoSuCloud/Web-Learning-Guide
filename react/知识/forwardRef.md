## forwardRef
* forwardRef 是 React 提供的一种高阶组件（Higher Order Component，HOC），
* `用于在函数组件中转发 ref`。它允许函数组件接收 ref 参数，并`将这个 ref 传递给内部的子组件`。
```javascript
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

// 子组件
const ChildComponent = forwardRef((props, ref) => {
    // 子组件内部的逻辑和状态
    const inputRef = useRef(null);

    // 子组件内部暴露的方法
    useImperativeHandle(ref, () => ({
        focusInput: () => {
            inputRef.current.focus();
        }
    }));

    return <div>
        child
        <input ref={inputRef} type="text" />
    </div>;
});
export default ChildComponent
```
```javascript
import ChildComponent from "./ChildComponent";
import {useRef} from "react";

function ParentComponent() {
    // 父组件中创建 ref
    const childRef = useRef(null);

    // 调用子组件内部暴露的方法
    const handleClick = () => {
        childRef.current.focusInput();
    };

    return (
        <div>
            <ChildComponent ref={childRef} />
            <button onClick={handleClick}>Focus Input</button>
        </div>
    );
}

export default ParentComponent;
```
* 可以看到 ref被转发到ChildComponent中的input元素了





