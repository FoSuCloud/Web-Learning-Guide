## useContext
* useContext每次传递都是传递一个`新的对象`。所以每次更改某个属性，其他没用到这个属性的组件也会一起更新
* 上下文使得将数据传递到`组件树深处的组件`成为可能，而`无需中间组件`了解它
* 经典使用场景：主题theme、本地化和路由route

#### 缺点
* 虽然 React 的 Context API 提供了一种方便的方式来在组件树中共享数据，但`滥用 Context` 可能会导致一些问题，
* 特别是在应用规模较大或组件结构较为复杂的情况下。
1. `耦合性增加`：使用 Context 可能会增加组件之间的耦合性，因为它使得`组件依赖于外部的状态`。
* 这可能会使得代码更难以理解和维护，尤其是当组件的层级结构变得复杂时。

2. `难以追踪状态来源`：当组件从 Context 中获取数据时，它并不清楚数据的来源是哪个组件，
* 这可能会使得调试和追踪问题变得困难。特别是在大型应用中，可能存在`多个提供相同类型数据的 Context`， 导致混乱和错误。

3. `全局状态管理的副作用`：将数据存储在全局状态中可能会导致一些副作用，例如数据的不一致性、性能问题等。
* 此外，全局状态可能会被不相关的组件访问和修改，进而增加了代码的不确定性。


#### useContext使用的是组件中的提供者
* useContext()钩子确实会在组件树中向上搜索最接近的提供者，并从该提供者获取上下文值。
* `但是`，`它是考虑在您调用useContext()的组件中的提供者的存在的`。
* 如果在您调用useContext()的组件的祖先组件中找不到相应的提供者，useContext()将返回上下文的默认值（如果提供了），
* 或者抛出一个错误（如果没有提供默认值）。
```javascript
const Button = ({ children }) => {
    const context  = useContext(ColorContext);
    return (
        <button style={{ color: context.color }}>
            {children}
        </button>
    );
};
```
* MessageList -> Message -> Button
* 也就是我们在Button中显式声明了要使用 ColorContext 这个上下文的color属性
* 那么就不会因为 父亲组件Message 使用了 MiddleColorContext.Provider 而转而使用MiddleColorContext上下文


#### setState才能更新context值
* 首先传递一个context
```typescript jsx
import {createContext} from "react";

export interface IShareContext {
    key: string;
    name: string;
    index: number;
}

export const shareContext = createContext({key:'',name:'',index:0})
```

* app.tsx
```typescript jsx
import React, {useState} from 'react';
import './App.css';
import {Render1, Render2} from "./components/Render1";
import {IShareContext, shareContext} from "./context/shareContext";

let share: IShareContext = {
    name: 'share',
    key: 'key',
    index: 0
}

function App() {
    console.log('render app')

    function updateContext() {
        console.log('updateContext', share.index);
        share.index++;
    }

    return (
        <div className="App">
            <shareContext.Provider value={share}>
                <Render2></Render2>
            </shareContext.Provider>
            <shareContext.Provider value={share}>
                <Render1></Render1>
            </shareContext.Provider>
            <button onClick={updateContext}>update context</button>
        </div>
    );
}

export default App;

```
* 接受context的组件
```typescript jsx
import React, {useState} from "react";
import {shareContext} from "../context/shareContext";

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
        <shareContext.Consumer>
            {(value) => {
                return <div>render1 context index {value.index}</div>
            }}
        </shareContext.Consumer>
    </div>
}


export const Render2 = () => {
    console.log('render:Render2')
    const context = React.useContext(shareContext);
    return <div>
        render2:
        {context.name}
    </div>
}

```
* `然后可以发现一个问题。。在父组件中改变context,并没有在子组件中更新。虽然点击子组件可以看到其实改变了，但是没有立马触发re-render，需要等到子组件的状态state变化！`
* `这是因为直接去改变context中的属性值，但是这种变更没有被监听，所以没有响应式re-render!`

#### context每次都是更新一个新的对象
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
* 可以看到，就算render2更新只是更新了index 
* `然后render1只使用了name，但是render1还是会跟着context的更新而更新，因为每次context都是传递一个新的对象`


