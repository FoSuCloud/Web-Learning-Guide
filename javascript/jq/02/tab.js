(function($){
	$.tabs=function(options){
		if(options.data.length!=options.th.length){
			throw new Error('数据长度错误~')
		}
		var th='';
		for(var i=0;i<options.th.length;i++){
			th+='<ul>'+'<span class="spanact">'+options.th[i]+'</span>'+'\n'+'<li>'
			for(var j=0;j<options.data[i].length;j++){
				th+='<p>'+options.data[i][j]+'</p>'
			}
			th+='</li>\n'+'</ul>\n'
		}
		// 相当于js的innerHTML
		$(options.name).html(th);
		// 设置元素样式
		$(options.name).css({
			'width':options.width,
			'font-size':0,
			'text-align':'center'
		})
		$(`${options.name} ul`).css({
			'position':'relative',
			'display':'inline-block',
			'list-style-type':'none',
			'width':(parseInt(options.width)/options.th.length)+'px',
			'margin':'0',
			'font-size':0,
			'padding':0,
		})
		$(`${options.name} .spanact`).css({
			'font-size':'16px',
			'width':'100%',
			'display':'block',
			'backgroundColor':'rgba(200,100,100,.6)',
		});
		$(`${options.name} li`).css({
			'list-style-type':'none',
			'display':'none',
			'width':'100%',
			'margin':'0',
			'padding':'0',
			'position':'absolute',
			'left':'0',
			'backgroundColor':'rgba(33,44,55,.4)'
		});
		
		$(`${options.name} p`).css({
			'font-size':'16px',
			'display':'block'
		});
		
		$(`${options.name} ul`).mouseenter(function(){
			this.index=$(this).index()+1;
			$(`${options.name} ul:nth-child(${this.index}) li`).addClass('active')
			$(`${options.name} ul:nth-child(${this.index})`).siblings().children('li').removeClass('active');
			$(`${options.name} li.active`).css('display','block');
		})
		
		$(`${options.name} ul`).mouseleave(function(){
			this.index=$(this).index()+1;
			$(`${options.name} ul:nth-child(${this.index}) li`).removeClass('active');
			$(`${options.name} li`).css('display','none');
		})
	}
}($))