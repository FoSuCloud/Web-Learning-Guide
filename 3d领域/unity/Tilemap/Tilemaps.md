## Tilemaps
* Create Tilemaps `创建磁贴地图,也叫瓦片地图 (Tilemap) `
* [参考]("https://docs.unity3d.com/Manual/Tilemap.html")

#### 创建瓦片地图
1.在 Hierarchy 窗口中，右键单击一个空白位置。
2.从上下文菜单中选择 2D Object > Tilemap。
此时将在 Hierarchy 窗口中创建两个游戏对象：
* `Grid（网格）`：顾名思义，场景中的`网格可用于将游戏对象均匀地放置在网格单元格中`。
* `Tilemap（瓦片地图）`：`此瓦片地图是网格的子游戏对象`。瓦片地图由`瓦片 (Tiles) `组成；在本教程中，可将瓦片视为特殊精灵。

#### 创建新瓦片
* 瓦片地图不会直接使用精灵，而是使用瓦片。要创建新瓦片，请执行以下操作：

1.在 Project 窗口中，选择 `Assets > Art`。
2.在文件夹内右键单击，然后选择 `Create > Folder`。将新文件夹命名为“Tiles”。
3.双击 Tiles 以打开文件夹。
4.在文件夹内右键单击，然后选择 `Create > Tile`。在对话框中，`将此瓦片命名为“FirstTile”`并保存。
5.在 Project 窗口中，选择 FirstTile。
6.在 Inspector 中，`可以看到瓦片资源的属性`。此处`包括一个 Sprite 字段（瓦片将绘制此精灵）：`

#### 修改瓦片地图
* `window -> 2D -> Time Palette`


* `transform.Find("Bg").gameObject;获取物体身上的子物体`
* `GetComponent<Animator>();获取物体身上的组件`
* `Resources.Load("Prefab/Flag") as GameObject;获取预制体`

