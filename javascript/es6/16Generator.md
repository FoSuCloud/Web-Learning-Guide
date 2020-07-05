
## 一.简介
### 1. 基本概念
* Generator函数是ES6提供的一种异步编程解决方案。
* Generator函数是一个状态机，封装了多个内部状态。执行函数会返回一个遍历器对象，也就是Generator是一个`Iterator生成器`
* Generator和其他函数的形式上的区别:`1.function关键字和函数名之间有一个星号*; 2.函数体内部使用yield表达式定义不同的内部状态(yield就是产出的意思)`
* 在调用方法上，Generator函数被调用后，函数并不执行，而是`返回一个指向内部状态的指针对象(遍历器对象)`
* 必须调用遍历器对象的next方法，使得指针指向下一状态，也就是每次调用next方法，内部指针就从函数头部或者上次停下来的地方开始执行
* 直到遇到yiled表达式或者return语句。也就是Generator函数是分段执行的，`yield表达式是暂停执行的，next方法是恢复执行`
* 看一个例子:
```javascript
		function* gene(){
			yield 1;
			yield 2;
			yield 3;
		}
		var res=gene();
		console.log(res.next());//{value: 1, done: false}
		console.log(res.next());//{value: 2, done: false}
		console.log(res.next());//{value: 3, done: false}
		console.log(res.next());//{value: undefined, done: true}
```
* 从上面可以看到执行generator函数返回的是一个遍历器对象
* `done属性表示是否遍历结束，value表示当前状态值`,使用next方法返回的是一个对象，对象形式为"{value:'',done:布尔值}"
* 当生成器函数还有yield表达式未执行时，返回的value存在值不为undefined,done为false
* 当执行的是最后一个yield表达式，后续的next方法返回的done为true,value为undefined
* `星号的位置`
```javascript
		function * gene(){}
		function* gene(){}
		// *gene不会被识别为函数名，因为变量开头必须是数字/字母/$/_ 
		function *gene(){}
		function*gene(){}
		// 错误写法！(此时*解析为函数名了)
		function gene*(){};// Unexpected token '*'
```

### 2.yield表达式
* generator函数返回的是一个遍历器对象，只有调用next方法才会遍历下一个内部状态
* 所以yield表达式就是一种标识，标识返回对应值，然后把状态暂停到此处
* `注意yiled后面的表达式必须在执行对应的next方法后才会执行，否则不会执行该表达式，也就是惰性求值`
* Generator函数可以`不用yield表达式`，`此时就是一个单纯的暂缓执行函数`
```javascript
		function* f(){
			console.log("没有yield表达式的generator函数就是一个暂缓执行函数")
		}
		var res=f();// 打印上面的语句
		console.log(res.next());//{value: undefined, done: true}
```

#### yield表达式只能用于生成器函数
```javascript
	// 1. 普通函数
	// 编译阶段就会报错，Uncaught SyntaxError: Unexpected number
	function f(){
		yield 1;
	}
	
	// 2.嵌套函数
	// 编译时报错 Unexpected identifier
	function* foo(arr){
		arr.forEach(function(item){
			yield item;
		})
	}
	
	// 3.立即执行函数
	// 报错,SyntaxError: Unexpected number
	(function(){
		yield 1;
	})()
	
	// 4. 可以用于for循环中
	function* one(arr){
		for(var i=0;i<arr.length;i++){
			yield arr[i]
		}
	}
	
	var res=one([5,6])
	console.log(res.next());//{value: 5, done: false}
	console.log(res.next());//{value: 6, done: false}
	console.log(res.next());//{value: undefined, done: true}
```

#### yield表达式在其他语句中
```javascript
	function* f(){
		// 1. 没有+号，此时无反应
		console.log(yield 2);// 无反应
		
		// 2. 偶加号，此时报错
		// console.log("2:"+yield);// 报错:SyntaxError: Unexpected identifier
		// console.log("2:"+yield 2);// 报错:SyntaxError: Unexpected identifier
		
		// 3.如果在一个表示式里面，那么可以把yield语句放到圆括号里面
		// console.log("3:"+(yield 3));
		
		console.log("3:"+(yield ));
		
	}
	var res=f()
	res.next()
```

#### yield表达式作为函数参数或者在表示式右边
```javascript
	// 1. 作为函数参数，yield部分并没有传递过去
	function a(){
		console.log(...arguments)
	}
	
	function* b(){
		// 1. 函数参数使用yield语句，使用第一个next只会执行yield 部分
		// 执行函数的部分需要调用骗下一个next才会有！
		a(yield 2)
	}
	var res=b()
	// console.log(res.next())
	// console.log(res.next())
	/* 
	 第一个打印: {value: 2, done: false}
	 第二个打印:
	 undefined  (属于函数a打印的参数，并没有接收到！)
	 {value: undefined, done: true}
	 */
	
	// 2. 参数为多个yield语句，那么就一个个执行yield语句再执行函数
	function * c(){
		a(yield 3,yield 4)
	}
	var res2=c()
	console.log(res2.next());//{value: 3, done: false}
	console.log(res2.next());//{value: 4, done: false}
	console.log(res2.next())
	/* 
	 undefined undefined
	 {value: undefined, done: true}
	 */
	
	// 3. yield语句作为表达式
	function * e(){
		var c=yield 4;
		console.log(c)
	}
	var res3=e()
	console.log(res3.next());//{value: 4, done: false}
	console.log(res3.next())
	/* 
	 undefined
	 {value: undefined, done: true}
	 */
```

### 3. yield表达式与Iterator接口的关系
* 在Iterator中提过，对象的Symbol.iterator方法会在`...运算符,for循环，forEach等中默认调用`
* `调用生成器函数返回遍历器对象，调用遍历器对象的Symbol.iterator方法也是返回遍历器对象本身！`
```javascript
	// 1. Symbol.iterator方法
	var obj={}
	obj[Symbol.iterator]=function* (){
		yield 11;
		yield 2;
		yield 3;
	}
	// 1.1 ...运算符
	console.log([...obj]);//[11, 2, 3]
	// 1.2 for循环(即使有Iterator接口)
	console.log(obj);// length为0，所以for循环没结果。
	for(var i=0;i<obj.length;i++){
		console.log(obj[i])
	}
	// 1.3 for...of循环，可以调用iterator接口
	for(var j of obj){
		console.log(j);//11,2,3
	}
	// 1.4 forEach,报错(obj.forEach is not a function)
	// obj.forEach((item)=>{
	// 	console.log(item)
	// })
```
* 调用Symbol.iterator属性方法
```javascript
	function * a(){
		yield 'w'
	}
	var res=a();// 得到遍历器对象res 
	// true
	// 调用遍历器对象的Symbol.iterator方法，得到遍历器自身
	console.log(res[Symbol.iterator]()===res);
```

## 二.next方法的参数


```javascript
	// 1.next参数会作为上一个yield表达式的值
	function * g(){
		for(var i=0;true;i++){
			var res=yield i;
			if(res) {
				console.log(res)
				i=-1;
			}
		}
	}
	var res=g()
	console.log(res.next());//{value: 0, done: false}
	console.log(res.next());//{value: 1, done: false}
	console.log(res.next());//{value: 2, done: false}
	// 重点:上个yield表达式的返回值是变量res,所以此时变量res=-6
	// 执行的代码为:
	/* 
	 if(res) {
	 	console.log(res)
	 	i=-1;
	 }
	 // 然后还有下一轮的代码
	 for(...),
	 i++;所以i为0，然后执行到yield语句，返回0！
	 */
	console.log(res.next(-6))
	console.log(res.next())

```



yield和return 的区别
yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。
*  返回一个对象
```javascript
	function * func(){
		yield 1+3;
		return {value:1,done:true}
	}
	var res=func();
	console.log(res.next());//{value: 4, done: false}
	console.log(res.next());//{done: true,value: {value: 1, done: true}}
	console.log(res.next());//{done: true,value: undefined}
```