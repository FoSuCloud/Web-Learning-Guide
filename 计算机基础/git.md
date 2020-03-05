## git的分支指令
1. [参考](https://www.cnblogs.com/printN/p/6259115.html)
2. `git branch -a查看远程分支和本地分支;git branch -r查看远程分支(服务器);git branch查看所有分支(包含master主支)`
3. `git branch test;创建本地分支名为test`
4. `把本地分支推送到远程服务器，git push origin test;如果直接是git push那么是默认分支; origin后面是分支名称`
5. `切换分支 git checkout test;切换到test分支`
6. `添加本地要上传的文件git add one.js;文件夹 git add img;添加本地所有文件 git add .`
7. `删除分支 git branch -d test;删除test分支`