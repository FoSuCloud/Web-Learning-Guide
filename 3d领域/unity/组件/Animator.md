###  Animator 组件
* 这意味着该游戏对象可以动画化

* Animator Controller 有一个状态机用于确定 Animator 组件在任何给定时间应该为其层级视图设置的动画。
* 该动画基于事先在 Animator Controller 上设置的动画剪辑。

#### 编辑
* 双击Animator 组件以便在 Animator 窗口中对它进行编辑。
* Animator 窗口有两个主要部分：
1. 左侧有一个面板用于编辑 Animator 层 (Layers) 和 Animator 参数 (Parameters)
2. 右侧有一个区域显示状态机本身


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

#### Animate Physics
* Animate Physics 是 Unity3D 中的一个组件，
* `它用于启用基于物理的动画，可以让物体在运动时更真实地受到重力、碰撞等力的影响。`
* 与传统的逐帧动画不同，Animate Physics 可以根据物理模拟自动生成动画效果，减少了手动制作动画的工作量，并且可以产生更加自然流畅的动画效果。

* `选中Animator组件,选择update mode下拉选择Animate Physics`

#### 弧度
* `弧度是角度的另一种度量方式；与度相似，但更自然。一个圆为 2π 弧度，即大约为 6 弧度。`

#### Has Exit Time有退出时间
* `在Unity中，Animator组件的"Has Exit Time"（有退出时间）选项用于确定在动画播放完毕后是否等待指定的退出时间。`
* `选中一条transition转换线，在右侧inspector，不勾选has exit time，表示立即进行转换`
* 如果"Has Exit Time"选项为false，表示动画将立即结束并立即执行过渡到下一个状态。换句话说，它不会等待退出时间，而是立即进行状态转换。

