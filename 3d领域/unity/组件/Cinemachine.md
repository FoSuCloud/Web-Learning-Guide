### Cinemachine
* `Cinemachine 是 Unity 针对游戏中与摄像机有关的所有问题的解决方案`

该系统简单总结如下：
1. 在场景中创建一个或多个“虚拟”摄像机。
2. 这些虚拟摄像机由一个名为 Cinemachine Brain 的组件进行管理。
3. Cinemachine Brain 与 Camera 组件连接到相同的游戏对象，默认情况下，这个游戏对象将是 Main Camera 游戏对象。
4. Cinemachine Brain 管理所有虚拟摄像机，并确定实际摄像机应跟随哪个虚拟摄像机（或虚拟摄像机的组合）。


#### 虚拟摄像机
* Cinemachine > Create Virtual Camera 虚拟摄像机 
* 这样将在场景中创建一个名为 CM vcam1 的新游戏对象

####  Cinemachine Virtual Camera

#### Aim
* 在 Unity3D 中使用 Cinemachine Virtual Camera 时，Aim 部分中右上角的下拉菜单可以选择 Composer 或 Do Nothing。
*  `Composer 表示摄像机会自动跟随目标进行移动和旋转，`
* 而 `Do Nothing 则表示不对摄像机的移动和旋转做出任何调整，只是保持原有的位置和方向。`

* 将右上角的下拉菜单从 Composer 更改为 Do Nothing，意味着摄像机不再自动跟随目标进行移动和旋转，而是保持原有的位置和方向，对目标的位置和方向不做出任何调整。

* 这种设置通常用于需要手动控制摄像机位置和方向的场景，例如`在一些第三人称游戏中，玩家希望能够自由控制摄像机的位置和视角，以便更好地观察周围的环境和敌人位置。`






