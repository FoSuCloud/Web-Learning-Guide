###  Animator 组件
* 这意味着该游戏对象可以`动画化`
* Animator Controller 有一个状态机用于确定 Animator 组件在任何给定时间应该为其层级视图设置的动画。
* 该动画基于事先在 Animator Controller 上设置的动画剪辑。

#### 编辑
* 双击Animator 组件以便在 Animator 窗口中对它进行编辑。
* Animator 窗口有两个主要部分：
1. 左侧有一个面板用于编辑 Animator 层 (Layers) 和 Animator 参数 (Parameters)
2. 右侧有一个区域显示状态机本身

#### Animator Controller（动画控制器）
Animator Controller（动画控制器）是用于管理角色`动画状态和过渡`的组件。
它允许你在`不同的动画状态之间进行平滑的过渡`，并`控制角色动画的播放逻辑`。
Animator Controller可以通过Unity编辑器的Animator窗口进行创建和编辑。

#### Animator Avatar（动画化身）
Animator Avatar（动画化身）是角色动画的关键组成部分。
它包含了角色模型的`骨骼结构、骨骼动画信息以及动画层权重`等。
Animator Avatar定义了角色动画的基本结构和动作细节，可以被多个Animator Controller共享。
在创建`Animator Controller时，你需要为其指定一个Animator Avatar。`

Avatar是角色模型的骨骼结构和姿势的定义，用于控制角色模型的动画。

#### Animation Clip
* `在2d游戏中，没有avatar资源，直接使用Animation Clip也可以生成动画`
`Animation Clip是包含动画数据的文件，描述了角色模型在不同时间点上的动画状态。`

* 在2d游戏项目中，先选中要添加动画的对象，点击 window->animation->animation 进入animation界面
* 拖拽图片进入界面，设置各种 animation clip设置
* animation生成后`默认是只读的`，需要修改的话需要重新创建
* `然后把animation clip资源拖拽到animator 界面就可以设置动画规则`

##### Parameters
* 单击 Animator 窗口左上角的 Parameters 选项卡。

* Animator Controller 的状态机根据其 Animator 参数的当前值进行决策。
* 这些 Animator 参数具有由脚本设置的值。每个独立变量都需要一个参数以用于影响角色正在播放的动画。

* Params有四种参数：
一个 float 参数，该参数具有浮点变量值（带小数位的数字）。
一个 int 参数，该参数具有整数值（不带小数位的数字）。
一个 bool 参数，该参数具有布尔值（可以是 true 或 false）。
一个 `trigger 参数，这是一种特殊的参数，不包含任何值 — 这会导致从一段动画切换到另一段动画。`


#### make transition
* `选中一个animation物体,右键点击make transition,就可以创建一个过渡动画`

#### Apply Root Motion
* 什么是根运动 (Root Motion)？

* 动画用于在特定层级视图中移动和旋转所有游戏对象。这些移动和旋转大多数都是相对于其父项完成的，
* `但是层级视图的父游戏对象没有父项，因此它们的移动不是相对的。`此父游戏对象也可以称为根 (Root)，因此其移动称为根运动 (Root Motion)。

* `在 Animator 组件上启用了 Apply Root Motion，因此根在动画中的任何移动都将应用于每一帧。`
* 由于 Animator 正在播放 Idle 动画，没有移动，因此 Animator 不会施加任何动作。

* 不启用apply root motion的影响
1。`位置不受影响`：即使在角色的动画中有移动的表现，角色的实际位置将保持不变。例如，如果动画中的角色向前移动，但未启用"Apply Root Motion"，则角色的位置将保持不动。
2。`旋转不受影响`：动画中的角色旋转操作也不会影响实际的角色旋转。如果角色在动画中旋转了，但未启用"Apply Root Motion"，则角色的旋转将保持不变。
3。`需要手动控制角色的运动`：由于动画不会直接影响角色的位置和旋转，如果需要角色移动或旋转，你需要手动编写`脚本`来控制角色的运动。例如，你可以使用刚体组件或者脚本中的移动函数来实现角色的移动。

* 当启用"Apply Root Motion"时，Animator组件会将角色动画的根动作应用于角色的位置和旋转。
* `这意味着角色的实际移动和旋转将受到动画的影响`。

#### Update Mode

* `Animate Physics 用于启用基于物理的动画，可以让物体在运动时更真实地受到重力、碰撞等力的影响。`
* 与传统的逐帧动画不同，Animate Physics 可以根据物理模拟自动生成动画效果，减少了手动制作动画的工作量，并且可以产生更加自然流畅的动画效果。
* `选中Animator组件,选择update mode下拉选择Animate Physics`

* `选择None,则需要使用脚本控制动画的播放`

#### 弧度
* `弧度是角度的另一种度量方式；与度相似，但更自然。一个圆为 2π 弧度，即大约为 6 弧度。`

#### Has Exit Time有退出时间
* `在Unity中，Animator组件的"Has Exit Time"（有退出时间）选项用于确定在动画播放完毕后是否等待指定的退出时间。`
* `选中一条transition转换线，在右侧inspector，不勾选has exit time，表示立即进行转换`
* 如果"Has Exit Time"选项为false，表示动画将立即结束并立即执行过渡到下一个状态。换句话说，它不会等待退出时间，而是立即进行状态转换。

#### update mode
* 设置为 `animate physics`
* `更加符合无力，和rigidbody结合，基于animator动画运动`

#### update
* animator在update周期移动角色
* `rigridbody组件在fixedupdate周期移动角色`

* `FixedUpdate周期用于运行所有的物理操作，这个循环不会改变更新的频率`




