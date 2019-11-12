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
1. sp,这个主要用于字体显示，android的字体都是使用该单位
2. dp,设备独立像素,不同设备有不同的显示效果，一般来说，在android中除了使用sp对字体，都是使用dp设备独立像素来支持WXGA,HVGA等
3. android同时还支持pt(长度单位),px(像素)

## 日期选择器
```
<DatePicker
            android:id="@+id/datepi"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
			
DatePicker datepi;
    int year;
    int month;
    int day;
	
	onCreate函数内
datepi=findViewById(R.id.datepi);
        Calendar cal=Calendar.getInstance();//创建日期实例
        year=cal.get(Calendar.YEAR);
        month=cal.get(Calendar.MONTH);
        day=cal.get(Calendar.DAY_OF_MONTH);
		//获取当前年月日，初始化日期选择器时的初始时间就是这个
	
	datepi.init(year, month, day, new DatePicker.OnDateChangedListener() {
            @Override
            public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
//                PPTControl.this.year=year;  //如果要把值传递给onCreate函数外的变量就这样做
//                PPTControl.this.month=monthOfYear;
//                PPTControl.this.day=dayOfMonth;
                show(year,monthOfYear,dayOfMonth);//调用show函数
            }
        });
		
		private void show(int year,int month,int day){
        String str=year+"年"+month+"月"+day+"日";
        Toast.makeText(PPTControl.this,str,Toast.LENGTH_LONG).show();
    }
```

## 日期选择器显示不全(class继承的是appcompaActivity)
1. AS软件中默认类继承的是AppcompaActivity,而eclipse软件中类默认继承的是activity
2. `AppcompaActivity的类会自带顶部栏，activity默认没有顶部栏，所以想要显示完整的日期选择器可以设置类继承activity`
3. [参考](https://blog.csdn.net/today_work/article/details/79300181)

## 时间选择器TimePicker
```
        timepicker=findViewById(R.id.timepicker);
        timepicker.setIs24HourView(true);//采用24小时制，可以不设置，不设置就要调整am,pm
        timepicker.setOnTimeChangedListener(new TimePicker.OnTimeChangedListener() {
            @Override
            public void onTimeChanged(TimePicker view, int hourOfDay, int minute) {
                String str="时:"+hourOfDay+"分:"+minute;
                Toast.makeText(PPTControl.this, str, Toast.LENGTH_SHORT).show();
            }
        });

```

## 计时器
```
		ch=findViewById(R.id.chronometer);
        ch.setBase(SystemClock.elapsedRealtime());//获取当前的系统时间设置为起始时间
        ch.setFormat("%s");//设置时间格式
        ch.start();//开启计时器
        ch.setOnChronometerTickListener(new Chronometer.OnChronometerTickListener() {
            @Override
            public void onChronometerTick(Chronometer chronometer) {
                //SystemClock.elapsedRealtime()-ch.getBase()>3当前系统时间减去设置的起始时间
                if(SystemClock.elapsedRealtime()-ch.getBase()>3){
                    Toast.makeText(PPTControl.this, "超过3秒啦~", Toast.LENGTH_SHORT).show();
                }
            }
        });
```

##  进度条
1. `android进度条有三种，水平进度条，大圆圈进度条，小圆圈进度条`
2. 设置静态的水平进度条
```
        <ProgressBar
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/progress"
            style="?android:attr/progressBarStyleHorizontal" 设置进度条样式(水平进度条)
            android:max="100"	设置进度条最大值
            android:progress="30"  设置进度条初始值
            />
```