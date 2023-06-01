## Instantiate
* 创建实例化(游戏)对象
* 用来在运行时 动态地创建对象的副本,让我们可以在游戏中生成,克隆或者创建新的对象

Instantiate 函数有多种重载形式，常用的形式如下：
```c#
public static Object Instantiate(Object original, Vector3 position, Quaternion rotation);
```
* original：要实例化的原始对象，通常是一个 GameObject 或其派生类 `或者是一个预制体`。
* position：新实例的位置坐标。
* rotation：新实例的旋转角度。

* 看个例子
```c#
public GameObject prefab; // 预制体对象，可以在 Inspector 窗口中设置

void Start()
{
    // 在位置 (0, 0, 0) 处实例化预制体对象
    GameObject newObject = Instantiate(prefab, Vector3.zero, Quaternion.identity);
}
```
* `把预制体作为原始对象传递给Instantiate，表示要创建一个预制体的对象`
* `Vector3.zero表示位置为(0,0,0)；另外一般还可以使用prefab.position表示预制体的位置`
* `Quaternion.identity表示旋转角度为0`

* `使用 Instantiate 函数可以在运行时动态地创建对象的副本，例如生成敌人、生成特效、动态生成关卡等。`

