## DOCTYPE声明
1. DOCTYPE声明位于文档的最前面，处于标签之前，在解析文档之前需要告诉浏览器，使用什么文档类型规范来解析这个文档
2. 严格模式:严格模式是按照该浏览器支持的最高版本运行
3. 混杂模式:向下兼容那些老旧版本的浏览器。
4. 意义:如果不定义DOCTYPE或者DOCTYPE的格式不正确会导致文档以混杂模式呈现。


## 45.html元素显示优先级
* 在html元素中，帧元素(frameset)的优先级最高，然后是表单元素，最后是非表单元素
1. 表单元素有:select列表框 输入框 密码框 textarea文本框 复选框
2. 非表单元素:剩下的都是！
---
* 根据有无窗口，Html元素又可以分为有窗口元素，无窗口元素，有窗口元素的优先级大于无窗口元素
1. 有窗口元素:select object frames等
2. 无窗口元素:剩下的

## 元素嵌套规则
1. p元素不能包含任何`块级元素`(包括自身)
* 因为在p元素中嵌套其他块级元素的话，最后解析就会当做两个p元素包裹着其他块级元素来处理
```
				<p>p元素不能嵌套元素
					<div>p元素可以嵌套内联元素？</div>
				</p>
				=>等于
				<p>p元素不能嵌套元素</p>
					<div>p元素可以嵌套内联元素？</div>
				<p></p>
				
				但是把块级元素改为内联元素又可以
				<input type="button" name="" id="" value="two" class="two" />
```
2. a元素可以包含任何其他元素(`除了自身`),因为a标签会自动添加结束符号
```
<a href="#">
				xx
				<a href="">yy</a>
			</a>
		=>被渲染为
		<a href="#">
			xx
			</a>
			<a href="">yy</a>
			//a标签包含a标签的话会自动添加结束符号
		
```
```
<a href="#">
				xx
				<div>yy</div>
			</a>
			//a标签包含div标签显示正常
```
3. 块元素可以包含内联元素和某些块级元素，内联元素却不能包含块级元素，内联元素只能包含内联元素
4. 这些块级元素只能包含内联元素不能包含块级元素，如:h1,h2,p,dt
5. li标签可以包含div标签,ol,ul标签
6. [a](https://www.cnblogs.com/tu-0718/p/6635212.html)
7. [参考](https://www.cnblogs.com/sunmarvell/p/9583419.html)

## margin垂直边距折叠问题
```
多个相邻（兄弟或者父子关系）普通流的块元素垂直方向marigin会重叠
折叠的结果为：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
两个外边距一正一负时，折叠结果是两者的相加的和。
```

## img是内联元素为什么可以设置宽高？
1. 根据之前学到的，内联元素可以设置line-height,font-size,padding,margin(虽然margin-top,margin-bottom不生效)
2. 但是内联元素设置宽度和高度不是不生效吗？
3. `内联元素分为替换元素和非替换元素`
4. `替换元素:浏览器会根据元素的标签或者属性来设置显示内容，例如input的number,password;textarea;img的src`
5. `非替换元素:内容直接显示在浏览器中，如span,b,embed都是直接显示元素`
6. 因为img属于内联替换元素，所以可以设置宽度和高度

## 内联元素设置宽高
1. `设置position:absolute;自动变为内联块元素`
2. `设置float也是变为内联块元素了`
3. `设置display:block块级元素`
4. `设置display:flex(把元素改为块!!!占据一整行);flex布局元素自然也是可以设置内联元素的宽高的`
5. `设置display:table;把内联元素改为表格块元素`
6. `position:relative不能改变内联元素为内联块/块元素！！！`
7. `position:fixed把元素也变为内联块元素，宽高可以设置！`

## 浮动元素重叠问题
1. `块级元素与浮动元素重叠时，块级元素的内容在浮动元素之上，背景和边框在浮动元素之下`
```
			<div class="left">块级元素，背景和边框在浮动元素之下，内容在浮动元素之上</div>
			<div class="right"></div>
			
			.left{
				background-color: green;
				border: blueviolet;
				<!-- 当块级元素内容高度>设定高度时才能看出 -->
				height: 30px;
			}
			.right{
				background-color: red;
				float: left;
				height: 50px;
				width: 100%;
			}
```
2. `内联元素的内容，背景，边框都在浮动元素之上`
```
			<span class="left">内联元素的内容，背景和边框在浮动元素之上
			内联元素的内容，背景和边框在浮动元素之上
			内联元素的内容，背景和边框在浮动元素之上</span>
			<div class="right"></div>
			
			.left{
				background-color: green;
				border: blueviolet;
				display: inline-block;
				width: 200px;
			}
			.right{
				background-color: red;
				float: left;
				height: 50px;
				width: 100%;
				<!-- 浮动元素需要设置margin-top负 才能看到效果 -->
				margin-top: -30px;
			}
```
3. 如果有非浮动元素和浮动元素同时存在，并且非浮动元素在前，则浮动元素不会高于非浮动元素
4. 浮动元素会尽可能地向顶端对齐、向左或向右对齐
5. 如果有多个浮动元素，浮动元素会按顺序排下来而不会发生重叠的现象

## h5提供的api
```
1. 全屏API（Fullscreen API） 
2. 页面可见性API（Page Visibility API） 
3. getUserMedia API 访问摄像头和麦克风，而无需使用插件。 
4. 电池API（Battery API） 
5. Link Prefetching 预加载网页内容，为浏览者提供一个平滑的浏览体验。 
```

## 自动填充表单功能
```
			<input type="text" list="movie" value=""/>
			<datalist id="movie">
			    <option>人在囧途</option>
			    <option>美人鱼</option>
			    <option>让子弹飞</option>
			</datalist>
```
* `input的list名称对应datalist的id,对应之后，如果输入框中存在该列表中的值，那么就会在下方出现datalist的选择`

