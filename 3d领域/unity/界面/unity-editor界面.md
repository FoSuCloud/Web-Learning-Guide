### 面板构成



#### inspector面板
* `定义的public属性 如果是组件，那么在inspector面板可以展示，并且可以被拖拽赋值`
* `如果是private则不可以`
```c
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public Rigidbody rd;
    // Start is called before the first frame update
    void Start()
    {
        //rd = GetComponent<Rigidbody>();

        Debug.Log("game start !");
    }

    // Update is called once per frame
    void Update()
    {
        Debug.Log("game Update !");
        rd.AddForce(Vector3.right);
    }
}
```


#### 快速聚焦到某个物体
* `点击选中某个物体,然后按下快捷键f,界面会聚焦到该物体上`


