## animation
* 动画样式，不需要被动触发，`可以自动触发`，可结合@keyframe进行`多个关键帧的动画`

### animation的属性
* 和transition一样，有`animation-duration持续时间，animation-delay推迟多久再执行`
* `animation-timing-function使用的函数，还有动画名称animation-name`
* 此外还可以设置动画播放次数:`animation-iteration-count(默认infinite无数次):infinite/0/1/...`
* `还可以设置动画播放方向(逆向！):animation-direction:alternate(正向播放一次，逆向播放一次)；还可以设置normal(一直正向)`
* `还可以设置动画的播放和暂停:animation-play-state:paused/running暂停或者播放`
```html
			<div class="one">
				<div class="square"></div>
			</div>
			.one{
				border: 2px red solid;
				width: 200px;
				height: 200px;
				margin: 0 auto;
				position: relative;
			}
			.square{
				background-color: #0000FF;
				position: absolute;
				left: 0;
				top: 50%;
				animation: one 5s ease .2s infinite;
				animation-direction:alternate;
				animation-play-state: running;
				width: 10px;
				height: 10px;
			}
			@keyframes one{
				0%{
					transform:translateX(0px);
				}
				10%{
					transform:translateX(20px);
				}
				50%{
					transform:translateX(50px);
				}
				80%{
					transform:translateX(120px);
				}
				100%{
					transform:translateX(200px);
				}
			}
			.one:hover .square{
				animation-play-state:paused;
			}
```
* `还可以指定动画结束停留在最后一帧处还是第一帧处:animation-fill-mode:none表示动画按照预期进行，结束后反转回初始帧`
* `forwards表示动画结束后继续在最后一帧；backwards表示回到第一帧；both表示动画同时具有forwards和backwards的特点`

## 暂停动画，设置animationPlayState="paused"
## 重新开启动画，设置animationPlayState="running"

## 设置translate3d(0,0,0)/translateZ(0),可以开启硬件加速，因为使用了3d，导致gpu使用

## 下滑菜单动画
```css
			/* 通过改变最大高度实现下拉菜单下滑效果 */
			@keyframes  enter{
				0%{
					opacity: 0.5;
					max-height: 50px;
				}
				100%{
					opacity: 1;
					max-height: 100px;
				}
			}
```
* 注意:元素需要设置overflow:hidden.隐藏多余的高度，才会看起来是移动的样子

### 加载中动画 (animation不需要时间出发，自动加载)
```html
		<div class="c_fresh">
		  <div class="mine_f"></div>
		  <div class="bf"></div>
		  <div class="af"></div>
		</div>
	
		.c_fresh{
		  position: relative;
		  width: 50px;
		  height: 50px;
		  border-radius: 50%;
		  z-index: 4;
		  font-size: 0;
		  margin: auto;
		}
		.mine_f{
		  position: absolute;
		  width: 44px;
		  height: 44px;
		  top: 3px;
		  left: 3px;
		  background: white;
		  border-radius: 50%;
		  z-index: 4;
		}
		.bf{
		  position: absolute;
		  top: 0;
		  left: 0;
		  z-index: 2;
		  width: 50px;
		  height: 50px;
		  border-radius: 50%;
		  background: rgba(242, 242, 242, .5);
		}
		@keyframes spin {
		  0% {
			transform: rotate(0deg);
		  }
		  100% {
			transform: rotate(360deg);
		  }
		}
		.af{
		  z-index: 3;
		  background: linear-gradient(to right,blue,#EF5350);
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 50px;
		  height: 50px;
		  border-radius: 50%;
		  clip: rect(0,38px,25px,12px);
		  animation: spin 1s linear infinite;
		}
```
* `animation: spin 1s linear infinite;是实现动画的关键，第一个参数是对应的动画名称，第二个是每次动画持续时间，第三个是动画速度曲线，第四个参数是动画持续次数，infinite指的是无数次`
* `此外还需要切割clip一个合适大小的元素，然后使用动画改变rorate,如果想让进度条渐变色，那就背景使用linear-gradient`
