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

## 注册页面
1. 为了帮女票做安卓作业弄了一下注册页面，发现还挺简单的
```
selected=findViewById(radioGroup01.getCheckedRadioButtonId());//选中的性别的id
		对于添加按钮
        button02.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                String sex=selected.getText().toString();//性别
                String nation=spinner01.getSelectedItem().toString();//民族
                String str=tv_name.getText()+"——"+tv_stu_num.getText()+"——"+sex+"——"+nation+
                        "——"+arriveDateBtn.getText()+"——"+profe.getText()+"——"+cla.getText();
                if(tv_name.getText().length()==0){
                    Toast.makeText(MainActivity.this,"姓名不能为空！",Toast.LENGTH_LONG).show();
                }else if(tv_stu_num.getText().length()==0){
                    Toast.makeText(MainActivity.this,"学号不能为空！",Toast.LENGTH_LONG).show();
                }else if(profe.getText().length()==0){
                    Toast.makeText(MainActivity.this,"专业不能为空！",Toast.LENGTH_SHORT).show();
                }else if(cla.getText().length()==0){
                    Toast.makeText(MainActivity.this,"班级不能为空！",Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(MainActivity.this,str,Toast.LENGTH_LONG).show();
                }
            }
        });
//需要注意的是，不要在onClick方法之前就getText()，这样是错误的，因为点击之前的文本是默认文本
//另外如果要保存数据为String,那么需要getText().toString()

//清空按钮
        button03.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                tv_name.setText("");
                tv_stu_num.setText("");
                profe.setText("");
                cla.setText("");
                man.setChecked(true);//性别
                woman.setChecked(false);
                arriveDateBtn.setText("");//出生日期
                spinner01.setSelection(0,true);//设置XSpinner当前值为汉族(索引为0)
            }
        });
// 弹出日期选择器的框(选择OK之后就退出)
        Button05.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                // 通过View.inflate去找到需要在本页面用到的其他layout文件
                //getApplicationContext返回的是应用的上下文
                View view = View.inflate(getApplicationContext(), R.layout.date_time_picker, null);
                final DatePicker datePicker =view.findViewById(R.id.new_act_date_picker);//获取view这个layout中的日期选择器
                int month;
                int day;
                int year;
                final Calendar c = Calendar.getInstance();
                year = c.get(Calendar.YEAR);
                month = c.get(Calendar.MONTH);
                day = c.get(Calendar.DAY_OF_MONTH);
                datePicker.init(year, month, day, null);//初始化日期选择器(初始值为当前年月日)
                // AlertDialog就是一个对话框,而AlertDialog.Builder就是一个内部静态类，可以通过AlertDialog.Builder获取到一个AlertDialog对象
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setView(view);//给该对话框添加一个layout文件页面，对话框显示layout文件内容
				//android.R.string.ok也就是给该对话框添加一个OK的按钮，点击该按钮就退出该对话框
                builder.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        final int arrive_year = datePicker.getYear();
                        final int arrive_month = datePicker.getMonth();
                        final int arrive_day = datePicker.getDayOfMonth();
                        String dateStr=arrive_year+"-"+arrive_month+"-"+arrive_day;
                        System.out.println(dateStr);
                        arriveDateBtn.setText(dateStr);//在MainActivity所在的页面的arriveDateBtn日期文本位置设置值
                    }
                });
                builder.show();//显示对话框
            }
        });
```
2. 干货
```
2.1 从RadioGroup获取选中的RadioButton,通过findViewById(radioGroup01.getCheckedRadioButtonId())找到选中的按钮的id，然后就可以通过findViewById找到选中的按钮
2.2 获取RadioButton的文本也是通过selected.getText().toString();
2.3 修改RadioButton的状态，man.setChecked(true);选中男， woman.setChecked(false);不选中女
2.4 获取Spinner的文本值spinner01.getSelectedItem().toString();
2.5 更改Spinner当前选中值，spinner01.setSelection(0,true)，第一个参数是索引值，从零开始，第二个参数是true,表示选中
```
3. `在本页面显示其他页面内容`
```
                // 通过View.inflate去找到需要在本页面用到的其他layout文件
                //getApplicationContext返回的是应用的上下文
                View view = View.inflate(getApplicationContext(), R.layout.date_time_picker, null);
				
				// AlertDialog就是一个对话框,而AlertDialog.Builder就是一个内部静态类，可以通过AlertDialog.Builder获取到一个AlertDialog对象
				AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
				builder.setView(view);//给该对话框添加一个layout文件页面，对话框显示layout文件内容
				
				//android.R.string.ok表示点击OK按钮就退出该对话框
				 builder.setPositiveButton(android.R.string.ok, new DialogInterface....
				builder.show();显示对话框
```

## android图片使用png和jpg
1. `android开发对png图片情有独钟！`
2. png和jpg图片的对比
---
1. `png有透明通道，jpg没有`
2. `png是无损压缩，jpg是无损压缩，所以png图片可以存储比较多的图片信息(颜色),但是带来的缺点是png图片的体积较大`
3. `虽然因为存储了比较多的信息，png图片的体积较大，但是android对png图片情有独钟，会对png图片采用硬件加速，所以png图片实际的加载速度是快于jpg图片的`
---
* `所以对于android开发中，android包中用到的图片都是使用png格式;而对于网络图片，考虑到网络速度和流量，我们一般使用jpg格式`
* `但是！对于背景页引导页这些大尺寸的图片来说，我们还是用jpg格式比较好，虽然加载较慢，但是减小了开发包的体积`
