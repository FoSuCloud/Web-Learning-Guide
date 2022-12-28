## child_processs

#### spawn
* child_processs.spawn用于生成一个新的进程
* 参数为：
1) command: 要运行的命令 （如java python）
2) args: 字符串参数列表 (string[])
3) options: 选项(object)：
cwd: 子进程的工作目录
env: 环境变量
...
* 例子：
```js
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']); // 相当于执行了ls -lh /usr

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```
