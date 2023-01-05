var BaseVariable = /** @class */ (function () {
    function BaseVariable() {
        this.a = 1;
        this.b = '2';
        this.c = { a: 1 };
    }
    return BaseVariable;
}());
// private没有用。还是可以直接使用
// 所以我们才可以直接调用三方库的内部方法和变量！
console.log('BaseVariable:',new BaseVariable().a) // 1
// 真的实现了private的是es6,
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_class_fields
// 查看 前端工程/babel 可以看到class private的babel实现

