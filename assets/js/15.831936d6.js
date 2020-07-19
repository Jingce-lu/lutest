(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{350:function(n){n.exports=JSON.parse('{"msg":"success","result":{"list":[{"audit_flag":0,"corp_tag":["玄武科技"],"date":"Fri, 19 Jun 2020 16:20:44 GMT","favorite_num":40,"qid":708,"qtype":"short_answer","short_answer":{"analysis":"### 一、分类\\n\\n**1) 内联元素:** \\n\\n`span,a,b,strong,i,em,br,inut ,textarea`\\n\\n本身属性为`display:inline`;\\n\\n和其他行内元素从左到右在一行显示,不可以直接控制宽度、高度等其他相关css属性，但是可以直接设置内外边距的左右值\\n\\n宽高是由本身内容大小决定的（文字、图片等)\\n\\n只能容纳文本或者其他行内元素，不能嵌套块级元素\\n\\n**2) 块状元素**\\n\\n`div,h1-h6,hr,menu,ol,ul,li,dl,table,p,from`\\n\\n本身属性为`display:block`;\\n\\n独占一行，每一个块级元素都会从新的一行重新开始，从上到下排布\\n可以直接控制宽度、高度等其他相关css属性，例如（padding系列，margin系列）\\n\\n在不设置宽度的情况下，块级元素的宽度是它父级元素内容的宽度\\n\\n在不设置高度的情况下，块级元素的高度是它本身内容的高度\\n\\n**3) 内联块状元素**\\n\\n内联块状元素综合了前两种的特性却又各有取舍。\\n\\n不自动换行\\n\\n能够识别`width`和`height`,`line-height`,`padding`,`marign`\\n\\n默认排列方式为从左到右\\n\\n### 二、应用场景\\n\\n- 内联元素：用于不指定宽高，宽高由内容指定；\\n- 块状元素：用于指定宽高，标签占满一行；\\n- 内联块状元素：用于指定元素宽高，不占满一行","answer":"","biz_type":1,"qid":708,"subject":"","title":"请说明 Html 布局元素的分类有哪些？边描述每种布局元素的应用场景"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["蘑菇街"],"date":"Fri, 19 Jun 2020 16:20:43 GMT","favorite_num":27,"qid":528,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":528,"subject":"","title":"html 标签 b 和 strong 的区别"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["58"],"date":"Fri, 19 Jun 2020 16:20:43 GMT","favorite_num":19,"qid":587,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":587,"subject":"","title":"说一下减少 dom 数量的办法？一次性给你大量的 dom 怎么优化？"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":[],"date":"Fri, 19 Jun 2020 16:20:43 GMT","favorite_num":25,"qid":622,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":622,"subject":"","title":"Html5 有哪些新特性？如何处理 Html5 新标签的浏览器兼容问题？如何区分 Html 和 Html5?"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["喜马拉雅"],"date":"Fri, 19 Jun 2020 16:20:42 GMT","favorite_num":7,"qid":467,"qtype":"short_answer","short_answer":{"analysis":"### 一、搜索引擎工作原理\\n\\n在搜索引擎网站的后台会有一个非常庞大的数据库，里面存储了海量的关键词，而每个关键词又对应着很多网址，这些网址是被称之为 **“搜索引擎蜘蛛”** 或 **“网络爬虫”** 。\\n\\n程序从茫茫的互联网上一点一点下载收集而来的。随着各种各样网站的出现，这些勤劳的“蜘蛛”每天在互联网上爬行，从一个链接到另一个链接，下载其中的内容，进行分析提炼，找到其中的关键词，如果“蜘蛛”认为关键词在数据库中没有而对用户是有用的便存入后台的数据库中。反之，如果“蜘蛛”认为是垃圾信息或重复信息，就舍弃不要，继续爬行，寻找最新的、有用的信息保存起来提供用户搜索。当用户搜索时，就能检索出与关键字相关的网址显示给访客。\\n\\n**一个关键词对用多个网址** ，因此就出现了排序的问题，相应的当与关键词最吻合的网址就会排在前面了。在“蜘蛛”抓取网页内容，提炼关键词的这个过程中，就存在一个问题：“蜘蛛”能否看懂。如果网站内容是flash和js等，那么它是看不懂的，会犯迷糊，即使关键字再贴切也没用。相应的，如果网站内容可以被搜索引擎能识别，那么搜索引擎就会提高该网站的权重，增加对该网站的友好度。这样一个过程我们称之为SEO。\\n\\n### 二、前端SEO规范简洁版\\n\\n1. 合理的title、description、keywords： 搜索对着三项的权重逐个减小，title值强调重点即可；description把页面内容高度概括，不可过分堆砌关键词；keywords列举出重要关键词。\\n2. 语义化的HTML标签\\n3. 非装饰性的图片必须加alt\\n4. 让重要的内容放在HTML最前面，优先加载：搜索引擎抓取HTML顺序是从上到下，保证重要内容一定被抓取\\n5. 每个页面只出现一个h1标签\\n6. 页面尽量不要做成flash、图片、视频，因为搜索引擎抓取不到\\n7. 少用iframe，iframe抓取不到\\n8. 页面尽量扁平，层级太深也不利于抓取\\n9. 异步加载内容（ajax）搜索引擎也无法抓取，重要信息选择直接输出，有利于用户体验和seo优化\\n10. 采用友情链接：在别人的网站导入自己网站的链接\\n11. 向各大搜索引擎登陆入口提交尚未收录站点\\n12. 提高网站速度：网站速度是搜索引擎排序的一个重要指标\\n13. 做好404页面。不仅是为了提高蜘蛛体验，也是为了用户体验的更好\\n\\n\\n### 三、前端SEO规范详细版\\n\\n**SEO** 全称Search Engine Optimization搜索引擎优化\\n\\n#### 1.网站结构布局优化:尽量简单、开门见山，提倡扁平化结构\\n\\n一般而言，建立的网站结构层次越少，越容易被“蜘蛛”抓取，也就容易被收录。一般中小型网站目录结构超过三级，“蜘蛛”便不愿意往下爬了。并且根据相关数据调查：如果访客经过跳转3次还没找到需要的信息，很可能离开。因此，三层目录结构也是体验的需要。为此我们需要做到：\\n\\n**1）控制首页链接数量**\\n\\n网站首页是权重最高的地方，如果首页链接太少，没有“桥”，“蜘蛛”不能继续往下爬到内页，直接影响网站收录数量。但是首页链接也不能太多，一旦太多，没有实质性的链接，很容易影响用户体验，也会降低网站首页的权重，收录效果也不好。\\n\\n**2）扁平化的目录层次**\\n\\n尽量让“蜘蛛”只要跳转3次，就能到达网站内的任何一个内页。\\n\\n**3）导航优化**\\n\\n导航应该尽量采用文字方式，也可以搭配图片导航，但是图片代码一定要进行优化，`<img>` 标签必须添加 `alt` 和 `title` 属性，告诉搜索引擎导航的定位，做到即使图片未能正常显示时，用户也能看到提示文字。\\n\\n其次，在每一个网页上应该加上面包屑导航，好处：从用户体验方面来说，可以让用户了解当前所处的位置以及当前页面在整个网站中的位置，帮助用户很快了解网站组织形式，从而形成更好的位置感，同时提供了返回各个页面的接口，方便用户操作；对“蜘蛛”而言，能够清楚的了解网站结构，同时还增加了大量的内部链接，方便抓取，降低跳出率。\\n\\n**4）网站的结构布局---不可忽略的细节**\\n\\n**页面头部:** logo及主导航，以及用户的信息。页面主体：左边正文，包括面包屑导航及正文；右边放热门文章及相关文章，好处：留住访客，让访客多停留，对“蜘蛛”而言，这些文章属于相关链接，增强了页面相关性，也能增强页面的权重。\\n\\n**页面底部** 版权信息和友情链接。\\n\\n**特别注意:** 分页导航写法，推荐写法：“首页 1 2 3 4 5 6 7 8 9 下拉框”，这样“蜘蛛”能够根据相应页码直接跳转，下拉框直接选择页面跳转。而下面的写法是不推荐的，“首页 下一页 尾页”，特别是当分页数量特别多时，“蜘蛛”需要经过很多次往下爬，才能抓取，会很累、会容易放弃。\\n\\n**5）利用布局，把重要内容HTML代码放在最前**\\n\\n搜索引擎抓取HTML内容是从上到下，利用这一特点，可以让主要代码优先读取，广告等不重要代码放在下边。例如，在左栏和右栏的代码不变的情况下，只需改一下样式，利用float:left;和float:right;就可以随意让两栏在展现上位置互换，这样就可以保证重要代码在最前，让爬虫最先抓取。同样也适用于多栏的情况。\\n\\n**6）控制页面的大小，减少http请求，提高网站的加载速度**\\n\\n一个页面最好不要超过100k，太大，页面加载速度慢。当速度很慢时，用户体验不好，留不住访客，并且一旦超时，“蜘蛛”也会离开。\\n\\n#### 2.网页代码优化\\n\\n**1）突出重要内容**\\n\\n合理的设计 `title`、`description` 和 `keywords`\\n\\n- `<title>` 标题：只强调重点即可，尽量把重要的关键词放在前面，关键词不要重复出现，尽量做到每个页面的 `<title>` 标题中不要设置相同的内容。\\n\\n- `<meta keywords>` 标签：关键词，列举出几个页面的重要关键字即可，切记过分堆砌。\\n\\n- `<meta description>` 标签：网页描述，需要高度概括网页内容，切记不能太长，过分堆砌关键词，每个页面也要有所不同。\\n\\n**2）语义化书写HTML代码，符合W3C标准**\\n\\n尽量让代码语义化，在适当的位置使用适当的标签，用正确的标签做正确的事。让阅读源码者和“蜘蛛”都一目了然。比如：h1-h6 是用于标题类的，`<nav>` 标签是用来设置页面主导航，列表形式的代码使用ul或ol，重要的文字使用strong等。\\n\\n**3）`<a>` 标签**\\n\\n页内链接，要加 `title` 属性加以说明，让访客和 “蜘蛛” 知道。而外部链接，链接到其他网站的，则需要加上 `el=\\"nofollow` 属性, 告诉 “蜘蛛” 不要爬，因为一旦“蜘蛛”爬了外部链接之后，就不会再回来了。\\n\\n**4）正文标题要用**\\n\\n`<h1>` 标签：h1标签自带权重“蜘蛛” 认为它最重要，一个页面有且最多只能有一个H1标签，放在该页面最重要的标题上面，如首页的logo上可以加H1标签。副标题用 `<h2>`标签, 而其它地方不应该随便乱用 h 标题标签。\\n\\n**5.`<img>` 应使用 \\"alt\\" 属性加以说明**\\n\\n当网络速度很慢，或者图片地址失效的时候，就可以体现出alt属性的作用，他可以让用户在图片没有显示的时候知道这个图片的作用。同时为图片设置高度和宽度，可提高页面的加载速度。\\n\\n**6）表格应该使用 `<caption>` 表格标题标签**\\n\\ncaption 元素定义表格标题。caption 标签必须紧随 table 标签之后\\n\\n**7）`<strong>`、`<em>` 标签**\\n \\n 需要强调是使用。\\n \\n `<strong>` 标签在搜索引擎中能够得到高度的重视，它能突出关键词，表现重要的内容，`<em>` 标签强调效果仅次于 `<strong>` 标签；`<b>`、`<i>` 标签：只是用于显示效果时使用，在SEO中不会起任何效果。\\n\\n\\n**8）重要内容不要用JS输出**\\n\\n因为“蜘蛛”不会读取JS里的内容，所以重要内容必须放在HTML里。前端框架针对SEO的缺陷，可通过服务端渲染弥补\\n\\n**9）尽量少使用iframe框架**\\n\\n因为“蜘蛛”一般不会读取其中的内容。\\n\\n**10）搜索引擎会过滤掉display:none其中的内容**\\n\\n**11）蜘蛛只能抓取a标签中href**\\n\\n\\n`<a href=\\"Default.aspx?id=1\\">测试</a>`\\n\\n最好后面不要带参数\\n\\n`<a href=\\"Default.aspx\\">测试</a>`\\n\\n 如果带上参数 蜘蛛不会考虑的。这样的话，就需要用到URL重写了。\\n\\n**12）蜘蛛不会执行JavaScript**\\n\\n换句话说 如果在a标签中使用了onclick 蜘蛛是不会抓到的。\\n\\n**13）蜘蛛只能抓到get请求的页面，不会抓到post请求的页面**\\n\\n**14）我们希望网页的前台页面全部被蜘蛛抓到**\\n\\n但是不希望后台页面被蜘蛛抓到，蜘蛛可没有那么智能，知道你的网站哪个是前台页面，哪个是后台页面。\\n\\n这里就需要创建一个名为 “robots.txt” (注意robots.txt是一个协议，不是命令，一般最好要遵守的robots.txt是搜索引擎搜索该网站时的第一个文件。\\n\\n\\n\\n\\n","answer":"","biz_type":1,"qid":467,"subject":"","title":"网站 SEO 怎么处理"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["滴滴"],"date":"Fri, 19 Jun 2020 16:20:42 GMT","favorite_num":9,"qid":381,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":381,"subject":"","title":"a 标签默认事件禁掉之后做了什么才实现了跳转"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["完美世界"],"date":"Fri, 19 Jun 2020 16:20:41 GMT","favorite_num":11,"qid":141,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":141,"subject":"","title":"meta 元素都有什么"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["虎扑"],"date":"Fri, 19 Jun 2020 16:20:41 GMT","favorite_num":11,"qid":269,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":269,"subject":"","title":"script 的 async 跟 defer 的区别？"},"tech_tag":["Html"],"uid":0,"uname":""},{"audit_flag":0,"corp_tag":["蘑菇街"],"date":"Fri, 19 Jun 2020 16:20:41 GMT","favorite_num":9,"qid":292,"qtype":"short_answer","short_answer":{"analysis":"","answer":"","biz_type":1,"qid":292,"subject":"","title":"知道语义化吗？说说你理解的语义化，如果是你，平时会怎么做来保证语义化？说说你了解的 HTML5 语义化标签？"},"tech_tag":["Html"],"uid":0,"uname":""}],"page":1,"pages":1,"uid":4510},"status":0}')}}]);