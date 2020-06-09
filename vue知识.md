1、说下Vue数据双向绑定的原理
* 我觉得数据双向绑定的原理就是在创建实例数据属性的时候，每个数据属性都会有get,set方法，而set方法会在设置修改该属性值的时候被触发，这就是数据双向绑定的前提条件
* 当我们创建实例数据之后，在html中每个使用该数据的元素都会有一个watcher订阅者跟这个数据绑定在一起；
* 然后当我们修改这个实例数据之后，就会触发该属性的set方法，然后在set方法中有一个dep.notify()方法会通知所有使用了该属性的元素去更新自己的值，从而完成双向绑定的任务

## vue首页白屏时间过长
1. `使用分包的方法，每个组件都按需加载，通过require.ensure方法实现`
2. `在页面中使用keep-alive,把用过的组件缓存，便于快速切换组件`
3. `打包后存在.map文件，在config/index.js文件中设置productionSourceMap为false`
4. `打包启动gzip压缩，也就是在config/index.js中设置productionGzip为true`
* `另外启动gzip压缩还需要安装依赖(老版本不会出错)cnpm install --save-dev compression-webpack-plugin@1.12.0`
* `然后由于我的webpack是3版本的，警告必须4版本，因此输入cnpm install webpack@^4.3.0`
* `但是升级后还是报错，所以降回3.12.0版本`
* `此外还需要在服务器中开启gzip压缩才行，我的是tomcat,所以在conf/server.xml中设置`
```
<Connector port="8080" protocol="HTTP/1.1" 
    connectionTimeout="20000"
    redirectPort="8443" 
    compression="on"
    compressionMinSize="2048"  // 大于2k才压缩
    compressableMimeType="text/html,text/xml,image/png,image/jpeg,text/css,application/javascript" />
```
* `注意；如果体积很大却没压缩的话，可能那个文件类型没有添加进去compressableMimeType`
5. 清除console.log打印语句，在webpack.prod.conf.js中设置
```
uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,  //后来添加的
          drop_console: true  //后来添加的
        }
      },
```

## vue中给data中的一个对象添加属性，视图没有更新

* `虽然vue是响应式更新数据的，但是刚开始的vue实例中没有该属性，所以该属性就不会响应式更新`

```javascript
<span>{{obj}}</span>
data(){
 return{
  obj:{
   a:1
  }
 }
}
change(){
 this.obj.b='444';// 即使添加了属性，可以看到页面中用到的对象还是没有该属性
}
```

* `解决方法:通过this.$set(obj,'key',value)来添加一个响应式的属性`
`this.$set(obj,'b','value')`

## 为什么使用$set可以解决新增的对象属性不是响应式的问题？
* `如果对数组对象使用$set方法，那么就是监听数组对象的splice/push/pop这些方法，因为数组对象的改变不只是监听setter`
* `如果目标是对象，那么如果属性之前不存在，那么就会调用defineReactive方法进行响应式处理`
* `defineReactive方法就是在vue初始化对象时，给对象属性采用Object.definedProperty，动态添加getter和setter的功能所调用的方法`

2、说说Vuex的作用以及应用场景
* vuex使用集中式存储管理所有组件的状态，并以相应的规则保证状态可以被改变
* 我觉得vuex主要是在复杂的项目中需要用到，在小型项目中，为了少下载一个插件，减少体积，可以直接使用props,emit完成父子组件传值就足够了
* 而在大型项目中，我们所有需要用到父子组件传值的场景都可以改为使用vuex

3、说说Vue组件的数据通信方式

## 子组件触发父组件方法通信方式:attrs/listeners
1. 首先创建一个父组件a,然后创建子组件b,b组件的子组件为c
2. a组件通过v-bind给子组件b传递数据，`1. foo字段被组件b的props获取，所以不出现在attrs`
3. `1.2 除了foo字段，其他字段都出现在b组件的attrs中`
4. 然后a组件不需要设置listeners,b组件就可以直接向a组件触发a组件的绑定函数，通过this.$emit
5. `2. 但是c组件想触发a组件的绑定函数该怎么办？首先b组件给c组件设置$listners`
6. `2.1 c组件被绑定listners之后，通过this.$emit就可以触发a组件的函数了`

## 但是父组件怎么触发子组件方法？使用on
```
        // 1.emit调用$on绑定的事件
        this.$refs.child.$emit('child1','父组件触发子组件方法')
        // 2.直接调用函数(不是事件，而是函数)
        this.$refs.child.getdata("直接调用")

        // 子组件
        // 这是个被父组件触发的子组件函数
        getdata(res){
          console.log(res)
        }
        created() {
          // 监听事件
          this.$on('child1',function(res){
            console.log(res)
          })
          console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
        },
```


4、Vue的源码有看过吗？说说vuex工作原理
* `首先需要说一下vue中的computed属性的原理`
* vue中的computed属性可以监听data中的数据变化其实也是依赖于发布者订阅者模式
* 首先会给data中的数据初始化，computed中的方法初始化，而computed中存在有data中的数据，那么相应的数据就会成为computed属性的发布者，而这个computed属性中的这个方法就是data数据的订阅者
* 当data数据变化的时候，相应的computed中的数据订阅者就会接收到改变，从而改变该方法，重新计算
* 还没完呢！computed中的这个方法同时也是html使用该方法的元素的发布者，当computed改变的时候，也会再通过set中的dep.notify()去通知那个元素改变后的computed属性值
* [参考](https://www.cnblogs.com/gsgs/p/8794573.html)
---
* vuex仅仅是vue的一个插件，所以vuex的状态管理模式很大程度上是依赖于computed属性的依赖检测系统来完成的
* [vuex](https://juejin.im/entry/5b7a21bf51882542eb2dd685)

5、为什么说虚拟 dom会提高性能，解释一下它的工作原理
* 因为虽然有三种页面重新加载方式，但是虚拟dom相对来说是最好的
* 第一种是全局加载，当页面改变之后就重新刷新加载`所有元素`
* 第二种是改变一个节点就刷新一次，这种方法在改变节点数少的时候甚至比虚拟dom方法好，但是在节点数量多了以后，每更新一个节点就要刷新一次效率太低了
* 最后就是虚拟dom，虚拟dom方法是在js中检测DOM的变化，进行对比，对比算法是diff算法，在一定时间内，无论改变了多少个节点，也是根据diff算法对比得出需要改变的节点，仅仅改变需要改变的节点，而且是一次改变所有需要改变的节点

## 虚拟DOM(vdom)
* 虚拟DOM(vdom)就是为了解决浏览器性能问题而提出来的
* 假如有一个dom操作修改了10个dom节点，那么根据虚拟dom就可以把这10个修改的dom节点保存到本地的js对象中
* 然后再把这个js对象一次性提交到dom树上，减少不必要的计算

## vue-router实现原理
* vue-router实现原理其实就是更新视图而不更新请求页面，也就是单页面应用的特点
* `多页面应用也就是传统应用是每个页面都不一样的，跳转页面就是重新请求一个text/html文件`
* `而单页面应用是刚加载的时候请求一个页面，后来只是切换组件，没有请求新的页面`
* `单页面的组件切换也就是上一个组件消失，下一个组件出现，也即是不需要的组件消失，需要的组件出现`
* `这个实现过程是通过vue-router路由来进行的，不同的路由挂载着不同的组件！`

## vue-router采用history模式
* `默认采用hash模式，但是hash模式会有一个# 不太美观`
* 要采用hsitory模式，需要在前端配置
```
export default new Router({
	routes,
    mode:'history',  // 使用history模式
	strict: process.env.NODE_ENV !== 'production'
})
```
* `此时部署到服务器后，可以加载到页面文件，但是无法显示内容`
* `后端部分暂时不理解。。`

## vue-router的hash模式和history模式的实现原理
1. hash模式的实现原理
* url中的hash值只是客户端的一种状态，也就是向服务器端发出请求时，`hash部分不会被发送`
* hash值的改变，都会在浏览器的访问历史中增加一个记录，所以我们能够通过浏览器进行回退，前进，以及控制hash的切换
* 可以通过a标签设置href属性，当用户点击之后，url的hash值发生改变，或者通过hsitory.hash进行赋值改变
* 也可以监听`hashchange事件来监听hash值的变化，从而对页面进行跳转`
2. history模式的实现原理
* h5提供了history api来实现url的变化，`history.pushState,history.replaceState`
* `可以监听popstate事件来监听url的变化，从而对页面进行跳转(渲染)`
* `需要注意的是history.pushState和history.replaceSate不会触发popstate事件，此时就需要我们手动触发页面跳转`

1. 工作遇到什么问题？怎么解决的？
* 经常遇到的问题就是视图没更新或者方法放错生命周期，解决方法就是先沿着出错的代码找到原因，如果以前没有遇到过这种错误，那就百度一下或者看一下文档

2. 为什么vue组件中的data是函数，而new Vue()中的data是对象?
1. 使用new Vue()构造函数的时候,data是一个对象,不是函数(其实也可以写成函数，但是这个时候一般写成对象，因为简单点)
```
	// 1.使用new Vue()构造函数的时候,data是一个对象,不是函数，所以所有使用该数据的元素都是引用同一个对象，对象一改变，所有使用该对象值的元素值都得改变
	new Vue({
		el:".one",
		data:{ msg:'0'},
		methods:{
			add(){
				this.msg++;
			}
		}
	})
	//在此时把data声明为一个对象，那么所有使用data中对象属性的元素改变属性值的时候，其他使用该属性的元素中的值也会改变
```

2. 使用组件化方式的时候，每个vue文件中使用的是data(){return {}} => data:func;此时每个实例使用的都是函数返回的初始数据的拷贝，每个实例互不影响
```
<!-- 首先声明一个返回对象的函数 -->
	var func=function(){
		return {msg:0}
	};
	<!-- 声明两个选择不同元素的vue实例 -->
	var vm1=new Vue({
		el:".one",
		data:func,
		methods:{
			add(){
				this.msg++;
			}
		}
	})
	<!-- 当我们点击两个不同按钮的时候，我们的两个实例对应的值互不影响 -->
	var vm2=new Vue({
		el:".two",
		data:func,
		methods:{
			add(){
				this.msg++;
			}
		}
	})
	<!-- 在同一个文件中建立div.one;div.two -->
```
[参考链接](https://blog.csdn.net/qq_33576343/article/details/82793894)
[参考链接](https://www.cnblogs.com/wangjiachen666/p/9876266.html)


6、请你详细介绍一些 package.json 里面的配置

7、为什么说Vue是一套渐进式框架

8、vue-cli提供的几种脚手架模板有哪些，区别是什么

9、计算属性的缓存和方法调用的区别

10、axios、fetch与ajax有什么区别

11、vue中央事件总线的使用

12、你做过的Vue项目有哪些，用到了哪些核心知识点

13、实现MVVM的思路分析

14、批量异步更新策略及 nextTick 原理

15、说说Vue开发命令 npm run dev 输入后的执行过程

16、vue-cli中常用到的加载器有哪些

17、Vue中如何利用 keep-alive 标签实现某个组件缓存功能

18、pc端页面刷新时如何实现vuex缓存

19、vue-router如何响应 路由参数 的变化

20、Vue 组件中 data 为什么必须是函数