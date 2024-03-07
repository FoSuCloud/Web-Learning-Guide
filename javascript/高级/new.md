## new
* 包括内置对象函数（比如Number(..)）在内的所有函数都可以用new来调用，
* `这种函数调用被称为构造函数调用`。
* 这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1．创建（或者说构造）一个全新的对象。
2．这个新对象会被执行[[Prototype]]连接。
3．这个新对象会绑定到函数调用的this。
4．如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```javascript
function foo(a) {
    this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

### new 的过程
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建全新的空对象
2. 将新对象的`隐式原型对象`关联`构造函数的显式原型对象`
3. 执行对象类的构造函数，同时该实例的属性和方法被 this 所引用，即 `this 指向新构造的实例`
4. 如果构造函数执行后没有返回其他对象，那么 new 表达式中的函数调用会自动`返回这个新对象`
```javascript
function myNew(Func,...args){
    // 1.基于函数原型对象创建实例对象
    const instance = {};
    Object.setPrototypeOf(instance, Func.prototype);
    // 2. 绑定参数&this
    const result = Func.apply(instance, args);
    // 已经绑定了this的实例可以则返回，否则返回instance
    return result instanceof Object ? result: instance;
}
// 1. 没有return，那么apply得到的就是 undefined, 也就是instance
function foo(value){
    this.a = value;
}
const val1 = myNew(foo,3);
console.log(val1); // foo{a: 3}
console.log(new foo(3)); // foo{a: 3}
// 2. return 那么myNew返回result
function bar(value){
    return {
        name: value,
        age: 11
    }
}
const val2 = myNew(bar,5);
console.log(val2); // {name: 5, age: 11}
console.log(new bar(5)); // {name: 5, age: 11}
```
* `解剖内部操作后，我们能得出结论 new 操作符是为了实现该过程的一种语法糖。`



