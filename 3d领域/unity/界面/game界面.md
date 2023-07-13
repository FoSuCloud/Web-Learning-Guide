#### 最左侧game/simulator
game和simulator视图的区别主要在于：
1。game视图是用来展示您的游戏在当前相机下的渲染效果，您可以选择`不同的分辨率和屏幕比例`来测试您的游戏在不同设备上的适配情况1。
2。simulator视图是用来模拟您的游戏在不同设备上的运行效果，您可以选择不同的预设设备或自定义设备，
`还可以模拟设备的特性，如刘海屏、安全区域、屏幕旋转、触摸输入`等。

#### stats
* `game界面的stats是一个显示实时渲染信息的窗口`，您可以通过点击game界面右上角的Stats按钮来打开或关闭它。
* stats窗口可以帮助您优化您的游戏性能，它包含了以下几类信息：

FPS：每秒渲染的帧数，越高越流畅。
CPU：处理一帧所花费的时间，分为主线程和渲染线程，越低越好。
Batches：一帧中绘制的批次数，越少越好。
Saved by batching：通过批次合并节省的绘制次数，越多越好。
Tris：一帧中绘制的三角形数，越少越好。
Verts：一帧中绘制的顶点数，越少越好。
Screen：屏幕的分辨率和内存占用，越低越好。
SetPass：一帧中切换着色器通道的次数，越少越好。
Shadow casters：一帧中投射阴影的物体数，越少越好。
Visible skinned meshes：一帧中可见的蒙皮网格渲染器数，越少越好。
Animation components playing：一帧中播放动画的组件数，越少越好。
Animator components playing：一帧中播放动画状态机的组件数，越少越好。






