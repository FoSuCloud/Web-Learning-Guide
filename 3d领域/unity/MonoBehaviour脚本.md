### 脚本
* 脚本是一个包含一组计算机指令的文本文档。

#### MonoBehaviour 的形式
* MonoBehaviour 是特殊类型的脚本，可以像组件一样附加到游戏对象。这是因为它们是您可以自己编写的特定组件实例。
* 脚本与预制件有一些细微的相似之处：
    就像预制件一样，脚本被创建为资源。
    将脚本作为组件添加到游戏对象实际上是实例化该脚本，就像将预制件添加到场景就是实例化该预制件一样。

#### Start 方法
* Start 方法签名之后是一个代码块。此处定义了每次调用该方法时执行的所有代码。

#### Update 方法
* Update 方法是 MonoBehaviour 的另一个特殊方法。`在每一帧中将内容渲染到屏幕之前都会调用该方法。`

#### 矢量标准化
```c
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    Vector3 vec;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        vec.Set(horizontal, 0, vertical);
        vec.Normalize();
    }
}
```

* `移动矢量由两个数字组成，这两个数字的最大值可以为 1。如果它们两者的值都为 1，则矢量的长度（称为其大小）将大于 1。这便是勾股定理描述的三角形的边之间的关系。`

* `但是这样意味着我们的角色沿着对角线移动的速度将比沿着耽搁轴的移动速度更快`
* `但是为了确保不会发生这种情况,我们需要确保移动矢量始终具有相同的大小!`
* `所以我们需要对矢量进行标准化,也就是保持矢量的方向相同,但是将其大小更改为1!!!`
* vec.Normalize ();

#### GetComponent
*  GetComponent需要知道您要查找的组件类型



