## 可以给textarea标签设置resize属性来控制缩放
```
		<textarea rows="10" cols="30" class="area">
		</textarea>
		.area{
			resize: both;
			resize: horizontal;
			resize: vertical;
		}
```
* resize:none表示不能改变宽度和高度
* resize:horizontal表示可以改变宽度，不可以改变高度
* resize:vertical表示可以改变高度，不可以改变宽度
* resize:both表示可以改变高度和宽度
