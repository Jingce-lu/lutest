(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{327:function(e,t,n){"use strict";var r=n(340),i=n.n(r);t.a=function(e){var t=i()().render(e);return'<div class="mycodebg">'.concat(t,"</div>")}},460:function(e,t,n){"use strict";n.r(t);var r=n(327),i={name:"QuestionDetail",props:{corp_tag:{default:[],type:Array},shortAnswer:{default:"",type:String},title:{default:"",type:String}},created:function(){},mounted:function(){this.$refs.vueMarkdown.innerHTML=Object(r.a)(this.shortAnswer)},beforeDestroy:function(){this.$refs.vueMarkdown.innerHTML=""},watch:{},methods:{}},o=n(42),a=Object(o.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",e._l(e.corp_tag,(function(t,r){return n("li",{key:r},[e._v(e._s(t))])})),0),e._v(" "),n("div",{ref:"vueMarkdown"})])}),[],!1,null,"39cec129",null);t.default=a.exports}}]);