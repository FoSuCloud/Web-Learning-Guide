## tabIndex属性可以用来设置键盘中的TAB键在控件中的激活(焦点)顺序
* 设置为0，则排在所有tabIndex控件之后
* 设置为-1，那么这个元素被排出在tab键的序列之外
* 如果设置为1-32767，那么就加入到tab键的序列中
* 如果序列相同，那么就以在html中出现的顺序为准

## 默认直接tabIndex的元素
* 例如:a,area,button,input,select,textarea
* 例如div元素就不支持，但是可以通过给他添加tabindex属性来实现

## div元素没有focus状态？
* 添加tabIndex属性就可以给元素添加focus状态
```html
        .outer{
            height: 100%;
            width: 100px;
            background: gray;
            margin-left: 100px;
        }
        .outer:focus{
            background: red;
        }

<div class="outer" tabindex="1">
</div>
```
