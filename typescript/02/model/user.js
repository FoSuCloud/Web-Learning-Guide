"use strict";
exports.__esModule = true;
var db_1 = require("../modules/db");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
exports.user_my = new db_1.MysqlDb();
exports.user_mon = new db_1.MongoDb();
