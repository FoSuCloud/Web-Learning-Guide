#### jsx
* JSX代表JavaScript XML，它是 ECMAScript 的类似 XML 的语法扩展。基本上它只是为函数提供了
* `语法糖React.createElement(type, props, ...children)`，
* 为我们提供了 JavaScript 的表达能力以及类似 HTML 的模板语法。
```tsx
export default function App() {
  return (
      <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>
  );
}
```
* 如果不使用 JSX 语法，则相应的 JavaScript 代码应如下编写
```tsx
import { createElement } from 'react';

export default function App() {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello, this is a JSX Code!'
  );
}
```

#### React Component 和 React Element 关系
1.` React Element 是 React 应用的最小构建块，它描述了你在屏幕上想看到的内容。`
* 一个 React Element 是一个普通的对象，描述了一个 DOM 节点及其属性和内容。React Element 是不可变的，一旦被创建，你就无法更改其子元素或属性。
* React 使用这些信息来构建和更新 DOM。

2. React Component `是可以接收参数输入并且返回某个 React Element 的函数或者类。`
* 它是用户自定义的，可以封装可重用的代码片段，并根据输入参数的不同返回不同的 React Element。
* React Component 可以看作是一个模板，它定义了如何创建 React Element，并且可以包含其他 React Component。



