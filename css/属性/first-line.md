## first-line设置元素第一行，first-letter设置元素第一个字
```
<div class="two">
				第一行哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多
			</div>
			
			.two{
				width: 200px;
				font-size: 1rem;
			}
			.two::first-line{
				color: red;
			}
			.two::first-letter{
				color: green;
			}
```
* `元素文字默认字体黑色，第一个字是绿色，第一行除了第一个字外都是红色`
* `需要注意::first-letter的优先级高于::first-line，所以即使first-letter放在first-line前面，第一个字依旧是绿色`
* `就像background-image的优先级高于background-color一样，但是background-image填满了之后background-color就出现背景色`
