### SyntheticEvent 合成事件
* SyntheticEvent是浏览器本机事件的跨浏览器包装器。
* 它的 API 与浏览器的本机事件相同，包括stopPropagation()和preventDefault()，
* 但事件在所有浏览器中的工作方式相同。可以使用属性直接从合成事件访问本机事件nativeEvent。
```tsx
import React from "react";

export default function App() {
    return (
        <>
            <MyComponent></MyComponent>
        </>
    )
}

class MyComponent extends React.Component {
    handleClick = (event) => {
        console.log('Event:', event); // SyntheticBaseEvent
        console.log('Clicked!', event.target); // <button>Click me</button>
        console.log('Event pool:', event.nativeEvent); // PointerEvent
    }
    render() {
        return (
            <button onClick={this.handleClick}>Click me</button>
        );
    }
}

```


* 它符合与底层 DOM 事件相同的标准，但`修复了一些浏览器不一致的问题`。
* 某些 React 事件不会直接映射到浏览器的本机事件。例如onMouseLeave中，
* e.nativeEvent将指向一个mouseout事件。
* 具体映射不属于公共 API 的一部分，将来可能会发生变化。
* 如果您出于某种原因需要底层浏览器事件，请从 读取它`e.nativeEvent`。

* `nativeEvent: 一个 DOM Event。原始浏览器事件对象。`

#### 阻止默认事件和阻止冒泡
```tsx
import React from "react";

export default class ChildComponent extends React.Component {
    handleChildClick = (event) => {
        console.log('Child component clicked!');
        event.stopPropagation(); // 阻止事件冒泡到父组件
    }

    handleLinkClick = (event) => {
        console.log('Link clicked!');
        event.preventDefault(); // 阻止默认链接点击行为
    }

    render() {
        return (
            <div>
                <button onClick={this.handleChildClick}>Click me (Child)</button>
                <a href="http://example.com" onClick={this.handleLinkClick}>Visit Example.com</a>
            </div>
        );
    }
}
```
```tsx
import React from 'react';
import ChildComponent from "./ChildComponent";

export default class ParentComponent extends React.Component {
    handleParentClick = (event) => {
        console.log('Parent component clicked!');
    }

    render() {
        return (
            <div onClick={this.handleParentClick} style={{ border: '1px solid black', padding: '10px' }}>
                <ChildComponent />
            </div>
        );
    }
}
```

