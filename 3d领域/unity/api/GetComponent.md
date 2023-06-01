## GetComponent
* 在Unity3D中，GetComponent是一个非常常用的函数，用于从游戏对象（GameObject）中获取指定类型的组件（Component）。
`public T GetComponent<T>();`

* 例子
```c
// 获取 Transform 组件
Transform transform = gameObject.GetComponent<Transform>();

// 获取 Rigidbody 组件
Rigidbody rigidbody = gameObject.GetComponent<Rigidbody>();

// 获取自定义的 MyComponent 组件
MyComponent myComponent = gameObject.GetComponent<MyComponent>();

```
* GetComponent只会在当前游戏对象上查找指定类型的组件。
* 如果该组件不存在，它将返回null。因此，在使用GetComponent时，你需要确保所查找的组件确实存在于游戏对象上。


#### 应用
* 获取到游戏物体后通过代码设置物体位置就可以解决`手动拖拽位置不准确`的问题

#### 变体和用法
此外，还有一些其他的变体和用法，如：
1. GetComponentInChildren<T>()：在当前游戏对象及其所有子对象中查找指定类型的组件，并返回第一个匹配的组件。
2. GetComponents<T>()：在当前游戏对象上获取所有指定类型的组件，并返回一个数组。
3. GetComponentInParent<T>()：在当前游戏对象的父对象中查找指定类型的组件，并返回第一个匹配的组件。



