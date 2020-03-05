## vertical-align
1. `vertical-align用来指定行内元素或者表格元素的垂直对齐方式`，下面说一下取值
2. baseline:基线，`自身的基线与父盒子的基线对齐，如果没有自身基线，比如img,那么外边距底部边缘和父盒子的基线对齐`
3. `虽然还想写下去，但是。。发现懵了，vertical-align貌似除了父元素，还要有两个子元素才能实现处居中效果，而且不是相对父元素居中，而是两个子元素的相对居中`
4. [参考](https://www.cnblogs.com/starof/p/4512284.html)
5. `还有父元素的x-height一般来说对于不同浏览器不一样，谷歌的font-size默认是16px,字体是sans-serif,所以x-height的一般大概是3-4px`

## 水平间隙垂直间隙总结
1. `水平间隙一般是因为文本之类的原因，例如li,span等元素，可以把元素紧贴在一起，不换行，如:<li></li><li></li>;<span>两个元素之间没有间隙</span><span>没有间隙</span>`
2. `垂直间隙一般是因为默认使用了vertical-align:baseline；对齐了父元素的基线，所以可以使用vertical-align:middle解决，或者给父元素设置line-height:0;或者把内部元素设置display:block;因为块级元素是没有vertical-align对齐烦恼的`
