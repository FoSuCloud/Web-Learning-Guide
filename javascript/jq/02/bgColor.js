/* 
 注意:1. 这个是立即执行函数 
 2. 传入的对象是上一个script执行之后生成的window.jQuery,不能用jquery
 3. 也可以改为用$
 4. 添加方法的方式:$.fn.method=function(){};注意需要返回值
 */
(function($){
	$.fn.bgColor=function(mycolor){
		this.css('background',mycolor);
		return this;
	}
}(jQuery))