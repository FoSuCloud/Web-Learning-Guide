"use strict";
exports.__esModule = true;
var dbUrl = "xxx";
function getData() {
    return [{
            name: "张三",
            age: 30
        }, {
            name: "李四",
            age: 22
        }];
}
exports.getData = getData;
function save() {
    console.log('保存成功');
}
exports.save = save;
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
exports.MysqlDb = MysqlDb;
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
exports.MongoDb = MongoDb;
/* ts中使用export default导出多个内容时会出错 */
/* export default {
    MongoDb,
    MysqlDb,
    save,
    getData
} */ 
