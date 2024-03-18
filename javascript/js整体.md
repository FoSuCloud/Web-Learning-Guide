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
* 也由于js是动态类型语言，所以不像java一样具有jit（即时编译器），js的编译流程是ast转换为抽象语法树，再通过字节编译器转换为字节码，最后通过翻译器将字节码转换为机器码
* `而webAssembly可以为js带来静态特性，所以js编译也就可以使用JLT了，所以也就可以加快js的执行速度`

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
```javascript
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

#### undefined与defined
1.undefined指的是`声明了但是还没有赋值后的结果`
`var one;console.log(one);//undefined`

2.defined指的是`使用了还没有声明的变量`
`console.log(who);//who is not defined`

3.使用 对象.xx是`隐式声明对象的属性或者方法`
`var obj={};console.log(obj.a);//undefined`

4.同理使用window.xx形式会在`window对象中隐式的声明变量`
```javascript
console.log(window.foo || (window.foo="bar"))
// 所以左边是undefined,由于是||或,左边相等于false,可以执行右边,右边进行赋值操作
console.log(window.foo);//bar 已被赋值
```

5. 函数的name属性不需要声明，创建函数就自带name属性
```javascript
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
```javascript
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
