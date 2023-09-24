## 查看系统主机名

* uname -n
* hostname
* hostnamectl

#### uname
* uname -p 打印机器处理器架构名称。
* uname -m 打印机器硬件名称。
* 不带参数的arch命令显示机器的架构类型。
```shell
$arch
i386
$machine  
i486
$uname -m
x86_64
$uname -p
i386
```

## 打包解压

```
`打包war包  jar -cvf war包名字  将要打包的资源 *.*/`
`无需解压，放到tomcat服务器webapps中即可`
`解压命令 tar -xvf xx.tar`
```

#### 给某个用户添加在某个文件夹的权限
* sudo mkdir -p /var/log/systemlog/sysLoginLog/            
* chown xielipei:staff /var/log/systemlog/sysLoginLog/



## 重启服务 进入/etc/init.d 输入 service apache2 restart

## 查看端口 lsof -i:80

## kill -x (x表示PID，进程的id，杀死进程)

* 如果提示没用这命令，那么使用kill -9 pid

## 删除文件/目录 rm -r  xxx 即使该文件/文件夹下面还有文件，还是会递归删除

## 修改文件名 mv oldname newname

## Linux权限

1. 以chmod 777为例，表示`文件所有者，群组用户，其他用户对该文件的权限皆为可读，可运行，可写`
2. `chmod命令是三位数，第一位表示文件所有者，第二位表示群组用户，第三位表示其他用户`
3. `chmod命令的数字为7表示可读可运行可写，6表示可读可写，5表示可读可运行，4表示可读`

* `-r可读4，-w可写2，-x可执行1`
* `chmod 765 => (4+2+1)(4+2)(4+1) => rwxrw-r-x`

## find查找文件或目录

```text
-type 按类型进行查找，d查找目录，f查找文件

find . –type d –name [document]

find . type f –name [filename]
```
* `末尾添加 -print表示打印出匹配的路径`

1. 查找文件
   `find / -name nginx.conf  表示以/为根目录查找名称为nginx.conf的文件`
2. 查找目录
   `find ~/Documents/blog/blog -type d -name vue 表示以~/Documents/blog/blog为根目录查找文件夹名称为vue的文件夹`

## grep在文件中查找字符串

* `ktb xxxpod | grep Status`,(例如查看某个pod当前实时日志)

## .tar.gz是tar的压缩文件

## .gz是另一种压缩文件，不一样的！

## shell中，将command1的输出作为command2的输入 command2 | command1

## 查看文件

1. cat全部输出
2. more分页查看
3. less使用光标上下移动一行

## 显示当前工作目录命令pwd (print working directory打印当前工作目录)

## 文件exer1的访问权限为rw-r--r--，现要增加所有用户的执行权限和同组用户的写权限

1. `r表示读权限 w表示写权限 x表示运行权限`
2. `a表示所有人 u表示拥有者 g表示所属群组`
3. `所以可以用chmod a+x,g+w exer1`

## linux恢复

1. 不小心commit了，如何恢复到上一状态？`最好用git reset --soft HEAD^`
   `如果用git reset --hard HEAD^具有破坏性，导致难以恢复`
2. 回退到上几个commit状态用`git reset --soft HEAD~x(x在这里就是一个数量)`

## linux系统的cron服务用于系统日常资源的调度

## linux系统中网络管理员对WWW服务器进行访问，控制存取和运行是通过httpd.conf文件体现的

## netstat 用于打印网络的状态
* netstat -D 查看所有网卡

## top用于获取本机的cpu使用率

## uptime用于打印系统运行时间和系统平均负f载

## export用于设置环境变量

## env用于查询环境变量

## echo用于显示一段文字

## cat用于查看文件内容，创建文件，文件合并，追加文件等

## tail -100f error.log 查看error.log文件的最后100行

## 链接

* 硬链接就是同`一个文件使用了多个别名`
* 软链接就是:文件用户数据块中存放的是`对另一文件的文件路径指向`

## 常见目录

* /etc: 配置目录
* /home: 普通用户的主目录
* /boot: 启动目录
* /lib: 系统库
* `/tmp: 临时目录`
* /sys: 硬件设备的驱动程序信息
* /var: 变量

## open .

* `在命令行界面输入 open . 在finder打开当前文件目录`

## ll

ll查看文件权限

## dd

添加文件，但是还有很多用处

## ps
* `apt-get install procps 安装`

* `process status显示进程的状态`
* ps -ef 查看当前进程

## grep

* grep命令用于查找文件里符合条件的字符串。

## cp
* cp -r 表示复制目录下的所有文件
* 例如：
`cp -r /root/dist/* /var/lib/xxx`

## top

* 查看当前网络、cpu等。类似任务管理器


## 软链接的缺点
* `若指向的源文件被删除，那么相关的软链接会成为死链接；`
* `占用的空间较大`

## 安装vim
* apt-get update ;`先更新apt-get，否则无法安装软件`
* apt-get install vim

1、在终端中执行“whereis python”命令，可以在输出信息中查看出所有python的安装目录；
2、在终端中执行“which python”命令，可以查看出当前使用的python的安装目录。(bin脚本！)

## whereis
* Linux whereis 命令用于查找文件。
* 该指令会在特定目录中查找符合条件的文件。这些文件应属于原始代码、二进制文件，或是帮助文件。
* 该指令只能用于查找`二进制文件、源代码文件和man手册页`，一般文件的定位需使用locate命令(`locate是查找数据库`)。
  -b 　只查找二进制文件。
  -B<目录> 　只在设置的目录下查找二进制文件。
  -f 　不显示文件名前的路径名称。
  -m 　只查找说明文件。
  -M<目录> 　只在设置的目录下查找说明文件。
  -s 　只查找原始代码文件。
  -S<目录> 　只在设置的目录下查找原始代码文件。
  -u 　查找不包含指定类型的文件。

## which
* which指令会在环境变量$PATH设置的目录里查找符合条件的文件。
* `查找到的都是bin目录下的命令`

## find
* `find命令用来在指定目录下查找文件`。任何位于参数之前的字符串都将被视为欲查找的目录名。
* 如果使用该命令时，不设置任何参数，则 find 命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

## su
* `切换用户。如何只是su 没有指定用户。那么默认是root`

## sudo
* `sudo (superuser do)表示使用超级用户来执行，但是并没有切换用户`

## $USER
* `输入$USER返回用户名`


#### uname -m
* 查看机器是arm架构还是x86架构

#### ab
* ab - Apache HTTP 服务器基准测试工具是一个 linux shell 软件，可用于执行网站网页的性能基准测试。

### ps 命令结合 watch 命令来实时查看进程情况
* `watch -n 1 'ps aux | grep <进程关键字>'`
* 其中，-n 1 表示每隔 1 秒钟刷新一次。<进程关键字> 是指需要查看的进程关键字，可以是进程名、进程号、用户等。例如，如果想要查看所有 Python 进程，可以执行以下命令：
* `watch -n 1 'ps aux | grep python'`

#### ls -al
* `查看当前目录下的文件/子目录，可以看到对应的权限(读写修改等)，用户id,用户组id,文件大小,修改时间,文件名`
* 例如 `drwxrwxrwx    3 root      staff          96  4  4 23:36 mount`

#### chown
* `sudo chown -R root:root ~/mount/home/xx/sample_task/7/original_sample_file`
* `以这个为例子，——R表示当前目录和子目录下的所有文件都是相同的用户id/用户组id, root表示用户是root,第二个root表示用户组是root用户组`

#### chmod
* `sudo chmod -R 777 ~/mount/home/yunanbao/sample_task/7/original_sample_file`
* `chmod表示修改这个目录的权限为777，777表示所有用户都有读写执行的权限`
