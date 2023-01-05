## 多进程
`NodeJS的JavaScript运行在单个进程的单个线程上，一个JavaScript执行进程只能利用一个CPU核心，而如今大多数CPU均为多核CPU，
为了充分利用CPU资源，Node提供了child_process和cluster模块来实现多进程以及进程管理。`
* `注意，javascript依旧是只能运行在单个进程的单个线程上的，但是可以利用child_process和cluster模块给node.js实现多进程`

## child_process
* `注意请切换到node v16`
* `child_process提供了一种衍生子进程的能力`
* `默认情况下，会在父 Node.js 进程和衍生的子进程之间建立 stdin、stdout 和 stderr 的管道。`

* `在Linux系统中，一切设备都看作文件。而每打开一个文件，就有一个代表该打开文件的文件描述符。程序启动时默认打开三个I/O设备文件：
  标准输入文件stdin，标准输出文件stdout，标准错误输出文件stderr，分别得到文件描述符 0, 1, 2。`
---
* 默认生成的stdin管道是特殊的管道。

## child_process.spawn
* `异步生成子进程，不会阻塞node事件循环`
* 参数
  command <string>要运行的命令。
  args <string[]>字符串参数列表。
  options <对象> （配置选项）
---
* 如果shell启用该选项，请不要将未经过滤的用户输入传递给此函数。任何包含 shell 元字符的输入都可用于触发任意命令执行。
* 第三个参数的默认值是：
```typescript
const defaults = {
  cwd: undefined,
  env: process.env
};
```
* 例子：开启子进程，监听进程的默认管道stdout,stderr 管道消息
```js
// todo 使用node16
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    // 打印结果就是 ls的执行结果
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```
* 两个子进程结合的例子
```js
const { spawn } = require('node:child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
    // console.log('ps输出：',data.toString())
    // todo 相当于 ps ax | grep ssh
    // ps进程输出结束 ，进入写grep进程
    grep.stdin.write(data);
    // todo 写入之后就执行 grep ssh 'tmp临时文件（ps ax输出的内容）'
    // 执行完了就被grep.stdout监听到
});

ps.stderr.on('data', (data) => {
    console.error(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
    if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
    }
    grep.stdin.end();
});
// 监听到 grep.stdin.write 写入的数据
grep.stdout.on('data', (data) => {
    console.log('grep.stdout:',data.toString());
});

grep.stderr.on('data', (data) => {
    console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});
```
* 错误的例子
```js
const { spawn } = require('node:child_process');
const subprocess = spawn('grep',['ax','a']);
const notfound = spawn('not found command');

notfound.on('error', (err) => {
    // 输出不存在的命令，就会被error监听到
    console.error('Failed to start subprocess.',err);
});
subprocess.stderr.on('data', (data) => {
    // 输入错误的命令(但是命令存在)就会进入stderr
    // subprocess stderr: grep: a: No such file or directory
    console.error(`subprocess stderr: ${data}`);
});
```
