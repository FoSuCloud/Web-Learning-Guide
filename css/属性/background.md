## background-origin
```
			.one{
				background: url(images/01bg.png);
				color: yellow;
				/* 背景最左边是border,但是如果此时border是solid,
				那么最左边还是padding!!可以改为dashed */
				background-origin: border-box;
				/* 背景最左边是padding */
				background-origin: padding-box;
				/* 背景最左边是宽度位置 */
				background-origin: content-box;
				width: 300px;
				height: 300px;
				margin: 20px;
				border: 30px dashed black;
				padding: 20px;
			}
```

## background-clip
* 对背景图片进行适当地裁剪`只有裁剪区域的背景才可见`
```
		<div class="wrap">
			<span>padding</span>
		    <div class="content">content</div>
		</div>
		
			.wrap{
				width:220px; 
				border:20px dashed #000; 
				padding:20px; 
				font-weight:bold; 
				color:#000; 
				background:#ccc url(./笔记整理/one/3.jpg) 30px 30px no-repeat; 
				/* 背景的起点是border最左边(但是可能会被裁剪，不可见) */
				background-origin: border-box;
				/* 只填充内容部分 */
				background-clip: content-box;
				/* 会填充padding部分 */
				background-clip: padding-box;
				position: relative;
			}
			.wrap span{
				position: absolute;
				left: 0;
				right: 0;
			}
			.content{
				border: 1px solid black;
				height: 100px;
			}
			
```

## background-size
* 设置背景的宽高
1. auto,`使用图片原始宽高`
2. 长度值，`当有两个值的时候设置图片宽度和高度`，`只有一个值的时候就是作为宽度，高度等比缩放！`
3. 百分比，`将背景图片的宽高设置为所在元素的宽度和高度的百分比`
`当只有一个参数时就视为宽度，高度就等比缩放`
4. cover:`覆盖，将背景图片覆盖整个元素容器，不包括padding/border/margin所在区域`
5. contain:`将背景图片等比缩放到某一侧紧贴容器边缘为止`

## 一个容器可以有多个背景图片！(背景色只能有一个)
* `注意需要给背景图片设置所在位置(否则默认都在同一个位置会覆盖)，并且no-repeat`
* `注意，如果使用url,url的形式，background-size必须紧跟在position后面，并且使用 / 分割`
```
			.wrap{
				width: 300px;
				height: 300px;
				border: 1px solid black;
				/* 注意参数顺序是先位置，再尺寸 */
				background:url('images/01bg.png') no-repeat left top / 50px 50px,
				url('images/01bg.png')no-repeat 100px 0 / 50px 50px,
				url('images/01bg.png')no-repeat 200px 0 / 50px 50px 
			}
```

## background-image优先级高于background-color
```
background-image属性优先级大于background-color属性，
在高度很高的时候设置了background-image不重复，不拉伸，
那么剩下的高度就是由background-color来充当背景
```

## 使用background-position实现背景移动
```
		<ul>
			<li>background背景移动</li>
		</ul>
		li{
			background: url(one/3.jpg) no-repeat;
			/* background-size设置背景图片尺寸 */
			background-size: 200px 30px;
			width: 200px;
			height: 30px;
		}
		li:hover{
			<!-- 往上移动10px -->
			background-position: 0 -10px;
		}
```
* `使用background-position实现背景移动是实现css sprite技术的基础`
* `需要注意的是css sprite技术能合并的图片都是background背景图，不能是img图片`
* `css sprite技术主要用于流量大的网站，因为这个技术降低了开发效率，增加维护难度，一般是流量多的网站使用`

## background-attachment
```
	<div class="two">
		哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
		多多多多多多多多多多多多多多多多多多多多多多多多多多多多
	</div>
	
	.two{
		width: 200px;
		height: 300px;
		overflow: scroll;
		background: url(笔记整理/one/6.jpg) no-repeat;
		/* 背景会随元素滚动而滚动 */
		/* background-attachment: local; */
		/* 当background-image的高度到了之后，就会显示背景色 */
		background-color: red;
		/* 当元素可以滚动时，背景不会移动 */
		/* background-attachment: scroll; */
		/* 背景相对于视口，不会移动 */
		background-attachment: fixed;
	}
```