#### yarn解决安全漏洞问题
* package.json配置resolution写入目标对应的三方库版本
* 然后直接执行`yarn install`即可


#### 重复依赖
* `yarn dlx yarn-deduplicate`

* `如果不行，就手动把重复的去掉，再执行yarn install`

#### yarn up
* `yarn up跨项目升级依赖项`

