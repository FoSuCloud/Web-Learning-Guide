## Resources
* "Resources" 文件夹是 Unity3D 中的一个特殊文件夹，`用于存放可以在运行时动态加载的资源`。
* 当您将游戏对象拖拽到 "Resources" 目录下时，
* `该游戏对象会被视为可在运行时加载的资源，并可以通过代码动态加载和实例化。`


### Resources API
* Unity中的Resources API是一组用于在运行时加载和访问资源的功能。通过Resources API，
* 您可以将资源文件放置在"Resources"文件夹中，并使用简单的API进行加载和访问，而无需提前引用或链接资源。

以下是Resources API的一些常用方法和功能：
* Resources.Load：用于同步加载资源。可以通过资源的名称（包括文件路径）和类型来加载资源。例如：
```coffeescript
GameObject prefab = Resources.Load<GameObject>("Prefabs/MyPrefab");
Sprite sprite = Resources.Load<Sprite>("Sprites/MySprite");

```
* Resources.LoadAsync：用于异步加载资源。类似于Resources.Load，但是在后台异步加载资源，避免阻塞主线程。例如：
```coffeescript
ResourceRequest request = Resources.LoadAsync<GameObject>("Prefabs/MyPrefab");
yield return request;
GameObject prefab = request.asset as GameObject;
```

* Resources.UnloadUnusedAssets：用于释放未使用的资源。当某些资源不再需要时，可以手动调用此方法来释放内存。例如：
```coffeescript
Resources.UnloadUnusedAssets();

```

* Resources.FindObjectsOfTypeAll：用于查找场景中所有指定类型的资源。返回一个数组包含所有匹配类型的资源对象。例如：
```coffeescript
GameObject[] objects = Resources.FindObjectsOfTypeAll<GameObject>();

```

* Resources.GetBuiltinResource：用于获取Unity内置资源，例如内置的shader、字体等。可以通过资源类型和名称来获取。例如：

```coffeescript
Font font = Resources.GetBuiltinResource<Font>("Arial.ttf");

```

需要注意的是，Resources API在Unity中被视为一种简单而便捷的加载和访问资源的方式，但在大型项目中不建议过度使用。这是因为Resources文件夹中的所有资源都会被打包进应用程序，可能导致应用程序体积增大，并且无法通过AssetBundle等方式进行更灵活的资源管理。

对于更复杂的资源管理需求，推荐使用Unity的Addressable Assets System或AssetBundle系统，这些系统提供了更高级和灵活的资源加载和管理功能。


