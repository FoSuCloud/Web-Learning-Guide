## drop事件不生效
```javascript
		svg.addEventListener('drop',function(event){
            event.preventDefault()
            console.log('drop')
        })
        // 要阻止目标元素的dragover事件，目标元素的drop事件才能生效
        svg.addEventListener('dragover',function(event){
            event.preventDefault()
        })
```

## 需要拖拽中的鼠标样式
* 如果要修改拖拽过程中的样式，需要在dragover事件中修改
* [https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer](参考)
```javascript
svg.addEventListener('dragover',function(event){
            event.preventDefault()
            if(event.dataTransfer){
                event.dataTransfer.dropEffect = "move"
            }
        })
```

## 拖拽例子
```javascript
export const Drag =  (element, options)=> {
	let isDragging = false;
  const moveFn = function(event) {
	event = event || window.event;
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
    if (options.drag) {
      options.drag(event);
    }
  };
  const upFn = function(event) {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(event);
    }
  };
  element.addEventListener('mousedown', function(event) {
    if (isDragging) return;
    document.onselectstart = function() { return false; };
    document.ondragstart = function() { return false; };

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
    isDragging = true;

    if (options.start) {
      options.start(event);
    }
  });
}

```
