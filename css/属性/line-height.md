## 图片下面有间隙？
1. [参考](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649092548&idx=3&sn=f6e37f79dcbe10854fa3a31d8ba2be68&chksm=be5bd669892c5f7fcf528fcd27d2f714da4ffc89da7383ae09c7629ea46b2de47f071476b34d&mpshare=1&scene=1&srcid=&sharer_sharetime=1573833643584&sharer_shareid=53e5faa8096c16b54c2c13fcf6c34ab4&key=49517593695748bd684dc8407ae44b86037616ea80aed7d4a2619e3892644be834c513d864f8fac4cb4350c729b0ae96a8a9f58db194a195d583f5fba87b9786bcd5d861ebb36c177cc544f2d0292a46&ascene=1&uin=NTU0NzM3Mzcy&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=MPifW5Vm%2BuiA%2Bwk%2F5e0i2%2ByewxX1MetKfB31whIud5Yx%2FALo8TW3rR3b7w4nsz21)
2. 行内框盒子模型分为内容区域(content area)，内联盒子(inline boxes)，行框盒子(line boxes)，包容盒子(containing box)
---
1. content area内容区域是一种围绕文字的看不见的盒子，大小只和font-size有关(也就是紧紧包着文字)，与line-height无关。
2. inline-boxes内联盒子让文字排成一排而不是成块显示，例如span就是一个内联盒子，而没有span这种内联盒子包裹，仅仅是文字的被叫做匿名内联盒子(内联盒子的大小和line-height一样)
3. line-boxes行框盒子由一个个内联盒子组成(一行就是一个行框盒子)`需要注意的是，在行框盒子中，整个行框会有两条基线，两条基线之间的距离就是行高，也就是行框的空间`
4. containing-box包容盒子由一个个行框盒子组成
5. `line-height(行高)=font-size(字体大小)+vertical-spacing(行间距);(行间距vertical-spacing/2的高度就是第一行距离第二行的高度) font-size高度就是内容区域的高度，line-height的高度就是内联盒子的高度，而行框盒子由一个个内联盒子组成，所以行框盒子的高度也是和line-height一样`
6.  `但是没有vertical-spacing行间距这个属性，所以需要借助line-height实现行间距`
---
* 图片下面有间隙？
1. `创建一个div，div里面有一个img元素，而img元素默认是基线对齐，也就是vertical-align:baseline`
```
		<div class="one">
			<img src="one/3.jpg" >
		</div>
		
		.one{
			border: 1px solid red;
			width: 400px;
		}
		img{
			width: 200px;
			height: 202px;
			/* height: 202px;是为了消除border的影响 */
		}
```
* 为了方便观察，把图片的height加上border的值*2，然后调整vertical-align就能看出区别
* `所以我们把vertical-align设置为bottom就可以消除图片下面的边距啦！虽然用top,middle也有效果，但是如果存在同行的元素，那么就能看出另一个元素对齐了图片的底部，中间，顶部了`
---
* 去除图片底边距的方法还有`把图片设置为display:block;因为块级元素不存在基线对齐的问题，块级元素不需要对齐！`
* `因为两条基线(一行文本一条基线，基线在底线之上)之间的距离就是line-height,所以给父元素设置基线为0就可以让父元素的行间距消失！`
* `如果给父元素设置行高line-height为0，那么父元素的高度完全由子元素决定，子元素对齐的基线也就是自己的基线！`
* `给子元素设置vertical-align:baseline;其实就是跟父元素的基线对齐`

## 深入理解line-height行高
1. [参考](https://www.cnblogs.com/oxspirt/p/10370203.html)
2. `line-height属于可继承的css属性之一`
---
1. 百分比继承
* `对于一个元素,font-size:20px;line-height:120%;那么计算之后的的行高也就是24px(注意，继承的是24px而不是百分比！);这个属性会被子元素继承为font-size的值，子元素即使自己设置了font-size(内联样式)也无效，但是子元素自己设置的行高有效！`
* `提出一个问题？行高小于font-size的时候(此时的元素占据空间为line-height,但是font-size没有改变，所以可能出现文字重叠)基线在哪里？`
2. 长度
* 对line-height设置长度，那么子元素继承的就是长度(`还是那句话，子元素自己设置的font-size会被line-height覆盖，但是子元素的line-height可以覆盖继承的line-height`)
3. normal
* `对于不同的浏览器来说，normal的值不一样，一般为1.2,`，normal也会被子元素继承，继承的是`倍数，子元素的line-height就是根据继承的倍数*font-size计算得出的`
4. 纯数字(倍数)
* 对行高设置为纯数字，其实也即是设置为font-size的倍数,`继承的是倍数`
---
* `对于一行文本来说，存在四线三格(英文中的)，从顶部到底部分别是顶线，中线，基线，底线`
* `content area内容区域也就是顶线和底线之间的区域`
