<!-- git底层命令 -->
## git底层命令
#### 1.git对象
1. git hash-object -w fileUrl :生成一个key(hash值):val键值对(压缩后的文件内容)存到.git/objects

#### 2.tree对象
1. git update-index --add --cacheinfo 100644 hash test.txt :往暂存区添加一条记录(让git对象对应上文件名) 存到.git/index
2. git write-tree:生成树对象存到.git/objects

#### 3.commit对象
1. echo 'first commit' | git commit-tree treehash:生成一个提交对象存到.git/objects
 
#### 4. 对以上对象的查询
1. git cat-file -p hash: 拿对应对象的内容
2. git cat-file -t hash: 拿对应对象的类型

#### 查看暂存区
 git ls-files -s
 
 
<!-- git高层命令 -->
## git高层命令
#### 1.安装
1. git --version 查看版本

#### 2.初始化配置
1. git config --global user.name 'yiye'
2. git config --global user.email 'yiye@163.com'
3. git config --list

#### 3.初始化仓库
1. git init 

#### 4. 新增/修改文件
1. `注意是在工作目录中新增或者修改文件`
git status
git add ./
git commit -m "msg"

#### 5. 删除或者重命名文件
1. 删除`git rm 要删除的文件名`
2. 重命名`git mv 老文件名 新文件名`
3. git status
4. git commit -m "msg"

#### 6.查询
1. git status:`查看工作目录中文件的状态(已跟踪(已提交 已暂存 已修改)   未跟踪)`
2. git diff:`查看未暂存的修改(输入q退出)`
3. git diff --cached:`查看未提交的暂存(输入q退出)`
4. git log --oneline:`查看提交记录`
5. git log --oneline --decorate --all:`查看整个项目的分支图`
 
#### 7.分支
`分支的本质就是一个提交对象`
```
HEAD:
	是一个指针，默认指向master分支，切换分支时其实就是让HEAD指向不同的分支
	每次有新的提交时 HEAD都会带着当前指向的分支 一起往前移动
```
1. git log --oneline --decorate --graph --all:查看整个项目的分支图
2. git branch:查看分支列表
*  git branch -v:查看分支指向的最新的提交！
3. git branch name:在当前提交对象上创建新的分支
4. git branch name commithash:在指定的提交对象上创建新的分支
5. git checkout name:切换分支
6. git branch -d name:删除空的分支 删除已经被合并的分支

#### 8.切换分支
* `最佳实践:每次切换分支前，当前分支一定是干净的！！！(已提交状态)`
* `大坑！！！`
`在切换分支时，如果当前分支上有未暂存的修改(第一次) 或者 有未提交的暂存(第一次)`
`分支可以切换成功 但是这种操作会污染其它分支！！！影响很大`
* `所以每次切换分支之前，使用git status查看分支是否是干净的`

#### 实践
1. 例子:
```
1.开发一个网站，为了实现某个需求，创建一个分支；在这个分支上开展工作
---
但是就在此时，线上分支出现bug,需要我去修复
---
1. 首先切换到线上分支；
2. 为修复bug创建一个分支，并在该分支上修复bug
3. bug改好之后，切换回线上分支。然后合并这个bug分支。最后将bug分支推送到线上分支
4. 切换回最初的工作分支
```
1. 首先创建git
`git init `
`echo 'hello world' > a.txt` 创建文件a.txt,并写入'hello world'
`git add ./a.txt`
`git commit -m "commit a.txt v1"`
`git log --oneline --decorate --graph --all`
* 可以看到提交记录c6e3813 (HEAD -> master) commit a.txt v1
2. 切换分支
`git checkout -b "test"`创建且切换到分支test
* 进行工作
`echo 'test' > test.txt `创建并写入了test.txt文件
`此时接到紧急电话，要求修改线上分支的BUG`
`但是此时的test分支修改过了，所以必须先提交修改！`
`git status 查看是否还有未提交的修改`
`git add ./test.txt`
`git commit -m "commit test v1"`
`git log --oneline --decorate --graph --all 查看分支图`
---
* `创建一个新的分支，用来修bug`
`git checkout -b 'bug'`
`vim a.txt` 进入a.txt文件，然后i,可以进行编辑，按下esc,然后:wq,退出并保存
`git status查看状态`
`git add ./a.txt`
`git commit -m "commit a.txt bug-v2"`
---
`git checkout master切换回主分支`
`此时最重要的是合并分支(master分支来进行合并的!)`
`git merge bug 此时master分支的a.txt就和bug分支的修改合并了！`

3. 善后
* 删除修改bug的分支`git branch -D bug`
* 切换回原来的工作分支，继续工作`git checkout test`
`这一步要注意!因为master分支的内容已经改变了，所以继续工作之前`
`我们需要先同步，所以 git merge master,合并master的修改`
* 可以看到a.txt的内容同步了！`如果不先去做合并master分支，那么很容易会有冲突!`

`注意git push是对于线上代码的，非常重要！一般合作的时候使用git push origin master(推送到同名分支)`
[参考](https://www.cnblogs.com/qianqiannian/p/6008140.html)

## git clone 指定分支
* git clone -b branch-name git地址
* -b 后面跟着分支名称
