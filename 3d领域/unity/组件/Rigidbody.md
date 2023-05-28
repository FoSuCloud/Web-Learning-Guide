#### Rigidbody刚体
* Rigidbody 组件将游戏对象标记为`可移动的物理系统的一部分`。
* 由于您肯定希望角色能够移动并且我们希望其撞到墙壁（因此成为物理系统的一部分）

### sleeping mode
* `如果发现触发器过一段时间就没有触发了，需要把刚体的sleeping mode设置为Nerver sleep`
* `应该是刚体自动休眠了`

### body type
* `在Unity中，Rigidbody（刚体）组件的"Body Type"（刚体类型）属性用于定义刚体的行为方式和模拟方式。`
1. `Dynamic（动态）`：刚体将`受到物理力和碰撞的影响，`可以自由移动和旋转。
* 这是最常用的刚体类型，适用于需要进行物理模拟的对象，如`角色、物体`等。
2. `Kinematic（运动学）`：刚体将`通过代码控制移动和旋转`，不受物理力和碰撞的影响。它可以被用作`传送门、动画控制`等需要精确控制的对象。
3. `Static（静态）`：刚体将被固定在空间中，`不受任何力和碰撞的影响`。它通常用于`表示不可移动的障碍物、地面等静态对象`。


#### 禁用 Rigidbody 组件上的 Use Gravity `相当于失重`
* `禁用 Rigidbody 组件上的 Use Gravity 属性可以防止物体受到重力的影响而保持静止或自由运动，`
* 让开发者可以控制物体的运动轨迹和速度等属性。这在一些需要实现特定效果的场景中很有用，比如空中飞行物体、漂浮物体、翻滚运动等。
* 禁用 Use Gravity 属性后，仍然可以通过给 Rigidbody 添加力或设置速度等方式来控制物体的运动。


#### FixedUpdate
* `这个方法是通过物理适时调用的。FixedUpdate 不是在每个渲染的帧之前被调用，`
* 而是在物理系统处理所有碰撞和其他已发生的交互之前被调用。默认情况下，每秒正好调用 50 次这个方法。

#### OnAnimatorMove
* `此方法允许您根据需要应用 根运动，这意味着可以分别应用移动和旋转。`

#### 玩家移动&旋转实例
```c
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float turnSpeed = 20f;
    Vector3 vec;
    Animator animator;
    Rigidbody rigidbody;
    Quaternion rotation = Quaternion.identity;
    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponent<Animator>();
        rigidbody = GetComponent<Rigidbody>();
    }

    // 这个方法是通过物理适时调用的。FixedUpdate 不是在每个渲染的帧之前被调用，
    // 而是在物理系统处理所有碰撞和其他已发生的交互之前被调用。默认情况下，每秒正好调用 50 次这个方法。
    void FixedUpdate()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        vec.Set(horizontal, 0, vertical);
        vec.Normalize();

        bool hasHorizontalInput = !Mathf.Approximately(horizontal, 0f);
        bool hasVerticalInput = !Mathf.Approximately(vertical, 0f);
        bool isWalking = hasHorizontalInput || hasVerticalInput;
        animator.SetBool("isWalking", isWalking);

        // 计算角色的前向矢量
        // 旋转时 transform.forward背离和 vec朝向的矢量
        // 角度变化为 turnSpeed * Time.deltaTime，而大小变化为 0
        // Time.deltaTime 是距上一帧的时间（也可以将其视为两帧之间的时间）
        // turnSpeed 变量是您希望角色每秒旋转的角度（以弧度为单位）
        // 弧度是角度的另一种度量方式；与度相似，但更自然。一个圆为 2π 弧度，即大约为 6 弧度。
        // 您的角色总是选取最短的旋转长度，因此，角色转过的最大角度约为 3 弧度。
        Vector3 desiredForward = Vector3.RotateTowards(transform.forward, vec, turnSpeed * Time.deltaTime, 0f);

        // 存储旋转
        // 这里设置的 Quaternion.identity 值就是为其赋予无旋转的值，这是一个更合理的默认值
        rotation = Quaternion.LookRotation(desiredForward);
    }
    // 此方法允许您根据需要应用 根运动，这意味着可以分别应用移动和旋转。
    void OnAnimatorMove()
    {
        // 使用对 Rigidbody 组件的引用来调用其 MovePosition 方法，并传入唯一的参数：其新位置。新位置从刚体的当前位置开始，
        // 然后您在此基础上添加一个更改 — 移动矢量乘以 Animator 的 deltaPosition 的大小。
        // Animator 的 deltaPosition 是由于可以应用于此帧的根运动而导致的位置变化。
        // 您将其大小（即长度）乘以我们希望角色移动的实际方向上的移动向量。
        rigidbody.MovePosition(rigidbody.position + vec * animator.deltaPosition.magnitude);
        // 应用旋转
        rigidbody.MoveRotation(rotation);
    }
}
```


