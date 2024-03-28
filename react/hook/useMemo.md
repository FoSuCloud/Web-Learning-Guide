## useMemo
* 接收两个参数：
1. 第一个参数是一个无参函数，用于返回对应的useMemo返回值
2. 第二个参数是一个依赖数组，该数组是可选参数，`不传递则表示所有的渲染改变都会触发useMemo函数更新`
* 如果数组存在值，那么数组内部的值改变了，就会触发该useMemo函数更新
* 类似于vue的computed
```javascript
import { useMemo, useState } from 'react';

export default function Hook() {
    const [a, setA] = useState(1);
    const [b, setB] = useState(11);

    const memorize = useMemo(() => {
        return b;
    }, [a]);
    setTimeout(() => {
        // setA(3);
        setB(33); // b的更新不会触发memorize的改变，因为依赖数组[a]中不存在b
    }, 3000);
    return <div>{memorize}</div>;
}
```
`useMemo通常用于避免在每次渲染的时候进行高开销的计算`
`因为我们如果使用useSate，那么每次重新渲染，都会触发该函数重新计算`


#### 使用React.memo包装的组件会阻止重新渲染
* `使用React.memo包装的组件会阻止重新渲染，即使父组件重新渲染。除非props发生改变`
```typescript jsx
import React, { useState } from 'react';
import './App.css';
import { Render1 } from './components/Render1';

let appState: IState = {
    name: ''
};
export interface IState {
    name: string;
}
const DemoRender = React.memo(Render1);
function App() {
    const [state, setState] = useState(appState);
    return (
        <div className="App">
            <DemoRender name={'sdsd'} />
            {state.name}
            <button onClick={() => setState({ name: 'xxx' })}>app click</button>
        </div>
    );
}

export default App;
```
