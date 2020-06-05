/* 
	功能:实现一个mysql,mongodb等数据库的库
	接口:约束该库的类型
	泛型:解决复用性需求
 */

interface DbIn<T>{
	add(info:T):boolean;
	update(info:T,id:number):boolean;
	delete(id:number):boolean;
	get(id:number):any;
}

/* 注意:如果类继承的是泛型接口，那么类也是泛型的 */
class MysqlDb<T> implements DbIn<T>{
	constructor(){
		console.log("mysql数据库建立连接")
	}
	add(info:T):boolean{
		console.log(info)
		return true
	};
	update(info:T,id:number):boolean{
		console.log('update'+id)
		return true
	};
	delete(id:number):boolean{
		console.log('delete'+id)
		return true
	};
	get(id:number):any{
		return id;
	};
}

class MongoDb<T> implements DbIn<T>{
	constructor(){
		console.log("MongoDB数据库建立连接")
	}
	add(info:T):boolean{
		console.log(info)
		return true
	};
	update(info:T,id:number):boolean{
		console.log('update'+id)
		return true
	};
	delete(id:number):boolean{
		console.log('delete'+id)
		return true
	};
	get(id:number):any{
		return id;
	};
}

/* 建立用户表 */
class User{
	username:string|undefined;
	password:string|undefined;
}
var user=new User();
user.username="张三"
user.password="123456"

/* 建立mysql连接 */
var user_my=new MysqlDb<User>()
user_my.add(user);//{username: "张三", password: "123456"}
user_my.get(1);
user_my.delete(1);//delete1
user_my.update(user,1);//update1

/* 建立mongodb连接 */
var user_mon=new MongoDb<User>()
user_mon.add(user);//{username: "张三", password: "123456"}
user_mon.get(1);
user_mon.delete(1);//delete1
user_mon.update(user,1);//update1