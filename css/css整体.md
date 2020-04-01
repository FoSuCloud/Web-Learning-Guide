## sass
* Sass包括两种类型的扩展名：.scss和.sass。
* “.scss”文件扩展名完全符合CSS语法，而.sass不完全符合CSS语法，但写入速度更快
* `在firebox中打开f12,可以看到scss变成了css文件`
* `虽然sass是css预处理器，但是需要使用的时候，也要经过编译才行`

## 37.link和@import的区别
1.link是xhtml标签，没有兼容性问题，而@import是css2.1才被提出的，低版本的浏览器不支持
2.link支持加载css,js，而@import只能加载css
3.link加载的内容是`和页面一起加载,所以是异步的`的，而`@import加载的内容要页面加载之后才被加载`

## css默认值
* border-width,outline-width默认值为medium，默认为中等的边框，轮廓
* padding,margin默认值为0

## 39.css中的继承属性
* html元素可以从父元素中继承一部分属性，即使该元素没有定义这个属性
1. 不可继承属性:background,display,margin,border,padding,`height`,min-height,float,clear,position
2. 所有元素可继承:visibility,cursor
3. 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
4. 终端块状元素可继承：text-indent和text-align。
5. 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
6. 表格元素可继承：border-collapse。
7. 可以继承的属性很少，只有`颜色，文字，字体间距行高对齐方式，和列表的样式`可以继承

## 盒子模型
* 标准W3C盒子模型
`content的宽度不包括padding,border`
* IE经典盒子模型
`content的宽度包括padding,border`
* 例子:
`一个div容器,content:200px,border:1px,padding:10px,margin:20px;`
* 对于W3C标准盒子模型来说,`容器占据的宽度为content+(border+padding+margin)*2=200+(1+10+20)*2=262`，`盒子的实际宽度width为content+border+padding=222px`
* 对于IE经典盒子模型来说,`容器占据的宽度为content(因为IE盒子模型的content就包含了padding+border)+margin*2=240px`,`IE盒子的实际宽度width为content=200px`
---
* `<div style="width:100px;height="100px;border:10px;padding:10px;"></div>`
* 对于W3C标准盒子模型,`实际宽度`为 100+(10+10)*2=140px
* 对于IE怪异盒子模型,`实际宽度`为content(包括了padding+border)=100px
---
* `实际中，仅仅设置padding:1px，padding是无效的，不会出现宽度，至少要设置边框样式如solid`

## css样式来源
1. `作者样式>用户样式>浏览器样式(用户代理)`
2. 作者样式是所有样式来源中优先级最高的，这也是开发者想看到的
3. 用户样式优先级低于作者样式，但是可以在浏览器中修改`element.style样式，这样是添加到元素的内联中，所以为!important`
4. `如果是在浏览器中看到user agent stylesheet,那就是浏览器样式！也就是用户代理，是用户改不了了的，是浏览器自己决定的！`


## opacity继承的问题(父元素设置透明度，子元素必定继承！)
1. 遇到的实际问题:父元素设置圆角背景透明度，子元素是黑体字，但是子元素因为父元素是白色0.5透明，所以子元素也变得透明，此时的黑是模糊的黑！
2. 原因:`如果父元素设置了opacity属性，那么子元素必定会继承！(层叠上下文)`
3. 解决方法：
```
1. 使用rgba()来代替opacity，rgba也能设置透明度，但是不会被子元素继承，
2. 失败:对子元素使用z-index:2,尝试提高子元素优先级(提高了优先级，但是不会影响到继承问题)，但是子元素依旧继承父元素透明度，失败！
3. 失败:对子元素使用opacity:1,虽然对子元素设置样式的优先级高于继承的优先级，但是子元素的opacity:1也是基于父元素的opacity来设置的，所以依旧是低于预期效果(可以进一步在父元素opacity的基础上降低透明度，但是提高是没办法的)

```

## css样式覆盖
1. `css样式在优先级相同的情况下，遵循后来者居上的原则，写在后面的反而优先级比前面的更高`
2. `例如一个元素的类名为one, .one{color:red;}  然后在后面又写了 .one{color:blue;}那么实际显示的是后来的样式(重复的部分),也就是蓝色`


## css选择器优先级及选择器优化
1. `!important>内联>id>class/伪类/属性选择器>元素tag/伪元素>通配符/兄弟选择器+~/父子选择器>继承>浏览器默认属性`
2. 优化策略:
```
1. 少使用id选择器，每增加一个id选择器都会增加到全局变量中
2. 尽量少使用父子选择器，选择器最多原则上不超过三层，避免增加开销
3. 尽量避免使用通配规则，尽量避免使用元素选择器，多使用class选择器
```

## 伪元素选择器
1. last-child选择器是选择父元素的最后一个元素的所有xx元素，不好用。。
2. `一般来说，想要选择同名元素中的最后一个，就这样使用`
```
<div id="one">
			<div class="a">1</div>
			<div class="a">2</div>
			<div class="a">3</div>
</div>

//这样就可以选中最后一个class类名为a的元素啦！
//需要注意的是，.a元素必须是某元素中的子元素，不能是根元素
.a:last-child{
	color: red;
}
```
3. 第二种情况
```
<div id="one">
			<div class="two">
				<div class="a">1</div>
				<div class="a">2</div>
			</div>
			<div class="a">3</div>
		</div>
//此时是2,3都变色，因为他们都是各自父元素的最后一个.a类名的元素
```
4. nth-child(n)选择第n个元素
```
		<div id="one">
			<div class="a">1</div>
			<div class="a">2</div>//红
			<div class="a">3</div>
		</div>
		//选择第二个.a元素
		.a:nth-child(2){
			color: red;
		}
```
5. nth-child(2n)选择偶数元素
```
	//只选择偶数的.a元素，奇数的话选择(2n-1)
	.a:nth-child(2n){
		color: red;
	}
	<div id="one">
			<div class="a">1</div>
			<div class="a">2</div>//red
			<div class="a">3</div>
			<div class="a">1</div>//red
			<div class="a">2</div>
			<div class="a">3</div>//red
		</div>
	//需要注意的是，始终是针对一个父元素来说的
	<div id="one">
		<div class="a">1</div>
		<div class="a">2</div>//red
		<div class="a">3</div>
		<div>      //因为父元素不同，所以计数的索引重新开始
			<div class="a">1</div>
			<div class="a">2</div>//red
			<div class="a">3</div>
		</div>
	</div>
```
6. nth-child(n+3)表示是从第三个开始之后的所有元素(包括第三个)
```
.a:nth-child(n+3){
	color: red;
}
<div id="one">
			<div class="a">1</div>
			<div class="a">2</div>
			<div class="a">3</div>//red
			<div class="a">1</div>//red
			<div class="a">2</div>//red
			<div class="a">3</div>//red
		</div>
```
7. nth-child(-n+3),=>3,2,1,0,-1....(0之后的都不算),所以指代1开始到3的元素
8. nth-last-child(2),选择倒数第二个元素
9. `如何选择某个父元素下最后一个xx元素呢？`
```
//通过子选择器指定某个父元素下的子元素，然后通过last-child指定该父元素下的最后一个xx子元素
.two .a:last-child{
				color: red;
			}
			
<div id="one">
			<div class="a">1</div>
			<div class="a">2</div>
			<div class="a">3</div>
			<div class="two">
				<div class="a">1</div>
				<div class="a">2</div>
				<div class="a">3</div>
			</div>
		</div>
```

## first-child/last-child无效
1. `first-child失效可能是因为权重不够，使用方法错误，还有就是可能在该元素前面还有空元素，该元素应该是第一个元素`
2. `last-child失效可能是因为权重不够，使用方法错误，还有就是可能在该元素后面还有空元素，该元素应该是最后一个元素`

## 清除浮动方式
1. 给父元素使用clearfix类名
2. 给父元素添加overflow:hidden;
3. 在浮动元素同级兄弟元素添加一个空元素，设置样式clear:both;clear:both只能影响自身，效果是指定该元素周围不可出现浮动元素


## css命名规范有:BEM(block element modifier)

## color属性可以继承，background-color不可以继承(但是背景颜色默认是transparent也就是透明，所以可以看到父元素的背景色)

## 元素可以同时设置多个class类名样式
```
<div class="one two p">
<p class="o"></p>
</div>

.one.two.p p.o{
	color:green;
}
这样是生效的，并且权重是可以正确计算得！
```
