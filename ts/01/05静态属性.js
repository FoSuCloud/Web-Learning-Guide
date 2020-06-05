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
/*
 ts中存在实例属性和静态属性，两者的使用方法不一样
 */
function Person() {
    /* 1.1实例方法，必须实例化对象才能使用 */
    this.run1 = function () {
        return 'run1';
    };
}
/* 1.2实例方法的使用 */
var p = new Person();
console.log(p.run1()); //run1
/* 2.1静态方法，不需要实例化对象就可以使用 */
Person.run2 = function () {
    return 'run2';
};
/* 2.2静态方法的使用 */
console.log(Person.run2()); //run2
/*
 ts中可以通过static关键字声明静态方法，而不使用static关键字声明的方法就默认是实例方法
 */
var func = /** @class */ (function () {
    function func(name) {
        this.name = "张三";
        this.name = name;
    }
    /*实例方法*/
    func.prototype.getName = function () {
        return this.name;
    };
    func.work = function () {
        return this.name + "\u5728\u5DE5\u4F5C\u4E2D";
    };
    /* 注意:静态方法中不能使用类的属性，只能使用类的静态属性！ */
    func.who = function () {
        return this.name + "\u4ECA\u5E74" + this.age + "\u5C81";
    };
    // 静态属性
    func.age = 33;
    return func;
}());
var a = new func("yiye");
/* 调用实例方法 */
console.log(a.getName());
/* 调用静态方法(也就是不需要实例化对象~) */
console.log(func.work()); //func在工作中，此时的this.name指的是函数名称
/* 虽然name属性也有默认值，但是不是静态方法
 所以使用了函数名称func,而age属性是静态属性
 静态方法可以获取到静态属性！*/
console.log(func.who()); //func今年33岁
/*
 多态就是父类定义一个方法，由子类去实现，不同的子类有不同的实现方式
 */
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.speak = function () {
        return "\u4E0D\u540C\u7684\u52A8\u7269\u6709\u4E0D\u540C\u7684\u53EB\u58F0";
    };
    return Animal;
}());
var aa = new Animal("动物");
console.log(aa.speak()); //不同的动物有不同的叫声
var cat = /** @class */ (function (_super) {
    __extends(cat, _super);
    function cat(name) {
        return _super.call(this, name) || this;
    }
    cat.prototype.speak = function () {
        return this.name + ":\u55B5\u55B5\u55B5";
    };
    return cat;
}(Animal));
var dog = /** @class */ (function (_super) {
    __extends(dog, _super);
    function dog(name) {
        return _super.call(this, name) || this;
    }
    dog.prototype.speak = function () {
        return this.name + ":\u6C6A\u6C6A\u6C6A";
    };
    return dog;
}(Animal));
var mydog = new dog("狗");
console.log(mydog.speak()); //狗:汪汪汪
var mycat = new cat("猫");
console.log(mycat.speak()); //猫:喵喵喵
/*
 根据上面的多态可以看到，父类Animal其实是没啥用的
 也就是父类Animal不会实例化，所以可以直接作为一个抽象类
 抽象类:作为子类继承的基类，不能进行实例化
 由abstract关键字定义抽象类和抽象方法，抽象类中的方法不包括具体实现，并且必须！在子类中实现！
 并且只有抽象类才有抽象方法！
 */
/* 也就是在上面的例子中，抽象类是Animal,抽象方法是speak,所以子类必须实现抽象方法speak! */
var Father = /** @class */ (function () {
    function Father(name) {
        this.name = name;
    }
    return Father;
}());
/* Cannot create an instance of an abstract class. */
// var f=new Father();
/* 报错，因为抽象类不可以实例化！ */
var boy = /** @class */ (function (_super) {
    __extends(boy, _super);
    function boy(name) {
        return _super.call(this, name) || this;
    }
    boy.prototype.eat = function () {
        return this.name + "\u559C\u6B22\u5403\u82F9\u679C";
    };
    return boy;
}(Father));
var girl = /** @class */ (function (_super) {
    __extends(girl, _super);
    function girl(name) {
        return _super.call(this, name) || this;
    }
    /* Non-abstract class 'girl' does not implement inherited abstract member 'eat' from class 'Father'. */
    /* 如果没有实现抽象方法，会报错！ */
    girl.prototype.eat = function () {
        return this.name + "\u559C\u6B22\u5403\u8349\u8393";
    };
    return girl;
}(Father));
var myboy = new boy("小明");
var mygirl = new girl("小红");
console.log(myboy.eat()); //小明喜欢吃苹果
console.log(mygirl.eat()); //小红喜欢吃草莓
