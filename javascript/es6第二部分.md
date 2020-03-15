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