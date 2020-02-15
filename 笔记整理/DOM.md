## target/currentTarget
* `	//target表示的是事件触发的元素(也即是真正点击了的元素)`
* `	//currentTarget表示的是事件绑定的元素(设置监听器的元素)`
```
			<ul>
				<li>点击的li</li>
				<li>433</li>
				<li>33</li>
				<li>33</li>
			</ul>
			var ul=document.getElementsByTagName('ul')[0];
			ul.onclick=function(e){
				//target表示的是事件触发的元素
				var li=e.target;
				//currentTarget表示的是事件绑定的元素
				var m_ul=e.currentTarget;
				console.log(li);//<li>
				console.log(m_ul);//<ul>
			}
```

## addEventListener第三个参数设置事件句柄在冒泡阶段还是捕获阶段执行
1. `addEventListener方法有三个参数，第三个参数设置事件句柄执行阶段`
2. `默认是false,也就是事件句柄在冒泡阶段执行`
3. `设置为true,就是事件句柄在捕获阶段执行`
```
//默认是false,事件句柄在冒泡阶段执行
document.getElementById("myP").addEventListener("click", function() 
{
    alert("你点击了 P g元素!");
});
document.getElementById("myDiv").addEventListener("click", function()
{
    alert("你点击了 DIV 元素!");
});
//事件句柄在捕获阶段执行,true
document.getElementById("myP2").addEventListener("click", function() 
{
    alert("你点击了 P 元素!");
}, true);
document.getElementById("myDiv2").addEventListener("click", function() 
{
    alert("你点击了 DIV 元素!");
}, true);
```

## 获取下一个元素
1. `使用nextSibling属性返回元素节点之后的兄弟节点(包括文本节点(文本或者换行符)，注释节点)`
2. `使用nextElementSibling属性只返回元素节点之后的兄弟元素节点(不包括文本节点，注释节点)`
```
			var sector1=document.getElementsByClassName('sector1')[0];
			console.log(sector1.nextElementSibling);//<div class="sector2"></div>
			console.log(sector1.nextSibling);// 换行符
```