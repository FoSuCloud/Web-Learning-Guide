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