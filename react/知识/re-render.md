## re-render
* re-render重新渲染。
* 渲染阶段分为以下两个阶段：
1. initial render:组件第一次在页面上渲染
2. re-render: 已经在页面上渲染的组件进行第二次或者多次渲染（没有执行mounted,而是直接执行render）
* 每当耶main更新数据的时候，react组件就会发生re-render，比如用户和页面之间发生交互、异步请求数据或者订阅的外部数据更新等场景都会导致re-rende。
* 那些没有异步数据更新或者非交互式应用程序永远不会发生re-render。因此这种静态场景不需要考虑re-render优化
* [参考]("https://mp.weixin.qq.com/s/SH7N2f5ZhUhysQ7_G2s9rQ")

#### 哪些是必要或者非必要的re-render
* `必要的re-render`:组件发生重新渲染的原因是因为数据发生了变化，组件需要把最新的数据渲染到页面上，那么此时的re-render就是非常有必要的！
* 例如，用户在输入框输入文字，那么输入框的内容更新就是必要的re-render
* `非必要的re-render`: `由于错误的实现方式，某个组件的局部更新导致了父亲组件或者整个页面的更新就是非必要的更新`
* 例如，用户只在输入框输入文字，但是整个页面都在重新渲染
* `非必要的re-render本身不存在问题，因为react非常快速，能够在用户还未注意到的情况下处理它们。`
* `但是，如果re-render在过于频繁或者非常重的组件上进行时，会让用户感觉到卡顿，甚至延迟，甚至页面完全没有响应`

#### 什么时候会发生re-render
* 组件发生re-render的根本原因有：状态更改，父级或者子级重新渲染，context变化以及hooks变化。
* `注意：当组件的props变化时，组件并不会重新渲染`

1. re-render的根本原因：`组件的状态变化`
* 当组件的状态变化时，它将重新渲染自身。通常发生在回调或者useEffect中。`状态变化是所有重新渲染的根本原因`
```typescript jsx
import {useState} from "react";

export const Render1 = () => {
    console.log('render:Render1')
    const [state, setState] = useState(1)
    return <div>
        {state}
        <button onClick={() => {
            setState(state + 1)
        }
        }>click
        </button>
        <Render2></Render2>
    </div>
}
```
* 我们可以看到每次点击都会打印 "render:Render1"

2. 父亲组件的更新可以导致子组件的更新
* 如果组件的父组件重新渲染，那么组件将重新渲染自身。
```typescript jsx
import {useState} from "react";

export const Render1 = () => {
    console.log('render:Render1')
    const [state, setState] = useState(1)
    return <div>
        {state}
        <button onClick={() => {
            setState(state + 1)
        }
        }>click
        </button>
        <Render2></Render2>
    </div>
}


export const Render2 = () => {
    console.log('render:Render2')
    return <div>
        Render2
    </div>
}

```
* 我们点击按钮，可以发现 打印了  "render:Render1" "render:Render2"
* 也就是 父亲组件的更新可以导致子组件的更新

3. 子组件的更新不会导致父亲组件的更新
* `和上面的形成对比。子组件的更新不会导致父组件的更新`
```typescript jsx
import {useState} from "react";

export const Render1 = () => {
    console.log('render:Render1')
    const [state, setState] = useState(1)
    return <div>
        {state}
        <button onClick={() => {
            setState(state + 1)
        }
        }>click
        </button>
    </div>
}


export const Render2 = () => {
    console.log('render:Render2')
    return <div>
        <Render1></Render1>
    </div>
}
```
* 我们点击按钮，可以发现 只打印了  "render:Render1"

4. context变化
* 当context provider的值发生了变化， `所有使用该context的组件都要re-render重新渲染，即使它们并没有使用到变化的那部分context数据！`
* 应该传递变量和更新函数下去
* context
```typescript jsx
import React, { createContext } from 'react';

export interface IShareContext {
    key: string;
    name: string;
    index: number;
}

export const shareContext = createContext<{ state: IShareContext; dispatch: React.Dispatch<any> }>({
    state: { key: '', name: '', index: 0 },
    dispatch: (args: IShareContext) => {}
});

```
* 组件
```typescript jsx
import React, { useState } from 'react';
import { IShareContext, shareContext } from '../context/shareContext';

export const Render1 = () => {
    console.log('render:Render1');
    const [state, setState] = useState(1);
    return (
        <div>
            {state}
            <button
                onClick={() => {
                    setState(state + 1);
                }}>
                click
            </button>
            <shareContext.Consumer>
                {(value) => {
                    return <div>render1 context index {value.state.name}</div>;
                }}
            </shareContext.Consumer>
        </div>
    );
};

export const Render2 = () => {
    console.log('render:Render2');
    const context = React.useContext(shareContext);
    function updateContext() {
        console.log('Render2 updateContext');
        context.dispatch((value: IShareContext) => {
            return { key: value.key, name: value.name, index: value.index + 1 };
        });
    }
    return (
        <div>
            render2:
            {context.state.index}
            <button onClick={updateContext}>Render2 update context</button>
        </div>
    );
};
```
* 父组件
```typescript jsx
import React, { useState } from 'react';
import './App.css';
import { rowContext } from './context/rowContext';
import WFList from './components/WFList';
import { Render1, Render2 } from './components/Render1';
import { IShareContext, shareContext } from './context/shareContext';

let shareState: IShareContext = {
    name: 'share',
    key: 'key',
    index: 0
};

function App() {
    const [share, setShare] = useState(shareState);
    console.log('render app');

    function updateContext() {
        console.log('updateContext', share.index);
        setShare(() => {
            return { ...share, index: share.index + 1 };
        });
    }

    return (
        <div className="App">
            <rowContext.Provider value={[]}>
                <WFList />
            </rowContext.Provider>
            <shareContext.Provider value={{ state: share, dispatch: setShare }}>
                <Render2></Render2>
            </shareContext.Provider>
            <shareContext.Provider value={{ state: share, dispatch: setShare }}>
                <Render1></Render1>
            </shareContext.Provider>
            <button onClick={updateContext}>update context</button>
        </div>
    );
}

export default App;

```
* 可以看到，就算render2更新只是更新了index `然后render1只使用了name，但是render1还是会跟着context的更新而更新，因为每次context都是传递一个新的对象`

5. props变化
* `组件的Props即使变化了，也是由父组件来更新它们。所以是父组件的重新渲染导致了子组件的重新渲染，而不是props的变化导致子组件的重新渲染！`
* `只有哪些使用了React.memo和useMemo的组件，props的变化才会导致组件的重新渲染`
* 例子
```typescript jsx
import React, { useState } from 'react';
import './App.css';
import { Render1 } from './components/Render1';

export interface IProps {
    name: string;
}
let renderProps = {
    name: ''
};

function App() {
    const [share, setShare] = useState(shareState);
    console.log('render app');

    function updateContext() {
        console.log('update name');
        renderProps.name = 'xxx';
    }

    return (
        <div className="App">
            <Render1 name={renderProps.name}></Render1>
            <button onClick={updateContext}>update context</button>
        </div>
    );
}
export default App;
```
* 子组件
```typescript jsx
import React, { useState } from 'react';
import { IShareContext, shareContext } from '../context/shareContext';
import { IProps } from '../App';

export const Render1 = (props: IProps) => {
    console.log('render:Render1 props:', props);
    const [state, setState] = useState(1);
    return (
        <div>
            name: {props.name}
            <button
                onClick={() => {
                    setState(state + 1);
                }}>
                click
            </button>
        </div>
    );
};
```
* 可以看到props的确变化了，但是子组件并没有重新渲染 re-render！

## 如何避免re-render
1. `避免组件组合`
* `在组件的渲染函数中创建组件是一种反模式，很可能引起性能问题`
* 在每次组件重新渲染的时候，都会在渲染函数中重新创建该组件（销毁并从头创建），消耗比re-render更大！
* 除此之外，还可能引起以下问题：
* 在重新渲染内容期间，可能出现内容闪烁
* 每次重新渲染的时候，组件状态会重置
* 每次重新渲染的时候，不会触发依赖项的useEffect
* 如果组件被聚焦，那么焦点将被丢失
---
* `正确用法：`
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
function App() {
    const [state, setState] = useState(appState);
    return (
        <div className="App">
            <Render1 name={state.name}></Render1>
            {state.name}
            <button onClick={() => setState({ name: 'xxx' })}>app click</button>
        </div>
    );
}

export default App;
```
* 组件
```typescript jsx
import React, { useEffect, useState } from 'react';
import { shareContext } from '../context/shareContext';
export interface IProps {
    name: string;
}
export const Render1 = (props: IProps) => {
    console.log('render:Render1');
    const [state, setState] = useState(1);
    // 模拟 class 组件的 componentDidMount 和 componentDidUpdate
    // 第一个参数执行函数，第二个参数不传
    useEffect(() => {
        console.log('DidMount 和 DidUpdate');
    });
    // 模拟 class 组件的 componentDidMount
    // 第一个参数执行函数，第二个参数传空数组[]
    useEffect(() => {
        console.log('加载完了componentDidMount');
    }, []); // 第二个参数是 [] （不依赖于任何 state）

    // 模拟 class 组件的 componentDidUpdate
    // 第一个参数执行函数，第二个参数传state数组|props
    useEffect(() => {
        console.log('更新了');
    }, [props.name]); // 第二个参数就是依赖的 state

    // 模拟 class 组件的 componentDidMount 和 componentWillUnmount
    useEffect(() => {
        // 返回一个函数 模拟 componentWillUnmount
        return () => {
            console.log('componentWillUnmount');
        };
    }, []);

    return (
        <div>
            render1 {props.name}
            <button
                onClick={() => {
                    setState(state + 1);
                }}>
                Render1 click
            </button>
        </div>
    );
};
```
* `可以看到每次点击 app click。都会更改子组件的props,但是子组件只会重新渲染，没有销毁`


* `错误用法：每次render都创建组件`
```typescript jsx
function App() {
    const [state, setState] = useState(appState);
    const DemoRender = () => <Render1 name={state.name} />;
    return (
        <div className="App">
            <DemoRender />
            {state.name}
            <button onClick={() => setState({ name: 'xxx' })}>app click</button>
        </div>
    );
}
```
* `可以明显看到，改为函数调用创建组件的形式之后，每次更改props，都会先销毁组件，再去mount`

2. `state下移到组件中`
* 对于一个状态复杂的组件，如果部分状态仅仅用在渲染树的部分地方，那么可以把该部分状态和渲染抽取出来，做成组件
* `例如一个form表单就可以把radio和对应的state抽取出来，等到需要获取对应的值的时候再获取，避免每次state更新都需要更新整个父组件`

3. `把组件作为props`
* 可以将组件封装成一个较小的组件，`而将较重的组件传递给它。`
* `组件的props不受state变量的影响，所以较重的组件的变量不会影响到父组件，不会重新渲染`
```typescript jsx
<DemoRender 
             left={<xxx>}  //例如 left ,right传递的都是较重的组件
             right={<aaa>}
            />
```

4. `使用React.memo包装的组件会阻止重新渲染`
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

