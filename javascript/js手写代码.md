
## 生成圆形的点击区域
1. `虽然使用border-radius后的元素占据宽高还是原来那么多，但是实际有效区域改变了`
```css
.one{
	background: #0000FF;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
<div class="one" onclick="change()">
</div>
function change(){
	console.log('1432')
}
```
* `使用border-radius后，原来点击生效的区域不生效了`
2. 使用原生js+canvas来绘制一个圆形，然后使用勾股定理确定位置在不在范围内
```javascript
<canvas id="one" width="300" height="300"></canvas>

// 获取画布canvas
var canvas=document.getElementById('one').getContext('2d');
var radius=50;
canvas.fillStyle='#00f'
canvas.arc(150,150,radius,0,2*Math.PI,false)
canvas.fill();//必须使用fill方法填充才有颜色

document.onmousemove=function(e){
	var e=e?e:window.event;
	// 根据鼠标的x,y轴位置判断是否在元素上
	var x=Math.abs(150-e.clientX);
	var y=Math.abs(150-e.clientY);
	// 使用勾股定理
	if(Math.sqrt(Math.pow(x,2)+Math.pow(y,2))<radius){
		console.log('323')
	}
}
```

#### 手写Object.create
```javascript
    Object.myCreate = function(proto){
        if(typeof proto!=="object" && typeof proto!=="function"){
            throw new Error("object only can be created by object or function")
        }
        // 创建一个对象
        const obj = {}
        // 对象原型链指向 参数
        Object.setPrototypeOf(obj, proto);
        return obj;
    }
```

### 手写bind
* 简单版
```javascript
    Function.prototype.myBind = function(context,args){
        context = context || window; // 空判断
        const property = Symbol();
        // 1. 此时的this指的是要调用的函数，把函数设置为 context的对象属性。使用默认调用方式绑定this
        context[property] = this;
        // 2. 返回一个匿名函数
        return function (...newArgs){
            // 3. 通过闭包保存外层函数变量
            const params = [...args].concat(...newArgs);
            // 4. 调用函数
            const result =  context[property](...params);
            // 5. 删除属性
            delete context[property];
            // 6. 返回值
            return result;
        }
    }
    function demo(b,c,d){
        console.log(this.a,b,c,d);
    }
    const obj = {a:33};
    const func = demo.myBind(obj,'bb',99);
    func(4);
```
* 但是存在问题，如果多次bind，那么对象context会绑定多个属性
* 可以优化一下
```javascript
 Function.prototype.myBind  = function (context,...args){
        // undefined / null 使用window
        context = context || window;
        // 1. 避免多次绑定属性，直接使用属性绑定当前 this (目标函数)
        const bindFunction = this;
        // 2. 返回匿名函数
        return function(...newArgs){
            // 3. bindFunction.apply(context, args) 使用apply绑定this
            const params = args.concat(...newArgs);
            // 4. 调用函数
            const result = bindFunction.apply(context, params);
            // 5. return
            return result;
        }
    }
    function demo(b,c,d){
        console.log(this.a,b,c,d);
    }
    const obj = {a:33};
    const func = demo.myBind(obj,'bb',99);
    func(4);
```
* `还有一种创建实例的考虑，bind之后再new实例`
```javascript
	Function.prototype.myBind  = function (context,...args){
        // undefined / null 使用window
        context = context || window;
        // 1. 避免多次绑定属性，直接使用属性绑定当前 this (目标函数)
        const bindFunction = this;
        // 2. 返回匿名函数
        return function F(...newArgs){
            // 3. bindFunction.apply(context, args) 使用apply绑定this
            const params = args.concat(...newArgs);
            // 4. 判断是否是 new, F是myBind返回函数也就是原型对象, this是基于F函数进行了new的实例
            // 如果是new，那么此刻 this 指向 prototype
            if(this instanceof F){
                // 但是我们实际上应该new的是 bindFunction ，所以我们需要重新new
                // 那么我们new的结果应该是 之前绑定的函数，并且new的优先级高于bind，所以此时我们只需要new即可，不需要理会this绑定
                return new bindFunction(...params);
            }
            // 5. return 调用之后的结果
            return bindFunction.apply(context, params);
        }
    }
    function demo(b,c,d){
        console.log(this.a,b,c,d);
    }
    const obj = {a:33};
    const func = demo.myBind(obj,'bb',99);
    func(4);
    // new
    function demo2(c,d){
        this.c = c;
        this.d = d;
        console.log(this.a,this.b,this.c,this.d)
    }
    const obj2 = {a:33,b:'bbbb'}; // 没有绑定到this,因为new优先级高于bind
    const bindFunc = demo2.myBind(obj2,'cc');
    const instance = new bindFunc(99);
    console.log(instance);
```
* bind绑定的优先级低于new，所以先bind再new也可以，但是绑定的this会失去
```
			// 1. 直接使用bind方式
			function one(a,b){
				console.log(this.name);
				console.log(a)
				console.log(b)
			}
			var obj={name:'yiyi',age:11}
			var two=one.bind(obj,'a')
			console.log(two);// 回调函数
			two(11);// 执行one函数内容
			
			// 2. 构造函数形式(但是会失去bind(obj,arguments)的obj,arguments依旧有效)
			function three(a,b){
				this.a=a
				this.b=b
				console.log(this)
			}
			var bindf=three.bind(obj,'b');
			bindf(1);// {name: "yiyi", age: 11, a: "b", b: 1}
			// new绑定this的优先级高于bind绑定,所以之前this绑定的对象无效了
			var four=new bindf(33); // 但是之前bind传的值还有效
			console.log(four);// {a: "b", b: 33}
```
* `call/apply的实现其实都是利用闭包，把this用一个变量保存起来，方便闭包调用的时候不释放，并且指向这个变量`

## 手写call
```
    Function.prototype.myCall = function (context,...args) {
        // 此时的this指的是调用 myCall  的 函数对象
        const property = Symbol();
        // 空判断，undefined / null 则使用window
        context = context || window;
        // 1. call实现原理： context 添加一个属性 该属性为 this,这样就能通过默认调用方式绑定this了
        context[property] = this;
        // 2. 调用函数
        const result = context[property](...args);
        // 3. 删除属性
        delete context[property];
        // 4. 返回结果
        return result;
    }
    function demo(b){
        console.log(this.a,b);
    }
    const obj = {a:33};
    demo.myCall(obj,'bb');
```

## 手写apply
```
    Function.prototype.myApply = function(context,args){
        context = context || window; // 空判断
        if(!Array.isArray(args)){
            throw new Error("param is not a array");
        }
        const property = Symbol();
        // 1. 此时的this指的是要调用的函数，把函数设置为 context的对象属性。使用默认调用方式绑定this
        context[property] = this;
        // 2. 调用函数
        const result = context[property](...args);
        // 3. 删除属性
        delete context[property];
        // 4. return
        return result;
    }
    function demo(b,c){
        console.log(this.a,b,c);
    }
    const obj = {a:33};
    demo.myApply(obj,['bb',99]);
```

## 手写new运算符
```javascript
    function myNew(Func,...args){
        // 1. 基于Func.prototype创建一个对象
        let instance = Object.create(Func.prototype);
        // 2. 给对象绑定this,参数
        let result = Func.apply(instance, args);
        // 3. 根据是否有返回值 返回绑定结果/对象
        return result instanceof Object ? result : instance;
    }
    // 1. 返回实例 instance
    function foo(a){
        this.a = a;
    }
    console.log(myNew(foo,1)); // foo{a: 1}
    
    // 2.调用返回对象方式，返回apply结果result
    function foo(a){
        return {
            a:a
        }
    }
    // 走 result instanceof Object 返回 result 逻辑
    console.log(myNew(foo,1)); // {a: 1}
    
    // 3.class 的函数写法， 返回实例 instance
    const Person = /** @class */ (function () {
        function Person(name,age) {
            this.a = name;
            this.b = age;
            this.c = { a: 1 };
        }
        return Person;
    }());
    // 返回 instance
    const person = myNew(Person, 'Alice', 30);
    console.log(person); // 输出: Person { name: 'Alice', age: 30 }
```


#### 手写instanceof
* instanceof就是判断一个函数的prototype属性 是否在另一个对象实例的原型链上
* 关键点就在于：`obj.__proto__ === Func.prototype`
```javascript
function myInstanceOf(obj,constructor) {
    // 只有对象才有 __proto__ 属性
    if(obj === null || (typeof obj !== 'object' && typeof obj !== 'function')){
        return false;
    }
    // 需要判断constructor，只有function才有 prototype 属性
    if(typeof constructor !== 'function'){
        return false;
    }
    let proto = obj;
    while(proto){
        if(proto.__proto__ === constructor.prototype){
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}

console.log({} instanceof Object);
console.log(myInstanceOf({},Object));
console.log(function (){} instanceof Function);
console.log(myInstanceOf(function (){},Function));

console.log(Function instanceof Object);
console.log(Object instanceof Function);
console.log(myInstanceOf(Object,Function));
console.log(myInstanceOf(Function,Object));
```

## 手写jsonp
```javascript
// 手写jsonp,也就是在head标签处添加一个script标签，该标签的src能够返回一个js文件！
			(function jsonp(){
				let head=document.getElementsByTagName('head')[0]
				let script=document.createElement('script');
				script.src='https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js'
				// 给该元素挂载加载完成后的回调事件
				script.addEventListener('load',(res)=>{
					console.log(res)
				})
				head.appendChild(script)
			})()
			// 如果要获取jsonp加载之后的数据，那么需要和后台配合，让后台返回回调函数
```

## 手写防抖
* 防抖就是不管事件触发多少次多久。上次事件触发完必须要要经过一段等待时间
* 如果低于等待时间，那么一定不触发防抖函数。必须在这段等待时间内不触发该事件！
* `防抖必须要超过一个等待时间才能触发`
```javascript
		 /**
         * @param fn {Function} 函数
         * @param time {number} 等待时间
         * @param immediate {Boolean} 是否立即触发函数
         * */
        function debounce(fn,time,immediate){
            let context=this;
            let timer;
            let func= function (){
                let args=arguments;
                if(timer){
                    clearTimeout(timer)
                }
                if(immediate){
                    // 等待时间已过！
                    if(!timer){
                        fn.apply(context,args);
                    }
                    timer = setTimeout(()=>{
                        timer=null;
                    },time)
                }else{
                    timer = setTimeout(()=>{
                        fn.apply(context,args)
                        timer = null;
                    },time)
                }
            }
            // 取消等待
            func.cancel = ()=>{
                if(timer){
                    clearTimeout(timer); // 不触发上个事件对应的函数
                    timer = null; // 等待时间设置为已过！
                }
            }
            return func;
        }
        let box=document.getElementById('box')
        function f(e){
            console.log(e,'click')
        }
        let res = debounce(f,1000,true)
        box.onclick = res;
        let btn=document.getElementById('btn');
        btn.onclick = res.cancel
```

## 节流
```javascript
			// 节流(无论点击多少次，一定时间间隔内只触发一次) 就像是瀑布被梳子梳过一样，水流量一下子减少了
			function throttle(fn,time,immediate){
            let context = this;
            let timer;
            let throttled=function (){
                if(timer){
                    return;
                }
                let args = arguments
                if(immediate){
                    fn.apply(context,arguments);
                    timer = setTimeout(()=>{
                        timer = null
                    },time)
                }else{
                    timer = setTimeout(()=>{
                        fn.apply(context,args);
                        timer=null;
                    },time)
                }
            }
            throttled.cancel=function (){
                if(timer){
                    clearTimeout(timer)
                    timer=null;
                }
            }
            return throttled
        }
        let box=document.getElementById('box')
        function f(e){
            console.log(e,'click')
        }
        let res = throttle(f,10000,true)
        box.onclick = res;
        let btn=document.getElementById('btn');
        btn.onclick = res.cancel
```

## 对象数组去重
```javascript
// 假设是一维数组
function duplicates(arr){
    const set = new WeakSet();
    const result = [];
    for(let i=0;i<arr.length;i++){
        if(!set.has(arr[i])){
            set.add(arr[i]);
            result.push(arr[i]);
        }
    }
    return result;
}
const obj = {a:1};
const foo = {name:3};
const bar = foo;
const foo2 = {name:3};
console.log(duplicates([obj,foo,bar,foo2]));
```



#### 深拷贝
* 注意：需要考虑循环引用问题
```javascript
function deepClone(obj,set = new WeakSet()){
    if(typeof obj !== "object"){
        throw new TypeError("value must be Object")
    }
    if(obj=== null){
        return null;
    }
    if(obj.constructor === Date){
        return new Date(obj);
    }
    if(obj.constructor === RegExp){
        return new RegExp(obj);
    }
    const result = Object.create(null);
    for(let key of Object.keys(obj)){
        if(set.has(obj[key])){
            continue;
        }
        if(typeof obj[key] === "object" && obj[key] !== null){
            set.add(obj[key]);
            result[key] = deepClone(obj[key], set);
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}
const obj = {a:1};
const foo = {name:3};
const bar = foo;
const foo2 = {foo,bar};
console.log(deepClone(obj));
console.log(deepClone(foo2));

console.log(deepClone(new Date()));
console.log(deepClone(new RegExp(/\d+/)));
```


## promise实现红绿灯轮播
```javascript
    async function carousel(){
        while (true){
            await changeColor('red',1*1000);
            await changeColor('#448811',2*1000);
            await changeColor('yellow',3*1000);
        }
    }

    async function changeColor(background,time){
        const circle = document.getElementById('circle');
        circle.style.background = background;
        await sleep(time);
    }

    async function sleep(time){
        await new Promise((resolve) => setTimeout(resolve,time))
    }

    carousel()
```

## setTimeout实现setInterval
```javascript
			class myinterval{
				constructor(){
					this.stop=false
				}
				on(func,wait){
					var that=this;
					var timer=setTimeout(function(){
						if(that.stop){
							clearTimeout(timer)
						}else{
							func();
							that.on(func,wait);	
						}
					},wait)
				}
				off(){
					console.log('关闭')
					this.stop=true;
				}
			}
			var left=document.getElementsByClassName('left')[0]
			var two=new myinterval()
			two.on(function(){
				console.log('使用setTimeout实现setInterval')
			},1000)
			setTimeout(function(){
				two.off();
			},3000)
```

## 手写Array.prototype.map
```javascript
Array.prototype.map1=function (func){
            if(!Array.isArray(this)){
                throw  new Error('不是数组')
            }
            let arr=this;
            let newArr=[]
             arr.forEach((item,i)=>{
                newArr.push(func(item,i))
            })
            return newArr
        }
        let arr=[3,2,1]
        function pow(item){
            return Math.pow(item,2)
        }
        console.log(arr.map1(pow))
```

## 手写Array.prototype.reduce
```javascript
/**
         * @param arr {Array<T>} 数组
         * @param func {Function(a,b)} 函数
         * @param initValue {Number} 初始值
         * */
        Array.prototype.reduce=function (func,initValue){
            let arr = this;
            if(arr.length===0){
                if(!isNaN(initValue)){
                    return initValue;
                }else{
                    throw  new Error('Uncaught TypeError: Reduce of empty array with no initial value')
                }
            }
            if(arr.length === 1 && initValue === undefined){
                return arr[0]
            }
            let result=0;
            for(let i=0;i<arr.length;i++){
                if(i===0){
                    if(initValue === undefined){
                        result = arr[0]
                    }else{
                        result = func.call(this,arr[0],initValue)
                    }
                    continue;
                }
                result=func.call(this,result,arr[i])
            }
            return result
        }
        let arr=[]
        console.log(arr.reduce1((a,b)=> a*b))
        console.log(arr.reduce1((a,b)=> a*b,10))
```

#### 手写Array.prototype.flat
```javascript
function flat(arr){
    if(!Array.isArray(arr)){
        throw new Error("");
    }
    const result = [];
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result.push(...flat(arr[i]));
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(flat([1,2,[6,3,5,[5,6,7],9],0,1]));
```
