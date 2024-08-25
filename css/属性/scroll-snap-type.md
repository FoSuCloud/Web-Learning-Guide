#### scroll-snap-type
* CSS 属性 scroll-snap-type 设置了在`有滚动容器的情形下吸附至吸附点`的严格程度。

```css
/* 不吸附 */
scroll-snap-type: none;

/* 表示吸附轴的关键字 */
scroll-snap-type: x;
scroll-snap-type: y;
scroll-snap-type: block;
scroll-snap-type: inline;
scroll-snap-type: both;

/* 表示吸附程度的可选关键字 */
/* mandatory 或 proximity */
scroll-snap-type: x mandatory;
scroll-snap-type: y proximity;
scroll-snap-type: both mandatory;

/* 全局值 */
scroll-snap-type: inherit;
scroll-snap-type: initial;
scroll-snap-type: revert;
scroll-snap-type: revert-layer;
scroll-snap-type: unset;
```

#### 具体值的含义
none
在滚动此滚动容器的可见视口时，必须忽略吸附点。

x
滚动容器仅在其横轴上吸附至吸附位置。

y
滚动容器仅在其纵轴上吸附至吸附位置。

block
滚动容器仅在其块向轴上吸附至吸附位置。

inline
滚动容器仅在其行向轴上吸附至吸附位置。

both
滚动容器在其两轴上独立地吸附至吸附位置（可能在各轴上吸附至不同的元素）。

mandatory
若滚动容器当前未在滚动，则其可见视口必须吸附至吸附位置。

proximity
若滚动容器当前未在滚动，则其可见视口可以吸附至吸附位置。是否吸附由用户代理根据滚动参数决定。若指定了吸附轴，则此为默认的吸附程度。
