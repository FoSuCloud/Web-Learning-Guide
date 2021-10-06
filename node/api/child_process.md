## 多进程
`NodeJS的JavaScript运行在单个进程的单个线程上，一个JavaScript执行进程只能利用一个CPU核心，而如今大多数CPU均为多核CPU，
为了充分利用CPU资源，Node提供了child_process和cluster模块来实现多进程以及进程管理。`
* `注意，javascript依旧是只能运行在单个进程的单个线程上的，但是可以利用child_process和cluster模块给node.js实现多进程`

## child_process
* `child_process提供了一种衍生子进程的能力`
* `默认情况下，会在父 Node.js 进程和衍生的子进程之间建立 stdin、stdout 和 stderr 的管道。`

* `在Linux系统中，一切设备都看作文件。而每打开一个文件，就有一个代表该打开文件的文件描述符。程序启动时默认打开三个I/O设备文件：
  标准输入文件stdin，标准输出文件stdout，标准错误输出文件stderr，分别得到文件描述符 0, 1, 2。`

## child_process.spawn

