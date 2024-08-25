## useCallBack
* useCallBack和useMemo的区别在于useCallBack会返回一个回调函数
* 该回调函数被调用的时候才会触发，不会自动触发。
* 该useCallback函数接收一个参数，第一个是回调函数，第二个是依赖项数组
`一般来说，依赖项数组的值是回调函数里面所用到的值，如果我们使用空数组那就代表所有的依赖都监听`
`如果回调函数用到了a,但是依赖项数组中不存在a,那么函数里面所用到的a就是初始化的时候拿到的a(setState更新一次后，拿到的就又是上一次的a,简单来说就是上次渲染时候的状态)`
* 例子:
```tsx
// BAD，不进行优化的时候
// function ListItem(props) {
//   let addItem = props.addItem
//   useEffect(()=>{
//     console.log('子组件ListItem 加载')
//   },[])
//   useEffect(()=>{
//     console.log('子组件render')
//   })
//   return (
//     <div onClick={ addItem }> { props.children } </div>
//   )
// }
// GOOD shouldComponentUpdate  用useCallback和memo优化以后的代码
import React, { useState, memo, useEffect, useCallback } from 'react';

type MyProps = {
    addItem: () => void;
    children: string;
};

const ListItem = memo((props: MyProps) => {
    let addItem = props.addItem;
    useEffect(() => {
        console.log('子组件ListItem 加载');
    });
    useEffect(() => {
        console.log('子组件render');
    });
    return <div onClick={addItem}> {props.children} </div>;
});

let count = 0;
function List() {
    let [list, setList] = useState<string[]>([]);

    let [name, setName] = useState('Kevin');

    useEffect(() => {
        setList(['6点起床', '7点上班', '8点早会']);
    }, []);

    const addI = useCallback(() => {
        list.push('行程 ' + name);
        setList([...list]);
    }, [list]);
    // 在addI函数中拿到的name这个值，永远是上次渲染拿到的值
    // 例如点击过几次之后，可能的值：K3VIN(点了3次)、K3VIN3(点了6次)、K3VIN6(点了。。。次)
    // 注意，点击三次之后，拿到的是K3VIN，因为这是上次渲染时候的值
    
    const modifyName = () => {
        setName('K3VIN' + ++count);
    };

    return (
        <>
            {list.map((item, index) => {
                return (
                    <ListItem key={index} addItem={addI}>
                        {item}
                    </ListItem>
                );
            })}
            现在的名字： {name} <button onClick={modifyName}> 点击修改名字 </button>
        </>
    );
}

export default List;
```

*  `useCallBack(fn,deps)相当于useMemo(()=> fn, deps)`
* `useCallBack的回调函数仅在某个依赖项改变时才会更新`
