/* 
 泛型:解决类，接口，方法的复用性；以及对不特定的数据类型的支持
 可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据
 这样用户就可以以自己的数据类型来使用组件
 */

/* 
 需求:输入number返回number,输入string返回string
  也就是可以接收多种数据类型，返回对应的数据类型的结果
 */
/* 简易的解决方法就是使用any数据类型 */
function getData(val:any):any{
	return val;
}
console.log(getData(123));//123
console.log(getData('ww'));//ww

/* 缺点:这样就和js没有区别了，失去了类型校验的功能！ */


/* 
 解决方法:使用泛型 
 泛型：可以支持不特定的数据类型
 使用T表示泛型，具体什么类型是调用这个方法的时候决定的！
 */
function getVal<T>(val:T):T{
	return val;
}
console.log(getVal<string>("i am"));//i am


/* 
 应用:求最小值(numner/string类型都可能)
 */
class myMin<T>{
	list:number[]=[];
	add(val:T):void{
		this.list.push(val)
	}
	min():T{
		var min=this.list[0];
		for(var i=0;i<this.list.length;i++){
			if(this.list[i]<min){
				min=this.list[i]
			}
		}
		return min;
	}
}

/* 1.number类型数组 */
/* 类使用泛型需要在实例化类的时候声明此时泛型使用的类型 */
var num_arr=new myMin<number>()
num_arr.add(5)
num_arr.add(3)
num_arr.add(10)
num_arr.add(12)
console.log(num_arr.min());//3

/* 2.string类型数组 (此时比较的是字典序)*/
var str_arr=new myMin<string>()
str_arr.add('b')
str_arr.add('ab')
str_arr.add('a')
str_arr.add('c')
console.log(str_arr.min());//a


/* 
 泛型接口！
 */
/* 1.第一种使用方法，不指定方法名！ */
interface Configfn{
	<T>(val:T):T;
}
var con:Configfn=function<T>(val:T):T{
	return val
}
console.log(con<number>(123));//123
console.log(con<string>("泛型接口"));//泛型接口

/* 2.第二种方法 */
interface fan{
	(val:T):T;
}
function data<T>(val:T):T{
	return val;
}
var str_fan:fan<string>=data;
console.log(str_fan("wwww"));//wwww