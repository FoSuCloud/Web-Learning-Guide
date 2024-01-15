console.log("b");
const A = require('./a.js');
console.log("A加载后:", A.name);
exports.name = 'Module B';
/* 执行node b.js的结果是
b
a
B加载后: undefined
A加载后: Module A
* */
