## flex布局之————垂直水平居中
```
		<div class="one">
			<div class="inner"></div>
			<div class="inner"></div>
		</div>
		
		.one{
			display: flex;
			width: 400px;
			height: 400px;
			border: 1px solid gainsboro;
			/* 水平居中 */
			justify-content: center;
			/* 垂直居中 */
			align-items: center;
			/* 但是如果把方向改为column，那么水平居中对应为垂直居中，垂直居中对应为水平居中 */
			flex-direction: column;
		}
		.inner{
			width: 50px;
			height: 50px;
			background: red;
		}
```

## 页面的某个小布局里面想要使用fixed定位，但是不想要计算和视口的距离(计算也不靠谱，存在适配性问题)
* `解决方法:让fixed定位的元素根据父元素定位就行了！(实际上还是根据视口，但是不需要我们计算了)`
```
		  <div class="one">
			  <div class="three"></div>
			  <div class="fixed">
				  <ul>
				  	<li>1</li>
				  	<li>2</li>
				  	<li>3</li>
				  	<li>4</li>
				  </ul>
			  </div>
			  <div class="two"></div>
		  </div>
		  <style type="text/css">
		  .one{
		  	width: 100%;
		  	height: 4000px;
		  }
		  .three{
		  	width: 100%;
		  	height: 50px;
		  }
		  .fixed{
		  	position: fixed;
		  	display: flex;
		  	justify-content: space-between;
		  	background: red;
		  	height: 50px;
		  	width: 100%;
		  }
		  ul{
		  	display: flex;
		  	width: 100%;
		  }
		  li{
		  	padding: 0;
		  	margin: 0;
		  	list-style-type: none;
		  	flex: 1;
		  	display: inline-block;
		  }
		  .two{
		  	background: black;
		  	height: 2000px;
		  	width: 100%;
		  	z-index: 2;
		  }
		  </style>
```
* `关键点在于不给fixed定位的元素设置left/right/top/bottom这些属性！`
* `如果想设置fixed定位的元素和父元素的相对位置可以使用margin,但是其实直接把fixed的元素放到父元素该放到的位置也可以的`
* `如果怕fixed定位的元素会遮挡住下面的元素的话就给下面的元素一个margin-top`

## css实现flex布局的自适应标签栏且隐藏滚动条
```
		  <div class="one">
			  <div class="three"></div>
			  <div class="fixed">
				  <ul>
				  	<li>1</li>
				  	<li>2</li>
				  	<li>3</li>
				  	<li>4</li>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				  </ul>
			  </div>
			  <div class="two"></div>
		  </div>
		  
		  .one{
		  	width: 100%;
		  	height: 4000px;
		  }
		  .three{
		  	width: 100%;
		  	height: 50px;
		  }
		  .fixed{
		  	position: fixed;
		  	display: flex;
		  	justify-content: space-between;
		  	background: red;
		  	height: 50px;
		  	width: 100%;
		  }
		  ul{
		  	display: flex;
		  	width: 100%;
		  	overflow: scroll;
		  }
		  body,ul{
		  	margin: 0;
		  	padding: 0;
		  }
		  ul::-webkit-scrollbar{
		  	width: 0 !important;
		  }
		  li{
		  	padding: 0;
		  	margin: 0;
		  	list-style-type: none;
		  	flex: 1 0 20%;
		  	display: inline-block;
		  	flex-wrap: nowrap;
		  	text-align: center;
			line-height: 50px;
		  }
		  .two{
		  	background: black;
		  	height: 2000px;
		  	width: 100%;
		  	z-index: 2;
		  }
```

## 底部fixed布局在页面高度不够一屏时提升了高度
* `解决方法:使用flex布局给中间内容一个flex:1，底部fixed布局改为flex:0不再使用fixed定位，并且让父元素最低高度设为100%`
```
		  <div class="one">
			  <div class="top">头</div>
			  <div class="middle">中间</div>
			  <div class="footer">底部栏</div>
		  </div>
		  
		  *{
		  	margin: 0;
		  	padding: 0;
		  }
		  html,body{
		  	height: 100%;//不设置根元素高度的话，父元素高度没法继承
		  }
		  .one{
		  	display: flex;
		  	flex-direction: column;
		  	height: 100%;
		  }
		  .top{
		  	flex: 0;
		  	background: red;
		  }
		  .middle{
		  	flex: 1;
		  	background: gray;
		  }
		  .footer{
		  	flex: 0;
		  	background: yellow;
		  }
```

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

## svg
```
			<!-- 从这里可以看出，svg是通过xml标签来绘制的，而canvas是通过js来绘制的 -->
			<!-- 需要注意的是，不设置fill填充白色的话，默认内部就是黑色的填充 -->
			<svg xmlns="http://www.w3.org/2000/svg" style="height: 300px;">
				<rect x="10" y="10" width="100" height="100"
				style="stroke: yellow;fill: white;" onclick="clickone()"></rect>
				<!-- 设置圆角矩形,rx圆角宽度,ry圆角高度 -->
				<!-- 第二个矩形消失了？这是因为svg默认大小是300*150，高度太大了，自然消失了 -->
				<rect rx="10" ry="10" x="10" y="150" width="100" height="100" 
				style="stroke: red;fill: none;" onclick="clicktwo()"></rect>
			</svg>
			
			function clickone(){
				console.log("点击第一个svg图形")
			}
			function clicktwo(){
				console.log("点击第二个svg图形")
			}
```
* `svg可以给每一个图形添加事件，canvas不可以`
* `svg的图形都是用xml标签画出来的，canvas是用js绘制的`
* `canvas绘制的是位图(标量图)也就是一个个像素绘制出来的，而svg是矢量图，也就是用几何特性会描述图像，并且可以无限制的自由组合`

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
