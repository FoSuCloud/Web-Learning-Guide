## clip标签
1. `auto等于0，就是该部分不应用裁剪`
2. `clip属性只对绝对定位元素有效absolute`
3. `clip属性的相对定位都是对于左上角的！！！`
```
			.one{
				background-image: url(one/3.jpg);
				/* 裁剪区域是对于原始位置的左上角来定义的！！！ */
				<!-- 裁剪图形的顶部相对原始元素的上边缘10px -->
				clip: rect(10px auto auto auto);
				<!-- 裁剪图形的底部相对原始元素的上边缘10px -->
				clip: rect(auto auto 10px auto);
				<!-- 裁剪图形的右边缘相对原始元素的左边缘50px -->
				/* clip: rect(auto 50px auto auto); */
				<!-- 裁剪图形的左边缘距离原始元素的左边缘50px -->
				clip: rect(auto auto auto 50px);
				/* clip属性唯一合法形状值是rect,也就是裁剪必须是矩形裁剪 */
				width: 200px;
				height: 200px;
				position: absolute;
			}
```
