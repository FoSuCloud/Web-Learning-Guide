// counter.js
let count = 0;

function increment() {
    count++;
}

module.exports = {
    count, // 导出了基本数据类型 count的拷贝
    increment
};
