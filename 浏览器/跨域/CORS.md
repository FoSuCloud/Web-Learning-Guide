## CORS
* cors是一个w3c标准，全称是`跨域资源共享(Cross-origin-resource-sharing)`
* `允许浏览器向跨域的服务器发起XMLHttpRequest请求，克服了ajax只能发起同源请求的限制`

## CORS条件
* `需要浏览器和服务器都支持！目前主流浏览器都支持,ie需要11版本`
[https://caniuse.com/?search=cors]("参考")
---
* `对于前端来说，cors通信和ajax请求看起来没区别，使用起来没区别，但是要注意有些浏览器不支持该标准`
* `cors标准的实现是由浏览器来实现的，只要浏览器发现我们发出去的ajax请求跨域了，那么就会自动添加一些头信息(如origin)`，有时还有多出一次附加请求
* 但是对于开发者来说是无感的。
---
* 所以实现`cors的关键是服务器端`，只要服务器端配置的接口支持cors，允许我们的网址发起请求就可以了！
* 不对。跨域是可以正常发起请求的，服务器端能够收到请求并且正确返回结果，只是被浏览器拦截了
* 跨域是一个前端概念，浏览器才会存在跨域说法

## 两种请求
* cors将请求简单分为两种
1. 简单请求
   * 简单请求需要同时满足以下两个条件
    * 1.`请求方法是:get/head/post`
    * 2. `只有以下几个请求头字段:Accept,Accept-Language,Content-Language...`
    * `请求字段Content-Type只能是以下三个值之一:application/x-www-form-urlencoded,multitpart/form-data,text/plain`
    `据说这是为了兼容表单元素，表单元素一直可以跨域提交，所以cors要兼容表单提交`
2. 非简单请求
* `只要不满足以上两个条件其中一个，那么就是非简单请求`

## 简单请求的请求过程
1. 对于简单请求，`浏览器直接发出cors请求，实现上就是给请求头添加一个origin字段`
```javascript
// vue，前端项目运行在http://localhost:8080/
this.$axios.get("http://localhost:3000/a").then(
    function (response){
        console.log(response.data);
    }
);
// node,设置Access-Control-Allow-Origin允许http://localhost:8080/跨域
let arr=['http://localhost:63342','http://localhost:8080']
if(arr.includes(req.headers.origin)){
    res.setHeader('Access-Control-Allow-Origin',req.headers.origin)
}
// 然后我们在前端控制台的network可以看到请求头字段
/* Accept: application/json, text/plain,
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
Connection: keep-alive
Host: localhost:3000
Origin: http://localhost:8080
Referer: http://localhost:8080/
sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"
sec-ch-ua-mobile: ?0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36
*/
```
* 浏览器自动给请求头添加一个origin字段`origin字段用来说明请求来源的域名+协议+端口，浏览器根据origin字段来决定是否允许本网址跨域`
---
* 如果服务器端允许本次请求跨域，那么会给响应头添加几个字段：`Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Content-Type`
```javascript
// 例如
/**
 Access-Control-Allow-Methods: PUT,GET
 Access-Control-Allow-Origin: http://localhost:8080
 Connection: keep-alive
 Content-Length: 11
 Content-Type: text/html; charset=utf-8
 Date: Tue, 27 Jul 2021 15:13:38 GMT
 set-cookie: a="aaa";expires="Sun Jul 18 2032 10:31:45";domain=app.localhost
 * */
```
* `如果服务器端不允许本次请求跨域，那么前端接收到的请求会报错`
`Access to XMLHttpRequest at 'http://localhost:3000/a' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
---

2. 跨域请求不携带cookie?
* 在cors请求中，浏览器默认`不发送cookie和http认证信息`
* 解决办法：`前端设置withCredentials:true(表示在跨域请求中也要发送cookie到服务器);在axios中，也就是`
  `service.defaults.withCredentials = true;//允许跨域携带cookie信息,(service指的是axios.create()创建的实例)`
* `后端设置Access-Control-Allow-Credentials:true表示服务器明确许可cookie可以携带在跨域请求中发给服务器`
---
* `前端配置了service.defaults.withCredentials:true，但是后端没有设置Access-Control-Allow-Credentials:true`
* 此时前端的cors请求提示错误，控制台提示:
```javascript
/*
Access to XMLHttpRequest at 'http://localhost:3000/abc' from origin 'http://localhost:8080' has been blocked by CORS policy:
 The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true'
  when the request's credentials mode is 'include'. The credentials mode of requests initiated by the
   XMLHttpRequest is controlled by the withCredentials attribute.
* */
```
---
* `后端设置的Access-Control-Allow-Origin为'*',或者不包括当前网址的域名，那么也是不行`
```javascript
// node设置
res.setHeader('Access-Control-Allow-Origin','*') 
/*
Access to XMLHttpRequest at 'http://localhost:3000/a' from origin 'http://localhost:8080' has been blocked 
by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated 
by the XMLHttpRequest is controlled by the withCredentials attribute.
* */
```
* 浏览器想要发送cookie等认证信息给服务器，那么服务器的Access-Control-Allow-Origin必须不为'*'

3. 获取不到想要的响应头字段？
* 这是因为cors跨域请求时，XMLHttpRequest请求只能拿到以下几个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma
* 解决办法：`后端设置Access-Control-Expose-Headers:'xxx'（对应的字段）`
* 例子可以看ajax.md

## 非简单请求
* `非简单请求是对服务器有特殊要求的请求，例如请求方法是PUT/DELETE,或者Content-Type的值是:application/json`
* `非简单请求和简单请求最大的区别就是非简单请求会在正式通信之前，先发起一次预检请求(Option)`
---
* `预检请求的作用：`
* 浏览器会先去询问服务器，当前网页所在的域名是否是在服务器的许可名单中，(也就是Access-Control-Allow-Origin)
* 并且可以使用哪些HTTP请求方式和请求头字段。`只有得到服务器的确认可以的答复，浏览器才会发出正式的XMLHttpRequest请求,否则就报错`
* `预检请求的请求方法是Options,表示用来询问，询问服务器是否可以接受这个跨域cors请求`
```javascript
// 前端发送一个PUT请求(不是get,post,head这三种)，所以是非简单请求，所以会先发出一个"预检"请求
this.$axios.put("http://localhost:3000/a",{
    params:{
        name:"123",
        age:11
    }
})
// node请求
res.setHeader('Access-Control-Allow-Methods','PUT,GET')

// put请求 请求头字段
/**
 Accept: *
 Accept-Encoding: gzip, deflate, br
 Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
 Access-Control-Request-Method: PUT
 Connection: keep-alive
 Host: localhost:3000
 Origin: http://localhost:8080
 Referer: http://localhost:8080/
 Sec-Fetch-Dest: empty
 Sec-Fetch-Mode: cors
 Sec-Fetch-Site: same-site
 User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36
 * */

// options请求 请求头字段
/**
 Accept: *
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
Access-Control-Request-Method: PUT
Connection: keep-alive
Host: localhost:3000
Origin: http://localhost:8080
    Referer: http://localhost:8080/
        Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36
 **/
```
* `Options预检请求的请求头字段有两个特别的：Access-Control-Request-Method,Access-Control-Request-Headers`
* Access-Control-Request-Method:`该请求在非简单请求中是必须的，由于说明该cors请求要使用到的请求方式，例如PUT/DELETE`
* Access-Control-Request-Headers:`表示本次cors请求额外需要发送的请求头字段(非必填)`
---
* Access-Control-Request-Headers在我们设置了额外的请求头字段的时候会自动带上
```javascript
// vue
this.$axios.put("http://localhost:3000/a",{},{
    headers:{
        "a":1
    }
})
// options请求
/*
Accept: *
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
Access-Control-Request-Headers: a,content-type
* */
// 通过Access-Control-Request-Headers设置我们额外发送的请求头字段，例如a
// put请求
/*
Provisional headers are shown
a: 1
Accept: application/json, text/plain, *
Content-Type: application/json;charset=UTF-8
Referer: http://localhost:8080/
    sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"
sec-ch-ua-mobile: ?0
* */
// 可以看到的确发送了a字段
```
* 但是这个时候我们的请求就错误了，因为后端不允许接收这个字段
* 解决办法是在后端配置:
```javascript
// node
res.setHeader('Access-Control-Allow-Headers','a,content-type')
// 然后我门就可以在put请求的响应头获取到字段
/**
 Access-Control-Allow-Credentials: true
 Access-Control-Allow-Headers: a,content-type
 Access-Control-Allow-Methods: PUT,GET
 Access-Control-Allow-Origin: http://localhost:8080
 Access-Control-Expose-Headers: Date,Connection
 * */
```

#### 预检Options请求的响应
* 服务器收到预检请求后，会先去检查`浏览器返回的Origin,Access-Control-Request-Method,Access-Control-Request-Headers字段`
* `判断是否允许本次跨域请求`
* 如果服务器认为本次跨域请求不合法(也就是前端发过来的Origin,Access-Control-Allow-Method,Access-Control-Request-Headers字段校验错误)，那么会在浏览器端触发一个跨域错误
---
* 服务器会返回以下几个和cors相关的字段
1. Access-Control-Allow-Methods:`这个字段是必须的，表示服务器支持的所有请求方法(为什么是所有？为了避免多次发送预检请求，不只是为了本次的cors请求)`
2. Access-Control-Allow-Headers：如果前端设置了Access-Control-Request-Headers，那么服务器就必须返回这个字段，表示服务器支持的额外的请求头字段
3. Access-Control-Allow-Credentials: 是否允许之后的CORS请求携带cookie
4. Access-Control-Max-Age:用来设置本次预检请求的有效期，单位是秒(`如果cors请求的条件一致就不需要再发送一次预检请求了`)
```javascript
// 前端点击一个按钮，每隔零点几秒发送一次请求
this.$axios.put("http://localhost:3000/a",{},{
    headers:{
        "a":1
    }
});
// 后端设置Access-Control-max-Age:10,那就10秒后的请求才会发出新的预检请求
res.setHeader('Access-Control-Max-Age','10')
```
* `那么一个预检请求能不能给别的请求使用？不行，别的请求也有可能要额外发送预检请求(分什么情况？)`
```javascript
this.$axios.put("http://localhost:3000/a"+Math.random(),{},{
        headers:{
          "a":1
        }
      });
// 可以看到即使后端设置Access-Control-Max-Age:10，但是还是会每次请求都有新的预检请求发出去

// 但是如果发送的请求是另外的名字又可以
this.$axios.post("http://localhost:3000/ab").then(
    function (response){
        console.log(response.data);
    }
);
// 这个时候，发现预检请求没有发送，相当于使用了之前的预检请求
// 这也说明了Access-Control-Allow-Methods的必须性，否则每个请求都要再发送一次预检请求，那么就很麻烦了！
```







