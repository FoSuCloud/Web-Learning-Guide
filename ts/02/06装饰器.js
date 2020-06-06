/*
 装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或者参数上，可以修改类的行为
 通俗的讲，装饰器就是一个方法，可以注入到类，方法，属性参数上，来拓展类，属性，方法，参数的功能。
 常见的装饰器有:类装饰器，属性装饰器，方法装饰器，参数装饰器
 装饰器的写法:普通装饰器(无法传参),装饰器工厂(可传参)
 装饰器是过去几年，js最大的成就之一，已经是ES7的标准特性之一
 
 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* 1.类装饰器:类装饰器在类声明之前被声明
 类装饰器应用于类构造函数，可以用来监视，修改或者替换类定义
  */
/*
注意:由于装饰器是实验性的语法，所以需要开启"experimentalDecorators": true,
但是我们仅仅是创建一个ts文件的话是没有tsconfig.json文件的
我试过创建该文件，但是也无效。
(创建一个ts项目就可以！)
*/
/* 1.类装饰器 (普通装饰器，无参数)*/
function logClass(params) {
    /* params表示使用了该类装饰器的类 */
    params.prototype.apiUrl = "动态扩展使用该类装饰器的属性";
    /* 添加方法 */
    params.prototype.run = function () {
        console.log("run");
    };
}
/* 使用@类名 表示该类使用了装饰器 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClass
    ], HttpClient);
    return HttpClient;
}());
/* 实例化类 */
/* 如果不给实例http设置any,会报错！ */
var http = new HttpClient();
/* 可以正确使用装饰器中定义的属性~ */
console.log(http.apiUrl); //动态扩展使用该类装饰器的属性
/* Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning. */
/* 但是还是有这个警告 */
// 对decorators的实验性支持是一个特性，在将来的版本中可能会有所更改。设置“实验计数器”选项以删除此警告。*/
http.run(); //run
/* 2.类装饰器 (装饰器工厂，有参数) */
function comClass(target) {
    return function (params) {
        console.log(params); // 类
        console.log(target); // 参数
        /* target表示装饰器的参数 */
        params.prototype.apiUrl = target;
    };
}
var work = /** @class */ (function () {
    function work() {
    }
    work = __decorate([
        comClass("https://ask.dcloud.net.cn/account/setting/profile/")
    ], work);
    return work;
}());
(function () {
    constructor();
    { }
    ;
});
var person = new work();
console.log(person.apiUrl);
/*
 3.类装饰器
 可以用于重载类的方法或者属性！
 */
function writerClass(params) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "重写name";
            return _this;
        }
        class_1.prototype.getData = function () {
            console.log(this.name); //重写name
            return this.name + "\u5DF2\u7ECF\u88AB\u91CD\u8F7D";
        };
        return class_1;
    }(params));
}
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.getData = function () {
        return this.name;
    };
    Animal = __decorate([
        writerClass
    ], Animal);
    return Animal;
}());
/* 3.1 不使用装饰器时 */
/* var cat=new Animal("猫")
console.log(cat.getData());//猫 */
/* 3.2使用装饰器重载类 */
var cat = new Animal("猫");
console.log(cat.getData()); //重写name已经被重载
/*
 二。属性装饰器:
 属性装饰器会在运行的时候当做函数使用，传入以下两个参数:
    1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    2.成员的名字
 */
/* 属性装饰器 有参数 */
function property(params) {
    return function (target, attr) {
        console.log(target); //类的原型对象/构造函数
        console.log(attr); // 属性名
        target[attr] = params; // 此时的params指的是装饰器参数
    };
}
var propertyClass = /** @class */ (function () {
    function propertyClass() {
    }
    __decorate([
        property("二哈")
    ], propertyClass.prototype, "name");
    return propertyClass;
}());
var proper = new propertyClass();
/* 但是如果在构造器函数中设置了this.name="xxx"那么装饰器设置的无效~ */
console.log(proper.name); //二哈
/*
 三. 方法装饰器
    方法装饰器会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
    方法装饰器会在运行时传入下列3个参数:
        1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
        2. 成员的名字
        
        如果代码输出目标版本小于ES5，属性描述符将会是undefined
        3. 成员的属性描述符
 */
/* 注意，以下代码都是在ts项目中才会是这些结果！ */
function get(params) {
    return function (target, methodName, desc) {
        console.log(target); //{getData: ƒ, constructor: ƒ}
        console.log(methodName); //getData
        /* 设置tsconfig.ts中的target为es5,否则desc为undefined */
        console.log(desc); //{writable: true, enumerable: true, configurable: true, value: ƒ}
        target.apiUrl = "xxxx";
        target.run = function () {
            console.log("run");
        };
        /* 3.2. 修改装饰器方法，把装饰器方法里面传入的所有参数改为string类型 */
        /* 1.保存当前方法 */
        var me = desc.value;
        /* 2.强制转换为string类型 */
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (val) {
                return String(val);
            });
            me.apply(this, args);
            console.log(args); //["123", "ss"]
        };
    };
}
var funcClass = /** @class */ (function () {
    function funcClass() {
    }
    funcClass.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args); //["123", "ss"]
        console.log("我是类里面的方法"); //我是类里面的方法
    };
    __decorate([
        get("baidu.com")
    ], funcClass.prototype, "getData");
    return funcClass;
}());
/* 3.1不修改装饰器方法 */
/* var http=new funcClass()
console.log(http.apiUrl);//xxxx
http.run();//run */
/* 3.2修改方法 */
var http = new funcClass();
console.log(http.apiUrl); //xxxx
http.getData(123, 'ss'); //run 
/*
 4.方法参数装饰器:
    参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰为类的原型增加一些元素数据，传入以下三个参数:
    1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    2. 方法的名字
    3. 参数在函数参数列表中的索引
 */
/* function logParams(params:any){
    return function(target:any,methodsName:any,paramsIndex:any){
        console.log(target)
        console.log(methodsName)
        console.log(paramsIndex);//0
        target.apiUrl=params;//uuid
    }
}

class logClass{
    public apiUrl:any|undefined;
    constructor(){}
    getData(@logParams("uuid") uuid:any){
        console.log(uuid);//123
    }
}
var mylog=new logClass()
mylog.getData("123")
console.log(mylog.apiUrl);//uuid */ 
