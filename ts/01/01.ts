console.log("hello world");
/* 
 注意,直接输入tsc 01.ts是不会执行的，因为浏览器智能识别js文件
 所以执行tsc 01.ts实际上是在文件目录下新增了一个同名的js文件
 也就是执行了ts 转换为 js的过程
 */

/* 转换的时候会把es6的一些语法转换为js的es5语法 */
var a="设置类型"
var b=1000
let c:string="转换为var"
/* 注意，需要自动编译ts文件需要先安装插件，然后配置自动编译
 也就是右键外部命令=>插件=>typescript=>onDidSaveExecution改为true*/