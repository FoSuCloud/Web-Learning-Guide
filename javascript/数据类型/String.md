## 会改变原有的字符串的方法
1. replace替换

## 不会改变原有字符串的方法
1. `substr(长度)，substring,slice`,indexOf,lastIndexOf,concat(新子串)，charAt,charCodeAt,
2. split(分割出新数组，不会改变字符串)

## JSON.stringfy
* `JSON.stringfy可以实现深拷贝，但是不能转换undefined/Symbol/function`
* `这是因为JSON是通用的文本格式，不是专为js服务的，对于特定的js数据类型，JSON不能很好地识别，因为会忽略不转换`
```
			// 1. JSON.stringify把JSON数据转换为字符串(可以用于深拷贝(先转为字符串，再用JSON.parse()转为对象))
			var obj={name:'dd',age:undefined,who:function(){
				console.log("JSON.stringfy不能深拷贝undefined,function")
			},sym:Symbol()}
			console.log(JSON.stringify(obj));//{"name":"dd"}
			var shen_o=JSON.stringify(obj);
			console.log(JSON.parse(shen_o));//没有转换undefined,function,Symbol
			console.log(shen_o==obj);//false,深拷贝成功
			// 1.1 如果要转换的是对象，那么对象的值为undefined/Symbol/function的话就不会被转换
			var arr=[undefined,Symbol(),function one(){console.log('one')},'one'];
			console.log(JSON.stringify(arr));//[null,null,null,'one']
			// 1.2 如果要转换的是数组，那么数组的值为undefined/Symbol/function则会被转为null
			
			// 2. JSON.stringfy有三个参数，第一个参数是内容，第二个第三个参数可选
			// 2.1 第二个参数可以是数组/函数,如果是数组，那么就只转换数组中的键，如果是函数(传入两个形参，键，值)，那么数组中的数需要先经过函数转换
			var oa={'a':'1','b':'9','c':'455454'};
			console.log(JSON.stringify(oa,['a','c']));//{"a":1,"c":"455454"}
			console.log(JSON.stringify(oa,
				function(key,value){
					console.log('key:'+key);
					console.log('value:'+value+1); 
					var val=value+1000;
					console.log(typeof(value))
					return typeof(value)=='object'?(JSON.stringify(value)+1):33;
				})
			);
			// 2.1.1 但是存在一个问题，通过第二个参数去修改value总是会出错，提示value是Object类型？
			// 这是因为不知怎么的，value会变为object类型
			
			// 2.2 第三个参数可以设置缩进，空格或者换行符(不设置的话就是都排到同一行了。。)
			// '\t'相当于tab键
			console.log(JSON.stringify(oa,undefined,'\t'));
			// 2.2.1 注意:需要设置第二个参数，不然第三个参数不生效，第二个参数可以为undefined
			
```

## JSON.parse()不能解析+号
```
			// 1. +号被包含进"",解析为字符串，不会运算
			var data = '{"name":"1+2"}'
			console.log(JSON.parse(data));// {"name":"1+2"}
			// 2. +号没有被包裹进引号，报错
			data='{"name":1+2}';
			console.log(JSON.parse(data));// 报错
```

## 获取一个重复字符的字符串
* `通过 new Array(xx).join(str);就可以生成一个重复字符串，如 new Array(3).join('a')  aaa`

## 获取一个全为0的数组
* `new Array(17).join(0).split('').map(Number)`
## 正则表达式进行变量拼接
```
	function getnum(str,sub){
				// new RegExp()有两个参数，如果不写第二个参数，可以第一个参数为 /a/g 
				// 如果两个参数都写，那么默认第一个参数内容是/ /中间的内容
				// 第二个内容是筛选条件，g是全局匹配， i是匹配大小写
				var reg=new RegExp(sub,'g');
				//console.log(reg);// /sub/g
				return str.match(reg).length
			}
```
* `正则表达式的变量拼接通过 new RegExp来完成，参数有两个时，第一个参数是//内部内容，第二个参数是匹配规则`

## 字符与ASCLL码相互转换
1. 字符转为ASCLL码` char.charCodeAt()`
2. ASCLL码转为字符` String.fromCharCode(num)`
```
			// 将字符转为ASCLL编码 char.charCodeAt() 
			var str='hello world';
			var arr=str.split('');
			console.log(arr[0].charCodeAt())
			var old=[];
			arr.forEach((item)=>{
				old.push(item.charCodeAt())
			});
			console.log(old);
			// 直接插入排序
			for(var i=0;i<old.length-1;i++){
				if(old[i]<old[i+1]){
					var tem=old[i];
					old[i]=old[i+1];
					old[i+1]=tem;
					for(var j=i;j>0;j--){
						if(old[j-1]<old[j]){
							var wait=old[j-1];
							old[j-1]=old[j];
							old[j]=wait;
						}else{
							break;
						}
					}
				}
			}
			console.log(old)
			// ASCLL编码转为字符 String.fromCharCode(num)
			var num=arr[0].charCodeAt()
			console.log(String.fromCharCode(num))
```
* `如果是多个字符，那么也是识别第一个字符，如: "abc".charCodeAt()  => 97`

## 虽然字符串有数组的大多数方法，但是没有splice方法

## 字符串长度
```
			// (两个逗号中间的空格可以无视为没有空格)
			// 1. 对于中间有逗号的，两个逗号之间为一个数
			var arr=[1,,  ,3];
			console.log(arr.length);//4
			console.log(arr)
			// 2. 对于逗号前面没有东西的，也算一个数
			var two=[,,,4]
			console.log(two.length);//4
			console.log(two)
			// 3. 对于逗号后面没有逗号及其他东西的。。不算数，所以这里是3
			var three=[1,,,]
			console.log(three.length);//3
```

## ''与""
1. ''指的是字符，不是字符串！！！，`''不等于"",不是String,所以split('')是错误的！`
2. `""指的是字符串，split("")就是即使遇到空格也要切分，而split(" ")则是以空格为分隔符`

## parseInt,parseFloat,split都是对字符串进行处理
```
parseInt()会把字符串解析为整数(进制不一定，第二个参数是进制)，对，字符串！虽然也可以输入数字，但是数字也是被转为整数
parseFloat()会把字符串解析为十进制的浮点数！注意，parseFloat()不能指定进制，默认是十进制！
			console.log(parseInt(1.11));//1
			console.log(parseInt(-1.11));//-1
			console.log(parseFloat(1.11));//1.11
			console.log(parseFloat(-1.11));//-1.11
			
			console.log(parseInt(1/4));//0  parseInt函数里面可以进行一些数值运算
			console.log(parseInt(7/4));//1
			console.log(parseInt(8/4));//2
			
			console.log(parseInt(11,8));//9
			console.log(parseFloat(11,8));//11，parseFloat不能指定进制
			console.log(parseFloat(11,4));//11,parseFloat只有一个参数，也就是字符串
			
split()方法是给字符串用的，给其他数据类型用会报错！
			console.log('2.2'.split('.')[0]);//2
			// console.log([2,2].split());//报错，不是字符串。。
```
