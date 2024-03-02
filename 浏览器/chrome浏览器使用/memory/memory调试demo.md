#### html dom 变化
* `首先记录一下没有点击按钮前的snapshot, 然后点击按钮`
* `选择Comparison对比，选择HTMLDivElement,可以看到#Delta +100， 正好是我们新增的100个元素`
```html
<!DOCTYPE html>
<h1>Example 1</h1>


<h1>Example 1: Watch the memory grow</h1>
<ol>
    <li>Open DevTools</li>

    <li>Select Timeline Tab</li>

    <li>Select Memory</li>

    <li>Record</li>

    <li>Push The Button</li>

</ol><button onclick="grow()">The Button</button>

<div id="nodes"></div>
<script>
    var x = [];

    function createSomeNodes() {
        var div,
            buf,
            i = 100,
            frag = document.createDocumentFragment();
        for (; i > 0; i--) {
            div = document.createElement('div');
            buf = document.createTextNode(i + ' - ' + new Date().toTimeString());
            div.appendChild(buf);
            frag.appendChild(div);
        }
        document.getElementById('nodes').appendChild(frag);
    }
    function grow() {
        x.push('abc'.repeat(1024));
        createSomeNodes();
        setTimeout(grow, 10*1000);
    }
</script>

<hr>
<pre>
var x = [];

function createSomeNodes() {
    var div,
        i = 100,
        frag = document.createDocumentFragment();
    for (;i &gt; 0; i--) {
        div = document.createElement("div");
        div.appendChild(document.createTextNode(i + " - "+ new Date().toTimeString()));
        frag.appendChild(div);
    }
    document.getElementById("nodes").appendChild(frag);
}
function grow() {
    x.push(new Array(1000000).join('x'));
    createSomeNodes();
    setTimeout(grow,1000);
}
</pre>
```
