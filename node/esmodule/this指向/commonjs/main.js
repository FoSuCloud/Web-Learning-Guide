let a = 1;
exports.a = 1

console.log(this); // {a:1}
console.log(this === module.exports); // 输出 true
console.log(this === exports); // 输出 true
console.log(this === global); // 输出 false
