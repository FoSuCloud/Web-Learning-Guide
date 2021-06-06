
## 一.简介
### 1. 基本概念
* Generator函数是ES6提供的一种异步编程解决方案。
* Generator函数是一个状态机，封装了多个内部状态。执行函数会返回一个遍历器对象，也就是Generator是一个`Iterator生成器`
* Generator和其他函数的形式上的区别:`1.function关键字和函数名之间有一个星号*; 2.函数体内部使用yield表达式定义不同的内部状态(yield就是产出的意思)`
* 在调用方法上，Generator函数被调用后，函数并不执行，而是`返回一个指向内部状态的指针对象(遍历器对象)`
* 必须调用遍历器对象的next方法，使得指针指向下一状态，也就是每次调用next方法，内部指针就从函数头部或者上次停下来的地方开始执行
* 直到遇到yield表达式或者return语句。也就是Generator函数是分段执行的，`yield表达式是暂停执行的，next方法是恢复执行`
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
* yield表达式本身没有返回值，`虽然可以使用变量接收yield表达式的值，但是yield表达式的返回值是undefined`
* `而next方法一般没有参数，但是可以设置一个参数，这个参数会被当做上一次的yield表达式的返回值`
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
	// 虽然可以使用变量接收yield表达式的值，但是yield表达式的返回值是undefined
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
	console.log(res.next(-6));//0
	console.log(res.next());// 1
```

#### 使用next设置上一个yield表达式的值
* `如果不使用next设置上一个yield表达式的值,那么默认yield表达式的返回值就是undefined`
```javascript
	// 1. 如果不使用next传递上个yield表达式的值，返回值默认是undefined
	function * foo(x){
		var y=10+(yield x+3);
		var z=5+(yield y-2)
		return x+y+z
	}
	// 1.1 此时传递参数x=3
	var a=foo(3);
	// 1.2 此时执行yield x+3;  结果为6
	console.log(a.next());//{value: 6, done: false}
	// 1.3 此时执行代码为:
	/* 
	 参数为10,10代替上次yield表达式返回值，所以y=10+10;
	 然后执行yield y-2;  所以返回 20-2 =18 
	 */
	console.log(a.next(10));//{value: 18, done: false}
	/* 
	 1.4 此时上次yield表达式yield y-2的结果为100，所以z=5+100，
	 返回的是x+y+z,所以是3+20+105=128
	 20指的是y=10+10, x依旧是参数不变
	 */
	console.log(a.next(100));//{value: 18, done: false}

	// 2. 不使用变量保存，next不传递参数
	function * d(){
		return 10+(yield 9)
	}
	var res2=d()
	console.log(res2.next());//{value: 9, done: false}
	// 此时执行的是 10+undefind,所以结果为NaN
	console.log(res2.next());//{value: NaN, done: true}
```

#### 第一个next具有参数
* 由于next的参数表示的是上一个yield表达式的返回值，而第一个next方法前面没有返回值
* 所以`js引擎会直接忽略第一次使用next方法的参数`
```javascript
	function* dataConsumer() {
	  console.log(`Started ${yield 9}`);
	  console.log(`1. ${yield}`);
	  console.log(`2. ${yield}`);
	}
	
	let genObj = dataConsumer();
	// 第一个next方法传递参数，但是依旧没用
	console.log(genObj.next('开始'));//{value: 9, done: false}
	// 设置上一个yield表达式返回值为a 
	genObj.next('a')// Started a
	genObj.next('b')// 1.b
```
* 如果希望第一个next方法就可以接受参数，设置第一个yield表达式的值
* 解决方法:
```javascript
	// 思路:执行掉第一个next()
	function wrapper(generatorFunction) {
	  return function () {
	    let generatorObject = generatorFunction();
		generatorObject.next()
	    return generatorObject;
	  };
	}
	
	const wrapped = wrapper(function* () {
	  var a=yield 1;
	  var b=yield 11;
	  var c=yield 111;
	  console.log(a,b,c);//hello! ddd! rr!
	});
	var res=wrapped();
	console.log(res.next('hello!'));//{value: 11, done: false}
	console.log(res.next('ddd!'));//{value: 111, done: false}
	console.log(res.next('rr!'));//{value: undefined, done: true}
	
```

### 三. for...of循环
* for...of循环`可以自动遍历generator函数运行时生成的Iterator对象，且此时不需要再次调用next方法`
```javascript
		function * foo(){
			yield 5;
			yield 15;
			yield 25;
			yield 55;
		}
		for(var item of foo()){
			console.log(item);//5,15,25,55
		}
```
* `for...of循环不会遍历done为true的部分`
```javascript
	// 1. return返回的遍历器对象的done为true
	function *a (){
		yield 5;
		return 99;
		yield 8 // 在return 语句之后的yield语句不会被for...of循环遍历到
	}
	for(var item of a()){
		console.log(item);//5
	}
	// ...运算符得到的也只有return之前的值
	console.log([...a()]);//[5]
	
	// 2. 遍历结束
	function * b(){
		yield 6;
		yield 16;
	}
	for(var item of b()){
		console.log(item);//6,16
	}
```
* `让对象遍历的方法:1. 通过调用generator函数增加接口 2. 设置对象的Symbol.iterator属性`
```javascript
	// 1. 增加generator函数作为接口
	function * gene(obj){
		var keys=Reflect.ownKeys(obj);
		for(var item of keys){
			yield [item,obj[item]]
		}
	}
	var obj={a:'w',g:'rrr'}
	for(var [key,val] of gene(obj)){
		console.log(key,val)
		/* a w 
		g rrr */
	}
	
	// 2. 增加到对象的Symbol.iterator属性上面
	var one={'b':5555,c:1001}
		
	function * f(){
		var keys=Object.keys(this);
		for(var item of keys){
			yield this[item]
		}
	}
	one[Symbol.iterator]=f;
	// ...运算符和Arry.from调用的都是iterator接口
	console.log([...one]);//[5555, 1001]
	console.log(Array.from(one));//[5555, 1001]
	// 解构赋值
	var [x,y]=one
	console.log(x,y);//5555 1001
```

## 四.throw()
* generator生成器函数会返回一个遍历器对象，该对象具有一个throw方法
* `调用throw方法可以在函数体外抛出错误，然后在generator函数体内捕获`
* `但是如果抛出错误过多，那么无法全部捕获，就可能被外部的try-catch捕获掉`
```javascript
	// 1. 多个语句
	function *g(){
		try{
			yield;
		}catch(e){
			console.log("err:",e);//err: a
		}
	}
	var res=g()
	console.log(res.next());//{value: undefined, done: false}
	
	try{
		res.throw("a")
		res.throw("b")
		// 执行到此处不再执行(已经触发了catch),不会再打印了~
		// 所以本语句不会捕获到错误c
		console.log("执行到此处不再执行")
		res.throw("c");
	}catch(e){
		console.log("外部捕获",e);//外部捕获 b
	}
	console.log("ddd");//ddd
	
	// 2. 遍历器对象内部catch所在部分throw错误被外部接收
	function * a(){
		while(true){
			try{
				yield;
			}catch(e){
				throw e;
			}
		}
	}
	var res2=a()
	res2.next()
	
	try{
		res2.throw("a");// 该错误被外部捕获。因为遍历器内部重新抛出了该错误
		res2.throw("b")
	}catch(e){
		console.log("2外部捕获",e);//2外部捕获 a
	}
	
	// 3. 生成器函数没有在内部捕获错误，那么直接被外部捕获
	function * b(){
		yield ;
	}
	var res3=b()
	res3.next()
	try{
		throw 4  // 该错误直接被外部捕获
	}catch(e){
		console.log("err3:"+e);//err3:4
	}
	
	// 4. 没有部署catch捕获错误
	function * c(){
		yield 44;
	}
	var res4=c()
	res4.next()
	// 此时抛出错误，没有被捕获，导致程序报错，中断执行
	// res4.throw("err");//平时测试.html:158 Uncaught err
	// console.log("不再继续执行剩余代码")
	
	// 5. 没有执行过next直接抛出错误
	function * d(){
		try{
			yield 5;
		}catch(e){
			console.log(e)
		}
	}
	var res5=d()
	// 因为还没有执行过next方法，所以没法绕过yield捕获错误！
	res5.throw("eeee");//报错，但没捕获到Uncaught eeee
```

#### throw()不会影响到下次遍历
* `throw方法被捕获以后，会附带执行下一条语句(相当于执行一次next方法)`
```javascript
	function * a(){
		try{
			yield ;
		}catch(e){
			console.log('err',e)
		}
		yield 'b'
		yield 3
	}
	var res=a()
	console.log(res.next());//{value: undefined, done: false}
	// 此时抛出错误，被捕获，最后附带执行一次next方法
	console.log(res.throw())
	/* 
	 err undefined
	 {value: "b", done: false}
	 */
	console.log(res.next());//{value: 3, done: false}
	console.log(res.next());//{value: undefined, done: true}
```

#### gnerator函数体内错误影响到函数体外
```javascript
	// generator函数体内抛出错误，在函数体外可以被捕获到
	function * g(){
		var a=yield 'a'; // 变量a表示yield 'a'表达式的结果
		// 由于第二个next传递了参数33，类型是Number,没有toUpperCase方法
		// 所以会报错
		var y=yield a.toUpperCase()
	}
	var res=g()
	console.log(res.next());//{value: "a", done: false}
	try{
		res.next(33)
	}catch(e){
		// 可以捕获到函数体外的错误
		// err TypeError: a.toUpperCase is not a function
		console.log('err',e);
	}
```

#### generator内部和外部捕获错误
```javascript
	// 1.外部捕获到错误
	function * a(){
		yield 3;
		throw new Error("eee");//Uncaught eee
		yield 5;
		yield 15;
	}
	var res=a()
	console.log(res.next());//{value: 3, done: false}
	try{
		console.log(res.next())
	}catch(e){
		console.log("捕获到外部错误",e)
	}
	// 由于错误被外部捕获了，相当于函数内部崩溃了。所以接下来的next方法都不能执行yield表达式
	console.log(res.next());//{value: undefined, done: true}
	console.log(res.next())
	
	// 2. 内部捕获到错误(不会崩溃)
	function * b(){
		yield 7;
		try{
			throw new Error("eee")
		}catch(e){
			console.log("err",e)
		}
		yield 8;
		yield 18;
	}
	var res2=b()
	console.log(res2.next());//{value: 7, done: false}
	console.log(res2.next());//此时不会崩溃
	/* 
	 err Error: eee
	 {value: 8, done: false}
	 */
	console.log(res2.next());//{value: 18, done: false}
	console.log(res2.next())//{value: undefined, done: true}
```

## 五.return()
* return 方法可以返回给定的值，并且终结遍历generator函数
* `return方法可以有一个参数，作为返回的遍历器对象的value属性`
* `并且即使return之后调用next方法，依旧有yield表达式，done属性总是返回true`
* 因为到那个时候，generator函数的遍历就终结了
```javascript
	function * g(){
		yield 1;
		yield 2;
		yield 3;
		yield 4;
	}
	var res=g()
	console.log(res.next());//{value: 1, done: false}
	// 传递的数据a作为属性value的值
	console.log(res.return('a'));//{value: "a", done: true}
	// return方法之后的next方法返回的done属性为true
	console.log(res.next());//{value: undefined, done: true}
	// return不传递数据，那么value属性为undefined
	console.log(res.return());//{value: undefined, done: true}
```

#### return对应的yield语句在finally语句中
* `如果return对应的语句在try-finally代码块中，并且还在try语句块中`
* `那么return传递的数据无效，返回的遍历器对象是finally代码块的第一个yield语句执行之后的结果`
* `finally语句块最后的yield表达式执行完毕,继续执行next(),得到的value属性为return传递的数据`
```javascript
	function* numbers () {
	  yield 1;
	  try {
	    yield 2;
	    yield 3;
	  } finally {
	    yield 4;
	    yield 5;
	  }
	  yield 6;
	}
	var g = numbers();
	console.log(g.next()) // { value: 1, done: false }
	console.log(g.next()) // { value: 2, done: false }
	// 1. return传递的数据 此时对应于try-finally代码块中的try部分
	// 此时返回的是finally后第一个yield表达式的数据
	console.log(g.return(7)) // { value: 4, done: false }
	console.log(g.next()) // { value: 5, done: false }
	// 2. 此时finally语句块最后的yield表达式执行完毕
	// 所以继续执行next(),得到的value属性为return传递的数据
	console.log(g.next()) // { value: 7, done: true }
	// 3. finally语句执行完毕，此时generaor遍历结束
	console.log(g.next()) // {value: undefined, done: true}
```


#### yield和return 的区别
* yield表达式与return语句既有相似之处，也有区别。
* 相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
* 区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，`而return语句不具备位置记忆的功能`。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。
```javascript
	function * func(){
		yield 1+3;
		return {value:1,done:true}
		yield 4;
	}
	var res=func();
	console.log(res.next());//{value: 4, done: false}
	console.log(res.next());//{done: true,value: {value: 1, done: true}}
	// return执行完毕，并不会记录generator状态，相当于generator遍历结束
	console.log(res.next());//{done: true,value: undefined}
```

## 六.next/return/throw区别
* next(),return(),throw()这三个方法`本质上都是让generator函数恢复执行，并且使用不同的语句替换yield表达式`
* 区别:
1. next()是将yield表达式替换成一个值
2. throw()是将yield表达式替换成一个throw语句
3. return()是将yield表达式替换成return语句
```javascript
	function * g(){
		yield 4;
		try{
			yield 14;
		}catch(e){
			console.log(e);//throw
		}
		yield 24;
		yield 34;
	}
	var res=g()
	// next
	console.log(res.next());//{value: 4, done: false}
	// throw
	res.next();// 目的是为了进入try-caych语句块中
	console.log(res.throw("throw"));//{value: 24, done: false}
	// return 
	console.log(res.return("return"));//{value: "return", done: true}
```

## 七.yield*表达式
* 如果在generator函数内部，调用另一个generator函数，需要在前者的函数体内部，手动完成遍历
* `而ES6中提供了yield*表达式，作为解决方法，可以在一个generator函数里面执行另一个generator函数`
```javascript
		function * foo(){
			yield 2;
			yield 12;
			yield 22;
		}
	// 1. for...of循环
	function * g(){
		yield 1;
		for(var item of foo()){
			console.log('内',item)
			yield item;
		}
		yield 7;
	}
	var res1=g()
	console.log([...res1]);//[1, 2, 12, 22, 7]
	
	// 2. yield*表达式
	function* b(){
		yield 1;
		yield* foo();
		yield 7;
	}
	console.log([...b()]);//[1, 2, 12, 22, 7]
```

#### yield*表达式可以遍历所有遍历器对象
* 只要有iterator接口，都可以被yield*表达式遍历
```javascript
	function * foo(){
		yield 2;
		yield 12;
		yield 22;
	}
	// 1.yield*表达式后面只能接遍历器对象
	function* b(){
		yield 1;
		// 1.1 字符串
		// yield* "hello";//[1, "h", "e", "l", "l", "o", 7]
		// 1.2 遍历器函数
		// yield*  foo();// [1, 2, 12, 22, 7]
		// 1.3 返回未执行的遍历器函数
		// yield*  foo;// TypeError: undefined is not a function
		// 1.4 数组
		// yield* [4,5,6];//[1, 4, 5, 6, 7]
		// 1.5 Set 
		yield* new Set([5,4,5,2]);//[1, 5, 4, 2, 7]
		yield 7;
	}
	console.log([...b()]);
```

#### yield*表达式的generator函数有return语句
```javascript
	function *f(){
		yield 4;
		return 'f'
		yield 8; // 不会继续执行
	}
	function * bar(){
		yield 9;
		var name=yield* f()
		console.log("name:",name)
		yield 5;
	}
	var res=bar()
	console.log(res.next());//{value: 9, done: false}
	console.log(res.next());//{value: 4, done: false}
	console.log(res.next());
	/*如果yield*表达式return返回了数据，那么该数据就是返回值！
	 name: f
	 {value: 5, done: false}
	 */
	console.log(res.next());//{value: undefined, done: true}
	
	// 例子2
	function  * a(){
		yield 'a';
		yield 'b';
		return 'res'
	}
	function * b(){
		var r=yield* a()
		console.log('结果:',r)
	}
	var res2=b()
	console.log(res2.next());//{value: "a", done: false}
	console.log(res2.next());//{value: "b", done: false}
	console.log(res2.next())
	/* 
	 结果: res
	 {value: undefined, done: true}
	 */
```

## 八.generator函数作为对象属性
```javascript
	// 形式1
	var obj={
		* ge(){
			yield 3;
		}
	}
	var res=obj.ge()
	console.log(res.next())
	
	// 形式2
	var o={
		g:function* (){
			yield 6
		}
	}
	var res2=o.g()
	console.log(res2.next());//{value: 6, done: false}
```

## 九.generator函数的this
* generator函数总是返回一个遍历器，ES6规定这个遍历器是generator函数的实例
* 继承了generator函数的prototype对象上的方法。
* `generator函数在this对象上面可以添加属性，但是实例对象拿不到属性`
* `generator函数不能作为构造函数，不能使用new创建实例对象`
```javascript
	// 1. generator函数返回的遍历器对象是函数的实例
	function * g(){}
	g.prototype.func=function(){
		return '实例'
	}
	var res=g()
	// 返回的遍历器对象属于生成器函数的实例
	console.log(res instanceof g);//true
	console.log(res.func());//实例
	
	// 2. 注意返回的是遍历器对象，而不是this对象
	function * a(){
		this.f="fff"
	}
	var res2=a()
	console.log(res2.f);//undefined
	
	// 3. generator函数没有构造器，不能new对象
	// new a();// 报错Uncaught TypeError: a is not a constructor
```
* `如果想要generator函数返回一个正常的对象实例，既可以使用next方法又可以使用this`
* 那么可以使用`call来绑定generator函数内部的this到一个空对象`
```javascript
	// 1. 空对象
	var obj={}
	function * f(){
		this.a='a'
		yield this.b=4;
		yield this.c='s';
	}
	// 2.使用call把generator函数内部的this绑定到空对象
	var res=f.call(obj);
	console.log(res.next());//{value: 4, done: false}
	console.log(res.next());//{value: "s", done: false}
	console.log(obj);//{a: "a", b: 4, c: "s"}
```
* `如果不想创建一个空对象来承接this对象，那么就使用call来绑定gnerator函数的原型`
```javascript
	function * f(){
		this.a=1;
		yield this.b=6;
		yield this.c=65;
	}
	// 使用call来绑定generator函数的原型
	var res=f.call(f.prototype)
	console.log(res.next());//{value: 6, done: false}
	console.log(res.next());//{value: 65, done: false}
	console.log(res.a,res.b,res.c);//1 6 65
	
	// 2. 如果想要通过new实例化对象
	// 那么加多一个函数来间接实现
	function * a(){
		this.a=1;
		yield this.b=6;
		yield this.c=65;
	}
	function father(){
		return a.call(a.prototype)
	}
	var res2=new father()
	console.log(res2.next())
	console.log(res2.next())
	console.log(res2.a,res2.b,res2.c);//1 6 65
```

## yield * 数组
* 对数组使用`yield *`，那么会逐个返回数组元素(注意是yield * ,而不是yield)
````javascript
let arr=[3,4,6]
    function *f(arr){
        yield *arr;
    }
    let res=f(arr);
    console.log(res.next().value) // 3
    console.log(res.next().value) // 4
    console.log(res.next().value) // 6
    console.log(res.next().value) // undefined
````
