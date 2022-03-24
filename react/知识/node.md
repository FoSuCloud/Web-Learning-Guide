## reactNode和reactElement区别
1. 定义
* 首先我们找到ReactElement的接口定义
```ts
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type: T;
        props: P;
        key: Key | null;
    }
```
* 然后再看看ReactNode的接口定义
```ts
    type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```
* 由于ReactNone啃个事ReactChild，然后我们看看ReactChild
```ts
type ReactChild = ReactElement | ReactText;
```
* `由此可知,ReactNode可以是ReactElement!`

2. 创建方式
* `JSX方式,React.createElement,React.cloneElement创建的就是ReactElement`
* `render函数返回的就是ReactNode`

3. 验证
* 首先验证React.Element的方式
```tsx
    getNode=() =>{
        return <div>a</div>;
    }
    let node = this.getNode();
    console.log(node); // $$typeof: Symbol(react.element)

    let ele = React.createElement('div', { msg: 1 }, <div>b</div>);
    console.log(ele);// $$typeof: Symbol(react.element)
```
* 然后我们创建一个组件
```tsx
import React from 'react';

interface ChildProps {
    msg: string;
}
class Child extends React.Component<ChildProps, any> {
    render() {
        return (
            <div>
                {this.props.msg}
                {this.props.children}
            </div>
        );
    }
}
export { Child };
```
* 然后我们打印
`console.log(Child); // class Child extends ....`
* 然后我们使用React.creatElement发现可以通过props传递参数
` let child = React.createElement(Child, { msg: '111' }, <div>child</div>)`
* `最后展示的部分就是'111'和'child'`
