* `对esmodule导出的基础数据类型，进行赋值会报错，因为esmodule导出的是const变量，不能被修改`
* 或者说是副本
```javascript
1
num = 2
^

TypeError: Assignment to constant variable.
```

#### 还是可以修改
* `let a = require('./a.js');`
* 如果向这样require使用一个对象接收
* 那么还是可以改变原始值的！
```javascript
let a = require('./a.js');
console.log("newNum:",a.num); // 输出 1; 可以看到之前的a模块中的值没有改变

a.num = 300
console.log("newNum2:",a.num); // 输出 300; 可以看到改变了
let originalA = require('./a.js');

console.log("newNum2 origin:",originalA.num); // 输出 300; 可以看到原始值还是被改变了
```


