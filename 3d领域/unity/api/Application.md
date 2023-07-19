#### Application.targetFrameRate
* Application.targetFrameRate = 10; 是用于设置游戏的目标帧率的属性。
* `帧率是指每秒钟显示的图像帧数，它决定了游戏的流畅度和响应性。`
* 通过将Application.targetFrameRate设置为一个特定的值，可以告诉Unity游戏引擎尝试将游戏的帧率限制在该值上。
* 在上述代码中，将目标帧率设置为10，`意味着游戏将尽可能地以每秒10帧的速度运行。`
* 这可以用于降低游戏的运行要求，以适应低性能设备或者特定的需求。

#### 游戏帧数的不同和游戏公平
* `position.x = position.x + 0.1f * horizontal;`
* 如果游戏以`每秒 60 帧`的速度运行，那么 Ruby 将移动 0.1 * 60，因此`每秒移动 6 个单位`。
* 但是，如果游戏以每秒 10 帧的速度运行，就像刚刚让游戏运行的那样，那么 游戏对象 仅移动 0.1 * 10，因此`每秒移动 1 个单位`！

* 如果一个玩家的计算机非常陈旧，只能以每秒 30 帧的速度运行游戏，而另一个玩家的计算机能以每秒 120 帧的速度运行游戏，
* `那么这两个玩家的主角的移动速度会有很大差异`。这样就会使游戏的难易程度提高或降低，具体取决于运行游戏的计算机。

#### 移动速度改为根据时间
* `要解决此问题，你需要以单位/秒来表示 游戏对象 的移动速度，而不是采用单位/帧`
* 下面就是按照单位/帧来移动的
```unity
public class RubyController : MonoBehaviour
{
   // 在第一次帧更新之前调用 Start
   void Start()
   { 
   }
   // 每帧调用一次 Update
   void Update()
   {
      float horizontal = Input.GetAxis("Horizontal");
      float vertical = Input.GetAxis("Vertical");
      Debug.Log(horizontal);
      Vector2 position = transform.position;
      position.x = position.x + 0.1f * horizontal;
      position.y = position.y + 0.1f * vertical;
      transform.position = position;
   }
}
```
* 改为按照单位/秒来移动
```unity
public class RubyController : MonoBehaviour
{
   // 在第一次帧更新之前调用 Start
   void Start()
   { 
       //QualitySettings.vSyncCount = 0;
       //Application.targetFrameRate = 10;
   }
   // 每帧调用一次 Update
   void Update()
   {
       float horizontal = Input.GetAxis("Horizontal");
       float vertical = Input.GetAxis("Vertical");
       Vector2 position = transform.position;
       position.x = position.x + 0.1f * horizontal * Time.deltaTime;
       position.y = position.y + 0.1f * vertical * Time.deltaTime;
       transform.position = position;
   }
}
```
* `如果游戏以每秒 10 帧的速度运行，则每帧耗时 0.1 秒。`
* `如果游戏以每秒 60 帧的速度运行，则每帧耗时 0.017 秒。如果将移动速度乘以该时间值，则移动速度将以秒表示。`
* `这样算到最后，这一秒最后的position位置就是一致的！`




