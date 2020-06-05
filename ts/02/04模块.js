"use strict";
exports.__esModule = true;
var db_1 = require("./modules/db");
/* 但是需要注意
 在浏览器中直接使用04模块.js文件会报错 exports is not defined
 解决方法:在shell命令行界面输入node 04模块
 由于node环境下有export/import模块支持，所以正确！*/
console.log(db_1.getData()); //[ { name: '张三', age: 30 }, { name: '李四', age: 22 } ]
db_1.save(); //保存成功
/* 2.使用上一节创建的数据库类 */
var user_1 = require("./model/user");
/* 建立用户表 */
var user = new user_1.User();
user.username = "张三";
user.password = "123456";
/* 建立mysql连接 */
user_1.user_my.add(user); //{username: "张三", password: "123456"}
user_1.user_my.get(1);
user_1.user_my["delete"](1); //delete1
user_1.user_my.update(user, 1); //update1
/* 建立mongodb连接 */
user_1.user_mon.add(user); //{username: "张三", password: "123456"}
user_1.user_mon.get(1);
user_1.user_mon["delete"](1); //delete1
user_1.user_mon.update(user, 1); //update1
