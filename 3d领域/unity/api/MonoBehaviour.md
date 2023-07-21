## MonoBehaviour
* [官方API]("https://docs.unity3d.com/ScriptReference/MonoBehaviour.html")
* MonoBehavior是许多Unity脚本派生的基类。
* MonoBehavior提供了生命周期功能，使使用Unity进行开发变得更加容易。
* MonoBehaviors 始终作为游戏对象的组件存在，并且可以使用 GameObject.AddComponent 进行实例化。需要独立于游戏对象存在的对象应改为派生自可脚本对象。


## MonoBehaviour生命周期
1. Start `函数是在游戏对象被激活时调用的函数。它在脚本组件第一次启动时执行一次，`
* `通常用于进行初始化设置。在 Start 函数中，您可以初始化变量、获取引用、设置初始状态等操作。`
2. Update `函数是在每一帧更新时调用的函数。它在游戏对象被激活后每一帧都会执行一次，用于更新游戏逻辑。`
* `在 Update 函数中，您可以处理用户输入、更新游戏对象的位置、执行碰撞检测、播放动画等操作。`

* 上面两个是MonoBehaviour类最常用，也是默认创建会添加的生命周期函数，除此之外还有以下生命周期函数
1. Awake(): `当脚本对象被加载时调用，用于初始化对象的引用和设置初始状态`。
2. OnEnable(): 在脚本对象激活时调用，例如对象被启用或脚本组件被添加到对象上。可以用于进行一次性的设置或准备工作。
3. `FixedUpdate`(): 在固定的时间间隔（通常为每帧固定时间间隔）调用，用于`处理物理相关的逻辑和操作`。
4. LateUpdate(): 在所有 Update() 方法执行后调用，用于在最后一帧更新之前执行操作，例如摄像机跟随。
5. OnGUI(): 在每个 GUI 渲染帧时调用，用于绘制图形用户界面元素。
6. OnDisable(): 当脚本对象被禁用时调用，例如对象被停用或脚本组件被移除。可以用于清理资源或进行其他必要的操作。
7. OnDestroy(): 当脚本对象被销毁时调用，用于进行最后的清理和资源释放。

#### OnAnimatorMove
* MonoBehaviour.OnAnimatorMove()
* `用于处理动画移动以修改根运动的回调。`
* `此回调将在状态机和动画被评估之后的每一帧调用，但在 OnAnimatorIK 之前。`

#### FixedUpdate
* FixedUpdate函数的调用频率是固定的，`不受帧率的影响`。
* 默认情况下，`它每秒调用50次（每0.02秒一次）`，但可以通过修改Time.fixedDeltaTime来更改调用频率。

#### 什么时候更新animator组件
// Update: 每一帧中调用,更新Animator组件，游戏逻辑更新
// FixedUpdate: 在固定的时间间隔内调用,进行物理模拟和更新刚体

// 在Update方法中修改Animator组件的参数时，可能会与Animator组件自身的更新步骤产生冲突，导致不稳定的行为。

在2D项目中，在Update方法中直接更新Animator组件通常不会导致游戏对象的闪烁问题。这是因为在2D项目中，通常不涉及复杂的骨骼动画和动画状态机，而是使用SpriteRenderer组件来显示2D精灵。
SpriteRenderer组件的更新是在Update方法之后进行的，与Animator组件的更新时机相同。
因此，在Update方法中直接更新Animator组件的参数不会与SpriteRenderer组件的更新产生冲突，也不会导致游戏对象的闪烁问题。

在3D项目中，Animator组件通常用于控制角色的骨骼动画。如果在Update方法中频繁地切换动画状态，可能会导致动画状态之间的切换不稳定，从而产生闪烁效果。
确保动画状态切换的逻辑正确，并避免频繁的状态切换，可以帮助解决闪烁问题。
