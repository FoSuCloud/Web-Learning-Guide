## pointer-events
* pointer-events 用于指定在什么情况下，某个特定的图形元素可以成为鼠标事件的target
```text
/* Keyword values */
pointer-events: auto;
pointer-events: none;
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill;    /* SVG only */
pointer-events: visibleStroke;  /* SVG only */
pointer-events: visible;        /* SVG only */
pointer-events: painted;        /* SVG only */
pointer-events: fill;           /* SVG only */
pointer-events: stroke;         /* SVG only */
pointer-events: all;            /* SVG only */

/* Global values */
pointer-events: inherit;
pointer-events: initial;
pointer-events: unset;

```

#### none
* 元素永远不会成为鼠标事件的target (en-US)。
* 但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        a[href="http://example.com"] {
            pointer-events: none;
        }
    </style>
</head>
<body>
<ul>
    <li><a href="https://developer.mozilla.org/">MDN</a></li>
    <li><a href="http://example.com">example.com</a></li>
</ul>
</body>
</html>
```
* `http://example.com无法跳转，因为这个对应的a标签元素不会成为鼠标事件的target`

#### all
* `有些元素例如svg的某些元素默认不支持鼠标事件，那么可以设置pointer-events="all" 允许鼠标事件`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    </style>
</head>
<body>
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
    <circle id="all" cx="5" cy="5" r="2" fill="red" pointer-events="all" />
    <circle  id="none" cx="15" cy="5" r="2" fill="black" pointer-events="none"/>
</svg>

<script>
const svg = document.getElementsByTagName('svg')
if(svg && svg.length){
    const all = svg[0].getElementById('all')
    all.addEventListener('click',(e)=>{
        console.log('all:',e)
    })
    const none = svg[0].getElementById('none')
    none.addEventListener('click',(e)=>{
        console.log('none:',e)
    })
}
</script>
</body>
</html>
```
