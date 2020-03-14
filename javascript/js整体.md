## 42.js由es,dom,bom组成
* JavaScript包括三个部分：`ECMAScript、DOM和BOM`
* ECMAScript是JavaScript的规格，标准，定义了脚本语言的所有属性、方法和对象
* DOM是文档对象模型，是 HTML 和 XML 的应用程序接口(API)，把整个页面规划成由节点层级构成的树形文档
* BOM是浏览器对象模型，主要处理浏览器窗口和框架，浏览器对象有window,history,location,screen
* [JS组成](https://blog.csdn.net/J080624/article/details/72840954)

## new 数据类型的原始值
1. console.log(new Boolean());//PrimitiveValue原始值为false
2. console.log(new Number());//PrimitiveValue原始值为0
3. console.log(new String());//PrimitiveValue原始值为""空字符串
4. console.log(new function(){});//PrimitiveValue原始值为{}

## js动态类型语言
1. `静态类型语言在编译时便确定变量的类型`
2. `动态类型语言在编译结束之后，在程序运行，变量被赋予某个值之后，才具有某个类型`
3. `JavaScript是动态类型语言`

## js是弱类型语言
* `弱类型语言就是存在隐式类型转换的语言`
* `也因为存在这个特性，所以静态语言c语言也可以直接进行int a='c'这种转换,因为c语言是弱类型语言，会进行隐式类型转换`

* js是基于对象的语言，而不是面向对象的语言
* js中的变量使用之前不一定需要声明，例如函数内部的变量不声明则视为全局变量


## js的全局函数
1. decodeURI()解码某个编码的URI
2. decodeURIComponent()解码一个编码的URI组件
3. encodeURI()把字符串编码为URI
4. encodeURIComponent()把字符串编码为URI组件
5. escape()对字符串进行编码
6. eval()计算字符串，作为脚本代码来执行(`它的功能是将对应的字符串解析成js并执行，应该避免使用js，因为非常消耗性能（2次，一次解析成js，一次执行）`)
7. isFinite()检验某个值是否为为有穷大的数
8. isNaN()检验某个值是否是数字
9. Number()把对象的值转换为数字
10. parseFloat()解析一个字符串并返回一个浮点数
11. parseInt()解析一个字符串并返回一个整数
12. String()把对象的值转为字符串
13. unescape()对由escape()编码的字符串进行解码


## js的多态
1. 多态:`给不同对象发送同一个命令，不同对象会做出不同的操作，给出不同的反馈`
2. 通俗来说:`导演说action,演员开始演戏，摄影师开始拍，龙套在后台在准备，虽然是同一个命令，但是不同对象会有不同的反应`
```
			var makeSound=function(Animal){
				//	instanceof用于指出某对象是否是特定对象的实例,在此时就是判断是否存在该函数
				if(Animal.sound instanceof Function){
					Animal.sound();//执行不同的对象的同一个方法,得到不同的反馈
				}
			}
			
			var cat=function(){};
			cat.prototype.sound=function(){
				console.log('喵喵喵')
			};//使用prototype,该cat函数的实例对象的__proto__属性就可以指向sound方法
			
			var dog=function(){}
			dog.prototype.sound=function(){
				console.log("汪汪汪")
			}
			
			makeSound(new cat());
			makeSound(new dog());
			//此时如果想再添加一个对象chicken就只需要创建函数及sound函数就可以了,调用makeSound就可以实现多态
			//调用不同的对象的sound方法可以得到不同的反馈
			var chicken={
				sound:function(){
					console.log('咕咕咕')
				}
			}
			makeSound(chicken);//再创建一个chicken对象，给该对象添加sound方法
```
* 与java不同，Java是静态类型语言，需要在使用之前指定对象类型，那么该命名为dog/cat?都不同，应该给他们添加一个超类型animal,dog/cat extends animal 这样就可以实现多态了！
* `多态的最根本好处就在于可以把过程化的条件语句(if dog,else if cat...)转换为对象的多态特性，不必询问对象类型，只要对象具有该行为，那么只管调用该行为就可以了`
## undefined与defined
1.undefined指的是`声明了但是还没有赋值后的结果`
`var one;console.log(one);//undefined`

2.defined指的是`使用了还没有声明的变量`
`console.log(who);//who is not defined`

3.使用 对象.xx是`隐式声明对象的属性或者方法`
`var obj={};console.log(obj.a);//undefined`

4.同理使用window.xx形式会在`window对象中隐式的声明变量`
```
console.log(window.foo || (window.foo="bar"))
// 所以左边是undefined,由于是||或,左边相等于false,可以执行右边,右边进行赋值操作
console.log(window.foo);//bar 已被赋值
```	
5. `函数的name属性不需要声明，创建函数就自带name属性`
```
function foo(){
				
}
var old=foo.name;
console.log(foo.age);//undefined
console.log(foo.name);//foo
foo.name='bar';
console.log(old,foo.name);//foo,foo
```

## js的封装
1. `一般来说，js的封装指的是将信息隐藏，封装数据和封装实现，还可以封装类型和封装变化`
2. 在java这些语言中，通过public private关键字设置访问权限实现对数据的封装特性
3. 在JavaScript中没有提供对这些关键字的支持，我们只能通过依赖变量的作用域来实现封装特性，并且只能模拟出public,private特性
```
			var one=(function(){
				var name='sada';//相当于private私有变量
				return {
					getName:function(){  //相当于public公有方法
						return name;
					}
				}
			})();
			console.log(one.getName());//通过公有方法访问到私有变量
			console.log(one.name);//不能直接访问到私有变量
```
4. 想办法把程序中变化的部分封装好之后，剩下的就是稳定而可复用的部分了

## 设计模式之一(原型模式)--实现继承
1. `原型模式是一种用于创建对象的模式，如果我们想创建一个对象，那么一般先指定对象类型，然后通过类来创建这个对象`
2. `原型模式不再关心对象的具体类型，而是找到一个对象，通过克隆的方式来创建一个一模一样的对象`
3. `如果需要一个跟某个对象一模一样的对象，那就可以使用原型模式；但是使用原型模式需要注意该语言是否提供了克隆的方法，javascript中就是Object.create方法`
```
			var one=function(){
				this.name='one';
				this.age=22;
			}
			var two=new one();
			console.log(two);
			two.name='two';
			two.age=11;//改变实例的属性
			console.log(two);
			//通过Object.create方法克隆一个和two实例一模一样的对象
			var two_child=Object.create(two);
			console.log(two_child);//two_child.__proto__指向two
			// 有些浏览器可能不支持Object.create方法,则使用
			Object.create=Object.create||function(obj){
				var F=function(){};
				F.prototype=obj;// 所以使用Object.create方法克隆其实就是创建一个对象指向obj,然后返回该对象的实例,由于该实例没有重新定义属性方法,所以自然寻找不到,就会通过__poto__属性往上查找到two对象,也就实现了克隆
				return new F();
			}
```
4. 原型模式同时也是一种编程范式，也存在原型编程的基本规则
* 1.所有书都是对象(但是在js中存在基本数据类型，所以js是绝大数是对象，但是所有对象都存在一个根对象，所有的对象都可以通过__proto__追溯到该对象)
```
			var one=new Object();
			// Object.getPrototypeOf()方法可以获取到对象的原型
			console.log(Object.getPrototypeOf(one));
			console.log(Object.getPrototypeOf(one)===Object.prototype);//true
			// 也就表明了通过new Object()得到的one实例的原型是Object.prototpe 
			// 并且js中所有的对象的原型(或者是最终原型指向)都是Object.prototype
```
* 2.要得到一个对象，不是通过实例化类，而是通过找到一个对象作为原型并克隆它
* `但是js一般不是通过new来创建对象吗？的确是，但是new运算符来调用函数时，此时的函数就是一个构造器`
* `使用new运算符来创建对象的过程其实就是先克隆Object.prototpe对象，然后再通过一些操作来进行克隆的过程`
* 3.对象会记住他的原型(`通过__proto__隐藏属性`)
* `每个对象的__proto__属性默认会指向它的构造器对象，也就是{Construtor}.prototype`
* 注意:不是所有浏览器都会公开__proto__属性
```
			var one=new Object();
			console.log(one.__proto__===Object.prototype);//true
			
			var Person=function () {};
			//修改obj对象的__proto__指向
			one.__proto__=Person.prototype;
			console.log(one.__proto__===Person.prototype);
```
* 4.如果对象无法响应某个请求，那么它会把该请求委托给它的构造器的原型，直到要一个可以处理该请求的对象为止
* `虽然在js中，每个对象的原型都是Object.prototype,但是通过修改__proto__指向可以改变对象原型`
```
//闭包封装
			var one=(function(){
				return {
					getName:function (name){
						return name;
					}
				}
			})();
			var one_child=function(){};
			// var one_child_child=new one_child();
			// console.log(one_child_child.getName('yiyi'));//往上找getName()方法,但是不存在
			
			one_child.prototype=one;//修改one_child原型指向为one函数
			var one_child_child=new one_child();
			console.log(one_child_child.getName('dsa'));//改变原型后,可以往上找到方法,这也就是继承,也就是原型链
```
* `任何对象，除了Object.prototype之外，都会有原型，而通过Object.create(null)可以创建出没有原型的对象`
