/* 在不同的命名空间中可以存在同名类，接口，属性等！ */
/* 命名空间里面的方法默认是私有的，需要使用export暴露了才能使用 */
export namespace A{
	interface Animal{
		name:string;
		eat():void;
	}
	export class Dog implements Animal{
		name:string;
		constructor(name:string){
			this.name=name;
		}
		eat():void{
			console.log(`命名空间A中的${this.name}正在吃苹果`)
		}
	}
}
/* 如果命名空间想要暴露方法给别的文件使用export namespace B */
export namespace B{
	interface Animal{
		name:string;
		eat():void;
	}
	export class Dog implements Animal{
		name:string;
		constructor(name:string='狗'){
			this.name=name;
		}
		eat():void{
			console.log(`${this.name}正在吃东西`)
		}
	}
}

