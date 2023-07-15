## Image


#### Set Native Size
* 在Unity中，Set Native Size是一个常用的UI组件属性或方法，`通常用于调整图像或文本等UI元素的大小，使其与其原始的本地尺寸一致。`
* 当您在UI元素上使用Set Native Size时，它会根据元素所包含的内容（例如图像或文本）的`原始大小`来调整元素的大小。
* `这样可以确保UI元素以其原始分辨率或大小正确显示，而不会被拉伸或缩放。`

* `Set Native Size通常适用于使用图像或文本的UI元素，比如Image和Text组件。通过调整元素的大小，可以使其在不同分辨率或屏幕尺寸下都能正确显示，提供更好的视觉效果和用户体验。`
* 要使用Set Native Size，您可以选择相应的UI元素（如Image或Text），然后在Inspector窗口中找到Set Native Size选项，点击它即可自动调整元素的大小。

#### 图片渐变
* `首先添加一张图片，然后在图片基础上右键新建一个image(可以是黑色背景图片)`
* 首先在inspector界面，选择(黑色背景图片)color配置一定的透明度a
* `image type选择filled,就会在父级图片基础上填充这个图片`
* `fill method可以选择vertical，表示渐变是从下而上的；`
* `fill amount进行调整(1到0)，可以看到图片的渐变,从上而下，黑色背景消失；逐渐清晰`

Fill Method
* Horizontal：水平填充，从左到右。
* Vertical：垂直填充，从下到上。
* Radial 90：从中心点向外部填充一个90度的扇形区域。
* Radial 180：从中心点向外部填充一个180度的扇形区域。
* Radial 360：从中心点向外部填充一个360度的扇形区域。

Fill Amount
* `可以实现图像的动态填充效果`
* `将Fill Amount从0逐渐增加到1，可以实现逐渐填充图像的效果，用于展示进度条、生命值等场景。`

#### source image
* `这里选择要展示的图片image`

#### 整个界面居中-填充
* 设置react tranform组件的以下属性:
* archors(锚点,锚点的值是一个0到1之间的数字，表示相对于父容器的百分比。): 设置min:0,0; max:1,1
* react tranform: 0,0,0,0 上下左右都设置为0，表示位置是填满


