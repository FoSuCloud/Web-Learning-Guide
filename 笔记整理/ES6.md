## 类class
1. `在ES6之前，没有类，只有构造函数，生成实例对象只能通过构造函数`
2. `ES6中提供了class关键字来定义类，但是ES6的类只是个语法糖(功能类似，只是更加清晰)，绝大多数功能都和构造函数一样`
```
			class Point{
				constructor(x,y){
					this.x=x;
					this.y=y;
				}
				//重写toString方法
				toString(){
					return '('+this.x+','+this.y+')';
				}
			}
			var one=new Point(5,3);//class类实例化对象
			console.log(one.toString());//(5,3)
			console.log(Point===Point.prototype.constructor);//true
			console.log(typeof Point);//function
			Object.assign(Point.prototype,{
				getx(){
					return this.x
				},
				gety(){
					return this.y
				}
			})
			console.log(Point.prototype);//方法已经被添加到类的原型中
			console.log(Object.keys(Point.prototype));//[getx,gety]
			console.log(Object.getOwnPropertyNames(Point.prototype));//["constructor", "toString", "getx", "gety"]
```
* `1.ES6中的构造方法constructor就相当于构造函数，Point.prototype.constructor类的构造方法其实就是指向类本身`
* `2.class类中的方法{}花括号之后不需要使用, 使用,反而会出错；而且类中的构造方法不需要声明function关键字！`
* `3.class类的数据类型其实就是function! 类进行实例化对象也是使用new关键字，和function一样`
* `4.实际上，类的所有方法都定义在类的prototype属性上，都可以被实例化对象访问到`
* `5.使用Object.assign(object.prototype,{(){},(){}})可以给类添加新的方法`
* `6.类的内部所有定义的方法，都是不可枚举的，使用Object.keys()只能获取到不在类内部定义的方法`
* `7.使用Object.getOwnPropertyNames可以获取到类的所有方法，包括类内部的方法，虽然类内部的方法是不可枚举的`
* `8.注意，一个类，一定会有constructor方法，即使没定义也会默认生成`
* `9.类的名字首字母必须大写！`
* `10.每个类都有一个name属性表示类名，这个属性不用添加，默认就有`
* `11.new Foo(); class Foo;这样是错误的，因为类的声明不会提升！`
```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
* `类跟函数的一个区别在于，类必须使用new关键字生成实例对象，实例对象调用方法，不能使用Point()直接调用类，而函数不生成实例化对象也可以被直接调用`
* [文档](http://es6.ruanyifeng.com/#docs/class)

## 调用实例对象的__proto__添加/修改原型方法
```
			class One{
				constructor(age,name){
					this.age=age;
					this.name=name;
				}
				toString(){
					return '('+this.age+','+this.name+')';
				}
			}
			var a=new One(22,'张三');
			var b=new One(22,'李四');
			//给实例对象的__proo__原型添加方法
			a.__proto__.getname=function(){
				return this.name
			}
			// 通过实例对象给原型添加了方法，该方法也会被该原型的其他实例对象调用
			console.log(a.getname());//张三
			console.log(b.getname());//李四
			var c=new One(1,'王五')
			console.log(c.getname());//王五
```
* `虽然通过实例对象.__proto__可以给对象的原型添加方法，但是这种添加方式很危险！`
* `因为在添加该方法之后创建的对象也可以使用该方法，但是可能我们不希望新创建的对象也有该方法`

## 取值函数getter与存值函数setter
1. `在class类的内部可以设置get,set函数，用来拦截类中变量的存取操作`
```
			class One{
				constructor(age,name){
					this.age=age;
					this.name=name;
				}
				get pro(){
					return 'get';
				}
				set pro(value){
					console.log('set:'+value);
				}
			}
			var one=new One(11,'张三');
			one.pro='i AM set';
			console.log(one.pro);
			console.log(one.__proto__);
```

## 类可以继承！
1. 这样是合法的,`使用extends关键字，可以让子类继承父类！`
```
			var Foo=class {};
			class Bar extends Foo{
			}
			console.log(Bar)
```

## ...展开运算符
1. 把字符串逐个展开为数组,[...'abcd'];//[a,b,cd]
2. 把迭代器iterator`迭代器都有一个next()方法！！！`展开为数组,如形参，[...arguments]
3. `var obj={a:1,b:2}这种不是迭代器，使用[...obj]会报错 TypeError`

## 迭代器Iterator
1. 迭代器Iterator的产生是为了解决for循环的麻烦，使用多个for循环的时候，很容易就会用错变量，迭代器就是为了解决这种错误而产生的
2. `迭代器是一种特殊对象，每个迭代器都会有一个next()方法，每次调用都会返回一个结果对象`
3. `结果对象有两个值，第一个是value表示返回的值，第二个是done是布尔值，为true则表示没有下一个next()方法可被调用返回别的值了`
4. `默认的迭代器对象有:arguments,string,set,map,array,nodelist`
5. `需要注意，对象不是默认的迭代器！！！`
```
			// 1. Set使用展开运算符
			var arr=[4,32,6,78,5,6,4];
			console.log([...(new Set(arr))]);
			// 2. String使用展开运算符
			console.log([...'abcd'])
			// 3.虽然结果比较奇怪，但是Map也可以使用展开运算符
			var ma=[...(new Map([['b',1],['a',2]]))];
			console.log(ma);//[[b,1],[a,2]];
			// 3.2 Map的正确使用方式
			var oa=new Map([['name','haha'],['age',11]])
			console.log(oa.get('name'));//haha
			// 4.函数的形参arguments也可以使用展开运算符
			function one(){
				console.log(arguments);//Arguments(3)
			}
			one('a',1,'Iterator迭代器对象')
			// 5.数组也可以使用展开运算符(在某些时候有用)
			console.log([...[2,3,5]]);//[2,3,5]
			// 6.对象不一定是迭代器对象Iterator,所以不一定可以使用展开运算符
			var obj={'name':'1','age':44}
			console.log([...obj]);//TypeError: obj is not iterable
```
6. 手写一个数组的迭代器(`前提条件:也就是迭代器会保存之前调用next所改变的数据,可以，因为闭包`)
```
// 创建一个数组的迭代器！
			function iterator(arr){
				var i=0;
				return {
					next:function(){
						//done表示是否还有返回值，true表示没有返回值了
						var done=i==arr.length?true:false;
						var value=done?undefined:arr[i++];
						// i++是为了下一次调用next时，索引已增加
						return {
							done,
							value
						}
					}
				}
			}
			// 首先保存iterator迭代器对象
			var obj=iterator([1,3,new Set([3,2,2]),7,{'name':1}]);
			console.log(obj.next());//1
			console.log(obj.next());//3
			console.log(obj.next());//Set(2) {3, 2}
			console.log(obj.next());//7
			console.log(obj.next());//{'name':1}
			console.log(obj.next());//undefined
```

## 生成器generator是一种返回(生成)迭代器的方法
* [参考](https://www.cnblogs.com/xiaohuochai/p/7253466.html)
* `生成器是一种函数，在function的名称前面加一个*星号表示是生成器函数，可以有空格，可以没有`
* `生成器中多了一个关键字yield,通过yield关键字来指定Iterator迭代器对象next方法的返回值和返回顺序`
* `调用生成器generator函数返回的是一个迭代器对象，这种创建迭代器的方法很方便！`
* 创建一个生成器
```
			// 创建一个生成器
			function *gene(){
				yield 1;
				yield 2;
				yield 3;
			}
			var ge=gene();
			console.log(ge.next());//{value: 1, done: false}
			console.log(ge.next());//{value: 2, done: false}
			console.log(ge.next());//{value: 3, done: false}
			console.log(ge.next());//{value: undefined, done: true}
```
* `注意，每个yield语句其实就相当于执行一次next()方法，所以每次执行一个next()方法都会在下一个yield前停止`
* 使用限制:`yield关键字和return关键字一样，不可以穿透，即使是在函数内部的函数中使用了也不行！！！`
```
			// 1.for循环没有块级作用域，所以没有穿透一说！
			function *gene(arr){
				for(var i=0;i<arr.length;i++){
					yield arr[i];
				}
			}
			var arr=[1,2,4,7,55];
			var obj=gene(arr);
			console.log(obj.next().value);//1
			console.log(obj.next().value);//2
			
			// 2.函数内部的嵌套函数使用yield会报错Unexpected，因为yield关键字不能穿透
			// function *par(arr){
			// 	arr.forEach((item)=>{
			// 		yield item;
			// 	})
			// }
			// var obj2=par(arr);
			// console.log(obj2.next().value);//Unexpected identifier
			
			// 3.return关键字同样也是不能穿透的！不会直接返回内部函数的return 值
			function ret(){
				function one(){
					return '内部函数的return'
				}
			}
			console.log(ret());//undefined,不是内部函数的return！
```
* 还有一个用法就是`生成状态机，永远不会done为true`
```
let state = function*(){
    while(1){
        yield 'A';
        yield 'B';
        yield 'C';
    }
}

let status = state();
console.log(status.next().value);//'A'
console.log(status.next().value);//'B'
console.log(status.next().value);//'C'
console.log(status.next().value);//'A'
console.log(status.next().value);//'B'
```
* 小应用
```
			// 生成器(生成迭代对象才能展开)和展开运算符配合使用实现数组对象修改
			var arr=[4,56,3,7];
			function *add(arr){
				for(var i=0;i<arr.length;i++){
					yield arr[i]+10;
				}
			}
			console.log([...add(arr)]);//[14, 66, 13, 17]
```

## let声明的变量不能被window取得

## 使用set完成数组去重
```
			var arr=[4,32,6,78,5,6,4];
			console.log([...(new Set(arr))]);
```

## 希尔排序，快速排序,堆排序是不稳定的，也就是存在两个相同的数字时，可能依旧会颠倒这两个数字的顺序
## 堆排序和快速排序都可以达到O（nlogn）但是堆排序和快速排序是不稳定的,而归并排序是稳定的！
