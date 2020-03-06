## 生成圆形的点击区域
1. `虽然使用border-radius后的元素占据宽高还是原来那么多，但是实际有效区域改变了`
```
.one{
	background: #0000FF;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
<div class="one" onclick="change()">
</div>
function change(){
	console.log('1432')
}
```
* `使用border-radius后，原来点击生效的区域不生效了`
2. 使用原生js+canvas来绘制一个圆形，然后使用勾股定理确定位置在不在范围内
```
<canvas id="one" width="300" height="300"></canvas>

// 获取画布canvas
var canvas=document.getElementById('one').getContext('2d');
var radius=50;
canvas.fillStyle='#00f'
canvas.arc(150,150,radius,0,2*Math.PI,false)
canvas.fill();//必须使用fill方法填充才有颜色

document.onmousemove=function(e){
	var e=e?e:window.event;
	// 根据鼠标的x,y轴位置判断是否在元素上
	var x=Math.abs(150-e.clientX);
	var y=Math.abs(150-e.clientY);
	// 使用勾股定理
	if(Math.sqrt(Math.pow(x,2)+Math.pow(y,2))<radius){
		console.log('323')
	}
}
```

## 形参的几种形式
```
			    // 1. Arguments(2) ["a", 11, callee: ƒ, Symbol(Symbol.iterator): ƒ]
				console.log(arguments);
				// 2. a 11 形参的字符串表示 a 11
				console.log(...arguments);
				// 3. 数组表示形式 ["a", 11] 
				console.log([...arguments])
```

## 手写bind
```
			// 手写bind 
			Function.prototype.bind=function(context,...bindments){
				// 绑定调用该函数的对象
				context=context||window;//{name: "yiyi", age: 11}
				// 绑定好this 使用闭包，到时候返回原来的this
				const func=this;// 被调用的函数!
				
				// 如果不是函数使用bind则提示错误
				if(!(func instanceof Function)){
					console.log('bind方法必须是函数使用')
				}
				return function F(...callArgs){
					let allArgs=bindments.concat(callArgs);// concat返回数组
					// 如果此时是创建实例，new func 而不是调用方法，那么返回实例
					if(this instanceof F){
						console.log("new一个实例")
						return new func(...allArgs)
					}
					// 注意：返回的是对数组展开之后的结果 字符串。。
					return func.call(context,...allArgs)
				}
			}
```
* bind绑定的优先级低于new，所以先bind再new也可以，但是绑定的this会失去
```
			// 1. 直接使用bind方式
			function one(a,b){
				console.log(this.name);
				console.log(a)
				console.log(b)
			}
			var obj={name:'yiyi',age:11}
			var two=one.bind(obj,'a')
			console.log(two);// 回调函数
			two(11);// 执行one函数内容
			
			// 2. 构造函数形式(但是会失去bind(obj,arguments)的obj,arguments依旧有效)
			function three(a,b){
				this.a=a
				this.b=b
				console.log(this)
			}
			var bindf=three.bind(obj,'b');
			bindf(1);// {name: "yiyi", age: 11, a: "b", b: 1}
			// new绑定this的优先级高于bind绑定,所以之前this绑定的对象无效了
			var four=new bindf(33); // 但是之前bind传的值还有效
			console.log(four);// {a: "b", b: 33}
```
* 简洁版
```
			// 手写bind 
			Function.prototype.bind=function(context,...bindments){
				context=context||window;
				const func=this;
				
				return function F(...callments){
					let args=bindments.concat(callments);
					if(this instanceof F){
						return new func(...args);
					}
					return func.call(context,...args)
				}
			}
			
			function one(a,b){
				this.a=a;
				this.b=b;
				console.log(this)
			}
			var obj={name:'yiyi'}
			var child=one.bind(obj,2);
			child(3);
			
			var two=new child(4);
			console.log(two)
```

## 手写call
```
			// 手写call 
			Function.prototype.call=function(context,...callargs){
				context=context||window;
				// 添加属性，隐式调用函数
				context.func=this;
				if(typeof context.func !=='function'){
					throw new TypeError("必须是函数调用call");
				}
				// 使用绑定的对象去调用方法
				let res=context.func(...callargs);
				// 因为绑定的时候算是给对象添加了属性func,所以需要删除该属性
				// 因为该属性不会再被用到
				delete context.func;
				return res
			}
```

## 手写apply
```
			Function.prototype.apply=function(context,arr){
				context=context||window;
				context.func=this;
				if(typeof context.func !=='function'){
					throw new TypeError("必须是函数调用apply");
				}
				let res=context.func(...arr);
				delete context.func;
				return res
			}
```

## 手写new运算符
```
			// 相当于 new func(...args)
			function _new(func,...args){
				if(typeof func !='function'){
					throw new TypeError('必须是函数调用')
				}
				// 创建一个对象的原型指向函数的原型
				let obj=Object.create(func.prototype)
				console.log(obj);//{one}
				// 该对象调用函数并且传参数,如果没有return的话，那么res就是undeifned
				let res=func.call(obj,...args);// 函数调用没设置return就返回undefined
				if(res&&(res instanceof Object)){
					return res;
				}
				// 如果res==undefined,那么返回创建的对象，也就是obj
				return obj;
			}
			function one(name,age){
				this.name=name;
				this.age=age;
				return this;
			}
			console.log(_new(one,'yy',4))
```


## 手写instanceof
```
			// instance就是判断一个对象是否在另一个对象的原型链上
			function _instanceof(obj1,obj2){
				while(obj1){
					if(obj1.__proto__==obj2.prototype){
						return true;
					}
					a=a.__proto__;
				}
				return false
			}
			function one(){
				
			}
			var t=new one();
			console.log(t instanceof one)
			// 一个实例的_proto_在 one构造函数>Object>null
			console.log(t.__proto__.__proto__.__proto__);//null
			console.log(t instanceof Function);//false,实例的原型链不在Function
			console.log(t instanceof Object)
```

## 手写jsonp
```
// 手写jsonp,也就是在head标签处添加一个script标签，该标签的src能够返回一个js文件！
			(function jsonp(){
				let head=document.getElementsByTagName('head')[0]
				let script=document.createElement('script');
				script.src='https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js'
				// 给该元素挂载加载完成后的回调事件
				script.addEventListener('load',(res)=>{
					console.log(res)
				})
				head.appendChild(script)
			})()
			// 如果要获取jsonp加载之后的数据，那么需要和后台配合，让后台返回回调函数
			
```