### 复合碰撞体
* [参考]("https://learn.unity.com/tutorial/shi-jie-jiao-hu-zu-zhi-yi-dong?uv=2020.3&projectId=5facf921edbc2a2003a58d3a#6073de22edbc2a0021c5b6fc")

正如在 Scene 视图中看到的，每个瓦片都是一个单独的碰撞体。
这种方法效果良好，但会产生两个问题：
1.`物理系统的计算量更大`；如果你的世界很大，可能会减慢你的游戏速度。
2.`在瓦片之间的边界上会产生小问题`。由于瓦片是两个并排的碰撞体，并且两者之间存在微小间隙，
`因此有时计算上的微小误差也可能导致仍会发生碰撞的罕见情况`。

为了解决这些问题，Unity 提供了一个名为 Composite Collider 2D 的组件。此组件可以获取对象（或对象的子对象）上的所有碰撞体，并由此创建一个大碰撞体。

让我们来添加并配置此组件：

1.  在 Hierarchy 中，选择 Tilemap 游戏对象。
2. 在 Inspector 中，单击 Add Component 按钮。
3. 搜索“Composite Collider 2D”，然后选择此组件。
   你会看到自动添加 Rigidbody 2D 组件，因为复合碰撞体需要 Rigidbody 2D 才能正常运行。
4. 在 Tilemap Collider 2D 组件中，启用 Used By Composite 复选框。
5.在 Rigidbody 2D 组件中，将 Rigidbody Body Type 属性设置为 Static。

`将此属性设置为 Static 将阻止你的世界移动`。此外还有助于物理系统优化计算，因为它现在知道刚体不能移动。


