## 应用于自动播放PPT
```
		<!-- 5s后自动刷新跳转到下一个网页，可以用于PPT的自动播放 -->
		<meta http-equiv="Refresh" content="5;URL=面经.md"> 
```
* `但是一般都是通过js来控制自动播放，因为使用meta标签的自动播放无法取消！`

## 搜索排行优化
* 通过`name="keywords"实现关键字提交到搜索引擎`
` <meta name="keywords" content="web前端个人简历,web前端,简历,一叶,前端个人博客,前端工程师">`


## viewport
1. 一个针对移动端优化过的页面的viewport meta标签为:
2. `<meta name="viewport" content="width:device-width,initial-scale=1;maximum-scale=1">`
3. meta标签一般有以下属性:
```
width:控制viewport大小，可以是指定像素值，也可以是设备宽度device-width
height:与width相对，是指定高度
initial-scale:初始缩放比例，也就是页面第一次Load的时候的缩放比例
maximum-scale:允许用户缩放的最大比例
minimum-scale:允许用户缩放的最小比例
user-scalable:用户是否可以手动缩放
```
* `viewport就是一个虚拟窗口，相当于手机的浏览器大小`
