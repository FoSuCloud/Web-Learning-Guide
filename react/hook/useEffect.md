## useEffect
* useEffect可以让我们`在函数组件中执行副作用操作`
* `也就是可以把useEffect看作是componentDidMount、componentDidUpdate、componentWillUnMount这三个生命周期钩子函数的组合`
* `useEffect函数会在DOM更新之后触发,每次渲染都会触发！`
* `useEffect有第二个参数，可选。表示是否在数组中的值变化时才触发函数`
* (因为包括了componentDidMount，所以初始渲染DOM完成后，也会触发该函数)
  
### useEffect的第二个参数为空和[]的区别
* `如果第二个参数deps为空数组[]，那么useEffect只会在mounted的时候触发一次！不会在组件更新的时候触发，因为没有监听组件变量的变更`
*  `如果是空，useEffect(func),那么就是默认情况下，那么每次渲染都会触发！`

* `有时候我们会在useEffect执行一些副作用操作，例如setTimeout`
`那么可以在最后return一个函数，然后在执行完useEffect之后就会调用这个函数`
`执行顺序是先执行return返回的函数，再去执行useEffect内部的函数！`
`注意，初始化渲染的时候，不会执行return返回的函数!`
```javascript
import { useEffect, useState } from 'react';

export default function Hook() {
    let [count, setCount] = useState(0);
    let timer = 0;
    useEffect(() => {
        timer = window.setTimeout(() => {
            document.title = 'title' + count;
        }, 1000);
        return () => {
            if (count >= 6 && timer) {
                clearTimeout(timer);
            }
        };
    }, [count]);
    return <div onClick={() => setCount(++count)}>{count}</div>;
}

```

### 模拟class生命周期
```typescript jsx
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
