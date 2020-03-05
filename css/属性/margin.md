## margin
1. `margin-left和margin-right不存在重叠的可能性，只有margin-bottom和margin-top才会重叠，解决方法就是BFC`

## 负边距不会占据原有空间并且位于html文档后面的元素覆盖前面的元素
```
		<div class="mar_top">
			<div class="one"></div>
			<div class="two"></div>
		</div>
		.one{
			background: blue;
			/* 虽然是one元素设置了负边距，但是是two元素位于html文档的后面，所以是two元素覆盖one */
			/* margin-bottom: -50px; */
			width: 100%;
			height: 100px;
			/* 并且没有设置相对定位，所以这两个元素使用margin之后，宽高是多少就是多少，不会占据原有位置！ */
		}
		.two{
			background: yellow;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			/* margin: auto; */
			/* 因为two元素位于html文档的后面，所以会覆盖前面的元素，但是高度是One高度+(50-25)，不会占据原有位置，因为不是相对定位 */
			margin: -25px auto 0; 
		}

```