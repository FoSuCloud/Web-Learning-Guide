## css3
* css3在css2.1的基础上增加了许多功能，目前主流浏览器都支持css3的大部分功能，例如`IE10之后也开始全面支持css3了`
* 在css3的样式中，不同的浏览器·有不同的前缀，表示这些样式是浏览器的私有属性
* -webkit-:Chrome/Safari
* -moz-:firefox
* -ms-:IE
* -o-:opera

## css3新增属性
1. text-shadow:`设置文本阴影，参数为x轴的偏移量，y轴偏移量，模糊尺寸，模糊颜色`
2. box-shadow:盒子边框阴影
3. animation
4. border-radius:`如果是border-radius:50px 0 0 50px;那么只有左上角和左下角使用半径为50px的圆角`
5. rgba
6. outline
7. opacity
8. border-image(边框图片)

## css3中的变形与动画
* `Z轴指的是浏览器距离用户的方向！`
1. rotate旋转
* rotate()默认指的是z轴旋转`2d旋转,默认是z轴旋转！所以沿着z轴旋转就是相对中心点2d旋转！`
* rotate3d(x,y,z,angle)`定义3d旋转`
* rotateX/rotateY/rotateZ`定义沿着x轴/y轴/z轴旋转`
* `默认是顺时针旋转，正值时表示顺时针，负值表示逆时针`
2. skew扭曲
* skew(x,y)使得元素在x轴和y轴方向上同时扭曲，`如果只有一个参数那么另一个参数默认为0`
* skewX(x)使得元素在水平方向上扭曲变形
* skewY(y)使得元素在垂直方向上扭曲变形
3. scale缩放
* scale(x,y)`如果只设置一个参数则表示x/y轴都是一样的倍数`使得元素在水平方向和垂直方向同时缩放
* scaleX(x),scaleY(y)表示只在x轴/y轴上缩放
4. translate位移
* `相当于position:relative,并且之前的位置依旧会保留，所以很像相对定位！`
* `但是translate的参数设置为百分比的时候，大小相对的是自身！！！`
* `所以translate常常和position:absolute搭配用于不知道宽高的元素的水平垂直居中！`
```css
.top{
	width:200px;
	height:200px;
}
.wrapper{
	position:absolute;
	left:50%;// LEFT/TOP对应的大小是父元素的宽度/高度
	top:50%;
	background:red;
	padding:10px;
	transform:translate(-50%,-50%);
}
```
5. matrix矩阵缩放
* `matrix(a,b,c,d,e,f),分别表示水平缩放，水平拉伸，垂直缩放，垂直拉伸，水平位移，垂直位移`
* 如:transform:matrix（1，0，0，1，30，30）
* `水平位移=ax+cy+e,(x,y)默认是(0,0)表示是原点，所以=1*0+0*0+30=30`
* `垂直位移=bx+dy+f,(x,y)默认是(0,0)表示是原点，所以=0*0+1*0+30=30`
6. origin原点
* `任何元素都有一个原点(中心点)，中心点是位于元素x轴和y轴50%处`
* `在没有设置原点的时候，旋转扭曲缩放都是以(50%,50%)作为中心点进行变化的`
* center:(50%,50%)
* left:(0,50%)
* right:(100%,50%)
* top:(50%,0)
* bottom:(50%,100%)
* left top:(0,0)
7. transition-property过渡属性
* `在css3中新增了transition模块，通过简单的css事件来触发元素的外观变化`
* `就是通过鼠标点击，获得焦点，被点击和对元素的改变触发`
* css3中创建简单过渡效果的步骤:
```md
1. 在默认样式中声明元素的初始状态样式
2. 声明过渡元素的最终状态样式，比如悬浮状态；
3. 在默认样式中通过添加过渡函数，添加不同的样式
```
* transition-property:`指定过渡或动态模拟的css属性:不包括display!`
* transition-duration:`过渡所需时间`
* transition-timing-function:`指定过渡函数，如ease,ease-in,ease-out,linear`
* transition-delay:`指定开始出现的延迟时间`

