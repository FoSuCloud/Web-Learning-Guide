## 解构赋值
```
			// 1.首先赋值空对象
			// let {bar:foo,bar='foo'}={};
			// 首先 {bar:foo}  由于不存在该变量foo,所以只是相当于全局声明了
			// console.log(foo,bar);// undefined,'foo'
			// 所以foo变量没有被赋值，所以就是undefined,而bar变量被赋值了
			
			// 2.如果是正常的结构
			// 2.1虽然{}里面有两个bar属性，但是不能声明两次，所以会报错
			// 如果let {bar:foo,bar:3};那么会报错
			
			// 2.2此外，解构赋值的时候，赋值的是属性对象的变量，所以bar:'bar'赋值给的是bar属性对象的变量foo
			// 也因为如此，foo='bar',然后bar属性也是等于foo变量，也就是bar
			// let { foo: baz } = { foo: "aaa", bar: "bbb"};
			// console.log(baz);//aaa 
			// console.log(foo);//foo in not defined
			
			// 3.所以题目就是
			// 3.1 不声明bar变量
			// let {bar:foo}={bar:'bar',foo:'foo'}
			// console.log(foo);// bar
			// 如果是这样的话直接打印bar变量就会出现
			// console.log(bar);// bar in not defined
			
			// 3.2只声明，不赋值(变量bar的值等于属性bar的值)
			// let {bar:foo,bar}={bar:'bar',foo:'foo'}
			// console.log(foo,bar);//bar bar 
			
			// 3.3 赋值(变量bar的值等于属性bar的值)
			let {bar:foo,bar='f'}={bar:'bar',foo:'foo'}
			console.log(foo,bar);//bar bar 
```

## Symbol数据类型
* Symbol数据类型是es6中新增的基本数据类型，`最大特点就是 独一无二！`
* 例如:`两个基本数据的值使用了Symbol()就不会==了`
```
			let s1=Symbol("one")
			let s2=Symbol("one");
			console.log(s1==s2);//false
```
* `注意:Symbol()括号里面的参数不可以是Symbol实例！(除此之外，对象和基本数据类型都可以)`
```
			console.log(Symbol(s1));//Cannot convert a Symbol value to a string
```
* `注意:Symbol属于基本数据类型的一种，所以在函数中作为参数也只是传递值！没有引用地址的！`
* `即使Symbol(obj),生成的依旧是基本数据类型`
---
* `Symbol不能与其他类型的值进行运算`
```
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```
* `Symbol可以转换为布尔值，但是不能转换为数值`
* `Boolean(Symbol('f'));//true`
* `Symbol(1)+1;//报错！`
---
1. Symbol主要用于`在对象中设置同名属性时，使用Symbol避免冲突`
* `注意:对象的属性/方法一般都是字符串，也就是obj.a表示a属性，所以Symbol变量要注意`
```
			let one=Symbol();
			let func=Symbol();
			let obj={
				// 1.在对象内部使用Symbol当做属性需要用[]中括号
				// 不用的话就会导致属性名就是symbol变量名而不是symbol值！
				[one]:'hello',
				// 4. 对象的方法名为symbol时，也是用中括号括起来
				[func]:function(a,b){
					return a+b;
				}
			}
			// 2.对象调用symbol属性值，需要使用中括号
			console.log(obj[one]);
			// 3.对象调用symbol属性值，调用obj.symbol这样是不行的，因为属性名是symbol的值而不是变量名！
			console.log(obj.one);//undefined
			// 5.如果对象的方法名是symbol时，那么调用方法就是obj[symbol](...args)
			console.log(obj[func](33,1));//34
```
2. `symbol作为属性名/方法名时，使用for in;Object.keys();Object.assign(),JSON.stringfy()都不会出现Symbol`
* `想要查找symbol属性/方法，需要使用Object.getOwnPropertySymbols()`
```
			for(var item in obj){
				console.log(item);// 不会出现symbol命名的方法/属性
			}
			// 应该使用Object.getOwnPropertySymbols来获取对象的symbol属性
			console.log(Object.getOwnPropertySymbols(obj));//[Symbol(), Symbol()]
```
