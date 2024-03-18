#### commonjs导出的是值的拷贝
* 所以我们想要通过函数修改模块内部的一个变量是不行的，除非我们直接通过 require导出对象修改属性 的方式

* `let a = require('./a.js');`
* 如果向这样require使用一个对象接收
* 那么还是可以改变原始值的！
```javascript
let a = require('./a.js');
console.log("newNum:",a.num); // 输出 1; 可以看到之前的a模块中的值没有改变

a.num = 300;
console.log("newNum2:",a.num); // 输出 300; 可以看到改变了
let originalA = require('./a.js');

console.log("newNum2 origin:",originalA.num); // 输出 300; 可以看到原始值还是被改变了
```


