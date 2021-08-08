[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img]("参考")

## img是内联元素为什么可以设置宽高？
1. 根据之前学到的，内联元素可以设置line-height,font-size,padding,margin(虽然margin-top,margin-bottom不生效)
2. 但是内联元素设置宽度和高度不是不生效吗？
3. `内联元素分为替换元素和非替换元素`
4. `替换元素:浏览器会根据元素的标签或者属性来设置显示内容，例如input的number,password;textarea;img的src`
5. `非替换元素:内容直接显示在浏览器中，如span,b,embed都是直接显示元素`
6. 因为img属于内联替换元素，所以可以设置宽度和高度

## 支持展示的图片格式
```markdown
| 名称 ｜ MIME类型 ｜ 文件拓展名 ｜ 支持的浏览器 
｜ apng 动态便捷式图像 ｜ image/apng | .apng | Chrome, Edge, Firefox, Opera, Safari
｜ avif AV1 图像文件格式 ｜ image/avif | .avif | Chrome, Opera, Firefox
| BitMap File 位图文件 ｜ image/bpm | .bpm | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| Gif 图像互换格式 ｜ image/gif | .gif | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| ICO 图标 ｜ image/x-icon | .ico,.cur | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| jpeg 联合影像专业小组图像 ｜ image/jpeg | .jpeg,.jpg,.pjp,.pjpeg | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| png 便捷式网络图像 ｜ image/png | .png | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| svg 可缩放矢量图像 ｜ image/svg+html | .svg | Chrome, Edge, Firefox, Internet Explorer, Opera, Safari
| tiff 标签图像文件格式 ｜ image/tiff | .tif,.tiff | 	Safari
| webp 万维网图像格式 ｜ image/webp | .webp | Chrome, Edge, Firefox, Opera, Safari
```

