## this调用位置
* this 的调用位置：`this的调用位置就是函数在代码中被调用的位置(动态作用域)`


## this的四种绑定
### 1. 默认绑定
* `当一个函数没有明确的被对象调用的时候，也就是单纯作为独立函数被调用的时候，对函数的this使用默认绑定，绑定到全局的window`
```
			var a=10;
			function getSimple(){
				console.log("默认绑定，默认绑定到window:"+this.a)
			}
			getSimple();//此时的函数是单纯作为独立函数被调用，所以this被默认绑定到window
```
* `在函数内部调用另一个函数，只要是作为独立函数被调用，那么都是默认绑定到window`
```
			var a=10;
			function getSimple(){
				function inner(){
					console.log("默认绑定，默认绑定到window:"+this.a)
				}
				inner();//此时的inner函数在别的函数内部,但是依旧是作为独立函数被调用,所以this依旧被默认绑定到window 
			}
			getSimple()
```
* 如果使用`严格模式（Strict Mode）`，则不能将全局对象用于默认绑定，因此 `this 会绑定到 undefined`。
```javascript
function foo() {
  'use strict';

  console.log(this.a);
}

var a = 2;

foo();
// TypeError:this is undefined
```

* `在被隐式调用的对象属性的调用函数，只要还是作为独立函数被调用，那么就还是被默认绑定到window`
```
			var a=10;
			var obj={
				a:5,
				inner:function (){
					console.log("此时使用obj.inner隐式绑定，Inner函数的确被obj对象隐式绑定了"+this.a);//5
					function inner_in(){
						//但是inner_in函数是作为独立函数被调用的,并没有被obj对象隐式调用,所以依旧被默认绑定到window
						console.log("默认绑定，默认绑定到window:"+this.a);//10
					}
					inner_in()
				}
			}
			obj.inner();
```

### 2. 隐式绑定
* `当一个函数被一个对象"包含/拥有"的时候，我们就称this被隐式绑定到对象中了，此时通过this可以直接访问对象中的其他属性`
```
			var a=10;
			var obj={
				inner:function(){
					console.log(this.a);//10000
				},
				a:10000
			}
			obj.inner();
```
* `对象属性动态绑定函数(函数声明在对象外部)和一开始就绑定函数是一样的效果`
```
			var a=10;
			function my(){
				console.log(this.a);//10000
			}
			var obj={
				inner:my,
				a:10000
			}
			obj.inner();
```
* `从上面两个例子可以看出，this是动态绑定的，不是一定要声明在对象内部才会被对象调用；函数不是完全被对象所拥有的，具有一定的独立性`

* 对象属性引用链中只有上一层或最后一层在调用位置中起作用。
```javascript
function foo() {
  console.log(this.a); // this还是指向obj2
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42 
```

* `隐式绑定中的this传递丢失问题`
```
			var a=10;
			function my(){
				console.log(this.a);//10000
			}
			var obj={
				inner:my,
				a:10000
			}
			var out=obj.inner;//此时的out对象就相当于obj对象中的inner函数，并且跟obj对象没关系了！
			out();//因为此时只是inner函数被绑定到out中，而out是作为一个独立函数被调用，所以此时是被默认绑定到window对象中
```
* 因为此时out就是obj.inner函数的引用，和obj对象没有任何关系


* `隐式绑定中this传递丢失另一种情况`
```
			var a=10;
			function my(){
				console.log(this.a);//10000
			}
			var obj={
				inner:my,
				a:10000
			}
			function other(fn){
				fn();//此时作为独立函数被调用,所以默认绑定到window
			}
			var out=obj.inner;
			other(out);
```
* `在元素内部的函数被赋值到另一个变量，也会导致绑定丢失`
```
var one_span=document.getElementById('one');
			var id='wwwww'
			one_span.onclick=function(){
				document.write(this.id);//one
				//此时还没有丢失绑定，所以this指向的是调用该函数的对象one_span，id指的也就是对象的id名
				var callback=function(){
					document.write(this.id);//wwwww
				}
				//此时由于绑定丢失了！！！所以被默认绑定到window对象
				callback()
			}
```
* `隐式绑定中，如果存在多层对象属性链，那么this被绑定到最内层的对象`
```
			var a=10;
			var obj={
				a:1,
				obj2:{
					a:2,
					obj3:{
						//a:4,
						out:function(){
							console.log(this.a)
						}
					}
				}
			}
			obj.obj2.obj3.__proto__=window;//如果添加这条语句，那么obj.obj2.obj3.__proto__=window;对象的原型就指向window，那么obj的方法所需要的a属性就可以通过原型链去查找到window.a
			obj.obj2.obj3.out();//如果不给obj3帝乡一个a属性，那么就输出undefined
			//需要注意的是，如果最内层直接调用函数的对象不存在函数this所需要的属性的话
			//那么此时会输出undefined，因为这个时候跟原型链无关！this指向的对象没有原型可以寻找
			//如果把指定__proto__属性语句改为obj.obj2.obj3.__proto__=obj.obj2;那么输出为2
```
* `需要注意的是，1.所有函数具有prototype属性(显式原型)；2.所有对象都具有__proto__属性(隐式原型);3.原型对象——在定义的时候就被创建，是具有prototype属性的对象`
* `另外在隐式绑定中，还有一种很隐蔽的隐式绑定，看起来是作为独立函数被调用，其实是自己去调用自己的方法，所以指向自身`
```
			var length = 10;
			function fn() {
			  console.log(this.length);
			}

			var obj = { 
			  method: function(private_fn) {
				private_fn();//此时的fn其实是window.fn();默认绑定
				arguments[0]();//隐式绑定？
			  }
			};
			obj.method(fn); 
			
			var arr=[function(){ console.log(this.length)},1,"隐式绑定？","如果是隐式绑定，那么该返回的是该数组的长度4"];
			arr[0]();//没错,就是4!虽然window.length=10;但是arr[0]()这种方式其实是隐式绑定,就是arr对象去调用自己的属性方法,所以自己的属性方法指向的this就是本身
```
### 3. 显式绑定
* `显式绑定就是利用call,apply,bind函数指定该方法被哪个对象绑定`
```
			var a=10;
			var obj={
				a:4,
				inner:function(){
					console.log(this.a)
				}
			}
			var one=obj.inner;
			one();//this在隐式绑定中丢失了，此时使用的是window.a
			obj.inner();//隐式绑定,没有丢失,此时是使用obj.a
			one.call(obj);//使用call方法把函数obj.inner()显式绑定给obj对象,这样就不会出现this丢失的问题!
```
* 但是如果不想要每次调用one函数都需要加上call该怎么办？那就给One对象加上一层函数,每次调用one对象就会自动调用想要的函数
```
			var obj={
				a:4,
				inner:function(){
					console.log(this.a)
				}
			}
			var one=function(){
				return obj.inner.call(obj);
			}
			one();//此时的inner函数的this指向的是obj!
```
* js还提供了一种更加简单的this绑定方法，bind`bind方法不会直接调用函数，而是返回改变了this指向之后的函数`
```
把 one那个语句改为 var one=obj.bind(obj);
				 one();
```
* 此外，`js还提供了一种改变this指向的方法apply,apply方法和call方法的不同之处就在于当执行的函数存在多个形参的时候，call是一个个参数传递，而apply方法是把所有参数都作为一个数组传递，即使只存在一个参数也是数组`
```
			one=function(){
				// return obj.inner.call(obj,2,3);
				return obj.inner.apply(obj,[2,3]);//输出结果和call方法时一致
			}
			one=obj.inner.bind(null,1,1);//此外，bind方法也是一个个参数的形式
```
* `注意，call/apply/bind方法的第一个参数指的是this指向的对象，如果为null/undefined的话那就是默认绑定为window`
* `显式绑定和隐式绑定的区别就是隐式绑定只是给函数临时绑定一个对象，函数的this指向很可能会改变，而显示绑定的话，绑定了就不会改变`

### 4. new绑定
* `this的绑定方式有四种，按照优先级分别是new绑定，显式绑定，隐式绑定，默认绑定`
* `new绑定其实也是实现多态的一种方式`
```
			var obj=function(name,age){
				this.name=name;
				this.age=age;
			}
			var one=new obj('张三',11);
			var two=new obj('李西',12);
			console.log(one.name,one.age);
			console.log(two.name,two.age);
```
* 通过new绑定的方式把对象的this指向新创建的新对象

## 默认绑定不一定所有方法都可以用
```
			// 为什么不推荐所有代码都用this默认调用？
			var one=document.getElementById('id');
			// 不报错
			
			// 使用默认调用，分两步
			var two=document.getElementById;  //保存document对象的方法
			two();//报错，因为此时是默认调用，window对象调用getElementById方法
			//需要注意的是，此时是this指向的是window对象！
```

## 元素内部的this
```
			var id='window外部id'
			// 在元素节点内部调用函数，函数默认指向的是元素
			document.getElementById('one').onclick=function(){
				console.log(this.id);//此时函数在document元素内部发生，那么相当于document元素触发了该函数
				// 函数内部this自然指向指向document元素
				
				//但是使用赋值方式创建的变量存储函数，那么被调用时却是window对象
				//是因为使用了变量来存储函数，但是发生了this丢失，所以使用默认对象window
				var two=function(){
					console.log(this.id);
				}
				two();//window外部id
				//如果想把元素内部定义的函数绑定指向该元素，那么可以使用call/apply/bind
				two.call(this);//此时two变量内部的this指向document
			}
```

## 构造器调用存在return
```
			// new 构造器创建实例使用this指向的是函数内部的变量与方法
			function func(){
				this.name='函数内部this值'
			}
			var obj=new func();
			console.log(obj.name);//函数内部this值
			
			// new构造器如果return返回的值被实例调用，那么即使使用了this.变量=''也是返回return中的变量
			function fun(){
				this.nid=33;
				this.name='this里面的变量，没有被return返回'
				return {
					nid:'return返回的nid',
				}
			}
			var two=new fun();
			console.log(two.nid);
			//如果函数返回return,但是内部的值没有被Return，那么使用的内部值就是undefined
			console.log(two.name);
```

## 严格模式下的函数内部this默认是undefined 
```
			// 1. 在严格模式下，函数内部的this就是undefined...所以使用this.xx就是TypeError,因为undefined没有属性与方法
			var a='外部变量'
			function one(){
				"use strict"
				console.log(this);//undefined
				console.log(this.a);// TypeError canot read undefined
			}
			// one();
			
			// 2.严格模式下的全局this没有改变，还是指代window
			'use strict'
			console.log(this);//window变量
			console.log(this.b);//没有声明的变量属性默认是undefined 
			console.log(b);//没有声明的变量默认是ReferenceError defined
			console.log(a.name);//undefined,基本数据类型变量不存在属性，使用变量.xx属性返回undefined
```

## 获取元素之后的this指代html代码，e指代元素事件
```
// 如果绑定的是onkeypress事件，那么e代之的是KeyboardEvent
			// 如果绑定的是onclick事件，那么e代之的是MouseEvent
			document.getElementsByClassName('one')[0].onkeypress=function(e){
				//获取元素之后的this 指代的是元素的html代码
				console.log(this); //<input type="text" class="one" />
				//获取元素之后的e指代的是KeyboardEvent
				console.log(e);  // KeyboardEvent
				
				console.log(e.charCode);//此时的charCode==keyCode
				console.log(e.keyCode)
			}
```





## 箭头函数
* `箭头函数的this指向 外层作用域(外层函数或者全局)`
* 箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this 的指向。并且，
* `箭头函数拥有静态的上下文，即一次绑定之后，便不可再修改`。

* this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是`箭头函数根本没有自己的 this`，
* `导致内部的 this 就是外层代码块的 this`。正是`因为它没有 this，所以也就不能用作构造函数`。

* `箭头函数可以像 bind 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的 this 机制。`

1. 无论箭头函数在对象的什么层级，只要对象在全局作用域，那么箭头函数this指向的都是window
```javascript
        var a=4;
        let obj={
            a: 3,
            b: {
                a:5,
                getName: ()=>{
                    console.log(this.a)
                }
            }
        }
        obj.b.getName(); // 4
        // 因为所在的作用域是全局作用域，所以箭头函数的this指向的是window
        // 所以得到的是4
```
2. 箭头函数在函数作用域中则this指向函数
```javascript
        function fn(){
            this.a=4;
            this.b=()=>{
                console.log(this.a)
            }
        }
        new fn().b(); // 4
```
```javascript
        function fn(){
            this.name='111'
            return {
                a:{
                    b:()=>{
                        console.log(this.name)
                    }
                }
            }
        }
        fn().a.b(); // 111
```
```javascript
    let obj={
        a:4,
        b:function (){
            console.log(this.a); // 4
            return ()=>{
                console.log(this.a)
            }
        }
    }
    obj.b()() // 4
```
```javascript
function foo() {
  // 返回一个箭头函数
  return (a) => {
    // this 继承自 foo()
    console.log(this.a);
  };
}
const container1 = { a: 1 };
const container2 = { a: 2 };
const bar = foo.call(container1);
bar.call(container2); // 1
```

#### 应用场景总结
1. 函数的普通调用
2. 函数作为对象方法调用
3. 函数作为构造函数调用
4. 函数通过 call、apply、bind 间接调用
5. 箭头函数的调用

## 下面代码执行结果是什么？
```javascript
        function Foo() {
            Foo.a = function() {
                console.log(1)
            }

            this.a = function() {
                console.log(2)
            }
        }

        Foo.prototype.a = function() {
            console.log(3)
        }

        Foo.a = function() {
            console.log(4)
        }

        Foo.a(); // 4 此时执行的是
        /**
         * Foo.a = function() {
            console.log(4)
        }
         打印4; 因为函数Foo此时并没有被执行
         * */

        let obj = new Foo();
        /**
         * 此时执行函数Foo
         * Foo.a指向的是function() {
                console.log(1)
            }
         然后执行this.a赋值
         * */
        obj.a(); // 2 不需要通过原型链就可以获取到属性a
        Foo.prototype.a(); // 3
        Foo.a(); // 1
```
```javascript
        var n = 2
        var obj = {
            n: 3,
            fn: (function(n){
                n*=2
                this.n+=2
                var n = 5
                console.log("window.n", window.n)
                return function (m) {
                    console.log("n:", n, "m", m)    // n:5  m:3  这里的 n 向上查找是 5   //
                    this.n*=2    // fn(3): 2 * 4 =8  //  obj.fn(3): 2 * 3 = 6
                    console.log(m + (++n))    // 3 + (++5) ++n 导致上级作用域的n变成了6    // 3 + (++6)
                }
            })(n)
        }
        /**
         * 立即执行函数先执行
         * 因为立即执行函数把外层的n变量传递进来，所以obj.n变为6
         * 把window.n 变为4
         * 1. 打印 "window.n",4
         * (注意，就算不执行函数fn()，立即执行函数还是会执行)
         * */
        var fn = obj.fn;
        fn(3)    
        /** 2.然后打印 n:5 ( 闭包，外面的5) m:3
         * 然后this.n指向的是window.n ;所以window.n变为 8
         * 3. 打印 3+ 6 =9； 打印9
         * */
        obj.fn(3)    // 10
        console.log(n, obj.n)    // 8 6
```

