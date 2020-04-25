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