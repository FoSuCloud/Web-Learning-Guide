var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* 1. pond单例模式 */
var pond = (function () {
    var list;
    function getPond() {
        if (!list)
            list = [];
        return list;
    }
    return {
        getPond: getPond()
    };
})();
/* 验证
let pondA = pond.getPond
let pondB = pond.getPond
console.log(pondA === pondB); // true */
/* 2.装饰器模式，在原有代码基础上给鱼添加方法 */
// class类名首字母大写
var Fish = /** @class */ (function () {
    function Fish(name, num, age, maxAge, buyPrice, sellPrice) {
        this.name = name;
        this.num = num;
        this.age = age;
        this.maxAge = maxAge;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }
    return Fish;
}());
var FishA = /** @class */ (function (_super) {
    __extends(FishA, _super);
    function FishA(name, num, age, maxAge, buyPrice, sellPrice) {
        return _super.call(this, name, num, age, maxAge, buyPrice, sellPrice) || this;
    }
    return FishA;
}(Fish));
var FishB = /** @class */ (function (_super) {
    __extends(FishB, _super);
    function FishB(name, num, age, maxAge, buyPrice, sellPrice) {
        return _super.call(this, name, num, age, maxAge, buyPrice, sellPrice) || this;
    }
    return FishB;
}(Fish));
var _fishA = FishA;
// 在原有代码基础上增加新方法
function speak(name) {
    return '我是' + name;
}
var DecoratorFish = /** @class */ (function () {
    function DecoratorFish(old) {
        this.old = old; // 得到的是一个实例
    }
    // 鱼生病，死掉了
    DecoratorFish.prototype.ill = function () {
        this.old.num = 0;
    };
    return DecoratorFish;
}());
var a = new FishA('a', 3, 4, 5, 6, 7);
var b = new FishB('b', 3, 4, 5, 6, 7);
var decorator = new DecoratorFish(b); // 把某些鱼装饰一下，然后就可以生病了。
console.log(a);
console.log(b);
console.log(decorator);
decorator.ill();
console.log(decorator.old);
