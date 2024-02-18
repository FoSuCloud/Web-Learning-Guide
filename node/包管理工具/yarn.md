[yarn仓库]('https://github.com/yarnpkg/yarn')

#### yarn解决安全漏洞问题
* package.json配置resolution写入目标对应的三方库版本
* 然后直接执行`yarn install`即可


#### 重复依赖
* `yarn dlx yarn-deduplicate`

* `如果不行，就手动把重复的去掉，再执行yarn install`

#### yarn up
* `yarn up跨项目升级依赖项`

#### yarn和npm区别
性能：
Yarn 被设计为比 npm 更快，因为它使用了并行下载依赖的技术，可以更快地下载和安装依赖包。
npm 在版本5之后也进行了性能优化，但在速度上仍然不如 Yarn。

缓存：
Yarn 具有本地缓存机制，可以有效地存储已下载的包，以便在后续安装相同版本的依赖时可以重复使用，从而提高了速度。
npm 也有类似的缓存机制，但在某些情况下可能不够高效，无法达到 Yarn 的性能水平。

* `yarn最开始使用扁平化的依赖关系树，但是后面npm迭代也使用了这种扁平化的依赖关系树结构`
* `但是扁平化的依赖关系树会带来一个问题：模块可以访问它们不依赖的包，也就是幽灵依赖问题`

#### 扁平依赖树
* 扁平的依赖树会导致父子依赖最终在node_modules中下载出来是兄弟依赖，没有关联关系
```yaml
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```
变为
```markdown
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```
