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
