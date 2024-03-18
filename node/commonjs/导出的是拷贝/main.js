// main.js
const counter = require('./counter');

console.log('Before increment:', counter.count); // 0

counter.increment();
counter.increment();
counter.increment();

console.log('After increment:', counter.count); // 0
