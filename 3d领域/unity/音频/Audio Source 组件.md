## Audio Source 组件
* [参考]("https://docs.unity3d.com/cn/2021.1/Manual/class-AudioSource.html")

#### Play On Awake
* 启用Play On Awake，这意味着，一旦关卡开始，音频就会开始播放。

####  Loop
* 默认情况下，音频将在单次完整运行后停止。启用 Loop 复选框可以`循环播放`游戏的环境音轨。

#### Volume
* 声音的大小与离__音频监听器__的距离成正比，以米为世界单位。

### 3d音频

#### 3D Sound Settings 
* 3D Sound Settings 用于控制音频如何随着与音频监听器 (Audio Listener) 之间的距离不同而变化。

* 将 `Max Distance 属性更改为 10`。将 Max Distance 设置为 10 意味着，当该游戏对象在 10 米外时，玩家将可以非常轻微地听到它们的声音。

#### Volume Rolloff
* `音量随距离而变化的方式`由 Volume Rolloff 控制。目前，此设置为 `Logarithmic Rolloff，非常适合用于较远的距离`。
* 由于您的 Max Distance 现在仅为 10，请将 Volume Rolloff 更改为 Custom Rolloff。



