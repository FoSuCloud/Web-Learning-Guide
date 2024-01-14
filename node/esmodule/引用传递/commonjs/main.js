let { num } = require('./a.js');
console.log(num); // 输出 1
num+=1
console.log(num); // 输出 2

let a = require('./a.js');
console.log("newNum:",a.num); // 输出 1; 可以看到之前的a模块中的值没有改变

a.num = 300
console.log("newNum2:",a.num); // 输出 300; 可以看到改变了
let originalA = require('./a.js');

console.log("newNum2 origin:",originalA.num); // 输出 300; 可以看到原始值还是被改变了

