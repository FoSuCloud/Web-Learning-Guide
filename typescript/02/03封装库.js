/*
    功能:实现一个mysql,mongodb等数据库的库
    接口:约束该库的类型
    泛型:解决复用性需求
 */
/* 注意:如果类继承的是泛型接口，那么类也是泛型的 */
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
        console.log("mysql数据库建立连接");
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    ;
    MysqlDb.prototype.update = function (info, id) {
        console.log('update' + id);
        return true;
    };
    ;
    MysqlDb.prototype["delete"] = function (id) {
        console.log('delete' + id);
        return true;
    };
    ;
    MysqlDb.prototype.get = function (id) {
        return id;
    };
    ;
    return MysqlDb;
}());
var MongoDb = /** @class */ (function () {
    function MongoDb() {
        console.log("MongoDB数据库建立连接");
    }
    MongoDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    ;
    MongoDb.prototype.update = function (info, id) {
        console.log('update' + id);
        return true;
    };
    ;
    MongoDb.prototype["delete"] = function (id) {
        console.log('delete' + id);
        return true;
    };
    ;
    MongoDb.prototype.get = function (id) {
        return id;
    };
    ;
    return MongoDb;
}());
/* 建立用户表 */
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var user = new User();
user.username = "张三";
user.password = "123456";
/* 建立mysql连接 */
var user_my = new MysqlDb();
user_my.add(user); //{username: "张三", password: "123456"}
user_my.get(1);
user_my["delete"](1); //delete1
user_my.update(user, 1); //update1
/* 建立mongodb连接 */
var user_mon = new MongoDb();
user_mon.add(user); //{username: "张三", password: "123456"}
user_mon.get(1);
user_mon["delete"](1); //delete1
user_mon.update(user, 1); //update1
