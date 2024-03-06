## vuex
* vuex是专门为vue设计的状态管理架构，用于统一管理和维护各个vue组件的可变化状态
* 五个核心概念:
* `1.states:vuex的基本数据，用于存储变量`
* `2.getters:从基本数据state中派生的数据，相当于state的计算属性`
* `3.mutations:提交更新数据的方法，必须是同步的。异步的话用actions`
* `4.actions:和mutations的功能大致相同，不同之处在于:1. actions提交的是mutations,而不是直接变更状态 2.action可以包含任意异步操作`
* `5.modules:模块化vuex,可以让每一个模块拥有自己的state,mutations,actions,getters,使得结构非常清晰，方便管理`

* 应用可见element-ui实例
## 更改state数据的方法
1. `dispatch:异步操作，写法:this.$store.dispatch('mutations方法名','')`
2. `commit:同步操作，写法；this.$store.commit('mutations方法名','')`

## 查看模块state的方法:`this.$store.state.模块名`
## 调用模块的方法不需要分了。。`this.$store.dispatch('asyncChangeUser',res.data.data)`

## vuex实现原理
* [参考]("https://juejin.cn/post/6844904062240948231")
* [实现]("https://juejin.cn/post/6855474001838342151")
* 核心理念：
1. vuex本质上就是一个对象
2. vuex对象有两个属性，一个是install方法,一个是store类
3. install方法的作用是把store类的实例挂载到vue实例全局上

* 思路：
1. `在vue的beforeCreated生命周期(该周期还没有进行数据代理)注入了this.$store对象`
2. `store对象会创建一个属性_vm,在该属性上挂载一个vue实例`
```js
// src/store.js
function resetStoreVM (store, state, hot) {
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}
```
* `通过劫持data.$$state的属性变化，将数据放入组件中！实现响应式更新`
* 响应式监听还需要以下代码
```js
// 当获取state时，返回以双向绑定的$$sate
var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

// 将state定义在原型中
Object.defineProperties( Store.prototype, prototypeAccessors$1 );
```
