## 例子
* [参考]("https://github.com/xeioex/njs-examples")

## 文件存储
* `效率是否太低？需要先读取文件，然后再全局查找对应的字符串`
```typescript
var fs = require('fs');
var STORAGE = "/tmp/njs_storage"

function push(r) {
        fs.appendFileSync(STORAGE, r.requestBody);
        r.return(200);
}

function flush(r) {
        fs.writeFileSync(STORAGE, "");
        r.return(200);
}

function read(r) {
        var data = "";
        try {
            data = fs.readFileSync(STORAGE);
        } catch (e) {
        }

        r.return(200, data);
}

export default {push, flush, read}
```

## jwt
* [参考]("https://github.com/lombax85/nginx-jwt/blob/master/config/module.js")

## 导出
```js
export default {jwt_payload_sub}
```

## 打印日志
* 第一个参数表示打印级别
* 第二个参数才是打印内容
```typescript
ngx.log(ngx.ERR,err)
```

## njs学习
* [参考]("https://github.com/sah4ez/nginx-rpc-gateway")
