/*
 接口:在面向对象的编程中，接口是一种规范的定义(定义了动作和行为的规范)
  在程序设计里面，接口起到了定义某一批类所需要遵守的规范。
  接口规定了这批类必须提供某些方法，提供这些方法的类就可以满足实际需要。
  (其实接口就是用于定义标准的)
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* 1.属性接口 */
/* ts中自定义方法传入参数时对json进行约束 */
function printLabel(obj) {
    return obj.label;
}
console.log(printLabel({ label: 'i am' })); //i am
/* 使用对象 属性约束 */
function func(name) {
    return name.first + " is " + name.end + " son";
    /* 虽然使用第二种传递对象的方法可以传递不在属性接口中的属性
     但是依旧不可以在使用了该属性接口的函数使用没有在接口中定义的属性！*/
    // Property 'age' does not exist on type 'Fullname'.
    // return `${name.first} is ${name.end} son ${name.age}`
}
function AnyInFunc(name) {
    console.log(name);
}
console.log("ds我是ddd");
AnyInFunc({ a: "a", c: 2, d: "33", e: "1" });
/* 2.传递一个对象变量到函数 */
var myobj = { age: 20, first: 'ww', end: 'w' };
console.log(func(myobj)); //ww is w son
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.send(config.data);
    xhr.onreadystatechange = function (res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.response)
            console.log("success");
        }
    };
}
/* 变量md5使用encrypt函数约束,所以参数和返回值都需要和接口中的对应
 如果key:string改为key:number那么就会报错了
 改为any不会报错*/
var md5 = function (key, value) {
    return key + value;
};
console.log(md5('key:', 'value')); //key:value
/*
 4. 可索引接口
 */
/* ts中定义数组的方式 */
var arr_o = [2, 3];
var arr_t = ['3', 's'];
console.log(arr_o); //[2, 3]
console.log(arr_t); //["3", "s"]
/* 该数组使用可索引接口的约束 */
var arr_i = ['e', 't'];
console.log(arr_i[0]); //e
/* 表示该类继承接口Animal */
var Dog = /** @class */ (function () {
    function Dog(name) {
        if (name === void 0) { name = "汪汪"; }
        this.name = name;
    }
    /* 由于继承了接口Animal，所以必须有接口的属性和方法，所以有name,eat */
    Dog.prototype.eat = function (food) {
        if (food === void 0) { food = "大米"; }
        console.log(this.name + '吃' + food);
    };
    return Dog;
}());
var mydog = new Dog("哈哈");
mydog.eat(); //哈哈吃大米
var mytry = /** @class */ (function () {
    function mytry(name) {
        if (name === void 0) { name = "名字"; }
        this.name = name;
    }
    mytry.prototype.eat = function (food) {
        return this.name + "\u559C\u6B22\u5403" + food;
    };
    mytry.prototype.work = function (money) {
        return this.name + "\u4E00\u5929\u6323" + money + "\u5143";
    };
    return mytry;
}());
var try_o = new mytry("一叶");
console.log(try_o.eat("好吃的")); //一叶喜欢吃好吃的
console.log(try_o.work(99999)); //一叶一天挣99999元
/* 表示类mychild继承了父类mytry
 并且继承了接口code
 由于父类不是抽象类，所以不需要实现父类的方法*/
var mychild = /** @class */ (function (_super) {
    __extends(mychild, _super);
    function mychild(name) {
        return _super.call(this, name) || this;
    }
    mychild.prototype.coding = function (code) {
        return this.name + "\u6B63\u5728\u7F16\u5199" + code;
    };
    return mychild;
}(mytry));
var girlfriend = new mychild("琪琪");
console.log(girlfriend.coding("asp.net")); //琪琪正在编写asp.net
/* 直接就可以使用父类的方法而不需要重写方法 */
console.log(girlfriend.eat("草莓")); //琪琪喜欢吃草莓
