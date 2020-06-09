/* 
 接口:在面向对象的编程中，接口是一种规范的定义(定义了动作和行为的规范)
  在程序设计里面，接口起到了定义某一批类所需要遵守的规范。
  接口规定了这批类必须提供某些方法，提供这些方法的类就可以满足实际需要。
  (其实接口就是用于定义标准的)
 */

/* 1.属性接口 */
/* ts中自定义方法传入参数时对json进行约束 */
function printLabel(obj:{label:string}):string{
	return obj.label
}
console.log(printLabel({label:'i am'}));//i am
/* 
 从上面可以发现一个问题，如果对象有很多个属性
 那么不就需要对每个属性都写一遍属性约束？
 如何进行批量约束？
 */
/* 方法:使用接口对对象属性进行约束 */
/* 定义一个属性接口
继承接口的对象必须具有接口的所有属性，不能少不能多，除非使用的是可选属性 */
interface Fullname{
	first:string; // 注意此时在内部必须使用;结尾！
	end:string;
}


/* 使用对象 属性约束 */
function func(name:Fullname):string{
	return `${name.first} is ${name.end} son`
	/* 虽然使用第二种传递对象的方法可以传递不在属性接口中的属性
	 但是依旧不可以在使用了该属性接口的函数使用没有在接口中定义的属性！*/
	 // Property 'age' does not exist on type 'Fullname'.
	// return `${name.first} is ${name.end} son ${name.age}`
}
// 1.直接使用func(obj)传入对象
// console.log(func({first:'qiqi',end:'yiye'}));//qiqi is yiye son
// Object literal may only specify known properties, and 'age' does not exist in type 'Fullname'.
/* 使用直接传入对象的方法时，对象不可以含有除属性接口外的属性 */
// console.log(func({age:20,first:'qiqi',end:'yiye'}));//qiqi is yiye son


// 也可以设置任意属性，不限定属性名
interface AnyIn{
	a:string;
	c:number;
	// 注意，此时的propName相当于所有属性，中括号后面的冒号后面是所有可能的数据类型
	[propName:string]:number|string;
}
function AnyInFunc(name:AnyIn){
    console.log("新增的");
	console.log(name)
}
AnyInFunc({a:"a",c:2,d:"33",e:"1"});// 此时没问题，即使多出了属性d,e

/* 2.传递一个对象变量到函数 */
var myobj={age:20,first:'ww',end:'w'}
console.log(func(myobj));//ww is w son

// 两种方式都必须含有属性接口中定义的属性

/* 
 2.可选属性，使用 ? 表示可以传递 可以不传递该属性
 */

interface XhrUrl{
	url:string;
	data?:string;
	method:string;
}

function ajax(config:XhrUrl):void{
	var xhr=new XMLHttpRequest();
	xhr.open(config.method,config.url)
	xhr.send(config.data)
	xhr.onreadystatechange=function(res){
		if(xhr.readyState==4&&xhr.status==200){
			// console.log(xhr.response)
			console.log("success")
		}
	}
}
/* data属性是可选的，所以可以不传递 */
// ajax({url:'https://www.baidu.com',method:'get'})
// ajax({url:'https://www.baidu.com',method:'get',data:'ts'})

/* 
 3.函数类型接口:对方法传入的参数以及返回值进行约束
 */

interface encrypt{
	/* 相当于参数key,value的类型约束为string;
	 函数返回值约束为string*/
	(key:string,value:string):string;
}

/* 变量md5使用encrypt函数约束,所以参数和返回值都需要和接口中的对应
 如果key:string改为key:number那么就会报错了
 改为any不会报错*/
var md5:encrypt=function(key:string,value:string):string{
	return key+value 
}
console.log(md5('key:','value'));//key:value

/* 
 4. 可索引接口
 */
/* ts中定义数组的方式 */
var arr_o:number[]=[2,3]
var arr_t:Array<string>=['3','s']
console.log(arr_o);//[2, 3]
console.log(arr_t);//["3", "s"]
/* 
 可索引接口: 对数组的约束 
 */
interface arrIndex{
	[index:number]:string
}
/* 该数组使用可索引接口的约束 */
var arr_i:arrIndex=['e','t']
console.log(arr_i[0]);//e
/* 
 可索引接口:对对象的约束 
 虽然对象的键不是index索引，但是也可以使用可索引接口！
 */
// var obj_i:arrIndex={name:'yiye',age:'age'}
// console.log(obj_i.name,obj_i.age);//yiye age


/* 
 5. 类类型接口:和抽象类有点像，就是对类的约束
 就是对类的属性和方法的约束
 */
interface Animal{
	name:string;  // 对属性的约束
	/* 注意，索然定义了方法eat,但是方法是否传递参数可以不理
	 但是如果传递参数，那么参数类型必须是string*/
	eat(name:string):void;  // 对类的方法的约束
}
/* 表示该类继承接口Animal */
class Dog implements Animal{
	name:string;
	constructor(name:string="汪汪"){
		this.name=name;
	}
	/* 由于继承了接口Animal，所以必须有接口的属性和方法，所以有name,eat */
	eat(food:string="大米"){
		console.log(this.name+'吃'+food)
	}
}
var mydog=new Dog("哈哈")
mydog.eat();//哈哈吃大米
/* var mydog=new Dog()
mydog.eat("虾米");//汪汪吃虾米 */


/* 
 6.接口的拓展(接口继承接口) 
 */

interface myeat{
	eat(food:string):string;
}
/* 接口继承接口使用extends */
interface person extends myeat{
	work(money:number):string;
}

class mytry implements person{
	name:string;
	constructor(name:string="名字"){
		this.name=name;
	}
	eat(food:string):string{
		return `${this.name}喜欢吃${food}`
	}
	work(money:number):string{
		return `${this.name}一天挣${money}元`
	}
}
var try_o=new mytry("一叶")
console.log(try_o.eat("好吃的"));//一叶喜欢吃好吃的
console.log(try_o.work(99999));//一叶一天挣99999元

/* 
 类继承类使用extends;接口继承接口也使用extends
 类继承接口使用Implements
 */
interface code{
	coding(code:string):string;
}
/* 表示类mychild继承了父类mytry
 并且继承了接口code
 由于父类不是抽象类，所以不需要实现父类的方法*/
class mychild extends mytry implements code{
	constructor(name:string){
		super(name);
	}
	coding(code:string):string{
		return `${this.name}正在编写${code}`
	}
}
var girlfriend=new mychild("琪琪")
console.log(girlfriend.coding("asp.net"));//琪琪正在编写asp.net
/* 直接就可以使用父类的方法而不需要重写方法 */
console.log(girlfriend.eat("草莓"));//琪琪喜欢吃草莓

