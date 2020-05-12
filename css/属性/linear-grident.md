## 设置条纹
```
			<div class="one">
			</div>
			.one{
				/* 1.如果设置color 百分比形式，那么就是该颜色开始渐变的位置 */
				/* 50%，50%则两个颜色都是在中心才开始渐变，那就没有渐变了，变成一半红，一半蓝！ */
				background: linear-gradient(red 50%,green 50%);
				/* 20%，50%，此时就是红色从20%处开始渐变，而绿色从50%处开始渐变，渐变部分都在20%-50%之间 */
				background: linear-gradient(red 20%,green 50%);
				/* 渐变部分在20%-80%之间 */
				background: linear-gradient(red 20%,green 80%);
				
				/* 2.如果设置了xxdeg,那就指明了渐变的方向，默认是180deg(从上到下) */
				/* 45deg,表示中心点的箭头指向右上方，也就是从左下指向右上渐变 */
				background: linear-gradient(45deg,red 20%,green 80%);
				/* 从左下指向右下渐变 */
				background: linear-gradient(90deg,red 20%,green 80%);
				/* 从左上指向右下渐变 */
				background: linear-gradient(135deg,red 20%,green 80%);
				background: linear-gradient(180deg,red 20%,green 80%);
				/* 3.等宽条纹，需要设置背景的尺寸！ */
				background:linear-gradient(red 50%,green 50%) ;
				/* 4. 不等宽条纹，中心点统一设为某个不等于50%的值 */
				background:linear-gradient(red 40%,green 40%) ;
				/* 5.多色条纹(第二种颜色开始，需要先添加color 0%,然后才加color:xx%,这样才设置多色成功) */
				background:linear-gradient(red 20%,green 0,green 50%,blue 0%,blue 80%) ;
				/* 6.垂直条纹/斜条纹，设置角度，同时background-size也要改变 */
				background:linear-gradient(90deg,green 30%,red 30%) ;
				/* 双色的斜条纹 */
				/* background:linear-gradient(45deg,red 25%,blue 0%,blue 50%,red 0,red 75%,blue 0) ; */
				background-size: 100% 40px;
				/* 如果是斜条纹，那么宽高在这里应该是一致的，相当于划分为多个正方形 */
				background-size: 40px 40px;
				width:200px;
				height: 200px;
			}
```