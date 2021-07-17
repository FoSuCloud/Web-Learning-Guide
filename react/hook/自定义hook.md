## 自定义hook
* 自定义hook是一种约定，`使用了use开头的驼峰函数就视为自定义的hook函数`
* 自定义hook函数可以被多个组件使用，但是状态是不共享的！
```javascript
import { useState } from 'react';

function useCount(): CountType {
    let [count, setCount] = useState(100);
    return [count, setCount];
}

declare type CountType = [number, any];

function Count() {
    let [count, setCount] = useCount();
    return (
        <div>
            <input type="text" value={count} onChange={() => setCount(count)} />
            <button onClick={() => setCount(++count)}>增加</button>
            <button onClick={() => setCount(--count)}>减小</button>
        </div>
    );
}

export default function Hook() {
    return (
        <div>
            <Count></Count>
            <Count></Count>
        </div>
    );
}

```
* `但是存在一个问题，需要定义自定义Hook函数的返回类型`
