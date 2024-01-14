import {  num , addNumber, getNumber } from './a.js'
console.log(num); // 1
// num = 2
/*
会报错
num = 2
^

TypeError: Assignment to constant variable.
* */
addNumber();
console.log(getNumber()); // 2; 可以看到改变了别的js文件中的值

