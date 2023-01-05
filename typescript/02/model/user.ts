import {MysqlDb,MongoDb} from '../modules/db'
export class User{
	username:string|undefined;
	password:string|undefined;
}
export var user_my=new MysqlDb<User>()
export var user_mon=new MongoDb<User>()