
## 一. 遍历器Iterator

### 1. 基本概念
* js原有的表示"集合"的数据结构，主要是数组和对象。ES6添加了Map和Set。
* 这样就有了四种数据结构可以用于描述集合。但是需要一种接口体制来处理所有不同的数据结构
* `遍历器Iterator就是一种机制，是一种接口，可以为不同的数据结构提供统一的访问机制`
* 任何数据结构只要部署了Iterator接口，就可以完成遍历操作(依次处理该数据结构的所有成员)。
* Iterator接口的作用有三个:
1. 为各种集合形式的数据结构提供了一个统一的，简便的访问接口
2. 使得数据结构的成员能够按照某种次序排序
3. ES6创造了一种新的遍历方式`for...of循环`，`Iterator接口主要就是供for...of循环使用的！`

### 2.遍历方法
* Iterator的遍历过程是创建一个指针对象，然后每次调用对象的next方法，返回当前成员的值
* `返回的是一个对象，对象有两个属性，value和done两个属性。value是当前成员的值，done是一个布尔值，表示遍历是否结束`
* `另外done:false和vallue:undefined是可以省略的，因为不返回done属性那么肯定就是undefined被判断为false,不返回value属性那么肯定就是undefined`
* 下面是一种形式的Iterator接口的实现:
* `需要注意的是，在原生的iterator接口实现中，对象是不可以实现iterator接口的，也就是for...of循环会失败`
```javascript
	// 1. 对于对象来说，只能遍历key为索引的键值
	function makeIterator(obj){
		var index=0;
		return {
			next:function(){
				return {
					done:obj[index]?true:false,
					value:obj[index++]
				}
			}
		}
	}
	var obj={0:'w',1:444,5:555,a:'yy'}
	var res1=makeIterator(obj)
	console.log(res1.next());//{done: true, value: "w"}
	console.log(res1.next());//{done: true, value: 444}
	console.log(res1.next());//{done: false, value: undefined}
	console.log(res1.next());//{done: false, value: undefined}
	// 并且注意:索引为数字也不一定能遍历到，因为要根据index的值，如果要遍历到5，那么需要继续调用两次next
	
	// 1.2 但是不重写iterator接口(如上使用函数，或者重写Symbol.iterator接口)的话
	// 对 对象使用for..of循环会报错！
	for(var item of {0:1,1:22}){
		console.log(item);//Uncaught TypeError: {(intermediate value)(intermediate value)} is not iterable
	}
	
	// 2. 对于数组来说
	function makeArray(arr){
		var index=0;
		return {
			next:function(){
				return {
					done:arr[index]?true:false,
					value:arr[index++]
				}
			}
		}
	}
	var res2=makeArray([5,4,3])
	console.log(res2.next())//{done: true, value: 5}
	console.log(res2.next())//{done: true, value: 4}
	console.log(res2.next())//{done: true, value: 3}
	console.log(res2.next())//{done: false, value: undefined}
```

## 二. 默认Iterator接口
### 1. 基本概念
* `Iterator接口的目的即使为所有的数据结构，提供统一的访问机制，即for...of循环`
* 当使用for...of循环去遍历某种数据结构时，该循环会自动去寻找Iterator接口
* 一种数据结构只要部署了Iterator接口，那么这种数据结构就是`可遍历的iterable`
* 而ES规定，默认的Iterator接口部署在`Symbol.iterator属性上`，所以我们可以通过判断`是否具有Symbol.iterator属性作为可遍历的依据`
* `一般获取Symbol.iterator属性都是使用[Symbol.iterator]的形式，因为Symbol.iterator相当于一个表示式，类似[1+'2']使用[]形式`
```javascript
 		// 1. 数组
		var arr=[]
		console.log(arr[(Symbol.iterator)])//ƒ values() { [native code] }
		// 2. Map
		var map=new Map()
		console.log(map[Symbol.iterator]);//ƒ entries() { [native code] }
		// 3. Set
		var set=new Set()
		console.log(set[Symbol.iterator]);//ƒ values() { [native code] }
		// 4. 对象(没有iterator接口)
		var obj={}
		console.log(obj[Symbol.iterator]);//undeined
		// 5. 对象添加数字属性还是没有terator接口的，除非直接修改对象的Symbol.iterator接口
		var obj2={0:1,1:222}
		console.log(obj2[Symbol.iterator]);//undeined
		// 6. 字符串也有iterator接口
		var str="hello world"
		console.log(str[Symbol.iterator]);//ƒ [Symbol.iterator]() { [native code] }
		// 7. 数字没有
		var nums=1234
		console.log(nums[Symbol.iterator]);//undeined
		// 8. arguments,函数参数数组有！
		function func(){
			console.log(arguments[Symbol.iterator]);//ƒ values() { [native code] }
		}
		func(1,4,8)
		// 9. Nodeslist 节点列表有!
		console.log(document.getElementsByClassName("one")[Symbol.iterator]);//ƒ values() { [native code] }
```
* 调用Symbol.iterator属性，返回的是一个遍历器对象，该对象具有next方法，next方法返回一个对象具有value和done属性
* 由上可得，原生具有iterator接口的数据有:`Array,String,Nodelist,arguments,Map,Set`

### 2. 实际应用
* 对于原生部署了Symbol.iterator属性的数据结构，不需要自己写遍历器生成函数，`for...of循环会自动遍历他们`
* 其他没有iterator接口的数据结构则需要`在Symbol.iterator属性上部署，这样才会被for...of循环遍历到`
* 循环遍历的两种方式
```javascript
		var arr=[4,6,8]
		// 1. for...of
		for(var item of arr){
			console.log(item);
		}
		
		// 2. 调用Symbol.iterator接口方法
		var res=arr[Symbol.iterator]()
		console.log(res.next())//{value: 4, done: false}
		console.log(res.next())//{value: 6, done: false}
		console.log(res.next());//{value: 8, done: false}
		console.log(res.next());//{value: undefined, done: true}
```
* `对象没有部署iterator接口的原因:对象的哪个属性先遍历，哪个属性后遍历是不确定的。`
* 本质上，遍历器就是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。
```javascript
		class RangeIterator {
		  constructor(start, stop) {
		    this.value = start;
		    this.stop = stop;
		  }
		
		  [Symbol.iterator]() { 
			  console.log("调用Symbol.iterator属性")
			  return this;
		  }
		
		  next() {
			console.log("调用next属性")
		    var value = this.value;
		    if (value < this.stop) {
		      this.value++;
		      return {done: false, value: value};
		    }
		    return {done: true, value: undefined};
		  }
		}
		
		function range(start, stop) {
		  return new RangeIterator(start, stop);
		}
		// 得到一个对象
		console.log(range(0, 3));//RangeIterator {value: 0, stop: 3}
		// 然后for...of遍历该对象就相当于一直调用该对象的next方法，直到done为true
		console.log(range(0, 3).__proto__);
		/* 该实例的原型具有以下属性
		 constructor: class RangeIterator
		 next: ƒ next()
		 Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
		 __proto__: Object
		 */
		for (var value of range(0, 3)) {
		  console.log(value); // 0, 1, 2
		}
```

### 3. 给对象部署itrator接口
* `我们实际上给对象部署ierator接口可以直接调用数组的iterator属性`
* 不推荐像第一节那样实现iterator接口,`而且必须加上length属性才能在for...of循环获取到值`
* `类数组对象指的就是具有length属性的对象，所以length属性必须有，决定着循环的次数`
* 部署方式:`给对象的Symbol.iterator属性设置为数组的Symbol.iterator属性。[Symbol.iterator]:Array.prototype[Symbol.iterator]`
* 例子：
```javascript
	// 1. 对象具有0,1,2这些数字属性
	var obj1={
		0:'a',
		1:3333,
		2:'w',
		length:3,
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	for(var item of obj1){
		console.log(item);//a,3333,w 
	}
	
	// 2. 没有数字属性
	var obj2={
		length:3,
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	for(var item of obj2){
		console.log(item);//undefined,undefined,undefined
	}
	
	// 3. 没有length属性(此时啥都没打印。)
	var obj3={
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	for(var item of obj3){
		console.log(item);
	}
	
	// 4. 具有非数字属性,且无length属性(不打印。)
	var obj4={
		a:'a',
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	for(var item of obj4){
		console.log(item);
	}
	
	// 5. 具有非数字和length属性
	// 会执行length所记录的长度次数，但是没有对应索引属性，只会得到unefined
	var obj5={
		a:'a',
		length:1,
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	for(var item of obj5){
		console.log(item);// undefined
	}
```

## 三. 应用场合
### 1.解构赋值
* 默认调用Symbol.iterator接口
```javascript
	var set=new Set().add('a').add('b').add('c')
	let [x,y]=set;
	console.log(x,y);//a,b 
	let [a,...b]=set;
	console.log(a,b);//a,['b','c']
```
  
  
### 2. 拓展运算符
* 拓展运算符也会调用默认的Symbol.iterator接口
```javascript
	var str="hello"
	console.log([...str]);//["h", "e", "l", "l", "o"]
	var arr=['a',2,6]
	console.log([...arr]);//["a", 2, 6]
```

### 3. yield*
* yield* 后面是一个可遍历的结构，那么就会调用该结构的遍历器接口
```javascript
		var gen=function *(){
			yield 1;
			yield* [2,3,4];
			yield 9
		}
		var res=gen();
		console.log(res.next())//{value: 1, done: false}
		console.log(res.next())//{value: 2, done: false}
		console.log(res.next())//{value: 3, done: false}
		console.log(res.next())//{value: 4, done: false}
		console.log(res.next());//{value: 9, done: false}
		console.log(res.next());//{value: undefined, done: true}
```

## 四. 字符串的Iterator接口
* 字符串也是一个类数组的对象，`也有length属性`，也`原生具有iterator接口`
```javascript
	var str="hi"
	//Symbol.iterator属性是一个函数返回一个遍历器对象
	console.log(typeof str[Symbol.iterator]);//function
	
	var res=str[Symbol.iterator]();
	console.log(res.next());//{value: "h", done: false}
	console.log(res.next());//{value: "i", done: false}
	console.log(res.next());//{value: undefined, done: true}
```
* 可以改写Symbol.iterator接口
```javascript
	// var str="hello"
	var str=new String("hello")
	console.log([...str]);//["h", "e", "l", "l", "o"]
	str[Symbol.iterator]=function *(){
		yield 1;
		yield 2;
		yield 3;
	}
	console.log([...str]);//[1, 2, 3]
```

## 五.Iterator接口和generator函数结合
* Iterator`最简实现:和generator函数结合`
```javascript
	// 形式1
	var res1={
		[Symbol.iterator]:function *(){
			yield 1;
			yield 11;
			yield 111;
		}
	}
	console.log([...res1]);//[1, 11, 111]
	
	// 形式2
	var res2={
		*[Symbol.iterator](){
			yield 2;
			yield 22;
			yield 222;
		}
	}
	console.log([...res2]);//[2, 22, 222]
```

## 六. retrun()和throw()
* 遍历器对象除了具有next方法，还可以具有`return方法和throw方法`
* 如果是`自定义Symbol.iterator方法，那么return()和throw()可选`
* return方法在`for...of循环提前退出的话就会调用return方法`
* 并且return方法必须会返回一个对象！而throw方法主要配合generator函数使用
```javascript
	// return 方法
	var arr=[2,4,6]
	arr[Symbol.iterator]=function(){
		return {
			next(){
				return {value:'a',done:false}
			},
			return(){
				return {done:true}
			}
		}
	}
	var i=0;
	for(var item of arr){
		i++;
		console.log(item);//a,a,a,a
		if(i>3){
			// 调用return方法的方式一:break
			// break;
			// 2.抛出错误
			throw new Error("err");//Error: err
		}
	}
```

## 七. for...of循环
* 一个数据结构只要具有Symbol.iterator属性，就可以视为具有Iterator接口，就可以用for...of循环遍历它的成员
* `for...of循环内部调用的就是变量本身的Symbol.iterator方法`
* for...in循环用于读取键名，for...of新欢用于读取键值。
* `并且for...of调用的是遍历器接口(只会返回具有数字索引的属性)，而for..in不是调用遍历器接口的，所以可以得到非数字索引的属性`
```javascript
	var arr=[1,2,5]
	arr.foo="ffff"
	
	// for...of 循环不能得到非数字索引的属性
	for(var item of arr){
		console.log(item)
		// 1,2,5
	}
	
	// for ...in 
	for(var i in arr){
		console.log(arr[i])
		// 可以得到给数字索引的属性
		//1,2,5,ffff
	}
```

### 1. 数组
* 数组原生就具有iterator接口
```javascript
	var arr=['a',2,7]
	for(var item of arr){
		console.log(item)//a,2,7
	}
	var obj={}
	// 把数组的Symbol.iterator接口设置到对象中
	// 注意要使用bind绑定，而不是调用该方法
	obj[Symbol.iterator]=arr[Symbol.iterator].bind(arr);
	for(var item of obj){
		console.log(item);//a,2,7
	}
	
	// 给对象添加新的属性
	obj['a']='yy'
	obj[3]=3
	// 可以注意到属性没有添加到Symbol.iterator中
	console.log(obj);//{3: 3, a: "yy", Symbol(Symbol.iterator): ƒ}
	// 可以看到BoundThis中没有属性a,3
	/* 
	arguments: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
	caller: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
	length: 0
	name: "bound values"
	__proto__: ƒ ()
	[[TargetFunction]]: ƒ values()
	[[BoundThis]]: Array(3)
	0: "a"
	1: 2
	2: 7
	length: 3
	__proto__: Array(0)
	[[BoundArgs]]: Array(0) 
	 */
	for(var item of obj){
		// 没有遍历到后面添加到的几个属性
		console.log(item);//a,2,7
	}
```

### 2.Set和Map结构
* Set和Map结构原生具有Iterator接口，可以直接使用for...of循环
```javascript
	// 1. set
	var set=new Set()
	set.add(1)
	set.add(10)
	set.add('a')
	for(var item of set){
		console.log(item);//1,10,a 
	}
	
	// 2. Map 
	var map=new Map();
	map.set('a',1)
	map.set('ab',11)
	map.set('ba',1081)
	for(var item of map){
		console.log(item)
		// ["a", 1],["ab", 11],["ba", 1081]
	}
```

### 3.类数组的对象
* 类似数组的对象包括`nodelist,arguments,字符串...`
```javascript
	// 1.字符串
	var str="hello"
	for(var item of str){
		console.log(item);//h,e,l,l,o 
	}
	// 2. nodelist对象
	var nodes=document.getElementsByClassName('one')
	for(var item of nodes){
		console.log(item);//<div class="one"></div>
	}
	// 3. arguments对象
	function args(){
		for(var item of arguments){
			console.log(item);//5,'w',98
		}
	}
	args(5,'w',98)
```
* `但是对于对象来说，即使添加了length属性成为类数组对象`
* 还需要改写Symbol.iterator方法才可以循环遍历属性。`或者使用Array.from方法转换为数组先`
```javascript
	var obj={length:2,0:1,1:'e',t:333}
	// 虽然是类数组对象，但是没有原生的Symbol.iterator方法，也没有重写
	// 所以还是会报错
	/* for(var item of obj){
		console.log(item);//TypeError obj is not iterable
	} */
	
	// 解决方法1，设置Symbol.iterator方法
/* 	obj[Symbol.iterator]=Array.prototype[Symbol.iterator]
	for(var item of obj){
		console.log(item);//1,e
	} */
	
	// 解决方法2：使用Array.from转换为数组
	obj=Array.from(obj)
	for(var item of obj){
		console.log(item);//1,e
	} 
```
* 如果不想添加属性Symbol.iterator或者转换为数组，那么
* 方法:`1.通过for..in循环间接获取键值，2.通过Object.keys()生成数组再遍历`
```javascript
	var obj={a:2,0:'ss',1:111}
	// 1. for...in循环
	for(var i in obj){
		console.log(obj[i]);//ss,111,2
	}
	// 2. Object.keys()生成数组
	for(var item of Object.keys(obj)){
		console.log(obj[item])//ss,111,2
	}
```

### 4.forEach循环
* forEach循环的优点在于写起来简洁，缺点在于`不可以使用break,continue,return实现退出！`
```javascript
	var arr=[4,5,77,0,323]
	arr.forEach((item,i)=>{
		console.log(item);//4,5,77,0,323
		if(i==2){
			// return ;// 退出失败。不报错
			// break;//报错，Illegal break statement
			// continue;// 报错:Illegal continue statement: no surrounding iteration statement
		}
	})
```

## 给对象添加Symbol.iterator接口
```javascript
        const obj={
            name:'hahah',
            age:444,
            [Symbol.iterator]:function *(){
                yield *Object.values(this)
            }
        }
        console.log([...obj]) // ["hahah", 444]
```
