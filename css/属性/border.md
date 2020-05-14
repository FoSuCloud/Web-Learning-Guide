## border
1. border:none表示没有边框样式，也就不会对该元素渲染边框，不会在这里消耗内存
2. border:0表示边框宽度为0，`虽然还是在浏览器上看不到边框，但是浏览器还是会对边框进行渲染，消耗内存`
3. `如border:1px,我们仅仅设置边框大小是不会显示出边框的，还必须设置边框的样式`
4. `我们使用border:none就是不存在边框，浏览器不会对边框进行渲染，宽度也就不存在了，没有实际宽度，宽度为0的说法是错误的!!!`

## border-image边框图片
* [参考](https://www.cnblogs.com/liAnran/p/11608179.html)
```
			.one{
				width: 200px;
				height: 200px;
				margin: 100px auto;
				border: 15px solid black;
				/* 此时只显示4个角！ */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg');
				/* repeat重复(但是没有设置宽度依旧只显示四个角！) */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') repeat;
				/* 1. 如果不设置单位，只有数字，那么默认px,也可以直接设置百分比%
				也就是border-image-slice:可以有四个值(上右下左)，相当于距离上边/右边/下边/左边的位置
				切割之后就是删除中间那一块的空心边框
				然后根据border中设置的大小，填充进去，如果是15px,那么切割的是10px就会变大一些才行*/
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 10;
				/* 相当于20px */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 20; 
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5%;
				/* 两个参数 */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% 2%;
				/* 三个参数 */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% 2% 5%;
				/* 四个参数 */
				border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% 2% 5% 5%;
				
				/* 2.重复性 border-image-repeat
				 round会进行拉伸或者压缩，只要填的圆满！
				 repeat会进行重复填充，只要不满，超出的部分也会被裁剪
				 stretch拉伸，有多长拉多长*/
				 border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% repeat;
				 border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% round;
				 border-image: url('http://img.mukewang.com/52e22a1c0001406e03040221.jpg') 5% stretch;
			}
```
