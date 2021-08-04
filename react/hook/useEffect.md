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

