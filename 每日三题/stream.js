const fs= require('fs')
// 1.png=> 2.png 使用fs的读写
// 如果读取全部图片再写进入，服务器内存都会被占满!
const rs= fs.createReadStream('./logo.png') // 读取流
const ws= fs.createWriteStream('./02.png') // 写入流
// 直接把图片logo转换到02.png中
rs.pipe(ws) // 创建管道
// 相当于创建了一个管道，通过管道rs的水流到了ws中
