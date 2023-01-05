## shadowDOM
* shadowDOM是一种隐藏的DOM树，不在html中反应，并且ie不支持
* 一个DOM元素通常包含两种DOM树
1. light tree: 一般的dom树，由dom元素组成
2. shadow tree: 一个隐藏的dom树，由 shadow dom元素组成
* `如果一个元素同时拥有两种以上DOM子树，那么浏览器只渲染shadow tree`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script>
    customElements.define('shadow-test', class extends HTMLElement {
        connectedCallback() {
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = "这是Shadow DOM元素"
            const div = document.createElement("div")
            div.innerHTML = "这是Light DOM元素"
            this.append(div)
        }
    });
</script>
<body>
<shadow-test/>
</body>
</html>
```

## shadow DOM概念
* [参考]("https://juejin.cn/post/7103068750693433381")
* 一些复杂的浏览器控件，例如video,input等。浏览器在内部dom,css绘制他们，而这个结构一般是隐藏的
* 我们不能通过一般的js调用或者选择器来获取内建的shadow dom元素。

#### 创建shadow dom root
* 我们可以通过调用element.attachShadow({mode:'open','closed'})来创建一个shadow root
* `一个元素中只能有一个shadow root`
* `需要注意的是并非所有 HTML 元素都可以开启 Shadow DOM 的，只有自定义元素和部分html 元素可以开启shadow dom`
* `如：article、aside、blockquote、body、div、foote、h1、h2、h3、h4、h5、h6、header、main、nav、section、span`
---
* `mode为open:可以通过shadow root访问。如：customElem.shadowRoot;`
* `mode为closed：shadowRoot永远为null`
---
* `我们只能通过attachShadow返回的指针来访问shadow DOM`
* `例如原生的inpuy,video,我们就没有办法访问他们`
---
* `shadow DOM会和主文档(window.document)分开`
* `shadow DOM元素对于light DOM中的querySelector不可见。实际上，Shadow DOM中的元素可能与主文档中的元素id冲突`
* `实际上，shadow DOM 有自己的一个id空间，所以不需要担心和主文档冲突，并且可以在shadow tree中获取到自己的元素`
---
* `shadow dom有自己的样式空间。外部样式规则在他的样式空间中不起作用(但是可以使用到全局的scss变量)`
* `可以创建style元素为shadow tree添加全局样式`
* `还可以通过创建link标签引入外部样式`
* 例子：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>原生组件</title>
    <style>
        .name {
            border: 2px solid red;
        }
    </style>
</head>

<body>
<test-component name="1" image="./images/3.jpg"/></test-component>
<test-component name="2" image="./images/4.jpg"></test-component>

<template id="test-component">
    <style>
        :host {
            display: block;
            overflow: hidden;
            border: 1px solid red;
            width: 200px;
            margin-bottom: 10px;
        }

        .image {
            width: 70px;
            height: 70px;
        }

        .container {
            border: 1px solid blue;
        }

        .container>.name {
            font-size: 20px;
            margin-bottom: 5px;
        }
    </style>

    <img class="image">
    <div class="container">
        <p class="name"></p>
    </div>
</template>

<script>
    class testComponent extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({ mode: 'closed' });
            let templateElem = document.getElementById('test-component');
            let content = templateElem.content.cloneNode(true);
            content.querySelector('img').setAttribute('src', this.getAttribute('image'));
            content.querySelector('.container>.name').innerText = this.getAttribute('name');
            shadow.appendChild(content);
        }
    }
    window.customElements.define('test-component', testComponent);
</script>
</body>
</html>
```


## shadow DOM和react结合
* [和react结合demo]("https://blog.csdn.net/qq_36157085/article/details/105394604")
1. 直接使用
```tsx
import React from "react";

export class ShadowView extends React.Component {
    attachShadow = (host: Element) => {
        host.attachShadow({ mode: "open" });
    };

    render() {
        const { children } = this.props;

        // @typescript-ignore
        return <div ref={this.attachShadow}>{children}</div>;
    }
}

export function App() {
    return (
        <ShadowView>
            <span>这儿是隔离的</span>
        </ShadowView>
    );
}

export default App;
```
* `可以发现其实这样啥都没有。。 因为host.shadowRoot 是 ShadowRoot 的实例，而 ShadowRoot 则继承于 DocumentFragment，可通过原生 DOM API 操作其子元素。`


4. ReactDOM.createPortal 实现一版
* App.tsx
```typescript jsx
import React from "react";
import { ShadowView } from "./components/shadow/ShadowView";
import { eventBus } from "./tools/EventBus";
import { ShadowCom } from "./components/shadow-com/ShadowCom";
import "./App.scss";
import "./index.css";

export class App extends React.Component {
  state = { message: "..." };

  onBtnClick = () => {
    eventBus.emit("a", 1);
    this.setState({ message: "haha" });
  };

  render() {
    console.log("app-window", window);
    const { message } = this.state;

    return (
      <div>
        <ShadowView>
          <div>{message}</div>
          <button onClick={this.onBtnClick}>内部单击</button>
          <ShadowCom />
        </ShadowView>
        <button className={"a"} onClick={this.onBtnClick}>
          外部单击
        </button>
      </div>
    );
  }
}

export default App;
```
* App引用的scss文件
```scss
:root {
  --color-primary: red;
}
.a {
  color: var(--color-primary);
}
```

* ShadowView.tsx
```typescript jsx
import "./index.scss";
import ReactDOM from "react-dom";
import React from "react";

// @typescript-ignore
export function ShadowContent({ root, children }) {
  return ReactDOM.createPortal(children, root);
}

export class ShadowView extends React.Component {
  state = { root: null };

  setRoot = (element: { attachShadow: (arg0: { mode: string }) => any }) => {
    const root = element.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    // todo 可以使用到全局scss变量
    style.innerHTML = `.a{color:var(--color-primary)}`;
    console.log("root.shadowRoot", root);
    // element.shadowRoot 是 ShadowRoot 的实例，而 ShadowRoot 则继承于 DocumentFragment，可通过原生 DOM API 操作其子元素。
    if ((element as any).shadowRoot) {
      (element as any).shadowRoot.appendChild(style);
    }

    this.setState({ root });
  };
  onBtnClick = () => {
    if (this.state.root) {
      // todo 只有getElementById 没有getElementsByClassName这种
      console.log(
        "root.shadowRoot",
        (this.state.root as any).getElementById("com")
      );
    }
    // throw new Error("inner");
  };

  render() {
    const { children } = this.props;

    const { root } = this.state;

    return (
      // @typescript-ignore
      <div ref={this.setRoot}>
        {root && (
          <ShadowContent root={root}>
            {children}
            <button className={"a"} onClick={this.onBtnClick}>
              shadow inner单击
            </button>
          </ShadowContent>
        )}
      </div>
    );
  }
}
```
* ShadowView scss文件
```scss
.a {
  color: red;
}
```
* ShadowCom.tsx
```typescript jsx
import React from "react";
import { eventBus } from "../../tools/EventBus";

export class ShadowCom extends React.Component {
  state = { root: null };
  constructor(props: any) {
    super(props);
    eventBus.on("a", (e: any) => {
      console.log("e", e);
    });
  }

  onBtnClick = () => {
    console.log("ShadowCom", document.getElementById("com"));
    // throw new Error("dddd");
  };

  render() {
    return (
      // @typescript-ignore
      <div id={"com"}>
        <button onClick={this.onBtnClick}>shadow com单击</button>
      </div>
    );
  }
}
```

##  缺点
* `无法作用于dialog等会添加到body的组件中！`



