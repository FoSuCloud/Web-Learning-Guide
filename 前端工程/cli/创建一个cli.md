## 创建指令
* mkdir xx-cli  创建一个文件夹
* cd xx-cli 进入文件目录
* npm init 初始化项目
* npm i 安装，创建package-lock.json
* 创建bin目录，创建kkb.js
* `注意： #!/usr/bin/env node  指定解释器类型为node（一定要在首行）`
* `注意，在window环境，命令是 #! node`
```js
#!/usr/bin/env node

// #!/usr/bin/env node  指定解释器类型为node

// sudo npm link 把指令链接到全局
console.log('kkb cli ...')
```
* 在package.json添加bin
```json
{
  "name": "vue-router-auto-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "kkb": "./bin/kkb.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
* `然后创建链接 sudo npm link`
* `然后直接输入kkb 就可以看到打印`

---
* `然后我们在控制台输入 cd /usr/bin/env`
* `输入ls就可以看到已经kkb命令了！`
