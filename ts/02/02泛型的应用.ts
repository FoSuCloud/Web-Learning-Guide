/* 
 定义一个类 User:使用该类去映射数据库字段
 然后定义一个mysqlDb的类去操作数据库
 然后把User类作为参数传入MysqlDb中
 */

class User{
	username:string|undefined;
	password:string|undefined;
}

class MysqlDb{
	add(user:User):boolean{
		// User {username: "张三", password: "123456"}
		console.log(user)
		return true;
	}
}

/* 添加类属性的另一种方式 */
var user=new User()
user.username="张三"
user.password="123456"

var db=new MysqlDb()
db.add(user)

/* 
 上面就相当于往数据库中增加了一条数据 
  但是如果使用其他表，不使用User表
  那么还需要增加其他class,并且MysqlDb这个类里面的add方法也需要修改
  这样就不是我们想要的，所以要使用泛型
 */

class newMysql<T>{
	add(val:T):boolean{
		console.log(val)
		return true;
	}
}
/* 此时只能传递User类的实例 */
var newdb=new newMysql<User>()
newdb.add(user);// true

class food{
	name:string|undefined;
	money:number|undefined
}
/* 此时只能传递food类的实例 */
var fooddb=new newMysql<food>()
var myfood=new food()
myfood.name="苹果"
myfood.money=3
// food {name: "苹果", money: 3}
fooddb.add(myfood);// true

/* 限制类传入的参数 */
class Animal{
	name:string|undefined;
	age:number|undefined;
	constructor(name:string|undefined,age:number|undefined){
		this.name=name
		this.age=age
	}
}
var dog=new Animal("小红",3)
var animaldb=new MysqlDb<Animal>()
animaldb.add(dog);//Animal {name: "小红", age: 3}

/* 3.类传递的参数是一个对象！ */
class Cat{
	name:string|undefined;
	age:number|undefined;
	constructor(params:{name:string|undefined,age:number|undefined}){
		this.name=params.name
		this.age=params.age
	}
}
var cat=new Cat({name:"喵喵",age:4})
var catdb=new MysqlDb<Cat>()
catdb.add(cat);//{name: "喵喵", age: 4}