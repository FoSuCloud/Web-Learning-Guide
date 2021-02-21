/* 1. pond单例模式 */
let pond = (function():Object{
	let list;
	function getPond():Array{
		if(!list) list = []
		return list;
	}
	return {
		getPond: getPond()
	}
})()
/* 验证 
let pondA = pond.getPond
let pondB = pond.getPond
console.log(pondA === pondB); // true */

/* 2.装饰器模式，在原有代码基础上给鱼添加方法 */
// class类名首字母大写
abstract class Fish{
	constructor(name:String, num:Number,age:Number, maxAge:Number, buyPrice:Number, sellPrice:Number){
		this.name = name;
		this.num = num;
		this.age = age;
		this.maxAge = maxAge;
		this.buyPrice = buyPrice;
		this.sellPrice = sellPrice;
	}
}
class FishA extends Fish{
	constructor(name:String, num:Number,age:Number, maxAge:Number, buyPrice:Number, sellPrice:Number){
		super(name, num, age, maxAge, buyPrice, sellPrice)
	}
}
class FishB extends Fish{
	constructor(name:String, num:Number,age:Number, maxAge:Number, buyPrice:Number, sellPrice:Number){
		super(name, num, age, maxAge, buyPrice, sellPrice)
	}
}

let _fishA = FishA;
// 在原有代码基础上增加新方法
function speak(name:String):String{
	return '我是'+name;
}
class DecoratorFish{
	constructor(old:Object){
		this.old = old; // 得到的是一个实例
	}
	// 鱼生病，死掉了
	ill():void{
		this.old.num = 0;
	}
}
let a = new FishA('a', 3,4,5,6,7)
let b = new FishB('b', 3,4,5,6,7)
let decorator = new DecoratorFish(b) // 把某些鱼装饰一下，然后就可以生病了。
console.log(a)
console.log(b)
console.log(decorator)
decorator.ill()
console.log(decorator.old)
