/* 
 ts中存在实例属性和静态属性，两者的使用方法不一样 
 */
function Person(){
	/* 1.1实例方法，必须实例化对象才能使用 */
	this.run1=function():string{
		return 'run1'
	}
}

/* 1.2实例方法的使用 */
var p=new Person();
console.log(p.run1());//run1

/* 2.1静态方法，不需要实例化对象就可以使用 */
Person.run2=function(){
	return 'run2'
}
/* 2.2静态方法的使用 */
console.log(Person.run2());//run2

/* 
 ts中可以通过static关键字声明静态方法，而不使用static关键字声明的方法就默认是实例方法
 */
class func{
	name:string="张三"
	// 静态属性
	static age:number=33
	constructor(name:string){
		this.name=name;
	}
	/*实例方法*/
	getName():string{
		return this.name
	}
	static work():string{
		return `${this.name}在工作中`
	}
	/* 注意:静态方法中不能使用类的属性，只能使用类的静态属性！ */
	static who():string{
		return `${this.name}今年${this.age}岁`
	}
}
var a=new func("yiye")
/* 调用实例方法 */
console.log(a.getName())

/* 调用静态方法(也就是不需要实例化对象~) */
console.log(func.work());//func在工作中，此时的this.name指的是函数名称

/* 虽然name属性也有默认值，但是不是静态方法
 所以使用了函数名称func,而age属性是静态属性
 静态方法可以获取到静态属性！*/
console.log(func.who());//func今年33岁

/* 
 多态就是父类定义一个方法，由子类去实现，不同的子类有不同的实现方式 
 */
class Animal{
	name:string;
	constructor(name:string){
		this.name=name;
	}
	speak():string{
		return `不同的动物有不同的叫声`
	}
}
var aa=new Animal("动物")
console.log(aa.speak());//不同的动物有不同的叫声

class cat extends Animal{
	constructor(name:string){
		super(name);
	}
	speak():string{
		return `${this.name}:喵喵喵`
	}
}
class dog extends Animal{
	constructor(name:string){
		super(name);
	}
	speak():string{
		return `${this.name}:汪汪汪`
	}
}
var mydog=new dog("狗")
console.log(mydog.speak());//狗:汪汪汪
var mycat=new cat("猫")
console.log(mycat.speak());//猫:喵喵喵

/* 
 根据上面的多态可以看到，父类Animal其实是没啥用的
 也就是父类Animal不会实例化，所以可以直接作为一个抽象类
 抽象类:作为子类继承的基类，不能进行实例化
 由abstract关键字定义抽象类和抽象方法，抽象类中的方法不包括具体实现，并且必须！在子类中实现！
 并且只有抽象类才有抽象方法！
 */
/* 也就是在上面的例子中，抽象类是Animal,抽象方法是speak,所以子类必须实现抽象方法speak! */

abstract class Father{
	name:string;
	constructor(name:string){
		this.name=name;
	}
	abstract eat():any;
}
/* Cannot create an instance of an abstract class. */
// var f=new Father();
/* 报错，因为抽象类不可以实例化！ */

class boy extends Father{
	constructor(name:string){
		super(name);
	}
	eat(){
		return `${this.name}喜欢吃苹果`
	}
}
class girl extends Father{
	constructor(name:string){
		super(name);
	}
	/* Non-abstract class 'girl' does not implement inherited abstract member 'eat' from class 'Father'. */
	/* 如果没有实现抽象方法，会报错！ */
	eat(){
		return `${this.name}喜欢吃草莓`
	}
}
var myboy=new boy("小明")
var mygirl=new girl("小红")
console.log(myboy.eat());//小明喜欢吃苹果
console.log(mygirl.eat());//小红喜欢吃草莓