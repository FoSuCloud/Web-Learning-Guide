## 添加元素path
```javascript
let svg = document.getElementById('svg')
    if(svg){
        let path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.setAttribute('stroke-width','2px')
        path.setAttribute('stroke','#404040')
        path.setAttribute("fill", "none");
        path.setAttribute('d',getPath())
        svg.appendChild(path)
    }
```
