## img是内联元素为什么可以设置宽高？
1. 根据之前学到的，内联元素可以设置line-height,font-size,padding,margin(虽然margin-top,margin-bottom不生效)
2. 但是内联元素设置宽度和高度不是不生效吗？
3. `内联元素分为替换元素和非替换元素`
4. `替换元素:浏览器会根据元素的标签或者属性来设置显示内容，例如input的number,password;textarea;img的src`
5. `非替换元素:内容直接显示在浏览器中，如span,b,embed都是直接显示元素`
6. 因为img属于内联替换元素，所以可以设置宽度和高度
