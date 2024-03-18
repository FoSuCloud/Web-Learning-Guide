require 的源码大致长如下的样子：
```javascript
 // id 为路径标识符
function require(id) {
   /* 查找  Module 上有没有已经加载的 js  对象*/
   const  cachedModule = Module._cache[id]
   
   /* 如果已经加载了那么直接取走缓存的 exports 对象  */
  if(cachedModule){
    return cachedModule.exports
  }
 
  /* 创建当前模块的 module  */
  const module = { exports: {} ,loaded: false , ...}

  /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */  
  Module._cache[id] = module
  /* 加载文件 */
  runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
  /* 加载完成 */
  module.loaded = true 
  /* 返回值 */
  return module.exports
}
```
* `模块导出 基本类型导出的是值， 引用类型导出的是引用地址。`

* exports 和 module.exports `持有相同引用`，因为最后导出的是 module.exports， 
* 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用。

