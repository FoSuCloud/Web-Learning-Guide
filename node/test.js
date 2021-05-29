
let arr=[1]
arr[1000000000]=99;
console.log(process.memoryUsage())

arr = null;
global.gc();
// console.log(global.gc)
console.log(process.memoryUsage())
