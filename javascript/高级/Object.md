## 一次声明两个属性
```javascript
		// 一次声明两个属性的写法.
		var obj={}
		obj[obj[0]="foo"]="iam";
		console.log(obj);//{0: "foo", foo: "iam"}
```
## 数组的对象劫持
* `Object.defineProperty()方法主要用于对象监听，有6个属性`
1. value:`属性的值`
2. getter:访问属性的时候触发
3. setter:修改属性的时候触发
4. writable:`如果是false,属性的值就不能被重写`
5. configurable:`如果是false,那么修改或者删除属性的操作无效`
6. enumerable:`如果是false,则该属性不可枚举`
* `数组的数据监听不能和别的对象一样只用getter,setter就能实现`
* `利用Object.defineProperty的value去监听数组的push/shift等方法`
```
			var arrmethod=Object.create(Array.prototype);
			['pop','push'].forEach(function(method){
			Object.defineProperty(arrmethod,method,{
				value:function(){
					var origin=Array.prototype[method];
					var res=origin.apply(this,arguments);
					console.log(res,'劫持了')
					return res;
				}
			})	
			})
			var arr=[4,3,22];
			console.log(arrmethod.__proto__==Array.prototype);// true
			arr.__proto__=arrmethod;  // 原型链绑定了
			console.log(arr.__proto__.__proto__==arrmethod.__proto__);//true
			arr.pop();
			console.log(arr)
```

## Object.getPrototypeOf()
* 获取对象的原型(内部[[Prototype]]的值)
* params : obj
* return : obj的原型对象


## Object.assign的实现
```js
      function assign(target){
        for(let i=1;i<arguments.length;i++){
          for(let key of Object.keys(arguments[i])){
            target[key] = arguments[i][key]
          }
        }
        return target
      }
      let res = assign({a:1},{a:33,b:44,0:111},{c:33,4:22,a:9,b:99})
      console.log(res)
```
