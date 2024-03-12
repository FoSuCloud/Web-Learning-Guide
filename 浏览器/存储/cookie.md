## cookie和session的区别
## token是用来解决session的不足的

## cookie的保存
* `当cookie中包含有等号、空格、分号等特殊字符时，可能会导致数据丢失、或者不能解析的错误，
  一个较好的解决办法就是：在将cookie值写入客户端浏览器之前，首先进行URLEncode编码，读取cookie时，进行URLDecode即可。`
* `注意！！！cookie的存储默认就是每个键值之间间隔一个空格！`
* `通过document.cookie.split(';')验证！`

## cookie的注意点
1. `cookie如果设置了时间，那么到期了就会自动删除！所以发给后端的cookie都是有效期限内的`
2. `发给后端的cookie是没有携带expires,domain等信息的！`
3. `后端的set-cookie字段也是具有expires,domain,path,secure,httpOnly等字段的`
4. `删除cookie很简单，只需要设置expires为-1，过期就好了！`
5. cookie是区分域，不区分端口的，所以同一个主机，不同端口的两个服务，如果存在同名的cookie那么就会导致冲突

## cookie的封装
* `关于封装，还需要注意编码和默认值`，[参考]("https://github.com/js-cookie/js-cookie")
```js
function set(key, value, params) {
        if (!key || !value) {
          return;
        }
        let str = decodeURIComponent(key) + "=" + value;
        if (params) {
          // expires: 秒数
          if (params.expires) {
            if (typeof params.expires === "number") {
              // 注意：Date.now()获取到的是毫秒数
              params.expires = new Date(Date.now() + params.expires * 1000);
            }
            // toUTCString把当前时间转换为世界时，例如北京时间转换为世界时
            // Header头部字段Date的值指示的是GMT格林乔治标准时间
            // todo 其实不转换为UTC也可以，可以在chrome浏览器看到会把GMT时间转换为标准世界时再存储！
            // 但是安全起见还是要转换
            params.expires = params.expires.toUTCString();
          }
          for (let pKey in params) {
            str += ";" + pKey + "=" + params[pKey];
          }
        }
        document.cookie = str;
      }
      function get(key) {
        if (typeof document === "undefined" || !arguments.length || !key) {
          return;
        }
        // 间隔一个空格是因为document.cookie的键值之间默认就是间隔一个空格
        let cookies = document.cookie ? document.cookie.split("; ") : [];
        let result = "";
        for (let i = 0; i < cookies.length; i++) {
          let arr = cookies[i].split("=");
          let foundKey = decode(arr[0]);
          if (foundKey === key) {
            // 可能value是  a=bdsd=32323= 这种有多个=符号的形式
            let value = arr.slice(1).join("=");
            result = decode(value);
            break;
          }
        }
        return result;
      }

      function remove(key, value, params) {
        set(key, value, Object.assign(params, { expires: -1 }));
      }

      function decode(str) {
        return decodeURIComponent(str);
      }

      set("a", 4444);
      console.log(get("a"));
      // cookie如果设置了时间，那么到期了就会自动删除！
      set("a%20b", "42343432", { expires: 5,  path: "/" });
      console.log(get("a b"));
      set("c", "44=55=dsd-*%20$#32&/ds=", { path: "/" });
      // 对%20进行解码
      console.log(get("c")); // 44=55=dsd-* $#32&/ds=
      setTimeout(() => {
        fetch("http://localhost:3000", {
          credentials: "include",
        });
      }, 10000);

// 删除
console.log('start',document.cookie) // start a=4444; c=44=55=dsd-*%20$#32&/ds=; a b=42343432
remove("a%20b", "42343432", { expires: 5, path: "/" })
console.log('end',document.cookie) // end a=4444; c=44=55=dsd-*%20$#32&/ds=
```
