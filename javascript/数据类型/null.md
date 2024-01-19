## 27.js null的一个bug
* `typeof null => object; js的其他基本数据类型都是对应的类型`
```
console.log(typeof null);//object
console.log(typeof 1);//number
console.log(typeof undefined);//undefined
console.log(typeof '11');//string 
console.log(typeof true);//boolean
```

#### undefined不是一个关键字
* 可以在函数作用域中声明一个undefined变量，并且赋值成功
```javascript
function t() {
  var undefined = 1000;
  console.log(undefined); // 1000
}
```
