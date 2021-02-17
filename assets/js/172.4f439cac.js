(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{611:function(s,n,a){"use strict";a.r(n);var t=a(42),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"前面跳过的unkown类型详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前面跳过的unkown类型详解"}},[s._v("#")]),s._v(" 前面跳过的unkown类型详解")]),s._v(" "),a("p",[s._v("学习完交叉类型、联合类型、类型断言、映射类型、索引后，我们就可以补充一个基础类型中没有讲的知识了，就是 TS 在 3.0 版本新增的顶级类型 unknown。它相对于 any 来说是安全的。关于 unknown 类型，有如下几点需要注意，我们来逐个讲解和举例学习：")]),s._v(" "),a("h4",{attrs:{id:"_1-任何类型的值都可以赋值给-unknown-类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-任何类型的值都可以赋值给-unknown-类型"}},[s._v("#")]),s._v(" (1) 任何类型的值都可以赋值给 unknown 类型：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" value1"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"a"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h4",{attrs:{id:"_2-如果没有类型断言或基于控制流的类型细化时-unknown-不可以赋值给其它类型-此时它只能赋值给-unknown-和-any-类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-如果没有类型断言或基于控制流的类型细化时-unknown-不可以赋值给其它类型-此时它只能赋值给-unknown-和-any-类型"}},[s._v("#")]),s._v(" (2) 如果没有类型断言或基于控制流的类型细化时 unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" value3"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// error 不能将类型“unknown”分配给类型“string”")]),s._v("\nvalue1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h4",{attrs:{id:"_3-如果没有类型断言或基于控制流的类型细化-则不能在它上面进行任何操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-如果没有类型断言或基于控制流的类型细化-则不能在它上面进行任何操作"}},[s._v("#")]),s._v(" (3) 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" value4"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue4 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// error 对象的类型为 "unknown"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h4",{attrs:{id:"_4-unknown-与任何其它类型组成的交叉类型-最后都等于其它类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-unknown-与任何其它类型组成的交叉类型-最后都等于其它类型"}},[s._v("#")]),s._v(" (4) unknown 与任何其它类型组成的交叉类型，最后都等于其它类型：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("type type1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" unknown "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type1 => string")]),s._v("\ntype type2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" number "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type2 => number")]),s._v("\ntype type3 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" unknown "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type3 => unknown")]),s._v("\ntype type4 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" unknown "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type4 => string[]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h4",{attrs:{id:"_5-unknown-与任何其它类型组成的联合类型-都等于-unknown-类型-但只有any例外-unknown与any组成的联合类型等于any"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-unknown-与任何其它类型组成的联合类型-都等于-unknown-类型-但只有any例外-unknown与any组成的联合类型等于any"}},[s._v("#")]),s._v(" (5) unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有any例外，unknown与any组成的联合类型等于any)：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("type type5 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type5 => unknown")]),s._v("\ntype type6 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" any "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type6 => any")]),s._v("\ntype type7 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" number"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type7 => unknown")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h4",{attrs:{id:"_6-never-类型是-unknown-的子类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-never-类型是-unknown-的子类型"}},[s._v("#")]),s._v(" (6) never 类型是 unknown 的子类型：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("type type8 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" never "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("unknown")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type8 => true")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"_7-keyof-unknown-等于类型-never"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-keyof-unknown-等于类型-never"}},[s._v("#")]),s._v(" (7) keyof unknown 等于类型 never：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("type type9 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" keyof unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type9 => never")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"_8-只能对-unknown-进行等或不等操作-不能进行其它操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-只能对-unknown-进行等或不等操作-不能进行其它操作"}},[s._v("#")]),s._v(" (8) 只能对 unknown 进行等或不等操作，不能进行其它操作：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("value1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+=")]),s._v(" value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// error")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h4",{attrs:{id:"_9-unknown-类型的值不能访问其属性、作为函数调用和作为类创建实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9-unknown-类型的值不能访问其属性、作为函数调用和作为类创建实例"}},[s._v("#")]),s._v(" (9) unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" value5"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nvalue5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// error")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("value5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// error")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("value5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// error")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h4",{attrs:{id:"_10-使用映射类型时如果遍历的是-unknown-类型-则不会映射任何属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-使用映射类型时如果遍历的是-unknown-类型-则不会映射任何属性"}},[s._v("#")]),s._v(" (10) 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("type Types"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("T")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("P")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" keyof "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("T")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" number "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\ntype type10 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Types"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("any"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type10 => { [x: string]: number }")]),s._v("\ntype type11 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Types"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("unknown"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// type10 => {}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，所以会有意想不到的情况发生。因此如果遇到无法确定类型的情况，要先考虑使用 unknown。")]),s._v(" "),a("h4",{attrs:{id:"本节小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本节小结"}},[s._v("#")]),s._v(" 本节小结")]),s._v(" "),a("p",[s._v("本小节我们详细学习了 unknown 类型，它和 any 有相似的特点，就是制定一个类型是任意的，但是区别在于制定一个类型为 any 的话，可以在这个值上做任意操作，而 unknown 类型则不允许在没有类型断言或基于控制流的类型细化时对 unknown 类型的值做任何操作。")]),s._v(" "),a("p",[s._v("下个小节我们将学习条件类型，它看起来像是三元操作符的写法，其实效果确实很像，只不过它判断的是类型，返回的结果也是类型。")]),s._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d03463300011cf516000466.jpg",alt:""}})])])}),[],!1,null,null,null);n.default=e.exports}}]);