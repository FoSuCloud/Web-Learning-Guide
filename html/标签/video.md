## 二倍速播放
* 可以直接在浏览器控制台输入
```javascript
/* play video twice as fast */
document.querySelector('video').defaultPlaybackRate = 2.0;//默认两倍速播放
document.querySelector('video').play();

/* now play three times as fast just for the heck of it */
document.querySelector('video').playbackRate = 3.0;  //修改此值设置当前的播放倍数

```