/*
    首先由于一直开启自动编译会比较卡，所以还是关闭吧~
    
    typescript为了编写的代码更加规范，更有利于维护，增加了类型校验
    ts中的数据类型:
        布尔类型
        数字类型
        字符串类型
        数组类型
        元组类型
        任意类型
        null和undefined
        void类型
        never类型
 */
/* 1.布尔类型 */
var flag = false;
// flag='str';//error TS2011: Cannot convert 'string' to 'boolean'.
flag = true;
// 注意:如果使用的是包装对象，那么要变一下
// var flag_b:boolean=new Boolean(true);//报错,Type 'Boolean' is not assignable to type 'boolean'.
var flag_b = new Boolean(true); //[Boolean: true]
console.log(flag_b);
// 直接调用Boolean()获得的是类型转换为布尔的值，不是布尔包装对象！
var flag_c = Boolean(2);
console.log(flag_c); //true
/* 如果设置了数据类型，那么不能直接赋值为其他数据类型，否则会报错 */
/*  2.数值类型*/
var a = 123;
// a=true;//rror TS2011: Cannot convert 'boolean' to 'number'.
a = 765;
console.log(a);
/* 3.字符串类型 */
var str = 'hello world';
console.log(str); //hello world
/* 4.数组类型array */
/* 4.1 定义数组的第一种形式 var/let/const xxx:type[]=[] */
/* var arr:number[]=[3,2,1]
console.log(arr);//[3, 2, 1] */
var arr = ['css', 'html', 'js'];
console.log(arr); //['css','html','js']
/* 4.2 第二种形式(数组泛型) var/let/const arr:Array<type>=[] */
var a_arr = [3, 2, 1];
var log = console.log;
log(a_arr); //[3,2,1]
/* 5.元组类型
 元组类型属于数组类型中的一种，不同之处在于元组可以指定多种数据类型*/
var tunp = ['字符串', 33, true];
log(tunp); //["字符串", 33, true]
/* 6.枚举类型。用于标注状态 */
var myflag;
(function (myflag) {
    myflag[myflag["success"] = 1] = "success";
    myflag[myflag["error"] = 0] = "error";
})(myflag || (myflag = {}));
var yes = myflag.success;
var no = myflag.error;
log(yes, no); //1 0
log(myflag.success, myflag.error); //1 0
// 6.1 如果不设置枚举类型的值，那么默认返回的是索引，以0开始
var color;
(function (color) {
    color[color["red"] = 0] = "red";
    color[color["green"] = 1] = "green";
    color[color["blue"] = 2] = "blue";
})(color || (color = {}));
log(color.red); //0
log(color.green); //1
var color_b = color.blue;
log(color_b); //2
// 6.2 只给部分枚举类型的元素设置值
var other;
(function (other) {
    other[other["one"] = 0] = "one";
    other[other["two"] = 5] = "two";
    other[other["six"] = 6] = "six";
})(other || (other = {}));
log(other.one); //0
log(other.two); //5,此时的值是设置的值
log(other.six); //6,后面的值+1
/* 其实字符串也可以枚举，但是每一个元素都必须设置值 */
/* 7.any数据类型，其实就是啥数据类型都可以，也就是可以进行改变 */
var who = 123;
who = 'i am';
who = true;
log(who); //true,上面都不会报错！
/* 7.1 ts中any类型的用法，因为ts中没有object类型
 所以设置DOM节点需要设置any数据类型，否则即使可以执行，也会有报错的！*/
// var box=document.getElementById('box')
// var box:any=document.getElementById('box')
// box.style.color='red'
/* 但是高版本的ts不需要设置any也不会报错了*/
/* 8.null/undefined属于never数据类型的子类型*/
var n;
log(n); //undefined
var tem;
log(tem); //undefined
/* 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。*/
n = 123;
log(n); //123
n = undefined;
log(n); //undefined
/* 如果在某处想传入一个string/null/undefined,那么就要使用联合类型*/
var sum;
sum = 33;
log(sum); //33
/* 9.void,一般用于函数中，表示该函数没有返回任何类型*/
function add(a, b) {
    log(a + b);
}
add(3, 2); //5
/* 有返回值时*/
function del(a, b) {
    return a - b;
}
log(del(30, 1)); //29
// void类型如果用于变量中，那么只能被赋值为undefined/null
var void_a = undefined;
var void_b = null;
console.log("void:");
console.log(void_a, void_b); //undefined null
/* 10.never类型，null和undefined属于它的子类型
never类型的值只能被never类型所赋值*/
var aa;
aa = null;
log(aa); //null,undefined和null可以互相转换
/*
never类型表示的是那些永不存在的值的类型。
 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
*/
/* var q:never;
q=(()=>{
     throw new Error('i am error')
})();//此处立即执行了该错误！
log(q); */
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
/* 此时有可以达到的终点，会报错 */
// function func():never {
//     console.log("哈哈")
// }
// func();//编译的时候就会报错
/* A function returning 'never' cannot have a reachable end point. */
// undefined/null其实所有所有类型的子类型，就是说你可以把 null和undefined赋值给其他类型的变量。
var num_n = undefined;
var num_nn = null;
var str_n = undefined;
var str_nn = null;
/*
11. object类型
 object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
 */
var foo = {};
console.log(foo); //{}
foo = { name: 'yiye' };
/* 数组类型可以声明为object! */
var obj_arr = [4, 3, 1];
console.log(foo); //{name: "yiye"}
console.log(obj_arr); //[4, 3, 1]
// 类型推论
// 1. 如果定义变量时赋值了，那么会被默认设置为设置值的类型
var str_t = 'str'; // 此时没有设置类型，但是会默认设置为设置值的类型
// 所以改变类型会报错
// str_t=1;//Type '1' is not assignable to type 'string'.
// 2.如果定义变量时没有赋值，那么默认设置为any
var any_a;
any_a = 1;
any_a = 'dd'; // 此时赋值为其他数据类型没错，因为变量是any数据类型
