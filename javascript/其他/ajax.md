## 例子:
```javascript
function ajax(method,url,data,asy){
				var method=method||'get';
				var asy=asy||true;
				return new Promise((resolve,reject)=>{
					var xhr=new XMLHttpRequest()
					
					xhr.open(method,url,asy);
					// 需要注意的是，一般是只在method为post的时候,send(data)才有效，否则参数都携带在url中
					// xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
					xhr.send(data)
					xhr.onreadystatechange=function(){
						if(xhr.readyState==4){
							if(xhr.status==200||xhr.status==304){
								resolve(xhr.responseText)
							}
						}
					}
					xhr.onerror=function(error){
						reject(error)
					}
				})
			}
			ajax('get','http://localhost/ssm_system/get?id=1',"age=1").then(res=>{
				console.log(res)
			},reg=>{
				console.log("失败")
			})
```

## 获取响应请求头字段
* getResponseHeader获取指定的响应头字段
* getAllResponseHeader获取`所有合法的响应头字段`
```javascript
function ajax(options){
        const xhr=new XMLHttpRequest()
        xhr.open(options.method,options.url)
        xhr.send(options.data)

        return new Promise((resolve,reject)=>{
            xhr.onload=()=>{
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 || xhr<=304){
                        console.log(xhr.getResponseHeader('content-type')) // text/html; charset=utf-8
                        console.log(xhr.getAllResponseHeaders())
                        /**
                         * content-length: 11
                         content-type: text/html; charset=utf-8
                         * */
                        resolve(xhr.responseText)
                    }
                }
            }
            xhr.onerror=(err)=>{
                reject(err)
            }
        })
    }
    ajax({url:'http://localhost:3000/',method:'get',data:'name=3&age=11'}).then((res)=>{
        console.log(res)
    })
```

* ajax请求有同步和异步的区别
* 区别在于open方法，`第三个参数为true或者不填表示异步，为false表示同步`    
