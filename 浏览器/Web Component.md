## Web Component
* 组件化开发使得我们可以将页面切割成模块便于封装和开发，
* `而 Web Component 在此基础上，可以将每个组件渲染在独立的 DOM 树中，天然支持模块间样式和逻辑的隔离。`
* [参考]("https://codesandbox.io/s/snowy-darkness-jmdip7?file=/index.html")
* Web Components 旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。
1. Custom elements（自定义元素）：一组 JavaScript API，允许您定义 custom elements 及其行为，然后可以在您的用户界面中按照需要使用它们。
2. Shadow DOM（影子 DOM）：一组 JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
3. HTML templates（HTML 模板）： <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。


#### Custom Elements
* 一组 Javascript API，允许您定义 Custom Elements 及其行为，然后在您的用户界面中按照需要使用它们。
```ts
// custom button
class CustomButton extends HTMLElement {
  constructor() {
    super();
    const button = document.createElement("button");
    button.innerText = this.getAttribute("name") || "custom button";
    button.disabled = true;
    this.appendChild(button);
  }
}

window.customElements.define("custom-button", CustomButton);
```

#### shadow dom
* shadow dom其实早在iframe中就已经出现。相当于iframe里面的DOM Tree，是独立于文档流之外的DOM Tree ，有点像是BFC
* `但是shadow dom的元素不存在样式污染，样式可以随心所欲，并且里面的元素样式变化不会触发外部的样式回流和重绘`
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
<!--添加这个shadow-dom元素-->
<shadow-test/>
</body>
</html>
```

#### template
* 当您必须在网页上重复使用相同的标记结构时，使用某种模板而不是一遍又一遍地重复相同的结构是有意义的。以前这是可行的，但 HTML <template> 元素使它更容易实现 (这在现代浏览器中得到了很好的支持)。
* `此元素及其内容不会在 DOM 中呈现，但仍可使用 JavaScript 去引用它。`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<template id="test">
     <div>i am a template</div>
</template>
<script>
    const template = document.getElementById('test')
    document.body.appendChild(template.content)
</script>
</body>
</html>
```

