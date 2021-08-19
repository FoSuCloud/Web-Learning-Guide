## iframe标签
1. iframe默认会有白色边框，可以使用`frameborder,为0表示无边框，为1是默认状态，白色边框`
2. 也可以通过设置iframe的border属性设置边框样式
3. `scrolling属性设置滚动，yes表示显示滚动条，auto表示根据高度决定，no表示不显示滚动条，而且多出来的部分不可以滚动`
4. `iframe标签没有target属性！`
5. iframe的优点:
```
1. iframe能够把镶嵌进去的网页完全张实出来
2. 如果有多个网页引入该iframe,那么只需要修改iframe的内容就可以，不需要修改每一个页面
3. 如果有加载缓慢的第三方内容如广告等可以用iframe来展现
```
6. iframe的缺点
```
1. 会产生很多页面，不容易管理
2. iframe的内容无法被搜索引擎找到，SEO不好
3. 移动设备无法完全显示iframe,兼容性差
4. iframe会增加服务器的http请求。
5. iframe会阻塞页面的onload事件(因为window.onload事件要等到页面所有资源加载完成才会执行)
```
7. `所以现在很多都是用ajax请求来代替iframe`

## iframe的使用场景
1. 用于上传图片，上传图片的时候不需要刷新
2. 用于加载其他网站的内容，例如广告
3. 在需要跨域的时候也可以用iframe来访问其他域名下的资源
4. 经典结构`左边功能树，右边是使用iframe的表单`

## 功能
1. 通过 IFrame，网页可以嵌入其他网页内容，并可以动态更改
2. 在相同域名下，内嵌的 IFrame 可以获取外层网页的对象
3. 在相同域名下，外层网页脚本可以获取 IFrame 网页内的对象
4. 可以通过脚本调整 IFrame 的大小

## iframe标签学习
* [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe]("参考")
* 内联的框架，`就像iframe一样会被包含在window.frames伪数组对象中`
```javascript
<body>
    <iframe src="./iframe.html" frameborder="0"></iframe>
    <iframe src="./iframe1.html" frameborder="0"></iframe>
    <script>
    for(let i in Array.from(window.frames)){
        console.log(window.frames[i]) // 两个window对象
    }
    </script>
</body>
```
* 注意是伪数组，也是对象！
* `另外我们通过contentWindow也可以获取到iframe对象的window对象`
```javascript
    <iframe src="./iframe.html" frameborder="0"></iframe>
    <iframe src="./iframe1.html" frameborder="0"></iframe>
    <script>
        let arr=[]
    for(let i in Array.from(window.frames)){
        arr.push(window.frames[i])
    }
    let iframes=document.getElementsByTagName('iframe');
    Array.from(iframes).forEach((cell,i)=>{
        console.log(cell.contentWindow === arr[i])//true,true
    })
    </script>
```

* `window.parent用于返回当前窗口的父窗口对象，如果没有父窗口，那么就返回自身窗口`
```javascript
// iframe.html
<script>
    console.log('parent',window.parent);// 打印得到index.html的窗口对象
</script>
// index.html
<iframe src="./iframe.html" frameborder="0"></iframe>
<script>
    console.log(window.parent); // 由于不存在父窗口，所以得到的是自身窗口对象
</script>
```

## iframe不跨域通信
* `注意：要确保iframe加载完成了再进行操作，使用iframe.onload来判断`
* [参考]("https://zhuanlan.zhihu.com/p/50193200")


## iframe跨域实例
* `注意：要确保iframe加载完成了再进行操作，使用iframe.onload来判断`
* iframe跨域一般用在创建一个iframe元素，或者改变元素的src属性
```javascript
// node.js 返回一个静态文件，文件路径为root/static/index.html
http.createServer((req,res)=>{
    if(req.url === '/html'){
        fs.readFile('static/index.html',(err,data)=>{
            if(data){
                res.write(data)
            }
        })
    }
})
```
* 然后前端创建一个iframe就可以获取对应的数据
```javascript
<iframe src="http://localhost:3000/html" frameborder="0"></iframe>
<div>客户端</div>
```

#### iframe可以让父页面重定向
* iframe可以通过window.parent.location去改变父页面的地址，实现重定向
```javascript
// index.html
<iframe src="./iframe.html" frameborder="0"></iframe>
// iframe.html
<script>
    window.parent.location='https://blog.csdn.net/kiddingstreet/article/details/80112303'
</script>
```
* 结果就是父页面初始化结束重定向到新页面

### contentDocument获取iframe元素的document对象

## iframe跨域通信
```html
<!--// index.html,运行在本地的端口63342-->
<!DOCTYPE html>
<html lang="en">
    <meta charset="utf8" />
    <head>
        <title>测试</title>
    </head>
    <body>
        <iframe src="http://localhost:3001/" frameborder="0" id="iframe"></iframe>
        <script>
            const iFrame = document.getElementById("iframe");
            let start = true;
            iFrame.onload = function () {
            if (start) {
            iFrame.contentWindow.postMessage(
        { id: window.location.search, name: "dsadasads" },
            "http://localhost:3001"
            );
            start = false;
        }
        };
            window.addEventListener("message", (e) => {
            if (e.origin === "http://localhost:3001") {
            console.log(e.data);
        }
        });
        </script>
    </body>
</html>
```
* 然后iframe页面是前端vue项目生成
```javascript
// 运行在30001端口
window.addEventListener("message",e=>{
      if(e.origin==="http://localhost:63342"){
        console.log(e.origin); //父页面URL，这里是http://a.index.com
        console.log(e.data);  //父页面发送的消息
        window.parent.postMessage({status:401,msg:"ssss"},"http://localhost:63342");
      }
    });
```

## iframe同域通信
* 获取cookie
* 通信
* 获取location


## iframe内部路由

## iframe内部跳转到别的url
* 首先我们在3000端口运行index.html前端项目
```html
<div class="content">
  <div class="header">Header</div>
  <iframe src="http://localhost:3001/#/experiment/" frameborder="0" id="iframe">
  </iframe>
</div>
```
* 然后iframe项目运行在3001端口
```html
window.location.href = url;
```
* `在iframe页面，点击一个按钮，跳转到另一个程序`
* 首先跳转的url是:`http://localhost:3001/#/other/a`
* `可以发现结果iframe所在页面被替换为项目a的页面`
* `这是因为nginx做了代理，根据url启动了项目a,发送给浏览器！`
