### git pull --rebase
* git pull --rebase`在获取最新版本后，使用rebase方式合并分支`
* `git pull --rebase 和 git pull的区别在于，使用git pull --rebase命令时会将本地的提交放到远程提交之后，使得提交历史更加整洁`

* `使用git pull则是将远程提交拉取到本地，再进行合并`


* `使用git pull --rebase如果出现了冲突，那么需要手动解决冲突内容后`
* `再去执行git rebase --continue继续合并远程分支`

#### 使用rebase合并其他分支代码
首先，切换到你想要合并的分支，例如master分支：
`git checkout master`
然后，执行以下命令，将你想要合并的分支（例如feature_branch）变基到master分支：
`git rebase master feature_branch`
如果有冲突需要手动解决，然后执行以下命令继续变基：
`git add .`
`git rebase --continue`
最后，将变基后的分支合并到master分支：
`git checkout master`
`git merge feature_branch`
这样就完成了使用rebase和合并其他分支的代码。

