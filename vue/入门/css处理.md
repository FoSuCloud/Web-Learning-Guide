## scoped
* `scoped属性的作用就在于写在组件里面的样式不会污染全局`
* `scoped用在单文件组件中，可以让我们完全控制一个组件的css!!!(但是还是会收到css权重的影响)`
* `表现为写在该组件<style>标签的所有样式，我们都是针对该template模板来设置的，必须是对应的data-v-xxx元素才可以有该样式`
* `表现为设置了scoped,那么会给元素自动添加一个attribute,例如：data-v-32sds212为组件内css指定作用域`
* `编译的时候，.list-container:hover 会被编译成类似 .list-container[data-v-21e5b78]:hover。`
---
* 通过使用vue-loader，可以使用任意预处理器、后处理器，甚至集成css moudle， 都在style标签内
* [参考]("https://cn.vuejs.org/v2/guide/comparison.html#%E7%BB%84%E4%BB%B6%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%86%85%E7%9A%84-CSS")
* 例子：
1. App.vue的权重大于组件权重
* `注意：：：先在App.vue创建一个类为hello的div`
```vue
<!--App.vue-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="hello">主页面的hello</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<style>
.hello{
  background: red;
}
</style>

<!--HelloWorld.vue-->
<div class="hello">
<h1>msg</h1>
</div>
<style scoped>
.hello{
  background: transparent;
}
</style>
```
* `表现为文字"主页面的hello"的背景色改为红色，但是HelloWorld.vue对应的文字背景色不变`
* `因为实际经过vue-loader处理后的样式是`
```text
.hello[data-v-469af010]{
    background: transparent;
}
```
* `由于添加了属性选择器，所以权重更高`

2. 增加App.vue权重
* 发现scoped对应的组件样式还是会被覆盖
```vue
<style>
#app .hello{
  background: red;
}
</style>
```
* `效果就是App.vue和HelloWorld.vue的文字背景色都是红色`
3. scoped的作用
*  `首先删除App.vue的样式`
```vue
<!--App.vue-->
<style>

</style>
<!--HelloWorld.vue-->
<style scoped>
.hello{
  background: green;
}
</style>
```
*  `由于HelloWorld.vue的style设置了scoped，所以存在作用域隔离，所以App.vue的文字背景色不存在`
4. `删除scoped，发现组件的样式会覆盖父组件样式`
```vue
<!--App.vue-->
<style>

</style>
<!--HelloWorld.vue-->
<style>
.hello{
  background: green;
}
</style>
```
* `结果是父组件样式App.vue的文字背景色被覆盖为green了！`
