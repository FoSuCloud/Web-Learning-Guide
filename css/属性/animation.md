## 暂停动画，设置animationPlayState="paused"
## 重新开启动画，设置animationPlayState="running"

## 设置translate3d(0,0,0)/translateZ(0),可以开启硬件加速，因为使用了3d，导致gpu使用

## 下滑菜单动画
```
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
* `注意:元素需要设置overflow:hidden.隐藏多余的高度，才会看起来是移动的样子`

## 加载中动画(animation不需要时间出发，自动加载)
```
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
