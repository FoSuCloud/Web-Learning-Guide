var dbUrl="xxx"

export function getData():any[]{
	return [{
		name:"张三",
		age:30
	},{
		name:"李四",
		age:22
	}]
}

export function save():void{
	console.log('保存成功')
}

interface DbIn<T>{
	add(info:T):boolean;
	update(info:T,id:number):boolean;
	delete(id:number):boolean;
	get(id:number):any;
}

/* 注意:如果类继承的是泛型接口，那么类也是泛型的 */
export class MysqlDb<T> implements DbIn<T>{
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

export class MongoDb<T> implements DbIn<T>{
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

/* ts中使用export default导出多个内容时会出错 */
/* export default {
	MongoDb,
	MysqlDb,
	save,
	getData
} */