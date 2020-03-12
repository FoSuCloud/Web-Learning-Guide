## type为text时
1. onchange事件在输入并且失去焦点之后才触发！！！`失去焦点`！
2. oninput事件只要改变输入框内容就可以触发！但是如果`通过js改变value值不会触发`
3. `onpropertychange事件会在输入框内容改变时触发，即使是通过js改变的`
4. `但是onpropertychange事件只支持IE11 以下！！！以下`
