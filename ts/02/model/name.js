"use strict";
exports.__esModule = true;
/* 在不同的命名空间中可以存在同名类，接口，属性等！ */
/* 命名空间里面的方法默认是私有的，需要使用export暴露了才能使用 */
var A;
(function (A) {
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.eat = function () {
            console.log("\u547D\u540D\u7A7A\u95F4A\u4E2D\u7684" + this.name + "\u6B63\u5728\u5403\u82F9\u679C");
        };
        return Dog;
    }());
    A.Dog = Dog;
})(A = exports.A || (exports.A = {}));
/* 如果命名空间想要暴露方法给别的文件使用export namespace B */
var B;
(function (B) {
    var Dog = /** @class */ (function () {
        function Dog(name) {
            if (name === void 0) { name = '狗'; }
            this.name = name;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + "\u6B63\u5728\u5403\u4E1C\u897F");
        };
        return Dog;
    }());
    B.Dog = Dog;
})(B = exports.B || (exports.B = {}));
