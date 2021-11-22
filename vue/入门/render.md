vue的渲染是先把template组件中内容转换为ast抽象语法树
再把ast转换为virtual dom；最后把virtual dom渲染为真实dom挂载到页面上渲染

* `vue的模板编译使用的是插件：vue-template-compiler`
* ``

### 渲染更新
1. 在vue中，如果是父组件的一个响应式数据发生了改变，那么就会进入update生命周期
* `那么就会进行重新渲染，但是子组件如果没有使用到父组件传递的数据，那么子组件不会被重新渲染`
```js
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
```
* `注意是把整个组件进行重新渲染，而不是单单更新被修改的数据的值！`
* `因为子组件没有被依赖收集进去！`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue 源码解读</title>
</head>
<body>
<div id="app">
  {{ msg }}
  <modal  :msg="msg"></modal>
  <button @click="getMsg">获取</button>
  <button @click="changeMsg">改变</button>
</div>
<script src="../dist/vue.js"></script>
<script type="text/x-template" id="modal">
  <div>child, {{msg}}</div>
</script>
<script>

  Vue.component('modal', {
    template: "#modal",
    props:['msg'],
    updated(){
      console.log('modal updated')
    }
  })

  new Vue({
    el: '#app',
    data: {
      msg: 'hello vue'
    },
    methods:{
      getMsg(){
        console.log(this.msg)
      },
      changeMsg(){
        this.msg = Math.random()
      }
    },
    updated(){
      console.log('updated')
    }
  })
</script>
</body>
</html>
```
2. `但是react的父组件更新了，一定会触发子组件的更新，所以才有pureComponent用法!`
