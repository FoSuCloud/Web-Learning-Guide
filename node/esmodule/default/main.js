import mes from './a.js'
// mes = 1; // 会报错，因为导出的是只读的引用 TypeError: Assignment to constant variable.
console.log(mes) //{ name: '《React进阶实践指南》',author:'我不是外星人', say:Function }
