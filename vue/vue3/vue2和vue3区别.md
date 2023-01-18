## 为什么vue3使用Proxy实现数据响应式
```text
        // vue2使用Object.defineProperty
        // 存在以下缺点：
        // 1. 需要对对象进行递归，递归效率低
        // 2. 无法拦截数组的变化，因为数组存在push,pop等方法可以改变数组，但是通过这种方式无法拦截到！
        // （解决办法是对数组进行单独实现，创建数组的pop,push等一套api）
        // 3. 无法检测到动态属性(就是对象创建之后再新增的属性)的新增和删除，所以才会有Vue.$delete和Vue.$set这两个api
        // 目的就是对动态属性标记一下，需要变为数据响应式（这是Object.definedProperty的特点）
```
---
* 但是proxy也有问题
1. `兼容性不好，例如不支持ie11`


## vue2和vue3的映射关系建立机制不同
* `首先要知道响应式分为视图响应式更新和依赖收集`
* `依赖收集也就是哪些响应式数据和它们相关联的更新函数之间建立的依赖联系，就是为了在数据更新的时候可以触发相关联的更新函数`
* `依赖收集的实现其实就是要建立映射关系， 依赖dep 和 组件更新函数`
1. 在vue2中，`使用watcher实现`
2. 在vue3中，`通过创建map结构实现，例如：{target: { key : [update1,update2,...]}}`
* `也就是每个对象都有多个属性，每个属性维护一个更新数组`


## vue3-ts
* vue3的class语法-被废弃。
---
* `想要支持，需要引入vue-class-component，使用Option语法`
---
* 建议使用Composition APi,而不是Option Api(class写法)
* https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121
---
可疑的收益
对于上述所有问题，引入类 API 的收益似乎值得怀疑。
* 它没有很好地实现其主要目的（更好的 TypeScript 支持）
* 它使内部实施复杂化
* 它没有带来逻辑组合的改进



