## useEffect
* useEffect可以让我们`在函数组件中执行副作用操作`
* `也就是可以把useEffect看作是componentDidMount、componentDidUpdate、componentWillUnMount这三个生命周期钩子函数的组合`
* `useEffect有第二个参数，可选。表示是否在数组中的值变化时才触发函数`
* (因为包括了componentDidMount，所以初始渲染DOM完成后，也会触发该函数)
  
#### useEffect调用时机
* `useEffect 的调用时机是在react完成对DOM的渲染之后，并且在浏览器完成绘制之前`
* 也就是在reconcile统一提交完成后

### useEffect的第二个参数为空和[]的区别
* 如果第二个参数deps为空数组[]，那么useEffect只会在mounted的时候`触发一次`！不会在组件更新的时候触发，因为没有监听组件变量的变更
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

### 应用场景
* `如果是setTimout,addEventListener, MutationObserver, Websocket等需要开启，需要关闭的api需要在组件中使用,`
* `那么我们需要useEffect，是的，需要;这个时候的逻辑就不是生命周期了，我们需要关注的是开启和关闭`

#### websocket连接创建和销毁
* 初始化的时候创建连接
* 后面url改变后断开连接并且重新建立连接
* 在组件销毁后，断开连接，然后结束
```javascript
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => {
            connection.disconnect();
        };
    }, [serverUrl, roomId]);
    // ...
}
```

#### 监听全局浏览器事件
```javascript
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity: 0.6,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```

#### 控制弹窗
```javascript
import { useEffect, useRef } from 'react';

export default function ModalDialog({ isOpen, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
}
```

#### 跟踪元素可见性
```javascript
import { useRef, useEffect } from 'react';

export default function Box() {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      }
    }, {
       threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }} />
  );
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
