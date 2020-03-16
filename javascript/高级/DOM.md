## BOM,DOM
1. 文档对象模型DOM的根元素是document
2. 浏览器对象模型的根元素是window
3. document属于window的一个对象属性,window.document,因为文档对象模型其实就是一个页面，而页面处于浏览器中，也就是一个窗体中，也就是window

## DOM内部插入
* `element.append(content) ,前面是被插入的对象，后面是要在对象内插入的内容，例如ul.append(li),给无序列表添加一个子元素`
* `element.appendTo(content),恰好相反，使用为 li.appendTo(ul),位置恰好相反，把li插入到ul中`
* 注意:`append,appendTo都可以同时传入多个节点或者字符串，没有返回值`
* `element.appendChild(content)只能传一个节点，且不支持传递字符串，返回值为追加的节点`
* `并且如果element.appendChild(content),content这个参数是页面中之前存在过的节点的话，那么执行之后，该元素会被移除，然后再添加到element`

* [记得写](https://blog.csdn.net/mr_orange_klj/article/details/81561163)

## Node
* Node是一个基类，DOM中的element,text,comment都继承于它
* `换句话说，element,text,comment都是特殊的node`
* `分别叫做ELEMENT_NODE,TEXT_NODE,COMMENT_NODE`

## DOM第一个子节点是html
* DOM(Document Object Model)简称文档对象模型，它是html和xml是文档编程的接口，
* 它将文档解析为树结构，这个树的根部就是document,而`document的第一个子节点(childeNodes[0])就是html`
* 这才有了后面的一系列html元素。

## 获取元素子节点
```
		<input type="text" list="data">
		<datalist id="data">
			<option value="one"></option>
			<option value="two"></option>
			<option value="three"></option>
			<option>four</option>
		</datalist>
			var data=document.getElementById('data');
			console.log(data.children[0]);// 子节点 one
			console.log(data.childNodes[0]);// 换行符
```
* `childNodes[0]获取到的是元素第一个子节点，可能是换行符。。`
* `children[0]获取到的是第一个子元素，不会是注释节点Comment,文本节点Text`

## 根据元素属性获取元素
* 对于label标签，属性for为range，那么可以`document.querySelector('[for='range']')`

## 元素内外文本及自身
1. innerHTML:在读模式下，innerHTML返回元素的所有子节点(包括注释，文本，标签)，在写模式下会创建一个新的子节点代替原来的子节点
2. outerHTML:在读模式下是获取该元素本身，在写模式下是创建一个新的节点代替原来的节点
```
如: <div id="app">
		我是父元素div的内容
		<span>我是子元素span的内容</span>
    </div>
使用innerHTML:输出 我是父元素div的内容 <span>我是子元素span的内容</span>
使用outerHTML:输出 <div id="app">  我是父元素div的内容 <span>我是子元素span的内容</span> </div>
```
3. innerText/outerText:在读模式下，都是获取该元素(包括子元素)的文本，但是在写模式下完全不同！
`在写模式下，innerText使用文本替换整个节点的所有子节点，例如上面的例子被 one 替换就会变成<div id="app"> one </div> `
`在写模式下，outerText使用文本替换整个节点！！！再用one替换就成了 one 所以也就是只剩下一个文本了`
* [参考](https://www.cnblogs.com/jongsuk0214/p/6930876.html)

## 前端查询元素类名，增删类名，改变元素样式
```
// 前端查询元素类名，增删类名，改变元素样式
			// 1. 寻找元素，使用document.getElementByClassName()
			var one=document.getElementsByClassName('one')[0];
			// 2.给元素绑定监听事件
			one.onclick=function(){
				console.log("元素监听事件触发");
			}
			// 3.通过元素.getAttribute()获取元素类名
			var mine=document.getElementsByClassName('li')[1];
			mine.onclick=function(){
				var min_cla=mine.getAttribute('class');
				console.log(min_cla);//li 
				// 4.通过元素.setAttribute("xx属性","更改为xx");
				mine.setAttribute('class',min_cla+' mine_cla');
				// 5.通过元素.style.样式去修改元素样式
				mine.style.backgroundColor="yellow";
				
				setTimeout(()=>{
					// 6.通过className获取元素类名
					console.log(mine.className);
					// 7.通过classList.add()添加元素类名
					mine.classList.add('cla_list_add')
					// 8.通过classList.remove()删除元素类名
					mine.classList.remove('li')
				},1000)
			}
```

## 可能导致回流的情况
1. 改变窗口的大小
2. 给元素添加删除类名
3. 内容的改变，如用户在输入框打字
4. 激活伪类，如hover
5. js操作DOM
6. `计算offsetWidth,offsetHeight,浏览器为了保证计算的准确，肯定会产生回流好计算`

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

## js的delete操作符
```
			// js 的delete 操作符
			function func(name){
				this.name=name;
			}
			var obj=new func('对象');
			console.log(obj.name);//对象
			// 1.可以删除对象属性
			// delete obj.name;
			// console.log(obj.name);// undefined
			
			// 2. 不可以!!!删除变量
			delete obj;
			console.log(obj);//func {name: "对象"}
			
			// 3. 删除实例的属性(该属性是构造函数原型链上的)，那么删除失败！
			func.prototype.age=18;
			console.log(obj.age);//18
			delete obj.age;
			console.log(obj.age);//18
			// 4.删除原型链上的属性，那么实例用到该属性也会失效！
			delete func.prototype.age;
			console.log(obj.age);//undefined
```

## js自定义事件触发和监听
```
function EventEmitter(element){
    this.on=function(name,callback){
        element.addEventListener(name,callback)
    }
    this.trigger=function(name){
        // 创建事件
        var eve=new Event(name)
        // 触发事件
        element.dispatchEvent(eve);
    }
}
var ele=new EventEmitter(document.getElementById('one'));
// 监听事件
ele.on('test',function(){
    console.log("自定义事件被触发了")
})
// 触发事件
ele.trigger('test')
```

## 查找两个节点的共同父节点 ele.contains(ele2)用于判断ele元素中是否包含元素ele2
```
function commonParentNode(oNode1, oNode2) {
    // 只要还存在oNode1就继续遍历
    for(;oNode1;oNode1=oNode1.parentNode){
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}
```

## 8.clientHeight,offsetHeight,scrollHeight
* clientHeight:仅仅是内容区域，不包括border,滚动条
* offsetHeight:内容区域+padding+滚动条
* scrollHeight:该高度仅在有滚动条的时候才有用处,因为这个高度指的是滚动条隐藏高度+内容高度
* scrollTop:代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度
* offsetTop:当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系
* [参考链接](https://blog.csdn.net/qq_35430000/article/details/80277587)

## offsetTop
1. offsetTop也就是元素顶部到父元素顶部的距离，但是有点问题就是第一个元素到父元素的距离好像不是0

## 通过touchstart,touchend获取鼠标位置
1. e.changedTouches[0].pageY就是获取鼠标此时的y坐标

## 获取元素左上角的y坐标
1. e.getBoundingClientRect().y;

## 获取元素的高度(包括不可见高度，也就是包含了滚动条)
1. e.scrollHeight

## 获取元素此时滚动的距离(根据顶部变化)
1. e.scrollTop

## 获取浏览器页面可用高度
1. window.innerHeight

## document.write
1. document.write如果在页面加载完成(window.onload)之前执行，那么就在文档流中绘制内容
2. document.write如果在页面加载完成之后执行，那么就会冲刷整个页面，内容重写
3. 