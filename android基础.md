## 前情提要
1. 不知道何种原因，github一直没办法更新仓库，防火墙端口22也打开了，但还是不行，所以最后重新生成设置ssh

## 闭合标签/不闭合标签
1. 在android studio中想要`快速生成标签就先输入< ;填好属性后输入/`
2. `需要注意的是，不闭合标签才是使用/  ;有闭合标签的元素需要输入>`

## CompoundButton
1. CompoundButton`具有子类 RadioButton单选框,CheckBox复选框,switch, ToggleButton`
2. 是状态切换控件，[参考](https://www.cnblogs.com/android001/p/4311558.html)

## 复选框
```
<CheckBox
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/like1"
            android:text="音乐"/>
        <CheckBox
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/like2"
            android:text="美术"/>
        <CheckBox
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/like3"
			android:checked="true"  //可以设置初始状态是否选中
            android:text="体育"/>

final CheckBox box1=findViewById(R.id.like1);  //如果在onCreate函数内部声明的话，那么需要加final			
box1.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if(box1.isChecked()){
                    System.out.println(box1.getText());
                }
            }
        });
```

## mainfest设置theme主题
1. @style/AppTheme 指的是系统默认的标题栏
2. [参考](https://cloud.tencent.com/developer/article/1025731)

## sp/dp/px/pt
