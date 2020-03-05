## 修改图形用户界面
* 图形用户界面`需要修改的是.rc文件`,`查看根目录结构中的ControlMFC2.resource.script文件，用记事本打开`
```
IDD_CONTROLMFC2_DIALOG DIALOGEX 0, 0, 200, 70   //这里的四个数字就是中心坐标和宽高
STYLE DS_SETFONT | DS_FIXEDSYS | WS_MINIMIZEBOX | WS_POPUP | WS_VISIBLE | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME
EXSTYLE WS_EX_ACCEPTFILES | WS_EX_APPWINDOW
CAPTION "手环PPT"
FONT 9, "MS Shell Dlg", 0, 0, 0x1
BEGIN
    PUSHBUTTON      "开启服务器",IDC_BUTTON5,75,22,50,14   //本来还有textview这些组件的，删掉变成开启服务器
END
```

#### 修改图形用户界面后在.cpp,.h文件中修改相应的事件

## 添加图标
1. `[参考](https://blog.csdn.net/qq_35488967/article/details/78714683)`
2. 注意: 必须导入.ico文件，并且放在res文件夹中最好

## file not found
1. `在项目中删除文件后，可能导致文件找不到，这是因为.rc文件没有改变`
2. 解决方法:`在.rc文件中找到要删除的文件部分，删除`，[参考](https://blog.csdn.net/xuanshilee/article/details/6288570)

## 修改生成的软件名称
1. [参考](https://blog.csdn.net/missxy_/article/details/84861673)
