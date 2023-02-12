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

#### signal
* `注意spawn是异步的，所以同步代码会先执行;`
* signal <AbortSignal>允许使用 AbortSignal 中止子进程。
* 如果signal启用该选项，调用.abort()相应 AbortController的类似于调用.kill()子进程，除了传递给回调的错误将是AbortError
```js
// spawn  的option参数有一个signal
// signal <AbortSignal>允许使用 AbortSignal 中止子进程。
const { spawn } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
    console.log('err:',err) // AbortError: The operation was aborted
    // This will be called with err being an AbortError if the controller aborts
});
controller.abort(); // Stops the child process
// 另一个
const controller1 = new AbortController();
// 由于spawn是异步的，所以先执行controller1.abort()，spawn子进程还未执行ps ax
const ps = spawn('ps',['ax'],{signal:controller1.signal})
ps.on('error',(err)=>{
    console.log('ps err:',err) // AbortError: The operation was aborted
})
controller1.abort(); // Stops the child process
```

#### detached
* 在windows系统上，设置options.detached为true可以让子进程在父进程退出后继续运行。
* 如果设置detached为true，那么子进程将会有自己的控制台窗口，一旦被子进程启用，这个控制台窗口就不能被禁用
---
* 在非windows平台上，如果options.detached为true,那么子进程将会成为新进程组和会话的领导者，子进程可以在父进程退出后继续运行，无论他们是否分离
* 默认情况下，父进程将会等待要分离的子进程退出。`不让父进程等待子进程退出，需要使用subprocess.unref()方法`
* `这会导致父事件循环不讲子事件包括在他的引用计数中，允许父事件独立于子事件退出。除非在子事件和父事件之间建立了ipc通道`
* 当使用该detached选项启动一个长时间运行的进程时，该进程将不会在父进程退出后继续在后台运行，除非为其提供stdio不连接到父进程的配置。如果父母的stdio是继承的，孩子将继续依附于控制终端。
* 例子：一个长时间运行的进程的实例，通过分离并忽略其父stdio文件描述符，以忽略父进程的终止：
```js
const { spawn } = require('node:child_process');
console.log('argv[0]:',process.argv[0]) // xxx/.nvm/versions/node/v16.18.0/bin/node
const subprocess = spawn(process.argv[0], ['child_program.js'], {
    detached: true,
    stdio: 'ignore'
});

subprocess.unref();
// 我们先执行 node detached.js
// 然后打开一个新的终端，输入 ps ax | grep node
// 可以看到  /Users/xx/.nvm/versions/node/v16.18.0/bin/node child_program.js
// todo 说明即使我们的父进程退出了。子进程还是可以独立于父进程，继续在后台运行
```
```js
// 除了ignore stdio，还可以将子进程的输出重定向到文件中
function other(){
    const fs = require('node:fs');
    const { spawn } = require('node:child_process');
    const out = fs.openSync('./out.log', 'a');
    const err = fs.openSync('./out.log', 'a');
    // 子进程也能在后台运行。我们同时可以看到把out err的结果也输出到日志文件了
    const subprocess = spawn(process.argv[0], ['child_program.js'], {
        detached: true,
        stdio: [ 'ignore', out, err ]
    });

    subprocess.unref();
}
other()
```


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
