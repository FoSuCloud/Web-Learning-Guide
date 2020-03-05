## a标签链接
1. 锚点链接:`在一个文件可以定义多个锚点，点击a链接可以跳转到锚点所在位置`
```
<div id="one">
			<div class="d" id="t">2</div>
			<div class="two" style="height: 2000px;">
				<div class="a">1</div>
			</div>
			<a href="#t">ww</a>
		</div>
```
* `需要注意的是，锚点定位要使用id,使用class无效；并且要在页面高度足够滚动的时候才能看出效果`
2. 功能性链接:`点击链接可以跳转到外部文件或者启动其他程序`
3. 双向定位:(文件之间，文件两处地方都可以双向定位)
```
<div class="two" style="height: 2000px;">
				<div class="a">1</div>
				<a href="#w" id="t">双向定位</a> //可以从这里跳转到本文件的#w处
			</div>
			<a href="#t" id="w">ww</a>//可以从这里跳转到本文件的#t处
```
4. 单向定位
```
<div class="two" style="height: 2000px;">
				<div class="a">1</div>
				<a href="one.html#w" id="t">单向定位</a> //可以跳转到某文件的某个锚点处
			</div>
```
5. [参考](https://blog.csdn.net/cccdf_jjj/article/details/80930148)

## a标签的四种伪类状态
1. link未被访问过的状态(对于谷歌浏览器来说，即使多次刷新，被访问过的话还是回不到这个状态)
2. visited被访问过的状态(点击过一次)
3. hover鼠标移动到这里
4. active鼠标点击这里的时候都是这个状态，可以长按
```
			/* a标签还未被访问过的状态 */
			a:link{
				color: black;
			}
			/* 访问过一次之后就一直是红色，但是由于该样式位于hover,active伪类的前面，所以被覆盖了 */
			a:visited{
				color: red;
			}
			/* 移动到标签处就变绿色 */
			a:hover{
				color: green;
			}
			/* 点中就变黄色 */
			a:active{
				color: yellow;
			}
```
* `visited状态应该在hover,active伪类样式之前，否则一旦visited状态伪类样式覆盖了hover,active状态伪类`
* `那么鼠标移动，鼠标点击时的状态变化也不会导致样式变化！！！因为被覆盖了`
* `并且a标签的href属性访问值是空或者#的时候，visited伪类可能会失效`
