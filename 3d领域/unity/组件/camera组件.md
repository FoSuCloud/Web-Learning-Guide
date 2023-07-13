## camera组件
* 在左侧选中camera组件，然后在inspect界面
* `通过调整相机的视野（Field of View）或正交尺寸（Orthographic Size）来实现设置相机的尺寸`

* Unity 中的场景由游戏对象组成，而游戏对象连接了一组组件。对玩家而言的场景视图以同样的方式构建。
* `要查看场景，场景中的游戏对象必须具有 Camera 组件`。
* `创建新的场景时，其中将添加一个名为 Main Camera 的游戏对象，这个游戏对象具有 Camera 组件`。

* `摄像机指向游戏对象的 z 轴，其行为与所有其他游戏对象完全相同。`

* 在 Scene 视图中，您可以看到一个代表摄像机视锥体的辅助图标。
* 视锥体是一个看起来像顶部切割后`平行于底部的金字塔的实体形状`。这是`透视摄像机`可以`看到和渲染的区域的形状`。


#### Projection
* `透视相机（Perspective Camera）一般在3d项目使用`：
在Unity编辑器中选择你的相机对象。
在Inspector面板中找到"Camera"组件。
* `调整"Field of View"属性来改变相机的视野大小。较小的值会缩小视野，较大的值会增大视野。`

* `正交相机（Orthographic Camera）`：
在Unity编辑器中选择你的相机对象。
在Inspector面板中找到"Camera"组件。
将"Projection"属性设置为`"Orthographic"，启用正交投影。`
`调整"Size"属性来改变相机的正交尺寸。较小的值会缩小尺寸，较大的值会增大尺寸。`

#### 摄像机跟随游戏玩家
* 制作游戏时，有几种选择可确保摄像机跟随玩家角色。
* `一种解决方案是为此编写一段脚本`。
* 但是，Unity 具有针对该问题的`内置解决方案：Cinemachine`。

#### Cinemachine
* inemachine 是 Unity 针对游戏中与摄像机有关的所有问题的解决方案。该系统简单总结如下：
1.  在场景中创建一个或多个`“虚拟”摄像机`。
2.  这些虚拟摄像机由一个名为 `Cinemachine Brain 的组件进行管理`。
3.  Cinemachine Brain 与 Camera 组件连接到相同的游戏对象，默认情况下，这个游戏对象将是 Main Camera 游戏对象。
4.  Cinemachine Brain 管理所有虚拟摄像机，并确定实际摄像机应跟随哪个虚拟摄像机（或虚拟摄像机的组合）。

#### 创建虚拟摄像机
* 在 Project 窗口中，导航到 Assets > Scenes，然后双击 MainScene。
* 在顶部菜单中，选择 Cinemachine > Create Virtual Camera。

* 该对象`将在 Scene 窗口中摄像机的焦点处创建`，因此应该会位于 选中游戏对象 上面。
* 但是，由于现在您在场景中有了一个虚拟摄像机，`它会移动 Game 窗口的视图`，
* 因此您将无法再在 Game 窗口中看到 JohnLemon。

#### 虚拟摄像机设置为正确的角度
* 在 Hierarchy 中，选择 Cinemachine游戏对象。在 Cinemachine游戏对象的 Transform 组件上，
* `将围绕 x 轴的 Rotation 设置为 45。`
* `现在，虚拟摄像机向下倾斜并正在从上往下观看角色。这大致就是您需要的视角。`

#### Camera Distance
* Framing Transposer 的大多数默认设置都适合您的游戏。唯一需要更改的是 Camera Distance 设置；
* `角色在屏幕上有点太小，因此您需要将虚拟摄像机移近一点`。
* 将 Camera Distance 设置从 10 更改为 8。


