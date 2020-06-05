/*
ts中声明函数
 */
/* 函数名()后面的是返回的数据类型 */
function foo(num) {
    return num;
}
console.log(foo(123)); //123
console.log(foo('qq')); //qq
console.log(foo({ name: 'yiye' })); //{name: "yiye"}
var func = function () {
    return 'hello,wolrd';
};
console.log(func());
/* 在上面的例子中，由于没有给参数设置类型，所以返回参数的话，返回类型也无法校验 */
/* 解决方法，最好也给参数设置类型 */
function add(a, b) {
    return a + b;
}
console.log(add(4, 3)); //7
console.log(add(4, null)); //4，相当于执行了隐式类型转换为number
/* 如果设置类型为字母字符串，无法转换为number,那么编译时会报错 */
/* Argument of type '"a"' is not assignable to parameter of type 'number'. */
console.log(add(4, 'a')); //4a
/*
    根据上面的例子可以知道，ts几乎不限制js中的隐式类型转换！
 */
var x = 4;
var y = true;
/* 编译时报错 Operator '+' cannot be applied to types 'number' and 'boolean'. */
console.log(x + y); //5，但是结果依旧是正确的
/*
 
 es6和ts中都可以设置默认参数*/
function one(a, name) {
    if (name === void 0) { name = '张三'; }
    return name + "--" + a + "\u5C81";
}
console.log(one(30, 'yiye')); //yiye--30岁
console.log(one(30)); //张三--30岁
/*
es6和ts中才有的剩余参数，rest参数，必须是最后一个参数，相当于一个数组
*/
function two(name) {
    var nums = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nums[_i - 1] = arguments[_i];
    }
    return name + "\u7684\u513F\u5B50\u4EEC\u5206\u522B\u662F" + nums + "\u5C81"; // 自动遍历数组了。。
}
console.log(two('张三', 33, 3, 2)); //张三的儿子们分别是33,3,2岁
function three(a) {
    if (typeof a === 'string') {
        return 'i am ' + a;
    }
    else if (typeof a === 'number') {
        return 'my age is ' + a;
    }
}
console.log(three('yiye')); //i amyiye
console.log(three(30)); //my age is30
console.log(three(true)); //undefined,因为该类型在函数中没有return，所以默认返回undefined
/*
 函数参数个数不确定可以使用 ?
 */
function four(name, age) {
    if (age)
        return name + " is " + age + " years age";
    return "i am " + name;
}
console.log(four('张三', 30)); //张三 is 30 years age
console.log(four('张三')); //i am 张三

