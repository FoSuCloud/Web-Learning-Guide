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
