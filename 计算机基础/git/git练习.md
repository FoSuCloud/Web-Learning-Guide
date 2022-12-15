## git使用
* git仓库的提交记录保存的是项目目录下的所有文件的快照，就像把所有文件复制，粘贴保存了。
* git希望提交记录尽量轻便，所以Git保存的是本次和上次提交的版本的修改的差异，把所有的差异提交到一起打包作为提交记录。
* Git还会保存历史记录，所以大多数提交记录都有父节点。

#### git练习1
* `git练习网站：https://learngitbranching.js.org/?locale=zh_CN`
* `git commit会让当前节点c1往下走,创建一个新的子节点c2,然后当前指向的就是c2节点了`

#### git练习2
* git的分支非常轻便，所以`早建分支，多用分支`，创建再多的分支也不会增加内存的开销，而且按照逻辑分解工作到不同的分支比维护臃肿的分支好得多。
* 创建分支 git branch one
* 分支切换 git checkout one
* 创建分支并且切换到分支 git checkout -b one

#### git练习3
* `git merge是合并分支`，合并之后会产生一个新的历史记录，该记录的有两个父节点，也就是该历史记录可以找到两个节点的历史记录
* git checkout -b bugFix
* git commit -m "1"
* git checkout master
* git commit -m "2"
* git merge bugFix
---
* `但是如果使用git merge失败，那么需要合并代码就可以使用git pull --rebase origin master去合并master分支的代码`

### merge和rebase
* merge会产生一个新的commit,而rebase是直接合并，不会产生新的commit








