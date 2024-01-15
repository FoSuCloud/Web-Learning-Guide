console.log("a")
const B = require('./b.js');
console.log("B加载后:", B.name);
exports.name = 'Module A';
