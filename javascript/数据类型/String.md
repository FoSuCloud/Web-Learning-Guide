## 对于数组和字符串，尽量少使用indexOf方法
* `因为该方法每次都会逐个去查找元素，返回索引，所以时间复杂度每次都是O(n)`
* `当存在一个很长的字符串时怎么优化？使用一个字典去存储，然后就不用使用indexOf(方法)了`

## JSON.stringfy
* str.charCodeAt(index).toString(16)获取某个字符的unicode编码的十进制表示，然后转换为16进制
```
			console.log('a'.charCodeAt(0).toString(16));//获取字符的编码之后，需要转换为16进制，如果需要使用\u0061这种形式表示的话 
			console.log(JSON.stringify('\u0061'));// ASCLL码为97，转为16进制的61
			console.log('中'.charCodeAt(0).toString(16));//4e2d
			console.log(JSON.stringify('\u4e2d'));// 中
			// 如果超出unicode编码表示范围，那么就无法正常显示
			console.log(JSON.stringify('\u{D834}'));//"�"
			console.log(JSON.stringify('\uDF06\uD834'));//"��"
```
---
* `字符编码发展史:`
1. 由于计算机只能处理数字，所以如果要处理文本(中英文)，必须先把文本转换为数字才能处理
* 最早的计算机使用8个比特(bit)作为一个字节(byte),所以`一个字节可以表示的最大整数就是255`
2. `ASCLL编码表`:由于计算机是美国发明的，所以最早只有127个字母被编码到计算机中，也就是大小写字母、数字和特殊符号
* `该127个字母组成ASCLL编码表，比如字母a的编码是65，字母z的编码是122`
3. `GB2312编码(专门处理中文，两个字节)`:但是中文数量远远超过一个字节数量，`所以我国制定了GB2312编码，用于把中文编进去`
4. `国外的编码：`，但是日本编制了日文的Shift-JIS编码，韩文编了Euc-kr编码，这也就导致`很容易冲突(各国制定的标准不一致，识别容易出错)`
---
5. `统一的编码(Unicode)`:因为太多种编码了，为了避免冲突，出现了Unicode编码来把所有语言都编到Unicode编码中
* `Unicode编码是两个字节的，即使该字符只需要一个字节就可以表示也必须表示为两个字节`
* 如: a的ascll码是十进制的65，二进制的01000001,`虽然只需要一个字节就可以表示`，`但是如果字符a在unicode编码中表示，那么必须表示为00000000 01000001`
* `Unicode编码具有两个字节，可以表示多种语言，但是有时候只需要一个字节就可以表示也必须用两个字节，导致存储压力较大！`
6. `UTF-8编码`:`该编码是国际通用的！可以改变字节数量(改善unicode编码缺点，字节范围为1-6)！`
* 常见的英文字母在utf8编码中一般表示为1个字节，汉字在utf8编码中一般表示为3个字节，只有很偏僻的字符才会表示为`4-6个字符`
* 字符A: ASCLL码01000001; Unicode码:00000000 01000001;` utf8码:01000001`
* 字符'中': ASCLL码x; Unicode码:	01001110 00101101;` utf8码:11100100 10111000 10101101`
---
7. `ASCLL码和Unicode编码和UTF8编码都是可以转换的`
8. `在计算机内存中，统一使用Unicode编码；但是保存为文件或者传输的时候，一般转换为UTF8编码`


## str的方法
```
			var str='4324324';
			console.log(str.charAt(1));// 返回字符
			
			console.log(str.charCodeAt(1));// 返回字符编码
			console.log(String.fromCharCode(33));// !,把编码转为字符
			
			console.log(str.indexOf('3',2));// 寻找3，从索引2开始查找,返回索引
```
* `indexOf有两个参数，第二个参数可以设置，含义是开始查找的索引`
* `charAt返回某个索引的字符`
* `charCodeAt返回某个索引处的字符的编码`

## 注意:`直接替换str[1]=xxx,并不会生效！！并且字符串不存在splice方法，只能使用replace/substring/slice方法进行组合`

## 对于字符串来说，使用split('*')
1. `使用split('*')得到的数组长度=字符串中*字符的个数+1  `
2. 看例题
```
给定一个字符串chas[],其中只含有字母字符和“*”字符，现在想把所有“*”全部挪到chas的左边，字母字符移到chas的右边。完成调整函数。
// 注意: 对于字符串来说，存在n个字符*，那么使用split('*)就必定会切割为长度=n+1的数组
// 切割后的数组可能存在多个''的元素，这是正常的
var arr=readline().split('*');
var left=new Array(arr.length).join('*');
var right=arr.join('');
console.log(left+right)
```

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

## 字符串中如何表现反斜杠
```
var str=readline();
//console.log(str)
// 需要使用双反斜杠才能表现出 \
var start=str.lastIndexOf("[img]");
var end=str.lastIndexOf("[\\img]")
if(end>start&&end>-1&&start>-1){
    console.log(str.slice(start,end)+"[\\img]")
}else{
    console.log('null')
}

```