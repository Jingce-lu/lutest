# 移动 web 资源整理

[[toc]]

## 1. meta 基础知识

### H5 页面窗口自动调整到设备宽度，并禁止用户缩放页面

`<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />`

### 忽略将页面中的数字识别为电话号码

`<meta name="format-detection" content="telephone=no" />`

### 忽略 Android 平台中对邮箱地址的识别

`<meta name="format-detection" content="email=no" />`

### 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对 ios 的 safari

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- ios7.0版本以后，safari上已看不到效果 -->
```

### 将网站添加到主屏幕快速启动方式，仅针对 ios 的 safari 顶端状态条的样式

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```

### viewport 模板——通用

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
      name="viewport"
    />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
    <title>标题</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    这里开始内容
  </body>
</html>
```

## 2. 移动端如何定义字体 font-family

中文字体使用系统默认即可，英文用 Helvetica

```css
/* 移动端定义字体的代码 */
body {
  font-family: Helvetica;
}
```

## 3. ios 系统中元素被触摸时产生的半透明灰色遮罩怎么去掉

ios 用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置`-webkit-tap-highlight-color`的 alpha 值为 0，也就是属性值的最后一位设置为 0 就可以去除半透明灰色遮罩

```css
a,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0;);
}
```

## 4. webkit 表单输入框 placeholder 的颜色值能改变么

```css
input::-webkit-input-placeholder {
  color: #aaaaaa;
}
input:focus::-webkit-input-placeholder {
  color: #eeeeee;
}
```

## 5. 禁用 select 默认下拉箭头

`::-ms-expand` 适用于表单选择控件下拉箭头的修改，有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
select::-ms-expand {
  display: none;
}
```

## 6. 禁用 radio 和 checkbox 默认样式

`::-ms-check` 适用于表单复选框或单选按钮默认图标的修改，同样有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type="radio"]::-ms-check,
input[type="checkbox"]::-ms-check {
  display: none;
}
```

## 7. 禁用 PC 端表单输入框默认清除按钮

当表单文本输入框输入内容后会显示文本清除按钮，`::-ms-clear` 适用于该清除按钮的修改，同样设置使它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type="text"]::-ms-clear,
input[type="tel"]::-ms-clear,
input[type="number"]::-ms-clear {
  display: none;
}
```

## 8. 禁止 ios 长按时不触发系统的菜单，禁止 ios&android 长按时下载图片

```css
.css {
  -webkit-touch-callout: none;
}
```

## 9. 禁止微信浏览器图片长按出现菜单

```css
img {
  pointer-events: none;
  -webkit-pointer-events: none;
}
```

## 10. 禁止微信浏览器长按“显示在浏览器打开”

```js
document.oncontextmenu = function(e) {
  e.preventDefault();
};
```

## 11. 禁止 ios 和 android 用户选中文字

```css
.css {
  -webkit-user-select: none;
}
```

## 12. 打电话发短信写邮件怎么实现

打电话

```html
<a href="tel:0755-10086">打电话给:0755-10086</a>
```

发短信，winphone 系统无效

```html
<a href="sms:10086">发短信给: 10086</a>
```

写邮件，可参考《移动 web 页面给用户发送邮件的方法》

```html
<a href="mailto:xxx@foxmail.com">xxx@foxmail.com</a>
```

## 13. 屏幕旋转的事件和样式

事件  
`window.orientation`，取值：正负 90 表示横屏模式、0 和 180 表现为竖屏模式；

```js
window.onorientationchange = function() {
  switch (window.orientation) {
    case -90:
    case 90:
      alert("横屏:" + window.orientation);
    case 0:
    case 180:
      alert("竖屏:" + window.orientation);
      break;
  }
};
```

样式

```css
/* 竖屏时使用的样式 */
@media all and (orientation: portrait) {
  .css {
  }
}

/* 横屏时使用的样式 */
@media all and (orientation: landscape) {
  .css {
  }
}
```

## 14. audio 元素和 video 元素在 ios 和 andriod 中无法自动播放

应对方案：触屏即播

```js
$("html").one("touchstart", function() {
  audio.play();
});
```

## 15. 摇一摇功能

HTML5 `deviceMotion`：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。

## 16. 手机拍照和上传图片

`<input type="file">`的 `accept` 属性

```html
<!-- 选择照片 -->
<input type="file" accept="image/*" />
<!-- 选择视频 -->
<input type="file" accept="video/*" />
```

## 17. 消除 transition 闪屏

```css
.css {
  /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
  -webkit-transform-style: preserve-3d;
  /*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
  -webkit-backface-visibility: hidden;
}
```

## 18. 微信浏览器禁止页面上下拉动

```js
//禁止页面上拉下拉
document.body.addEventListener(
  "touchmove",
  function(e) {
    e.preventDefault(); //阻止默认的处理方式
  },
  { passive: false }
); //passive 参数不能省略，用来兼容ios和android
```
