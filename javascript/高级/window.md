## 打开一个新窗口
* `使用window.open()函数，第一个参数为网址地址或者文件路径，第二个参数是窗口名字，window.open('www.baidu.com','win2')`
* 详细参数解析:
* 1. 第一个参数是URL地址或者文档路径
* 2. 第二个参数是窗口名称。可选
* 3. 第三个参数是窗口的参数信息，可选
* 4. 第四个参数是窗口是否作为历史记录，可选，false/true

## 8.clientHeight,offsetHeight,scrollHeight
* clientHeight:仅仅是内容区域，不包括border,滚动条
* offsetHeight:内容区域+padding+滚动条
* scrollHeight:该高度仅在有滚动条的时候才有用处,因为这个高度指的是滚动条隐藏高度+内容高度
* scrollTop:代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度
* offsetTop:当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系
* [参考链接](https://blog.csdn.net/qq_35430000/article/details/80277587)

## 25.children与childNodes
* 对于DOM元素，children指的是DOM Object类型的子对象，不包括tag之间隐式存在的TextNode;
* childNodes指的是DOM Object类型的子对象，以及tag之间隐式存在的TextNode
`对于 div{span}  使用children,tagname输出span;使用childNodes,tagname输出undefined,span,undifned`

## offsetx/clientx/screenx
1. offsetx:指的是鼠标点击的位置相对于发生点击事件的元素的左边缘的距离
2. clientx:指的是鼠标点击的位置相对于浏览器可视区域的距离
3. screenx:指的是鼠标点击的位置相对于屏幕可视区域的距离

## 滚动
1. `注意注意注意！！！要想滚动，必须先设置根元素或者父元素高度超过屏幕高度，而且当滚动到最底部之后，屏幕高度不会变化，所以无法继续向下滚动了`
2. `注意，scrollTp,scrollBy都是不使用px,直接用数字的`
3. scrollTo(left,top)=> scroolTo({left:left,top:top})`scrollTo是绝对位置滚动，滚动到该位置`;
4. scrollBy(left,top)=> scrollBy({left:left,top:top})`scrollBy是相对位置滚动，如果一直使用scrollBy(0,100)那就每次都向下滚动100px`
5. `document.scrollingElement.scrollTop`也是绝对定位，但是一次只能设置一次x/y
