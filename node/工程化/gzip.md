## 什么是gzip
* 首先来看一个例子，没有开启gzip的时候，文件大小是多少？
* 首先生成一个大文件,代码文件是createFile.js
```js
const fs= require('fs')

const writeStream = fs.createWriteStream(__dirname+'/static/big-file.txt','utf8')
for(let i=0;i<1e6;i++){
    writeStream.write(i+'一个大文件\n','utf8')
}
writeStream.end()
```
* `第一步，执行node createFile.js`
* `执行完之后，可以看到文件大小是21.9MB`
*  `然后创建一个node服务`
```js
const fs = require("fs");
const http = require("http");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Origin":'http://localhost:63342'
    });
    const buffer = await readFile(__dirname + "/static/big-file.txt");
    res.write(buffer);
    res.end();
});

server.listen(3000, () => {
    console.log("app starting at port 3000");
});
```
* `最后创建一个前端,运行在63342端口`
```js
fetch("http://localhost:3000/", {
        credentials: "include"
      }).then((res) => {
        res.text().then((response) => {
          console.log(response);
        });
      });
```
*  `然后我们可以看到，打印出来的文件大小还是21.9MB!没有压缩`

## 数据压缩
* 当使用http进行大文件传输的时候，一般都会选择把大文件进行数据压缩传输。
* 要实现一个数据压缩，其实很简单，因为浏览器默认的请求头就支持，所以只需要后端配置对应响应头和压缩就可以了！
```js
const fs = require("fs");
const http = require("http");
const util = require("util");
const zlib = require("zlib");
const readFile = util.promisify(fs.readFile);
const gzip = util.promisify(zlib.gzip);

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Origin":'http://localhost:63342',
        "Content-Encoding":"gzip"
    });
    const buffer = await readFile(__dirname + "/static/big-file.txt");
    const gzipData = await gzip(buffer);
    res.write(gzipData);
    res.end();
});

server.listen(3000, () => {
    console.log("app starting at port 3000");
});
```
* `注意，如果后端不配置"Content-Encoding":"gzip"，那么浏览器获取到的数据会是乱码！`
* `前端代码不需进行修改，我们就可以在network看到获取到的数据大小是2.9MB,但是我们通过fecth请求获取到的数据还是20.9MB大小`

## 文件传输对应的字段
* 虽然我们直接通过后端配置Content-Encoding就可以告诉浏览器采用的数据压缩方式
* 但是我们还可以通过以下字段实现更加细致的控制。
1. accept: `表示客户端告诉服务器端，客户端可以处理的内容类型，这种类型用MIME类型表示`
* `另外Content-Type是表示服务器告诉客户端最终选择处理的内容类型`

2.Accept-Encoding:
* ("Accept-Encoding介绍")[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding]
* `我们可以使用Accept-Encoding将客户端能够理解的内容编码方式告诉服务器端`
* 然后通过内容协商的方式，`服务器端会在返回的资源的响应头上加上一个Content-Encoding字段，表示内容编码方式`
* 内容编码方式分为以下几种
1）gzip:表示采用 Lempel-Ziv coding (LZ77) 压缩算法，以及32位CRC校验的编码方式。`通常对文本有较好的压缩效率`
2) compress:采用 Lempel-Ziv-Welch (LZW) 压缩算法。
3) deflate:采用 zlib 结构和 deflate 压缩算法。
4) br:表示采用 Brotli 算法的编码方式。
5) identity:用于指代自身（例如：未经过压缩和修改）。除非特别指明，这个标记始终可以被接受。
6) *: 匹配其他任意未在该请求头字段中列出的编码方式。假如该请求头字段不存在的话，这个值是默认值。它并不代表任意算法都支持，而仅仅表示算法之间无优先次序。
7) `;q=:用于在一个压缩方式后面加上，表示该压缩方式的权重`
* 例子： `Accept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1`
