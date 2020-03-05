## 布尔值与布尔对象
```
			var x=new Boolean(0);//布尔对象
			var y=Boolean(0);//布尔值
			if(x){//因为x是布尔对象,而所有对象转为布尔值都是true,if语句中需要的是转换为布尔值的结果,所以Boolean{false}转为布尔值true,结果为true
				console.log(x);//Boolean{false}
			}
			if(y){
				console.log(y);//不打印
			}
			console.log(y);//false,这是布尔值
```
