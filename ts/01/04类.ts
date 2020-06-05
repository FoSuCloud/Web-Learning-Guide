/* 
 ts中构造类:
 */
class Person{
	name:string; // 属性:前面省略了public关键字
	constructor(n:string){  // 构造函数，实例化类的时候触发
		this.name=n;
	}
	/* 类的方法 */
	getName():string{
		return this.name
	}
	setName(name):void{
		this.name=name;
	}
}
/* 实例化类 */
var p=new Person("张三")
p.setName("李四");//张三
console.log(p.getName());//李四

/* 
 ts中的继承
 */
class child extends Person{
	constructor(name:string){
		/* 也就是初始化父类的构造函数，调用call改变this,传递参数 */
		super(name);// 相当与Person.prototype.call(this,name)
		/* 在此处就是给类child添加了一个属性name */
	}
	work():string{
		return `${this.name}在工作`
	}
}
var w=new child("王五")
console.log(w.getName());//王五
console.log(w.work());//王五在工作

/* 
 ts中给我们修饰类的属性提供了三种修饰符:
 public:公有类型，类里面、子类里面、类外面都可以访问
 protected:保护类型，类里面、子类里面可以访问； 类外面不可以访问
 private:私有类型，类里面可以访问；子类和类外面不可以访问！
 */
/* 注意:如果没有给类的属性或者方法添加修饰符，那么默认是public
 并且private只能在类里面访问的话，如果想要把属性暴露到外部，那就要通过一个public/protected类型的方法*/

class foo{
	public name:string;
	protected age:Number;
	private phone:Number;
	constructor(name:string,age:Number,phone:Number){
		this.name=name
		this.age=age
		this.phone=phone
	}
	getPhone():string{
		return `手机号码:${this.phone}`
	}
}

/* 子类 */
class func extends foo{
	constructor(name:string,age:Number,phone:Number){
		super(name,age,phone)
	}
	getName():string{
		return `名字:${this.name}`
	}
	getAge():string{
		return `年龄:${this.age}`
	}
	/* 不能定义getPhone方法，设置为private,public,protected都不行
	 因为子类不能够访问到phone属性,phone属性是私有的！只能在类中访问*/
	/* private getPhone():string{
		return `手机号码:${this.phone}`
	} */
	/* getPhone():string{
		return `手机号码:${this.phone}`
	} */
}

/* 1. public定义的属性/方法可以被类外面使用 */
var a=new func('一叶',23,12345678)
console.log(a.name);// name是public属性
/* Property 'age' is protected and only accessible within class 'foo' and its subclasses. */
// console.log(a.age);// 编译时报错，因为age是保护类型属性，不可以在类外面访问
// Property 'phone' is private and only accessible within class 'foo'.
// console.log(a.phone);;// phone是私有属性，不可以在子类和类外面访问!


/* 2.protected定义的属性或者方法可以在类和子类里面访问 */
var aa=new func("孩子",2,123);
/* 父类的name属性是public,子类可以访问到 */
console.log(aa.getName());//名字:孩子
/* 父类的age属性是protected,子类可以访问到 */
console.log(aa.getAge());//年龄:2
/* 父类的phone属性是private,子类不可以访问到
 所以子类定义的getPhone方法报错*/

/* 3.private属性只可以在类里面访问到 */
/* 也就是通过实例化访问得到，在类外面直接obj.xxx是不能访问到的！ */
console.log(a.getPhone());//手机号码:12345678

