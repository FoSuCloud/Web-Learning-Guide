## HOC
* 高阶组件（Higher Order Component，HOC）是 React 中一种常见的设计模式，用于重用组件逻辑。
* HOC 是一个函数，`接收一个组件作为参数`，`并返回一个新的组件`。
* 这个新的组件通常会`增强`原始组件的功能或添加一些额外的特性。

HOC 可以用于以下几个方面：
1. `代码复用`：通过将`通用的逻辑提取到 HOC 中`，可以在多个组件之间共享这部分逻辑代码，从而实现代码的复用。

2. 增强组件功能：通过 HOC，可以给组件添加一些额外的功能，例如：`身份验证、日志记录、性能监控`等。

3. 组件逻辑抽象：HOC 可以将某些通用的逻辑从组件中抽象出来，使得组件更加专注于其核心功能，提高代码的可读性和可维护性。

4. `动态渲染`：HOC 可以根据条件动态地包装组件，从而实现动态渲染和条件渲染。

5. 状态管理：HOC 可以用于管理组件之间的状态，例如`共享状态或全局状态管理。`

* 看一个例子
```jsx
import React from 'react';

// 定义一个高阶组件
export default function withLogger(WrappedComponent) {
    // 返回一个新的组件
    return class extends React.Component {
        componentDidMount() {
            // 避免执行两次
            if (!this.logged) {
                console.log(`Component ${WrappedComponent.name} is mounted`);
                this.logged = true;
            }
        }

        render() {
            // 渲染原始组件，并传递所有的 props
            return <WrappedComponent {...this.props} />;
        }
    };
}
```
```javascript

// 使用高阶组件增强功能
import React from "react";
import withLogger from "./withLogger";

class MyComponent extends React.Component {
    render() {
        return <div>Hello, World!</div>;
    }
}

// 使用高阶组件包装组件
const EnhancedComponent = withLogger(MyComponent);
export default EnhancedComponent;
```



