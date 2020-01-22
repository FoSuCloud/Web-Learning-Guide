## flex布局之————垂直水平居中
```
		<div class="one">
			<div class="inner"></div>
			<div class="inner"></div>
		</div>
		
		.one{
			display: flex;
			width: 400px;
			height: 400px;
			border: 1px solid gainsboro;
			/* 水平居中 */
			justify-content: center;
			/* 垂直居中 */
			align-items: center;
			/* 但是如果把方向改为column，那么水平居中对应为垂直居中，垂直居中对应为水平居中 */
			flex-direction: column;
		}
		.inner{
			width: 50px;
			height: 50px;
			background: red;
		}
```

## 页面的某个小布局里面想要使用fixed定位，但是不想要计算和视口的距离(计算也不靠谱，存在适配性问题)
* `解决方法:让fixed定位的元素根据父元素定位就行了！(实际上还是根据视口，但是不需要我们计算了)`
```
		  <div class="one">
			  <div class="three"></div>
			  <div class="fixed">
				  <ul>
				  	<li>1</li>
				  	<li>2</li>
				  	<li>3</li>
				  	<li>4</li>
				  </ul>
			  </div>
			  <div class="two"></div>
		  </div>
		  <style type="text/css">
		  .one{
		  	width: 100%;
		  	height: 4000px;
		  }
		  .three{
		  	width: 100%;
		  	height: 50px;
		  }
		  .fixed{
		  	position: fixed;
		  	display: flex;
		  	justify-content: space-between;
		  	background: red;
		  	height: 50px;
		  	width: 100%;
		  }
		  ul{
		  	display: flex;
		  	width: 100%;
		  }
		  li{
		  	padding: 0;
		  	margin: 0;
		  	list-style-type: none;
		  	flex: 1;
		  	display: inline-block;
		  }
		  .two{
		  	background: black;
		  	height: 2000px;
		  	width: 100%;
		  	z-index: 2;
		  }
		  </style>
```
* `关键点在于不给fixed定位的元素设置left/right/top/bottom这些属性！`
* `如果想设置fixed定位的元素和父元素的相对位置可以使用margin,但是其实直接把fixed的元素放到父元素该放到的位置也可以的`
* `如果怕fixed定位的元素会遮挡住下面的元素的话就给下面的元素一个margin-top`

## css实现flex布局的自适应标签栏且隐藏滚动条
```
		  <div class="one">
			  <div class="three"></div>
			  <div class="fixed">
				  <ul>
				  	<li>1</li>
				  	<li>2</li>
				  	<li>3</li>
				  	<li>4</li>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				  </ul>
			  </div>
			  <div class="two"></div>
		  </div>
		  
		  .one{
		  	width: 100%;
		  	height: 4000px;
		  }
		  .three{
		  	width: 100%;
		  	height: 50px;
		  }
		  .fixed{
		  	position: fixed;
		  	display: flex;
		  	justify-content: space-between;
		  	background: red;
		  	height: 50px;
		  	width: 100%;
		  }
		  ul{
		  	display: flex;
		  	width: 100%;
		  	overflow: scroll;
		  }
		  body,ul{
		  	margin: 0;
		  	padding: 0;
		  }
		  ul::-webkit-scrollbar{
		  	width: 0 !important;
		  }
		  li{
		  	padding: 0;
		  	margin: 0;
		  	list-style-type: none;
		  	flex: 1 0 20%;
		  	display: inline-block;
		  	flex-wrap: nowrap;
		  	text-align: center;
			line-height: 50px;
		  }
		  .two{
		  	background: black;
		  	height: 2000px;
		  	width: 100%;
		  	z-index: 2;
		  }
```

## 底部fixed布局在页面高度不够一屏时提升了高度
* `解决方法:使用flex布局给中间内容一个flex:1，底部fixed布局改为flex:0不再使用fixed定位，并且让父元素最低高度设为100%`
```
		  <div class="one">
			  <div class="top">头</div>
			  <div class="middle">中间</div>
			  <div class="footer">底部栏</div>
		  </div>
		  
		  *{
		  	margin: 0;
		  	padding: 0;
		  }
		  html,body{
		  	height: 100%;//不设置根元素高度的话，父元素高度没法继承
		  }
		  .one{
		  	display: flex;
		  	flex-direction: column;
		  	height: 100%;
		  }
		  .top{
		  	flex: 0;
		  	background: red;
		  }
		  .middle{
		  	flex: 1;
		  	background: gray;
		  }
		  .footer{
		  	flex: 0;
		  	background: yellow;
		  }
```

## margin垂直边距折叠问题
```
多个相邻（兄弟或者父子关系）普通流的块元素垂直方向marigin会重叠
折叠的结果为：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
两个外边距一正一负时，折叠结果是两者的相加的和。
```

## img是内联元素为什么可以设置宽高？
1. 根据之前学到的，内联元素可以设置line-height,font-size,padding,margin(虽然margin-top,margin-bottom不生效)
2. 但是内联元素设置宽度和高度不是不生效吗？
3. `内联元素分为替换元素和非替换元素`
4. `替换元素:浏览器会根据元素的标签或者属性来设置显示内容，例如input的number,password;textarea;img的src`
5. `非替换元素:内容直接显示在浏览器中，如span,b,embed都是直接显示元素`
6. 因为img属于内联替换元素，所以可以设置宽度和高度

## Object.assign(obj,..args)
1. Object.assign(obj,..args)第一个参数是源对象，剩下的参数都是对象，作用是给第一个参数的源对象添加属性
2. 在剩下的参数中，如果存在和源对象属性同名的对象，那么就会覆盖之前的同名属性/方法
```
			function person(){
				this.name='name';
				this.age=22
			}
			var p=new person();
			
			Object.defineProperty(p,"sex",{
				value:"男",
				enumerable:false
			})
			console.log('assign:',Object.assign(p));
			console.log('json:'+JSON.stringify(p))
			for(var key in p){
				console.log('for in:'+key)
			}
			
			var one={one:'1'};
			var two={two:'2'};
			var obj={name:"对象",age:22,sex:"男",one:"one"};
			Object.assign(obj,one,two);
			console.log(obj);//{name: "对象", age: 22, sex: "男", one: "1", two: "2"}
```
3. `当源对象是空对象，并且参数是{属性:{}}这种形式时，就是对源对象进行了一次覆盖，{}=>{属性:{}}这样`
```
			var obj={name:{name:"当源对象是空对象时,Object.assign()是浅拷贝"}};
			var obj2=Object.assign({},obj);
			console.log(obj2);//与obj一致，指向的内存地址一致
			console.log(obj);
			
			obj2.name.name="改变Object.assign()之后的新对象，会改变之前的对象"
			console.log(obj2.name);
			console.log(obj.name);
```
4. Object.assign()是针对Objecj设计的，如果是数组类型的话，那么数组的值就是作为数组对象的键值，并且会进行覆盖
```
			var arr=[1,2,3];//[1,2,3]
			Object.assign(arr,[4,5]);//也就把1,2覆盖为4,5
			console.log(arr);//[4,5,3]
```

## 可枚举属性
1. 对象的属性分为可枚举和不可枚举，是否可枚举由属性的enumerable值来决定，可枚举性决定了该属性是否能被for in 循环遍历到
```
			var n=new Number(4);
			for(var key in n){
				console.log('可枚举属性:'+key);
			}
			//结果是空，也就是说明没有可枚举属性！
```
2. `使用propertylsEnumerable()方法可以判断出属性是否可枚举`
```
			function person(){
				this.name='name';
				this.age=22
			}
			var p=new person();
			console.log(p.propertyIsEnumerable('name'));//true 
			console.log(p.propertyIsEnumerable('haaa'));//false
			
			person.prototype.hihi="对象原型的属性";
			console.log(p.propertyIsEnumerable("hihi"));//false 
			
			for(var key in p){
				console.log('对象的可枚举属性:'+key)
			}
```
3. `给对象原型添加属性，无论是否可枚举，使用对象.propertyIsEnumerable()都是返回false`
4. `for in遍历对象在自身的和继承的可枚举的属性`
5. `console.log(Object.keys(p));Object.keys()返回对象自身的所有可枚举的属性的键名`
6. `JSON.stringfy()用于将js的值转换为可枚举的JSON字符串(不包括可继承的)`
7. `Object.assign()忽略enumerable为false的属性，只拷贝对象自身的可枚举属性`
```
			console.log(Object.keys(p));
			console.log(JSON.stringify(p));
			console.log(Object.assign(p));
```
8. `使用Object.defindProperty(obj,'key',{})方法定义不可枚举属性`
```
			Object.defineProperty(obj,'three',{
				value:"三",
				enumerable:false
			})
			console.log(Object.assign(obj));//es6,但是不生效
			console.log(Object.keys(obj));//es5
```
9. `Object.keys()和Object.assign()都是遍历对象自身的可枚举属性，但是Object.keys是es5的，Object.assign()是es6的，而且没生效？`
