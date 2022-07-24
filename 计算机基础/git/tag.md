## git tag
* git可以给仓库里的某个提交打上标签`以示重要`,`一般使用git tag来标注某个发布节点，如v1,v2等`
* [参考]("https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE")

## 列出标签
* `git tag`,会按照字母顺序列出标签！
```text
$ git tag
v1.0
v2.0
```
* 也可以按照特定的模式列出标签,-l或者--list表示按照通配符列出标签
```text
$ git tag -l "v1.8.5*"
v1.8.5
v1.8.5-rc0
v1.8.5-rc1
v1.8.5-rc2
v1.8.5-rc3
v1.8.5.1
v1.8.5.2
v1.8.5.3
v1.8.5.4
v1.8.5.5
```

## 创建标签
* git支持两种标签，一种是轻量标签，一种是附注标签
1. 轻量标签很像一个不会改变的分支，它只是某个特定提交的引用。
2. 附注标签则是`存储在git数据库中的一个完整对象`，是可以被校验的，其中包含打标签者的名字，邮箱、日期和标签信息等。
* `所以如果需要存储信息就用附注标签，如果只是一个临时标签就用轻量标签！`

## 附注标签
* `git tag -a xxx 就是生成了一条附注标签`
* 流程
```text
git add .
git commit -m "feat:添加git tag"
git tag -a 测试gitTag
git push
```
* 查看tag信息
* `git show 测试gitTag`

## 轻量标签
* `git tag "xxx" 不需要-a,直接使用 git tag ""就可以打一个轻量标签`
* 如` git tag 轻量`
* `git show 轻量`
* `可以看到少了一些信息`

## 后期打标签
* 首先查看log `git log --pretty==oneline`
* 然后使用标注标签的方式，但是-a后面需要加上该log的commitId
* `git tag -a 测试后期打标签 9fceb02`
* 然后git tag就可以看到该tag记录了
