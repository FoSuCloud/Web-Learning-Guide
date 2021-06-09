## ::selection选择器
* css伪元素应用于文档中被用户高亮的部分`也就是使用鼠标或者其他设备选中的部分`
* `有时候鼠标选中图片会有蓝色背景色就是因为selection对应的background是蓝色，我们可以进行修改`
* 另外只有以下几个属性可以应用于selection选择器
```css
color
background-color
cursor
outline
text-color
text-decoration
text-shadow
```
* 例子:
```html
<style type="text/css">
    body,html,div{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .select{
        font-size: 14px;
    }
    .select::selection{
        color: #0000FF;
        background-color: red;
    }
</style>

<div class="select">
        select
    </div>

```
