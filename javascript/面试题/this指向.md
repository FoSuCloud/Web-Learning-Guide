## 箭头函数的this指向
* `箭头函数的this指向指向它所在的作用域!!!`
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

## 例题
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
