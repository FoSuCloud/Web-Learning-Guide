## type为text时
1. onchange事件在输入并且失去焦点之后才触发！！！`失去焦点`！
2. oninput事件只要改变输入框内容就可以触发！但是如果`通过js改变value值不会触发`
3. `onpropertychange事件会在输入框内容改变时触发，即使是通过js改变的`
4. `但是onpropertychange事件只支持IE11 以下！！！以下`

## label
* label的for属性可以对应input的id属性，`也就是一一对应，效果就是选中label,input也可以聚焦`
* `如果不使用for-id对应方式，那么可以直接把input标签包裹在label标签中！`

## 多选框
```
		<div class="one">
			<label for="1">1</label><input type="checkbox" name="one" id="1"  />
			<label for="2">2</label><input type="checkbox" name="one" id="2"  />
			<label for="3">3</label><input type="checkbox" name="one" id="3"  />
		</div>
		
		var one=document.getElementsByClassName('one')[0];
		one.onclick=function(){
			// 获取第n个多选框是否选中
			console.log(one.children[1].checked);
		}
```

## html5支持的属性
```
			<li>
				<label for="color">设色器</label><input type="color" id="color">
			</li>
			<li>
				<label for="time">时分时间选择器</label><input type="time" id="time">
			</li>
			<li>
				<label for="datetime">时间输入域(但是已废弃)</label><input type="datetime" id="datetime">
			</li>
			<li>
				<label for="datetime-local">时间选择域(年月日时分)</label><input type="datetime-local" id="datetime-local">
			</li>
			<li>
				<label for="month">月份选择器</label><input type="month" id="month" />
			</li>
			<li>
				<label for="week">周和年选择器</label><input type="week" id="week" />
			</li>
			<li>
				范围<label for="range"></label><input type="range" id="range" min="-10" value="0" max="10" step="1" onchange="changeRange()">
			</li>
			<li>
				<label for="number">数值选择器</label><input type="number" id="number" />
			</li>
			<li>
				<label for="search">搜索</label><input type="search" id="search">
			</li>
			<li>
				<label for="tel">电话号码(tel输入域在移动端会弹出数字键盘)</label><input type="tel" id="tel">
			</li>
			<li>
				<label for="email">邮箱输入域</label><input type="email" id="email">
			</li>
			
			function changeRange(e){
				var range=document.getElementById('range');
				// 通过属性值获取元素
				var label=document.querySelector('[for=range]');
				// label元素没有value属性，所以通过innerText设置
				label.innerText=range.value
			}
```
