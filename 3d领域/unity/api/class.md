## 父子类 调用

#### 父类
* `protected virtual修饰Start函数`
```c
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Plant : MonoBehaviour
{

    protected virtual void Start()
    {

        animator = GetComponent<Animator>();
        // 动画速度设置为0,等于禁用动画
        animator.speed = 0;
    }


    // Update is called once per frame
    void Update()
    {
    }

}

```

#### 子类
* `子类使用protected override修饰Start函数`
* `通过base.调用父类的方法；如： base.Start(); // 调用父类的Start()函数，执行父类的逻辑`
```c
public class Sunflower : Plant
{
    protected override void Start()
    {
        base.Start(); // 调用父类的Start()函数，执行父类的逻辑
        // 添加子类特定的逻辑代码
        Debug.Log("Sunflower Start");
        // 其他代码...
    }
}
```

