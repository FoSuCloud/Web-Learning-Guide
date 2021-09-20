const fs=require('fs')
const http=require('http')
const serve = http.createServer((request,response)=>{
    let {url,method,headers} = request
    if(url === '/' && method.toUpperCase() === 'GET'){
        fs.readFile('index.html',(err,data)=>{
            if(err){
                response.writeHead(500,{
                    'Content-Type':'text/plain;charset=utf8'
                })
                response.end('500 错误啦')
                return;
            }
            response.setHeader('Content-Type','text/html;charset=utf8')
            response.end(data)
        })
    }else if(url === '/users' && method.toUpperCase() === 'GET'){
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify({name:33}))
    }else if(method.toUpperCase() === 'GET' && headers.accept.indexOf('image/*')!==-1){
        // fs.readFile('./logo.png',(e,data)=>{
        //     if(e){
        //         return;
        //     }
        //     response.end(data)
        // })
        fs.createReadStream('.'+url).pipe(response)
    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type','text/plain;charset=utf8')
        response.end('404 找不到')
    }
})

serve.listen(3000,()=>{
    console.log('start listen in 3000')
})
