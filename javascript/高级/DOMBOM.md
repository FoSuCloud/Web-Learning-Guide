## 防抖节流
```
			// 代码2
			const debounce = (func, wait = 0) => {
			  let timeout = null
			  let args
			  function debounced(...arg) {
			    args = arg
			    if(timeout) {
			      clearTimeout(timeout)
			      timeout = null
			    }
			    // 以Promise的形式返回函数执行结果
			    return new Promise((res, rej) => {
			      timeout = setTimeout(async () => {
			        try {
			          const result = await func.apply(this, args)
					  res(result)
			        } catch(e) {
			          rej(e)
			        }
			      }, wait)
			    })
			  }
			  // 允许取消
			  function cancel() {
			    clearTimeout(timeout)
			    timeout = null
			  }
			  // 允许立即执行
			  function flush(...args) {
			      cancel()
			      return func.apply(this,args)
			  }
			  debounced.cancel = cancel
			  debounced.flush = flush
			  return debounced
			}
			// 请求搜索框内容的函数
			var btn=document.querySelector('#btn')
			var ul=document.getElementsByTagName('ul')[0]
			function search(...args){
				/* 发起ajax请求，返回数据 */
				return [...args]
			}
			var res=debounce(search,500)
			btn.addEventListener('keyup',(e)=>{
				/* 1.使用flush立即执行 */
				// ul.innerHTML=res.flush(e.target.value)
				
				/* 2.防抖，然后才执行 */
				res(e.target.value).then(data => {
					ul.innerHTML=data;
				});
			})
```
* 如果是节流则修改函数内部一点代码
```
					/* 还在上段时间范围内则不执行 */
					if(timeout) {
					  return 
					}
			        timeout = setTimeout(async () => {
						try {
						  const result = await func.apply(this, args)
						  clearTimeout(timeout)
						  timeout=null;
						  res(result)
						} catch(e) {
						  rej(e)
						}
			        }, wait)
```
---
* `防抖常用于搜索框中请求搜索相关内容；节流用于左侧是章节大纲，右侧是文字的情况下，避免右侧持续滚动造成左侧一直修改高亮类名`

## BOM,DOM
1. 文档对象模型DOM的根元素是document
2. 浏览器对象模型的根元素是window
3. document属于window的一个对象属性,window.document,因为文档对象模型其实就是一个页面，而页面处于浏览器中，也就是一个窗体中，也就是window

## DOM操作导致性能损耗
```
			// 测试次数：一百万次
			const times = 1000000
			// 1. 获取一次body元素，赋值10000次的时间
			console.time('object')
			// 仅获取一次DOM对象，也就是DOM操作数为1
			let body = document.body;
			for(let i=0;i<times;i++) {
			  let tmp = body;// 虽然是赋值，但是没有读取DOM对象，所以操作次数依旧是1
			}
			console.timeEnd('object')// object: 2.304931640625ms
			
			// 2. 获取10000次DOM元素的时间
			console.time('dom')
			// 循环读取body元素引发线程切换
			for(let i=0;i<times;i++) {
			  let tmp = document.body
			}
			console.timeEnd('dom')// dom:38.77880859375ms
			
			// 另外读取JSON对象的时间花费也是小于读取DOM对象的时间(约两倍)
			var body = JSON.stringify(document.body)
			// var body = document.body
			console.time('batch')
			for (let i = 0; i < times; i++) {
			  body === 1 ? console.log(1) : void 0;
			}
			console.timeEnd('batch') // 0.846923828125ms
```
* 浏览器是单线程异步的，同一时间，只能使用js引擎或者渲染引擎，另一个引擎会被阻塞！
* `因为本来线程使用js引擎中，但是因为获取DOM对象，导致需要线程切换到渲染引擎`
* `所以出现了线程的上下文切换，次数多了就很消耗性能！`

## 重绘回流性能问题
```
			const times = 100000
			let html = ''
			for(let i=0;i<times;i++) {
			  html+= `<div>${i}</div>`
			}
			document.body.innerHTML += html
			const divs = document.querySelectorAll('div')
			Array.prototype.forEach.call(divs, (div, i) => {
			  div.style.margin = i % 2 ? '10px' : 0;
			})
			// rendering:4572ms,painting:37ms；
```
* `在修改10000次元素的值的时候就是触发了10000次回流，最后在Chrome浏览器的performance中查看渲染时间`
* `此时把rendering和painting的时间，渲染时间和绘制时间当成渲染引擎执行时间`
---
* 如果把Array内部的修改语句改为
`div.style.color = i % 2 ? 'red' : 'green';`
* `那么只触发重绘，没有触发回流`
* `虽然很奇怪，在Chrome浏览器的渲染时间记录中，修改为重绘之后，只减少了100ms左右`
* `大概是因为重绘和回流都获取了10000次DOM元素，这才是最主要的时间来源`
* `另外重绘和回流的绘制时间painting都差不多，这是因为回流也会导致重绘，但是重绘不会导致回流`


## BOM(浏览器对象模型)
1. window:`window是窗口对象，表示整个浏览器窗口，属于es中的global对象，也就是所有的全局变量和函数都是它的属性，包括document,location`
* `window对象是BOM对象和核心！！！但是BOM对象包括window,location,navigation,screen,history六个，而其余五个都是window的属性`
2. document:`是window对象的一个属性，用于处理页面文档`
3. location:`获取当前页面的地址url,并把浏览器重定向到新的页面`
4. navigator:`提供了浏览器有关的信息，例如userAgent`
5. screen:`用于获取用户的屏幕信息`
6. history:`根据浏览器访问历史进行翻页，上一页，下一页，或者几页`

## 获取元素的附近元素
```
			// 1. 获取某个元素
			var child1=document.getElementsByClassName('child1')[0];
			// 2.获取某个元素的父元素
			var father=child1.parentElement;
			console.log(father);//<div class="father">
			// 3. 获取某个元素下一个兄弟元素
			var nextbother=child1.nextElementSibling;
			console.log(nextbother);//<div class="child2"></div>
			// 4.获取某个元素的上一个兄弟元素
			var prebiewbother=nextbother.previousElementSibling;
			console.log(prebiewbother);//<div class="child1"></div>
			// 5.获取元素的第一个子元素，注意不是节点！
			console.log(father.children[0]);//<div class="child1"></div>
			// 5.1 如果是childNodes则是子节点集合，另外firstChild,lastChild都是子节点
			console.log(father.childNodes);//NodeList(9) [text, div.child1, text, div.child2, text, div.child3, text, div.child4, text]
			console.log(father.firstChild);//#text
```

## 通过element.tagName可以获取元素的标签名
## 通过element.id来设置元素的id名字

## innerHTML直接插入html代码。。
```
			.active{
				color: red;
				font-size: 30px;
			}
			var one=document.getElementsByClassName('one')[0];
			one.innerHTML="<span class='active'>使用innerHTML可以插入元素。。</span>"
```

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

## 请你谈一下对于js拖拽功能的实现的理解，具体的实现方式是什么
```
首先是三个事件，分别是mousedown，mousemove，mouseup<br /> 当鼠标点击按下的时候，需要一个tag标识此时已经按下，
可以执行mousemove里面的具体方法。 clientX，clientY标识的是鼠标的坐标，分别标识横坐标和纵坐标，
并且我们用offsetX和offsetY来表示元素的元素的初始坐标，
移动的举例应该是： 鼠标移动时候的坐标-鼠标按下去时候的坐标。 
也就是说定位信息为： 鼠标移动时候的坐标-鼠标按下去时候的坐标+元素初始情况下的offetLeft. 还有一点也是原理性的东西，
也就是拖拽的同时是绝对定位，我们改变的是绝对定位条件下的left<br /> 以及top等等值。 
补充：也可以通过html5的拖放（Drag和drop）来实现
```

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

## 打印元素结构
```
			var txt='<div id="test" class="myDiv"><div><p id="testP"></p><span></span></div><input type="text"/></div>'
			var mydiv=document.createElement('div')
			mydiv.id='root';// 设置元素id 
			mydiv.innerHTML=txt; // 设置元素内部元素
			document.body.append(mydiv);// 在body添加子元素
			
			function domTree(tree){
				var childs=tree.children;
				var obj={};
				obj.label=tree.tagName.toLowerCase();
				obj.child=[];
				// 如果存在子元素
				if(childs){
					// for of遍历是获取元素的value,而in是获取键key 
					for(item of childs){
						obj.child.push(domTree(item));
					}
				}
				return obj;
			}
			var div=document.querySelector('#root').firstChild;
			// 转换为字符串
			var str='['+JSON.stringify(domTree(div))+']';
```

## append和appendChild区别
1、append不支持ie;appendChild支持
2、append支持传入多个节点，也支持传入字符串
3、appendChild支持传入一个节点，不支持传入字符串
