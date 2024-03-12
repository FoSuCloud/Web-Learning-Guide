```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>loading动画</title>

    <!--loading style-->
    <style>
        .loading{
            width: 100px;
            height: 100px;
            /*border: 1px solid red;*/
            position: relative;
        }
        .loading::before,.loading::after{
            content: '';
            /*这里要加一个content,不然什么都没有*/
            position: absolute;
            width: 0;
            height: 0;
            background: #000;
            border-radius: 50%;

            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            animation: toBig 1s linear infinite;
        }
        .loading::after{
            animation-delay: 0.5s;
            /*background-color: red;*/
        }
        @keyframes toBig {
            0%{
                width: 0;
                height: 0;
                opacity: 1;
            }
            100%{
                width: 50px;
                height:50px;
                opacity: 0;
            }
        }
    </style>
    <style>
        .site-welcome{
            display: none;
            justify-content:center;
            align-items:center;
            
            /*里面内容居中使用flex在父元素添加三行代码display:flex;justify-content:center;
            align-items:center;*/
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /*上面四行代码,让这个fixed铺满整个画面*/
            background-color: #ccc;
            z-index: 1;
        }
        .site-welcome.active{
            display:flex;
        }
    </style>
</head>

<body>
    <div class="site-welcome active" id="siteWelcome">
        <div class="loading">

        </div>
    </div>
    
    <script>
       //当代码加载到这里的时候,执行这个script,当代码加载到这里,说明loading该结束了
        window.onload=function(){
            var siteWelcome = document.getElementById('siteWelcome');
            siteWelcome.classList.remove('active');
        }
    </script>
</body>
</html>
```
