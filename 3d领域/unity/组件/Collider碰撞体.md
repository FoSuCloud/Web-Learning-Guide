#### 碰撞体
* 碰撞体是一个通用术语，涵盖了许多不同的组件。
* 碰撞体定义了用于物理碰撞的对象的形状，使角色能够碰撞其他对象以及被碰撞。
* Collider 组件具有许多不同的形状，但是最适合 JohnLemon 的最简单形状是胶囊碰撞体 (Capsule Collider)。


### Capsule Collider
* 胶囊碰撞体 

### box Collider
* 碰撞体

#### edit colider
* `编辑碰撞体范围，点击之后在scene界面可以通过上下左右的绿点改变碰撞体范围`

#### 禁用碰撞器
```c
        // 禁用碰撞器
        BoxCollider2D boxCollider2D = GetComponent<BoxCollider2D>();
        boxCollider2D.enabled = false;
```

#### mesh Collider

