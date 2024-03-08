## d
* 属性d实际上是一个字符串，包含了一系列路径的描述
* 包含以下指令:
1. Moveto
2. LineTo
3. CurveTo
4. ArcTo
5. ClosePath
6. H,V

* `这些命令是大小写敏感，也就是大写表示参数是绝对位置。小写表示指明的是相对于当前位置的点`

1. MoveTo:拿起画笔在一个地方重新开始绘制。`一般作为一个路径的开始`
* `如果没有一个初始化的MoveTo，那么我们的线条开始位置将会是上一个操作发生的地方！`
* 句法： M x,y (绝对坐标)； m dx,dy(相对当前点的位置`也就是往左右/往上下位移的距离`)

2. lineTo: 绘制一个直线段，从当前位置移动到指定位置
* 句法：L x,y(绝对坐标); l dx,dy(相对位移);

3. CurveTo:CurveTo（curve曲线）
* 分为立方曲线和二次方曲线两种。贝塞尔曲线具体看path元素

4. ArcTo: 描述一个椭圆弧曲线路径。
* 句法： A rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y
* rx,ry表示椭圆的x,y轴半径。xAxisRotate支持改变x轴相对于当前引用框架的方向(`什么作用?`)
* LargeArcFlag表示画大弧(1),小弧(0)
* SweepFlag表示是顺时针(1),逆时针(0)
```html
<svg  x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100">
    <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(37,84,216,1)"></stop>
            <stop offset="25%" stop-color="rgba(37,84,216,0.7)"></stop>
            <stop offset="50%" stop-color="rgba(37,84,216,0.4)"></stop>
            <stop offset="75%" stop-color="rgba(37,84,216,0.1)"></stop>
            <stop offset="100%" stop-color="white"></stop>
        </linearGradient>
    </defs>
    <path
        d="M 50,50 m -13,0 a 13,13 0 1 ,1, 26,0"
        fill="none"
        stroke="url(#linear)"
        stroke-width="2"
        stroke-dasharray="(57.148, 81.64)"
        stroke-dashoffset="20.41"
    />
    <path
            d="M 50,50 m -13,0 a 13,13 0 1 ,0, 26,0"
            fill="none"
            stroke="url(#linear)"
            stroke-width="2"
            stroke-dasharray="(57.148, 81.64)"
            stroke-dashoffset="20.41"
    />
</svg>
```

5. ClosePath:表示从当前点指向第一个点，画一条直线.
句法： `Z,z作用都一样`

6. 另外还有H,V指令
   | H | 水平直线 ｜ x | 保持当前的y轴坐标不变，x轴移动到x形成水平线
   ｜ V ｜ 垂直直线 ｜ y | 保持当前的x轴坐标不变，y轴移动到y形成垂直线
