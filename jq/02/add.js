(function($){
	$.add=function(...args){
		let arr=[...args];
		return arr.reduce((a,b)=> a+b);
	}
}(jQuery))