(window.webpackJsonp=window.webpackJsonp||[]).push([[221],{658:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"微信-h5-兼容性坑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微信-h5-兼容性坑"}},[t._v("#")]),t._v(" 微信 H5 兼容性坑")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_1、ios-端兼容-input-光标高度"}},[t._v("1、ios 端兼容 input 光标高度")])]),a("li",[a("a",{attrs:{href:"#_2、ios-端微信-h5-页面上下滑动时卡顿、页面缺失"}},[t._v("2、ios 端微信 h5 页面上下滑动时卡顿、页面缺失")])]),a("li",[a("a",{attrs:{href:"#_3、ios-键盘唤起-键盘收起以后页面不归位"}},[t._v("3、ios 键盘唤起，键盘收起以后页面不归位")])]),a("li",[a("a",{attrs:{href:"#_4、安卓弹出的键盘遮盖文本框"}},[t._v("4、安卓弹出的键盘遮盖文本框")])]),a("li",[a("a",{attrs:{href:"#_5、vue-中路由使用-hash-模式-开发微信-h5-页面分享时在安卓上设置分享成功-但是-ios-的分享异常"}},[t._v("5、Vue 中路由使用 hash 模式，开发微信 H5 页面分享时在安卓上设置分享成功，但是 ios 的分享异常")])]),a("li",[a("a",{attrs:{href:"#题外话"}},[t._v("题外话：")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"_1、ios-端兼容-input-光标高度"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、ios-端兼容-input-光标高度"}},[t._v("#")]),t._v(" 1、ios 端兼容 input 光标高度")]),t._v(" "),a("p",[a("strong",[t._v("问题详情描述")]),t._v("：input 输入框光标，在安卓手机上显示没有问题，但是在苹果手机上")]),t._v(" "),a("p",[t._v("当点击输入的时候，光标的高度和父盒子的高度一样。例如下图，左图是正常所期待的输入框光标，右边是 ios 的 input 光标。")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/images/prepare/mobile/2020050701.webp"),alt:"prepare/mobile/2020050701.webp"}})]),t._v(" "),a("p",[a("strong",[t._v("出现原因分析")]),t._v("：通常我们习惯用 height 属性设置行间的高度和 line-height 属性设置行间的距离（行高），当点击输入的时候，光标的高度就自动和父盒子的高度一样了。（谷歌浏览器的设计原则，还有一种可能就是当没有内容的时候光标的高度等于 input 的 line-height 的值，当有内容时，光标从 input 的顶端到文字的底部")]),t._v(" "),a("p",[a("strong",[t._v("解决办法")]),t._v("：高度 height 和行高 line-height 内容用 padding 撑开")]),t._v(" "),a("p",[t._v("例如：")]),t._v(" "),a("div",{staticClass:"language-less line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-less"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".content")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("float")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" border"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 88px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("calc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("100% "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" 240px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".content-input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" block"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" border"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #333333"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 28px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//line-height: 88px;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding-top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding-bottom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br")])]),a("h2",{attrs:{id:"_2、ios-端微信-h5-页面上下滑动时卡顿、页面缺失"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、ios-端微信-h5-页面上下滑动时卡顿、页面缺失"}},[t._v("#")]),t._v(" 2、ios 端微信 h5 页面上下滑动时卡顿、页面缺失")]),t._v(" "),a("p",[a("strong",[t._v("问题详情描述")]),t._v("：在 ios 端，上下滑动页面时，如果页面高度超出了一屏，就会出现明显的卡顿，页面有部分内容显示不全的情况，例如下图，右图是正常页面，边是 ios 上下滑动后，卡顿导致如左图下面部分丢失。")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/images/prepare/mobile/2020050702.webp"),alt:"prepare/mobile/2020050702.webp"}})]),t._v(" "),a("p",[a("strong",[t._v("出现原因分析")]),t._v("：")]),t._v(" "),a("p",[t._v("笼统说微信浏览器的内核，Android 上面是使用自带的 WebKit 内核，iOS 里面由于苹果的原因，使用了自带的 Safari 内核，Safari 对于"),a("code",[t._v("overflow-scrolling")]),t._v("用了原生控件来实现。对于有"),a("code",[t._v("-webkit-overflow-scrolling")]),t._v("的网页，会创建一个 UIScrollView，提供子 layer 给渲染模块使用。【有待考证】")]),t._v(" "),a("p",[a("strong",[t._v("解决办法")]),t._v("：只需要在公共样式加入下面这行代码")]),t._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-webkit-overflow-scrolling")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("But，这个属性是有 bug 的，比如如果你的页面中有设置了绝对定位的节点，那么该节点的显示会错乱，当然还有会有其他的一些 bug。")]),t._v(" "),a("p",[t._v("拓展知识： -webkit-overflow-scrolling:touch 是什么？")]),t._v(" "),a("p",[t._v("MDN 上是这样定义的：")]),t._v(" "),a("blockquote",[a("p",[t._v("-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果."),a("br"),t._v("\nauto: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。"),a("br"),t._v("\ntouch: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。")])]),t._v(" "),a("h2",{attrs:{id:"_3、ios-键盘唤起-键盘收起以后页面不归位"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、ios-键盘唤起-键盘收起以后页面不归位"}},[t._v("#")]),t._v(" 3、ios 键盘唤起，键盘收起以后页面不归位")]),t._v(" "),a("p",[a("strong",[t._v("问题详情描述")]),t._v("：")]),t._v(" "),a("p",[t._v("输入内容，软键盘弹出，页面内容整体上移，但是键盘收起，页面内容不下滑")]),t._v(" "),a("p",[a("strong",[t._v("出现原因分析")]),t._v("：")]),t._v(" "),a("p",[t._v("固定定位的元素 在元素内 input 框聚焦的时候 弹出的软键盘占位 失去焦点的时候软键盘消失 但是还是占位的 导致 input 框不能再次输入 在失去焦点的时候给一个事件")]),t._v(" "),a("p",[a("strong",[t._v("解决办法")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("list-warp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("title"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("投·被保险人姓名"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("content-input"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("placeholder")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入姓名"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-model")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("peopleList.name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@focus")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("changefocus()"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@blur.prevent")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("changeBlur()"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("changeBlur")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" u "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userAgent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("appVersion"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" isIOS "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("u"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\(i[^;]+;( U;)? CPU.+Mac OS X")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("isIOS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" scrollHeight "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v("\n       document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n\n      window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("max")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("scrollHeight "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("p",[t._v("拓展知识： "),a("code",[t._v("position: fixed")]),t._v("的元素在 ios 里，收起键盘的时候会被顶上去，特别是第三方键盘")]),t._v(" "),a("h2",{attrs:{id:"_4、安卓弹出的键盘遮盖文本框"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、安卓弹出的键盘遮盖文本框"}},[t._v("#")]),t._v(" 4、安卓弹出的键盘遮盖文本框")]),t._v(" "),a("p",[a("strong",[t._v("问题详情描述")]),t._v("：")]),t._v(" "),a("p",[t._v("安卓微信 H5 弹出软键盘后挡住 input 输入框，如下左图是期待唤起键盘的时候样子，右边是实际唤起键盘的样子")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/images/prepare/mobile/2020050703.webp"),alt:"prepare/mobile/2020050703.webp"}})]),t._v(" "),a("p",[t._v("出现原因分析：待补充")]),t._v(" "),a("p",[a("strong",[t._v("解决办法")]),t._v("：给 input 和 textarea 标签添加 focus 事件，如下，先判断是不是安卓手机下的操作，当然，可以不用判断机型，Document 对象属性和方法，setTimeout 延时 0.5 秒，因为调用安卓键盘有一点迟钝，导致如果不延时处理的话，滚动就失效了")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("changefocus")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" u "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userAgent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("appVersion"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" isAndroid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" u"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Android'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" u"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Linux'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("isAndroid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("activeElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoViewIfNeeded")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("activeElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollIntoView")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])]),a("p",[t._v("拓展知识：")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("Element.scrollIntoView()")]),t._v("方法让当前的元素滚动到浏览器窗口的可视区域内。而"),a("code",[t._v("Element.scrollIntoViewIfNeeded()")]),t._v("方法也是用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。但如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动")])]),t._v(" "),a("h2",{attrs:{id:"_5、vue-中路由使用-hash-模式-开发微信-h5-页面分享时在安卓上设置分享成功-但是-ios-的分享异常"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、vue-中路由使用-hash-模式-开发微信-h5-页面分享时在安卓上设置分享成功-但是-ios-的分享异常"}},[t._v("#")]),t._v(" 5、Vue 中路由使用 hash 模式，开发微信 H5 页面分享时在安卓上设置分享成功，但是 ios 的分享异常")]),t._v(" "),a("p",[a("strong",[t._v("问题详情描述")]),t._v("：")]),t._v(" "),a("p",[t._v("ios 当前页面分享给好友，点击进来是正常，如果二次分享，则跳转到首页；使用 vue router 跳转到第二个页面后在分享时，分享设置失败；以上安卓分享都是正常")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/images/prepare/mobile/2020050704.webp"),alt:"prepare/mobile/2020050704.webp"}})]),t._v(" "),a("p",[a("strong",[t._v("出现原因分析")]),t._v("：jssdk 是后端进行签署，前端校验，但是有时跨域，ios 是分享以后会自动带上 "),a("code",[t._v("from=singlemessage&isappinstalled=0")]),t._v(" 以及其他参数，分享朋友圈参数还不一样，貌似系统不一样参数也不一样，但是每次获取 url 并不能获取后面这些参数")]),t._v(" "),a("p",[a("strong",[t._v("解决办法")]),t._v("：")]),t._v(" "),a("ol",[a("li",[t._v("可以使用改页面"),a("code",[t._v("this.$router.push")]),t._v("跳转，为"),a("code",[t._v("window.location.href")]),t._v("去跳转，而不使用路由跳转，这样可以使地址栏的地址与当前页的地址一样，可以分享成功（适合分享的页面不多的情况下，作为一个单单页运用，这样刷新页面跳转，还是..）")]),t._v(" "),a("li",[t._v("把入口地址保存在本地，等需要获取签名的时候 取出来，注意："),a("code",[t._v("sessionStorage.setItem(‘href’,href);")]),t._v(" 只在刚进入单应用的时候保存！【该方法未验证】")])]),t._v(" "),a("h2",{attrs:{id:"题外话"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题外话"}},[t._v("#")]),t._v(" 题外话：")]),t._v(" "),a("p",[t._v("如果能用小程序写的页面，尽量上小程序吧，H5 开发在微信开发者工具里看页面效果可能看不出问题，因为不能唤起软键盘。避免频繁线上发布，可以用花生壳或者 idcfengye，做内网穿透，搭建一个可以通过域名访问的开发环境的 h5 页面，在手机上看看效果，对了微信内置浏览器缓存机制。会导致刚提交的代码（特别是 js）效果要半个小时左右才生效。")]),t._v(" "),a("p",[a("strong",[t._v("最后")]),t._v("：")]),t._v(" "),a("p",[t._v("微信 H5 页面其实很多知识，登陆授权，jssdk 授权，这里就只做了分享，当然还有上传图片、微信支付等功能，都可能会遇到坑，以上几个坑也是比较常遇到的，如果有更好的解决方案的话，欢迎在留言区分享。")])])}),[],!1,null,null,null);s.default=e.exports}}]);