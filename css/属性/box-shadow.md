## box-shadow
* `box-shadow是向盒子中添加阴影，可以添加一个至多个`
* 参数为:
1. x轴偏移量：如果为正则是水平向右，为负则水平向左
2. y轴偏移量:如果为正则垂直向下，为负则垂直向上
---
* `加下来几个参数是可选的！颜色也是可选的！`
3. 阴影模糊半径，也就是模糊的距离(`必须为正，为0则没有阴影`)
4. 阴影拓展半径，也就是阴影的尺寸(`为正则阴影变大，为负则阴影变小`)
5. 阴影颜色，省略则默认为黑色
6. 投影方式，`默认是外阴影，如果使用inset则是内阴影！`
```
			.one{
				width: 400px;
				height: 400px;
				margin: 100px auto;
				border: 1px solid red;
				/* 1.此时没有模糊距离也就是完全是蓝色！x轴10px蓝 */
				box-shadow: 10px 20px blue;
				/* 如果是负数，那么此时阴影就是在左边和上边 */
				box-shadow: -10px -20px blue;
				
				
				/* 2.模糊半径就是在y轴或者x轴偏移量的实打实的color距离之外加上一层模糊！ */
				box-shadow: 10px 20px 10px blue;
				/* 此时也就是y轴的阴影+blue的高度为40px,x轴是30px */
				box-shadow: 10px 20px 20px blue;
				/* box-shadow: 10px 20px 100px blue; */
				
				/* 3.阴影拓展半径，相当于把x轴和y轴的偏移量都增加了xxpx,但是阴影的半径不变 */
				box-shadow: 10px 20px 20px 10px blue;
				box-shadow: 10px 20px 20px 20px blue;
				/* 此时阴影拓展半径为负数，相当于x轴和y轴偏移量都减少了xxpx */
				box-shadow: 10px 20px 20px -10px blue;
				
				/* 4.内阴影 */
				/* 相当于把相对定位改在了盒子内部，原本在右边和下边的阴影变成了内部左边和上边的阴影 */
				box-shadow: 10px 20px 20px  blue inset;
				box-shadow: 10px 10px 20px  blue inset;
				
				/* 5.上下左右都是阴影！ (x/y偏移量设为0，通过第三第四个参数)*/
				box-shadow: 0 0 20px blue;
				box-shadow: 0 0 20px blue inset;
				
				/* 6.多个阴影 */
				box-shadow: 0 0 20px blue inset,10px 20px 10px yellow,-10px -20px 10px green;
			}
```
