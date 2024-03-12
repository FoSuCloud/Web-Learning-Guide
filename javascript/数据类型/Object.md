## 访问对象属性
* 访问对象属性有两种方法，一种是点表示法，一种是括号表示法。
* 点表示法会尝试使用该`确切的名称`在对象上查找属性，找不到就返回undefined
```javascript
    // 1. 找到了，虽然作用域有同名的变量，但是查找的是名称！而不是变量对应的值
    let obj={
        color:1,
        2:'let color'
    }
    let color=2; // 没有用～
    console.log(obj.color) // 1

    // 2. 没找到，返回undefined
    let obj2={}
    console.log(obj2.color) // undefined

    // 3. 点表达法从左往右！
    const colorConfig = {
        red: true,
        blue: false,
        green: true,
        black: true,
        yellow: false,
    }
    
    const colors = ["pink", "red", "blue"]
    // 刚开始colorConfig.colors查找属性colors，得到undefined，然后还去执行了undefined[1]，所以就报错
    console.log(colorConfig.colors[1]) // TypeError: Cannot read property '1' of undefined
```
* 括号表示法，内容区域是字符串，对应对象的属性
```javascript
        const colorConfig = {
            red: true,
            blue: false,
            green: true,
            black: true,
            yellow: false,
        }

        const colors = ["pink", "red", "blue"]
        console.log(colorConfig[colors[1]]) // true
```

## Object.seal和Object.freeze
* Object.freeze是冻结一个对象，对象不能新增属性，不能删除属性，不能更改属性值
* Object.seal是封闭一个对象，不能新增属性，不能删除属性，但是可以更高属性值！
* `注意，Object.freeze是浅冻结，对象属性如果也是一个引用数据类型，那么属性的值还是可以更改`

## hasOwnProperty作用
* 检测一个属性是否是对象自身的！
```js
// 1. 
var bStr = "Test String".hasOwnProperty("split");    // 得到false， 因为不能检测原型链中的属性 
// 但是是可以调用原型链上的属性的！
bStr.split('')
// 2.
var bStr1 = String.prototype.hasOwnProperty("split"); //String对象的原型上本来就有这个属性,自然返回true  
// 3.
var bObj = ({fnTest:function(){}}).hasOwnProperty("fnTest"); // 返回true，因为对象中属性 存在
```
* `实际使用上，会因为for in 获取到对象原型链的属性而导致错误！` ，`in可以获取到自身和原型链上的属性`
```js
let obj = {a:1}
let child = Object.create(obj)
// {}[[Prototype]]: Objecta: 1[[Prototype]]: Object
child.b=2

for(let i in child){console.log(i)}
// VM701:1 b
// VM701:1 a
```
* `解决办法是添加一个hasOwnProperty判断`

## Object.setPrototypeOf()
* `Object.setPrototypeOf是一个把对象的原型指向另一个对象的方法`
* `相比于Object.prototype.__proto__，被认为是更加适合修改对象原型的方法`
* `但是由于Object.setPrototypeOf是es6的方法，所以可能存在兼容性问题，一般需要和__proto__方法一起兼容使用`
---
* `另外由于js引擎优化的问题，修改对象的原型对象是一个很慢的过程，因为任何可以访问到该prototype的对象都可能会改变该原型`
* `所以Object.setPrototypeOf方法一般和Object.create方法搭配使用！`
```js
        let parent ={a:1,b:333,fn:function (){
            return this.a
        }}
        let ch = Object.create(parent)
        let obj = {c:'ccc'}
        Object.setPrototypeOf(obj,ch)
        console.log(obj)
        /**
         * c: "ccc"
         [[Prototype]]: Object
         todo 虽然我们可以使用 Object.setPrototypeOf(obj,parent)
         去替代Object.setPrototypeOf(obj,ch);但是指向一个Object.create创建出来的对象会更好！
         * */
        console.log(obj.fn()) // 1
```

## 可枚举属性
1. 对象的属性分为可枚举和不可枚举，是否可枚举由属性的enumerable值来决定，可枚举性决定了该属性是否能被for in 循环遍历到
```
			var n=new 。目标 Number(4);
			for(var key in n){
				console.log('可枚举属性:'+key);
			}
			//结果是空，也就是说明没有可枚举属性！
``` 
2. `使用propertylsEnumerable()方法可以判断出属性是否可枚举`
```
			function person(){
				this.name='name';
				this.age=22
			}
			var p=new person();
			console.log(p.propertyIsEnumerable('name'));//true 
			console.log(p.propertyIsEnumerable('haaa'));//false
			
			person.prototype.hihi="对象原型的属性";
			console.log(p.propertyIsEnumerable("hihi"));//false 
			
			for(var key in p){
				console.log('对象的可枚举属性:'+key)
			}
```
3. `给对象原型添加属性，无论是否可枚举，使用对象.propertyIsEnumerable()都是返回false`
4. `for in遍历对象在自身的和继承的可枚举的属性`
5. `console.log(Object.keys(p));Object.keys()返回对象自身的所有可枚举的属性的键名`
6. `JSON.stringfy()用于将js的值转换为可枚举的JSON字符串(不包括可继承的)`
7. `Object.assign()忽略enumerable为false的属性，只拷贝对象自身的可枚举属性`
```
			console.log(Object.keys(p));
			console.log(JSON.stringify(p));
			console.log(Object.assign(p));
```
8. `使用Object.defindProperty(obj,'key',{})方法定义不可枚举属性`
```
			Object.defineProperty(obj,'three',{
				value:"三",
				enumerable:false
			})
			console.log(Object.assign(obj));//es6,但是不生效
			console.log(Object.keys(obj));//es5
```
9. `Object.keys()和Object.assign()都是遍历对象自身的可枚举属性，但是Object.keys是es5的，Object.assign()是es6的，而且没生效？`
