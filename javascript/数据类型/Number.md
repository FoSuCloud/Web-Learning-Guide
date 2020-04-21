## 特点:两个相同的数求异或就是0！ 2^2=0

## 18.js的数字
* 在JavaScript中，`基本数据类型的变量都是存储为八字节8Bytes`,`而引用数据类型存储的是对对象的引用地址`
* `换句话说，js中没有int,float,double之分,都是浮点数形式保存！！`
* 以8字节存储，也就是存储为64位浮点数

## 40.js进制
* JavaScript 会把`前缀为 0x` 的数值常量解释为十六进制。0x12 => 18
* 一些 JavaScript 版本会把带有`前导零`的数解释为八进制。017 => 15
* [进制转换](https://blog.csdn.net/lk188/article/details/4317459)

## ++号
```
			// ++号只能用于变量，不能用在常量上
			// console.log(++4);
			
			// 变量
			var a=4;
			console.log(++a);// 5
```

## 判断整数
1. 对于正整数，如果要判断是否是整数，那么可以`num%1==0，如果能取余1，那么就是正整数`
2. 或者通过Math操作,`对数据进行Math.floor取下，Math.ceil取上，Math.round四舍五入等操作，如果操作之后还是跟原来的自己相等，那么就是正整数`

## Math.max.apply(null,arr)相当于函数Math.max函数被window调用
```
			var arr=[1,4,2,6,7];
			console.log(Math.max.apply(null,arr));//7,null/undeinfed的时候，默认指向window对象
			//其实Math.max()就相当于一个函数，然后这个函数被调用的对象指向window
			console.log(Math.max(3,5,1,5,7));//7
			console.log(Math.max(arr));//NaN
			//Math.max方法里面的参数应该是数值，不应该是数组，如果要传递数组就要用apply
			
			var a=10;
			function one(){
				console.log(this.a)
			}
			one.call(null);//10
			//其实就是 函数.call(null) => window.函数
```


## Math.abs()不会对小数进行四舍五入操作
```
			console.log(Math.abs(6.66));//6.66
			console.log(Math.abs(-6.66));//6.66
```

## 使用map(Number)强制转换字符串数组为为数值数组，不要用parseInt
```
var arr='1 3 4 6 8'.split(' ').map(Number)
```

## 位运算符与逻辑运算符
1. `位运算符|,&   不是逻辑运算符||，&& !!! 铭记这一点，必须区分开`
2. 位运算符| `运算规则是对于每一位，只要有一位的数字是1，那么该位的数字就是1`
3. 位运算符& `运算规则是对于每一位，必须该位的都是1，该位的数字才是1`
```
			console.log(3|1);// 3,1分别转换为位是 11,01  ,11 =>3
			console.log(9|2);// 9,2转换为位是 1001,0010,=>1011=> (8+2+1)=>11
			
			console.log(3&1);// 3,1分别转换为位是 11,01, 01 =>1
			console.log(9&2);// 9,2转换为位是 1001,0010,=>0000=> 0
```
* `当对非数字数据类型使用位运算符的时候，先把数据转换为数字类型(NaN(虽然NaN也是Number数据类型)/null/undefined在位运算中相当于0)`
```
			console.log(false|9);//9
			console.log(null&9);//0
			console.log(true|9);//0001,1001 =>1001 => 9
			console.log(true&9);//0001,1001 =>0001 => 1
			console.log(NaN|9);//9
			console.log(NaN&9);//0
```
4. 逻辑运算符|| `如果第一个数是true,那么就不需要判断后面的数据，直接输出第一个数，否则继续后面的数，直到为true，或者都不为true,那就返回最后一个数`
5. 逻辑运算符&& `如果第一个数是false,那么就直接返回false,不需要判断后面的数据。直到找到false,或者全部都是true,那就返回最后一个值`
```
			console.log(false||9);//9
			console.log(NaN||false||1);//1
			console.log(true||9);//true,在||或逻辑运算中,返回第一个true
			console.log(true&&9);//9,在&&与逻辑运算中,返回最后一个true
			console.log(1&&9&&true);//true
```
6. 在逻辑运算中，`NaN/null/undefined相当于false`
7. [参考](https://blog.csdn.net/zhang918784312/article/details/82873485)

## 负数在计算机中表示
```
			// 负数在计算机中以原码的补码形式存在
			// 如-1表示为 1111110； -5(原码是 0000101)表示为11111010
			console.log(-1&2);//2,必须两个都为1
			console.log(-1^2);// -3,因为结果为 111100,然后补码转为计算机表示也就是 -000011,也就是-1
			console.log((-1&2)<<1);//2左移一位为4
```
* `注意，如果是两个负数逻辑与，那么取最小的那个数！`
```
			console.log((-1)&(-2));//-2,11110&1111101
			console.log((-1)&(-3));//-3
			console.log((-1)&(-4));//-4
			console.log((-1)&(-111));//-111
			
			console.log((-2)&(-4));//-4
			console.log((-20)&(-4));//-20
			console.log((-20)&(-40000));//-40000
			console.log((-20)&(-3));//-20
```

## 按位运算符
1. `^按位异或(都为1的话就是0，都是0也还是0，只有01,10才是1)`
```
			console.log(1^6);//0000001 , 0000110 => 0000111 = 4+2+1=7
			console.log(2^18);//0000010,0010010 => 0010001 =>16 (因为两个1得出0)
```
2. `~按位非(整数的相反数减一 (~num=-num-1))`
* 注意`对一个整数进行按位求反，其实就是对整数的相反数减一 (~num=-num-1)`
* `对一个数进行两次按位求反的结果就是这个数本身，对一个浮点数进行按位求反那么就会先去除整数部分，然后再对整数进行运算`
* `对于非数字类型，会先转换为数字再进行按位非操作`
```
			console.log(~2);// -2-1=-3
			console.log(~~3);// -(-3-1)-1=3+1-1=3
			console.log(~3);// -3-1=-4
			console.log(~-3);// -(-3)-1=3-1=2
			console.log(~~-3);// -(-(-3)-1)-1=-2-1=-3
			console.log(~false);// -0-1=-1
			console.log(~null);// -0-1=-1
```
3. 按位与&,按位或|
4. `左移运算符<<(所有数字向左移动，高位移出，低位补零)(没有无符号左移！)`
```
			console.log(1<<4);// 0000001 => 0010000 => 16
			console.log(-1<<4);//-16
			console.log((-1)<<4);//-16
			//没有无符号左移
			// console.log(1<<<4);// 0000001 => 0010000 => 16
			console.log(23<<3);// 00010111 => 10111000 => 8+16+32 =>56+128=>184
			console.log(-23<<3);//-184
```
* `在左移运算符中，即使数字是负数，依旧操作，只是不改变正负就好了`
5. `右移运算符>> (所有数字向右移动，低位移出，高位的话，正数补零，负数补1！！！)`
```
			console.log(33>>3);// 00100001 => 00000100 => 4
			// 负数在内存中是以补码形式存在的，所以负数带符号右移需要现在转换为补码
			console.log(-33>>3);// 00100001(原码) => 11011111(原码+1=>补码) => 1111011(右移三位) => 0000101(按位取反+1)=> 5，但是本来是负数，所以保留符号是-5 
			console.log(-100>>4);// 01100100 => 10011100(按位取反+1 =>补码)= > 11111001=> 00000111(按位取反+1) => 7=>-7
			console.log(-33>>>3);//(无符号右移，此时就不仅仅看8位就可以了，还要知道符号是32位的)
			// 无符号右移 >>> 其实也是差不多，但是右移之后是给高位补0而不是1了
			// 00000000 00000000 00000000 00100001=>1111111 1111111 1111111 11011111(原码+1=>补码)=>0001111 1111111 1111111 1111011(右移三位)
```
6. `无符号右移>>> 这个不太一样，虽然也是对负数按位取反，但是之后是补0 (在按位取反之后，把负数当做整数处理了)`
7. `注意，整数的无符号右移依旧是右移的数值`
```
			// 记住！其实都是32位的，但是为了方便只写出8位
			console.log(2&6);//00000010 00000110 =>00000010 =>2
			console.log(2|6);//00000010 00000110 =>00000110 =>6
			console.log(2^6);//00000010 00000110 =>00000100 =>4
			console.log(~2);//num=-num-1; -2-1=-3
			console.log(~-2);// -(-2)-1=1
			console.log(34>>4);//00100010 =>00000010 =>2 (正数补0)
			console.log(-34>>4);//先按位取反+1，转为内存中的负数形式 11011110
			// 然后再右移4位 (负数的话高位的就补1) 11111111 11111111 11111111 11111101
			//然后再按位取反+1  00000011 =>3 => 保留符号，所以是-3
			console.log(-34>>>4);//无符号右移，先按位取反+1 11011110
			//然后再右移4位(但是！！！此时是高位补0) 00001111 11111111 11111111 11111101 这就是结果了
			
			console.log(3<<3);//左移3位， 00000011 => 00011000 => 24
```
* [参考](https://blog.csdn.net/u010267996/article/details/79198279)

## 多个等号如var a=b=c=4;还有形参
```
			// 1. 存在多个等号时,赋值表达式是从右向左执行的
			
			console.log(a);
			// console.log(b);//此时使用b报错，defined，因为没有声明b 
			var a=b=3;
			console.log(a);//3
			console.log(b);//3
			// 使用var a=b=3;结果a=3,b=3;说明存在多个等号时，是从右向左执行的！
			// 执行顺序，var a;console.log(a);b=3;a=b;
			
			var c=d=e=6;
			console.log(c,d,e);//6,6,6
			
			// 2. 函数形参形式为(a=b,b)，但是没有传递b时
			function foo(a=b,b){
				console.log(a,b);//此时只是打印形参
			}
			foo(1);//1,undefined,因为传递了形参a的值，所以a=1,但是没有传递b,所以是undefined 
			foo(1,2);//1,2  给所有形参都传递值时，即使存在默认值，也是用传递值
			
			function one(a,b=a){
				console.log(a,b)
			}
			one(1);//1,1 没有传递形参的话就使用默认值
			
			function two(a,b=a,c=b){
				console.log(a,b,c)
			}
			two();//undefined,undefined,undefined
			two(1);//1 1 1
			
			// 3.函数内部使用var a=b=7这种表达式，没有声明变量b,变量b此时是之前的全局变量
			function three(){
				console.log(a,b);//undeined(声明了还没赋值),3(内部无声明，使用了全局变量)
				// 虽然在全局变量中都存在a,b变量且为3，但是在该函数中声明了局部变量a 
				// b没有声明，所以默认是全局变量，因此在这里改变了全局变量b 
				var a=b=7;
				console.log(a,b);//7,7
			}
			three();
			console.log(a,b);//3,7 全局变量b被改变了
```

## 函数内部修改形参
```
			// 传递形参 1.传递基本数据类型:传入的是实际值，函数内部对该形参的修改不会影响到外部
			function one(a){
				console.log(a);//形参的值 9
				a=1111;
				console.log(a);//改变基本数据类型之后的值,1111
			}
			var a=9;
			one(a);
			console.log(a);//9,虽然变量被当做形参传递进函数中，并且在函数中被改变了
			// 但是该变量是基本数据类型，函数内部的改变不会影响到外部的该变量
			
			// 2.形参是引用数据类型:传入的是内存地址，函数内部对该形参的改变也会影响到外部的变量
			// 如果想函数内部的形参的改变不会影响到函数外部的变量，那么就进行深拷贝
			function two(b){
				console.log(b);//{name:'one'}
				b.name='two';
				console.log(b)//{name:two}
			}
			var b={name:'one'};
			two(b);
			console.log(b);//{name:two}
			
			// 深拷贝
			function deepClone(obj){
				var new_obj=obj instanceof Array?[]:{};
				for(var key in obj){
					var tem=key instanceof Object?deepClone(key):obj[key];
					new_obj[key]=tem;//赋值
				}
				return new_obj;
			}
			var d={name:'ddd'};
			two(deepClone(d));
			console.log(d);//{name:'ddd'};没有被改变，因为传递的是深拷贝之后的变量的内存地址
			
```

## 进制转换(parseInt,toString)
1. parseInt把xx进制转换为10进制，toString把10进制转换为xx进制
```
			// 1. toString把 十进制 的数据转换成指定进制的字符串，参数是进制
			var num=53;
			console.log(num.toString(16));//十进制转为16进制 35
			
			// 2.parseInt把xx进制的字符串解析为 十进制 数字
			console.log(parseInt(35,16));//把16进制转换为10进制 53
			
			// 3. 不声明数字，直接 数字.方法()会报错！！！
			var n=5
			console.log(n.toString(2));//十进制的5转为2进制 0101 
			// 3.1 直接数字.toString()会报错
			// console.log(5.toString(2));//Invalid or unexpected token
			// 3.2 因为直接解析为 (数字.)toString(),因为js解释器执行语句的时候，看到数字后带着点解析为字符串了
			console.log(Number(5).toString(2));//101
			// console.log(5.valueOf());//也是报错，一样的原因
			// 3.3 所以调用方法之前，最好是先声明变量，这样js解释器才不会解析错误
			
```

## 不声明变量，直接 数字.方法()会报错，如 5.toString()报错，因为js解释器解析错误，把圆点也包含在数字中！！，(5.)toString()
* `这是因为是数字.方法，如果是字符串则没错，因为字符串或者对象都是存在自己的界限了，js解释器不会解析错误`
*  如`console.log('ddd'.split(''));//[d,d,d]`
*  `console.log('ddd'.valueOf());//ddd`
*  `console.log(44.valueOf());//报错`

## 数字精度问题(xx.toFixed)
* 求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题
```
function multiply(a, b) {
    var na=a.toString().split('.');
	var nb=b.toString().split('.');
	na=na.length>1?na[1].split('').length:0
	nb=nb.length>1?nb[1].split('').length:0
    var n=Math.max(na,nb);
    return parseFloat(a*b).toFixed(n)
}
```
* `xx.toFixed(),注意不能是 "1.23".toFixed(),会报错，需要先用一个变量保存数据，然后变量.toFixed()`

## Number.MAX_VALUE/Number.MIN_VALUE
```
MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。
MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。
(注意，MIN_VALUE也是大于0的！！！)
```

## 达到一定范围就会出现精度错误(例如得到一个字符的重复字符串)
```
var res=0;
for(var i=0;i<99;i++){
	console.log(new Array(i+1).join('7'));//字符串则没错
	var str=new Array(i+1).join('7');
	// console.log(parseInt(str));//转为数字类型则会出现8！！！
	console.log(parseFloat(str));//float也是一样会出现8
}
```

## 负数的四舍五入
```
			// 负数的四舍五入
			console.log(Math.round(-3.2));//-3
			console.log(Math.round(-3.5));//-3
			console.log(Math.round(-3.6));//-4
			
			// 很奇怪的就是，负数的 -3.2 ,-3.5都是变为 -3，而3.6才开始变为-4
			
			console.log(Math.round(3.2));//3
			console.log(Math.round(3.5));//4
			console.log(Math.round(3.6));//4
```

## +号
```
	// 单目加法?(单目的时候,无论是普通数据类型还是引用数据类型都会直接转换为数值类型)
	console.log(+[]);//0,[]转换为数值类型
	console.log(+[,,]);//NaN,',,'转换为数值类型就是NaN
	console.log(+ new Array(017));//NaN,0开头的是八进制，相等于new Array(15),建立了一个15长度的空数组,[,,,,,]=>',,,,,,'不被识别，是NaN
	console.log(+[1,2]);//'1,2',转换为数值类型也是NaN,因为是字符串而且没有分离,，所以不被识别，是NaN
	console.log(+{});//NaN,'[object Object]'不被识别，转为Number类型是NaN
	
	// undefined,NaN使用加号都是NaN
	console.log(undefined++);// NaN
	console.log(+undefined);// NaN 
	console.log(+null);// 0 
```

## '9'<'10' 错误，因为字符串比较大小，比较的是第一个字符的编码！

## 即使有括号，x-- 也是先使用x的值，使用完毕再减
```
			var tem=4
			console.log(1+(tem--));//5
			console.log(tem);//3
```

## 求整数之和（多种方法）
```
写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
function Add(num1, num2)
{
    // 第一种方式，也使用了加号，但是在eval函数内
    // return eval(`num1+num2`)
    // 第二种方式，通过把数字转换为二进制，然后切割成数组，把数组遍历进行计算
    // 但是第二种方式遇到负数就抓瞎了。。
    var str1=num1.toString(2).split('');
    var str2=num2.toString(2).split('');
    var max;
    var strflag;
    // 补零
    if(str1.length>str2.length){
        var len=str1.length;
        var tem=str1.length-str2.length;
        for(var j=0;j<tem;j++){
            str2.unshift("0")
        }
    }else{
        var len=str2.length;
        var tem=str2.length-str1.length
        for(var j=0;j<tem;j++){
            str1.unshift("0")
        }
    }
    var mystr=[];
    var flag=false;
    // console.log(str1,str2)
    for(var i=len-1;i>=0;i--){
        // 为1进一位
        if(flag){
            if(str1[i]==1&&str2[i]==1){
                mystr.unshift(1)
                flag=true;
            }else if(str1[i]==1||str2[i]==1){
                mystr.unshift(0)
                flag=true;
            }else{
                mystr.unshift(1)
                flag=false;
            }
        }else{
            if(str1[i]==1&&str2[i]==1){
                mystr.unshift(0)
                flag=true;
            }else if(str1[i]==1||str2[i]==1){
                mystr.unshift(1)
                flag=false;
            }else{
                mystr.unshift(0)
                flag=false;
            }
        }
        // 判断最后一位
        if(flag&&i==0){
            mystr.unshift(1)
        }
    }
    // console.log(mystr)
    return parseInt(mystr.join(''),2)
}

// 第三种方式:使用异或，与进行判断每一位的数字
// 前提知识:
// 负数在计算机中以原码的补码形式存在
// 如-1表示为 1111110； -5(原码是 0000101)表示为11111010
console.log(-1&2);//2,必须两个都为1
console.log(-1^2);// -3
console.log((-1&2)<<1);//2左移一位为4

			function Add(num1,num2){
				while (num2!=0) {
					// -1^2 => -3; -7;-15,-31
					// 按位异或用于保留不需要进位的后面的数
					var temp = num1^num2;
					// -1&2 => 2, 2<<1 =>4 ;8;16;32
					// 按位与+左移一位就是为了在有两个1的时候可以进一位，也就是进位之后的2进制幂数
					num2 = (num1&num2)<<1;
					num1 = temp;
				}
				return num1;
			}
			console.log(Add(-1,2))
			// （5,4），第一次异或就是确定后三位是001，然后第一次与就是确定进一位，1000
			// 然后1000和1继续第二次异或，变成1001，然后第二次与就是0,0就可以退出了

// 第四种方式：通过++，--
function Add(num1, num2)
{
    // 第四种方式:判断数的正负，如果是正则++，如果是负则--，缺点在于时间复杂度太大了！
    if(Math.abs(num1)<Math.abs(num2)){
        var tem=num2;
        num2=num1;
        num1=tem;
    }
    // 对绝对值小的数进行循环 
    while(num2!=0){
        if(num2>0){
            num2--;
            num1++
        }else{
            // 如果num2是负数
            num2++;
            num1--;
        }
    }
    return num1
}
```