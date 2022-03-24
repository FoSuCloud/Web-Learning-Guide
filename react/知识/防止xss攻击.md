## 为什么说react可以防止xss攻击？
* 有以下两点原因
1. react会对用户内容进行转义，会在创建时动态创建DOM节点，然后插入文本
2. 通过$$typeof属性判断是否是react元素
---

* 我们在react源码的ReactElement.js可以看到ReactElement元素基本的属性
* 里面有一个$$typeof
```js
const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };
```
* 然后找到
```js
    const symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
```
* `所以$$typeof其实是通过Symbol.for生成的一个唯一的元素标识id`
* `注意：因为Symbol数据类型无法转换为JSON，所以前端填写的文本内容无论是什么，后端都无法接收到Symbol数据类型`
* `也正因为如此，所以我们例如<div>{msg}</div>,这种写法，无法msg的文本是什么，即使写了$$typeof: Symbol.for('react.element')`
* `后端接收到的其实没有$$typeof这个属性，前端获得的也是空！`

`JSON.stringify({a:Symbol.for('react.element')}); // {}`
`JSON.stringify({a:1}); // {a:1}`

* `因此，前端发送字符串给服务器，然后再接受，解析是不可能生成react元素的！`
* `$$typeof属性就从根本上解决了构造数据的这种攻击！(前端项目代码里面手动构造的不算。。。)`

* 写一个组件，我们来看看直接setState和使用$$typeof,以及不使用$$typeof的区别
```tsx
import React, { useState } from 'react';

interface XssProps {
    count: number;
}
export default function TestXss(props: XssProps) {
    const [name, setName] = useState(<div>1</div>);
    return (
        <div>
            {props.count}
            <div>{name}</div>
            <button
                onClick={() => {
                    // setName(<div>2</div>);
                    let obj = {
                        // $$typeof: Symbol.for('react.element'),
                        key: null,
                        props: {
                            dangerouslySetInnerHTML: {
                                __html: 'xss <img src="" onerror="alert(1)"/>'
                            }
                        },
                        ref: null,
                        type: 'div'
                    };
                    setName(obj as any);
                }}>
                点击
            </button>
        </div>
    );
}
```
* `发现使用$$typeof和直接setState的效果是一样的，都可以渲染出来`
* `但是使用$$typeof之后，react认为这是处理过后的对象，不会把__html进行转义，所以xss攻击成功！`
* `然后我们把$$typeof去掉之后，发现控制台直接报错了，无法渲染`
* Uncaught Error: Objects are not valid as a React child (found: object with keys {key, props, ref, type}). If you meant to render a collection of children, use an array instead.
* `这是因为我们传递一个对象进行setState的时候，需要包含$$typeof，否则会被认为是无效的react元素`
* 结论：  `是否有$$typeof属性是一个对象是否是react元素的标识！`
