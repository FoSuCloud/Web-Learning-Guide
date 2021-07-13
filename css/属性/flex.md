## flex缩写
* css官方文档推荐使用flex的缩写形式，而不是flex-grow,flex-shrink,flex-basis这三个值的完整写法。
* 因为flex缩写形式根据开发者的常用使用进行了优化。

`一般来说，css的属性值如果只有一个值，那么其他值会使用缺省值，但是flex却不是！`
* 举例子:
* 就好像我们的`border属性，就是上下左右的width,style,color的缩写形式`
```html
<style type="text/css">
        body,html{
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            color: red;
        }
        .border{
            height: 200px;
            border: 2px;
            /**
                border-top-color: initial;
                border-top-style: initial;
                border-top-width: 2px;
                border-right-color: initial;
                border-right-style: initial;
                border-right-width: 2px;
                border-bottom-color: initial;
                border-bottom-style: initial;
                border-bottom-width: 2px;
                border-left-color: initial;
                border-left-style: initial;
                border-left-width: 2px;
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
            */
        }
    </style>

<div class="border">
</div>
```
* 同理所得，
```html
border: red;就等于下面的
<!--    border-top-color: red;-->
<!--    border-top-style: initial;-->
<!--    border-top-width: initial;-->
<!--还有bottom,left,right...-->
```

#### 查看flex属性的默认值
`查看一个css属性值的默认方式是通过window.getComputedStyle获取元素的对应样式`
```javascript

<div class="border">
</div>
let border=document.getElementsByClassName('border')[0]
undefined
window.getComputedStyle(border).flexGrow
"0"
window.getComputedStyle(border).flexShrink
"1"
window.getComputedStyle(border).flexBasis
"auto"
/**
 * border元素是否是flex布局并不重要，因为只是获取默认值，就算是block也可以获取到
 * */
```
* 所以flex布局的默认值就是`flex: 0,1,auto`
* `因为flex布局的默认值flex-shrink:1，所以我们给元素设置了flex布局，就会出现莫名其妙，缩小屏幕，文字或者元素缩小的bug!`

### 使用flex缩写语法的场景
* flex单值语法对应的计算值
* `注意默认值是flex: 0,1,auto`
```markdown
| 单值语法 ｜ 等于 ｜ 备注
｜ flex: initial | flex: initial initial initial | 初始值，不使用flex:xxx而是使用display:flex也是一样
| flex: 0   |   flex: 0 1 0%     | 就是把第一个值flex-basis替换为0，然后就是默认值了！
| flex: none | flex: 0 0 auto | 一般用来设置flex-shrink:0，就是为了避免可能自动缩小的问题
| flex: 1 | flex : 1 1 0% ｜ 注意，这里只是把flex-grow替换为1，其他还是初始值
| flex: 3 | flex : 3 1 0% ｜ 注意，这里只是把flex-grow替换为3，其他还是初始值
| flex : auto | flex: 1 1 auto | 
```
* `其实flex:initial可以理解为flex的默认值 0 1 auto;`
* `其中flex-basis:auto; auto指的是 尺寸自适应于内容（flex-basis:auto）（行为类似fit-content）`

1、flex:initial
* flex:initail对应的值是flex:0 1 auto;
```markdown
<div class="container">
            <div>范张范张范张范张范张范张范张范张范张</div>
            <div>范张范张范张范张范张范张范张范张范张</div>
            <div>范张范张范张范张范张范张范张范张范张</div>
            <div>范张范张范张范张范张范张范张范张范张</div>
            <div>范张范张范张范张范张范张范张范张范张</div>
        </div>
 <style type="text/css">
        body,html{
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            color: red;
        }
        .container{
            display: flex;
            width: 200px;
            border: 2px dashed crimson;
        }
        .container div {
            border: 2px solid deepskyblue;
        }
    </style>
```
* 我们可以看到，本来内容区域是超过父元素宽度的，但是我们使用默认的flex，
* 也就是0 1 auto;所以会自动缩小，导致文本换行。

#### flex-basis:0%和flex-basis:auto的区别
* `flex-basis:0%表示建议使用最小内容宽度，所以flex:0 1 0%的元素的最终尺寸表现为最小内容宽度！`
```markdown
<div class="container">
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
        </div>
.container{
            display: flex;
            width: 200px;
            height: 100px;
            border: 2px dashed crimson;
        }
        .inner{
            flex: 0;
            background-color: green;
        }
```
* 我们可以看到`使用flex:0会把子元素的最终尺寸表现为最小的内容宽度，也就是只显示一个文字`

* `flex-basisi:auto表示建议为最大内容宽度，所以flex: 0 0 auto表现为最大内容区域`
* flex: none;表现为flex: 0 0 auto;
```markdown
<div class="container">
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
            <div class="inner">大山大水大的撒的撒的撒的撒上的</div>
        </div>
.container{
            display: flex;
            width: 200px;
            height: 100px;
            border: 2px dashed crimson;
        }
        .inner{
            flex: none;
            background-color: green;
        }
```
* `我们可以看到我们的子元素可以超出父元素的宽度范围，因为auto会表现为最大内容区域`

* 所以我们再看一个例子:
`flex:1 1 0%和flex: 1 1 auto的区别在于，在内容区域不够的时候，flex: 1 1 0%会优先缩小`
`而flex: 1 1 auto会优先扩大`
```markdown
<div class="container">
            <div class="other">大山大水大的撒的撒的撒的撒上的</div>
            <div class="inner">大山大水大的</div>
            <div class="inner">大山大水大的</div>
            <div class="inner">大山大水大的</div>
            <div class="inner">大山大水大的</div>
        </div>
.container{
            display: flex;
            width: 200px;
            height: 100px;
            border: 2px dashed crimson;
        }
        .inner{
            background-color: green;
        }
        .other{
            flex: 1;
        /*    优先缩小*/
        }
        .other{
            flex: auto;
        /*    优先扩大(扩大的比例和其他元素的内容有关，其他内容的内容少，那么该元素就变大的多)*/
        }
```






