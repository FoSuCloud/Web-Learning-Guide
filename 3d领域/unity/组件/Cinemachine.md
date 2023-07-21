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

#### 创建2D跟随相机
* 顶部栏gameObject -> Cinemachine > Create 2D Camera  条目，从而将 Cinemachine 2D 摄像机添加到场景中。

* `把期望跟随的游戏对象移动到follow属性上即可`

#### 摄像头可视范围调整
* 简单来说，`Orthographic size 是指在摄像机的一半高度内可容纳多少个单位`，因为这就是摄像机的工作方式。
* 由于我们将该属性设置为 5，所以可以在屏幕的垂直方向上看到 10 个世界单位。`请确保设置为高度的一半`，
* 因此，如果希望摄像机能够看到的高度是 50 个世界单位，请将该属性设置为 25。

* `Cinemachine的Lens -> orthe Size 属性`

#### 摄像机边界
* [参考]("https://learn.unity.com/tutorial/she-xiang-ji-cinemachine?uv=2020.3&projectId=5facf921edbc2a2003a58d3a#6073df91edbc2a001e1f55c4")
* 要阻止摄像机显示地图之外的任何内容，你需要`使用 Cinemachine Confiner 定义一些边界。`
  要添加 Cinemachine Confiner，请转到 Virtual Camera Inspector 的底部，单击 Add Extension 下拉选单，然后选择 CinemachineConfiner：
  新添加的组件将显示一条警告，因此需要提供一个 Collider 2D 以用作边界。Confiner 可以使用 Composite Collider 2D 或 Polygon Collider 2D。

让我们将一个 Polygon Collider 2D 添加到场景中：
1.单击 Hierarchy 右上角的Create 按钮并选择 Create Empty 来创建一个新的游戏对象。
2.选择这个新的游戏对象，然后将其重命名为 CameraConfiner（在 Windows 上按 F2 或在 Mac 上按 Return，选中后再次单击，或使用 Inspector 顶部的框）。
3. 单击 Add Component 按钮，搜索 Polygon Collider 2D 并添加该组件。
4.在 Polygon Collider 2D 上，单击 Edit Collider 旁的按钮，然后移动各个点以将这些点放在每个角的水中央。可以在拖动时按 Delete 键来删除某个点（例如五边形上最顶端的点）。
5.在每个角都有一个点后，再次单击 Edit Collider 旁边的按钮。
   然后回到 vcam1 并将该游戏对象分配给 CinemachineConfiner 上的 Bounding Shape 2D 属性：
   现在，如果尝试单击 Play 来运行游戏，你的角色将从屏幕上消失。如果在 Scene 视图中查看，
4. `就会看到角色被推到了世界之外。因为世界现在位于大型碰撞体内，所以物理系统会直接将你的角色推出去。`

#### 摄像机边界和其他图层取消碰撞
1.在 Inspector 的右上角，单击 Layer 下拉选单，然后选择 Edit Layer。
2.选择一个空字段并将其命名为 Confiner。
3.在 Confiner 游戏对象上，将 Layer 下拉选单设置为 Confiner。
选择 Edit > Project Settings > Physics 2D，`layer collsion matrix`，然后取消勾选 Confiner 图层中的所有条目：
现在，Confiner 图层中的所有对象都不会与其他对象碰撞。进入运行模式，然后将 Ruby 四处移动。摄像机现在将停在地图边缘。



