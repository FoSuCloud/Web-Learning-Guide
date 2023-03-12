## svn和git的区别
1. svn是`集中式`,每次存的都是差异，需要的硬盘空间相对小一点，`但是回滚速度很慢`
* 优点:`代码存放在单一的服务器上，便于项目的管理`
* 缺点:`服务器宕机的话，员工写的代码得不到保障；服务器炸了：整个项目的历史记录都会丢失`
2. git是`分布式`:`每次存的都是项目的完整快照，需要的硬盘空间相对大一点`
* 但是git团队对代码做了极致的压缩，最终需要的实际空间比svn大不了多少，可是git回滚的速度极快！
* 优点:完全的分布式
* 缺点:学习起来比svn陡峭

## 分支
1. master分支，`一般不在这个分支上开发项目`
2. dev开发分支(`master分支的子分支`)，`一般在该分支上开发项目`
3. feature版本分支(`dev开发分支的子分支`)，在这个分支进行版本管理
* `例如:feature-vueAdmin-v1.0.0-20190919,feature表示分支名称`
* vueAdmin表示项目名称，v1.0.0表示版本号，20190919表示分支日期
4. bug分支(`feature开发分支的子分支`),在该版本进行bug管理
* `例如:bug-101241-20191020`
* bug表示分支名称，101241是bug的id,20191020是建立分支的日期

## 拷贝一个git项目的命令
1. git clone "http://xxx" 复制远程仓库到本地
2. git branch --list 查看项目的所有分支,`高亮的是当前分支`
3. `创建dev开发分支 git branch dev`
4. `git checkout dev,切换到dev分支`
5. `把新增的分支提交到远程仓库  git push --set-upstream origin <name>`,此处的"<name>"替换为dev
6. `git branch -a查看分支(包括远程分支)`
7. `在dev开发分支下面创建一个版本分支，使用git checkout -b feature-vueAdmin-v1.0.0-20190919`,表示创建分支，并且切换到该分支
8. `把新增的分支提交到远程仓库，git push --set-upstream origin <name>`
9. `由于之前已经把远程仓库下载下来了，所以创建项目之后会弹出选项，不要选overwrite重写，选择merge合并！`
* `在git软件好像没法移动，可以在vscode移动`

## git的分支指令
1. [参考](https://www.cnblogs.com/printN/p/6259115.html)
2. `git branch -a查看远程分支和本地分支;git branch -r查看远程分支(服务器);git branch查看所有分支(包含master主支)`
3. `git branch test;创建本地分支名为test`
4. `把本地分支推送到远程服务器，git push origin test;如果直接是git push那么是默认分支; origin后面是分支名称`
5. `切换分支 git checkout test;切换到test分支`
6. `添加本地要上传的文件git add one.js;文件夹 git add img;添加本地所有文件 git add .`
7. `删除分支 git branch -d test;删除test分支`

## 代码提交的步骤
1. git add . `把代码提交到暂存区`
2. git commit -m "描述"  `把暂存区代码提交到本地仓库区`
3. git pull `拉取远程仓库，提前发现冲突`
4. git push `把本地仓库的代码提交到远程仓库`


## git add (将变化提交到暂存区)
## git commit (将暂存区里面的改动提交到本地的版本库)

## git merge(分支合并)
* git merge 是将两个或者两个以上的开发历史合并在一起的操作

## git blame
* 查看文件`每一行`的`SHA串，作者，修改时间`

#### git clone --recursive用于循环克隆子项目（在项目中存在子项目时，如防水堡）

`(即使修改了一些代码，但是只要没有提交，现在想恢复到之前拉取的代码状态，也就是没修改前的项目)，那么使用git reset --hard HEAD`

## git stash
* `临时存储文件目录（避免一次commit）`，不然pull代码提示需要commit
* pull结束之后，`git stash pop恢复临时存储的文件目录`

## 一台电脑，公司和个人两个github账号
* [https://www.jianshu.com/p/4fc7c534cc04]

## ssh命令
* ssh -T -p 22 git@ssh.github.com
* `测试是否可以连接上远程github.com的端口`

## git push
* [参考]("https://www.djc8.cn/archives/github-started-from-august-13-2021-and-does-not-accept-the-user-password-for-git-operation-verification.html")
* `关键点在于：Github->Settings->Developer Settings->Personal access tokens->"generate personal access tokens"`
* `使用生成的tokens作为密码去登陆！`
* `解决github ;github access august 13 不能提交代码的问题！`

## .gitignore文件不生效？
* `试一下清除git缓存 git rm -r --cached .`

## 查看当前tag
* git describe --tags `git rev-list --tags --max-count=1`

## git log
* 查看log记录，`git log --pretty=oneline用于只展示一行，也就是只展示message`

## clone的时候不携带commit
* 当我们下载非常庞大的代码库的时候，经常会下载失败，这是因为会把历史commit内容也一起下载
* `git clone xx --depth 1可以不下载历史 commit 内容，从而使得clone会变得非常块`

### 撤回某次提交
* git revert commit-id
* git push 更新
