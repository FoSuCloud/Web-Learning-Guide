## 路由跳转生命周期
* 假设从a路由跳转到b路由，组件发生改变
* 那么新旧组件的生命周期会怎么变化？
* 旧组件是Foo,首先Foo组件生命周期为
```text
 Foo beforeCreate
 Foo created
 Foo beforeMount
 Foo mounted
```
* `然后切换路由，新组件为Bar，那么组件生命周期为：`
```text
 Bar beforeCreate
 Bar created
 Bar beforeMount
 Foo beforeDestroy
 Foo destroyed
 Bar mounted
```
* `也就是新组件会先created,然后进入beforeMounted周期`
* `但是要等到旧组件销毁了，才会进入mounted挂载周期！`

## Link
* `Link和a标签虽然很像，但是这个还是有本质区别的`
* `点击a标签跳转，就是直接使用浏览器的路由跳转，整个页面都刷新了`
* `而使用Link跳转其实是js代码导致的跳转，没有进行页面刷新`

