/*
 定义一个类 User:使用该类去映射数据库字段
 然后定义一个mysqlDb的类去操作数据库
 然后把User类作为参数传入MysqlDb中
 */
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (user) {
        // User {username: "张三", password: "123456"}
        console.log(user);
        return true;
    };
    return MysqlDb;
}());
/* 添加类属性的另一种方式 */
var user = new User();
user.username = "张三";
user.password = "123456";
var db = new MysqlDb();
db.add(user);
/*
 上面就相当于往数据库中增加了一条数据
  但是如果使用其他表，不使用User表
  那么还需要增加其他class,并且MysqlDb这个类里面的add方法也需要修改
  这样就不是我们想要的，所以要使用泛型
 */
var newMysql = /** @class */ (function () {
    function newMysql() {
    }
    newMysql.prototype.add = function (val) {
        console.log(val);
        return true;
    };
    return newMysql;
}());
/* 此时只能传递User类的实例 */
var newdb = new newMysql();
newdb.add(user); // true
var food = /** @class */ (function () {
    function food() {
    }
    return food;
}());
/* 此时只能传递food类的实例 */
var fooddb = new newMysql();
var myfood = new food();
myfood.name = "苹果";
myfood.money = 3;
// food {name: "苹果", money: 3}
fooddb.add(myfood); // true
/* 限制类传入的参数 */
var Animal = /** @class */ (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    return Animal;
}());
var dog = new Animal("小红", 3);
var animaldb = new MysqlDb();
animaldb.add(dog); //Animal {name: "小红", age: 3}
/* 3.类传递的参数是一个对象！ */
var Cat = /** @class */ (function () {
    function Cat(params) {
        this.name = params.name;
        this.age = params.age;
    }
    return Cat;
}());
var cat = new Cat({ name: "喵喵", age: 4 });
var catdb = new MysqlDb();
catdb.add(cat); //{name: "喵喵", age: 4}
