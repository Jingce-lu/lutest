# 深入浅出 vue.js

[[toc]]

## 1. 关于 Object 的问题

Vue.js 通过 Object.defineProperty 来将对象的 key 转换为 getter/setter 的形式来追踪变化，但 getter/setter 只能追踪一个数据是否被修改，无法追踪新增属性和删除属性，所以才会导致无法侦测

```js
var vm = new Vue({
  el: "#el",
  template: "#demo-template",
  methods: {
    action1() {
      this.obj.age = 30;
    },
    action2() {
      delete this.obj.name;
    }
  },
  data: {
    obj: {
      name: "Lu"
    }
  }
});

// vm.$set
// vm.$delete
```

## 2. Object 的变化侦测

<div align="center"><img :src="$withBase('/images/study/vue/20210117-01.png')" alt="study/vue/20210117-01.png"></div>

## 3. 生命周期

### 1. 创建期间的生命周期

- `beforeCreate`: 实例刚在内存中被创建出来，此时，还没有初始化好 `data` 和 `methods` 属性。这个对象上只有默认的一些生命周期函数和默认的事件，其他的东西都未创建
- `created`: 实例已经在内存中创建 OK, 此时 `data` 和 methods 已经创建 OK，此时还没有开始编译模板，如果调用 `methods` 中的方法，或者操作 `data` 中的数据，最早只能在 created 中操作
- `beforeMount`: 此时已经完成了模板编译，但是还没有挂在到页面中，此时页面还是旧的
- `mounted`: 此时已经将编译好的模板，挂在到了页面指定的容器中显示，如果要通过某些插件操作页面上的 `DOM` 节点，最早只能在 `mounted` 中进行，只要执行完了 `mounted`,就表示整个 Vue 示例已经初始化完毕了，此时组件已经脱离了创建阶段，进入到了运行阶段

### 2. 运行期间的生命周期函数

- `beforeUpdate`: 状态更新之前执行此函数，此时 `data` 中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染 DOM 节点
- `updated`: 实例更新完毕之后调用此函数，此时 `data` 中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了

当执行 `beforeDestroy` 钩子函数的时候，Vue 实例就已经从运行阶段进入到了销毁阶段

### 3. 销毁期间的生命周期函数

- `beforeDestroy`: 实例销毁之前调用。在这一步，实例仍然完全可用、实例身上所有的 `data`, `methods`、`过滤器`、`指令`...都处于可用状态，此时还没有真正执行销毁的过程
- `destroyed`: Vue 实例销毁后调用。调用后，vue 实例只是的所有东西都会解绑定，所有的事件监听器会被溢出，所有的子实例也会被销毁
- `new Vue()`: 表示开始创建一个 Vue 的实例对象

## 4. v-model

v-model 只能用在表单元素中，常见表单元素如下

> input select checkbox textarea ...

v-model 通过修改 AST 元素，给 el 添加一个 prop 相当于我们在 input 上动态绑定了 value,又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件
`<input v-model="message" />`其实转换成模板如下：

```html
<input v-bind:value="message" v-on:input="message=$event.target.value" />
```

## 5. 什么叫双向数据绑定

当数据发生改变，DOM 会自动更新  
当表单控件的值发生改变，数据也会自动得到更新

它的本质是通过监听用户的输入或者数据的更新，之后触发 DOM 元素的变化

## 6. props

props 的数据传输是单向的，也就是说，父组件给子组件传值，子组件只能调用，不能修改。若在子组件中强行修改 props 数据，Vue.js 会在控制台给出警告。若项目中必须修改，可以使用以下两种方法。

```js
// 例1 - 在组件内部定义数据
props: ["title"],
data(){
  return {
    local_title: this.title  // 返回local_title变量
  }
}


// 例2 - 使用计算属性
props: ["title"],
computed: {
  local_title: ()=>{ // 返回local_title的计算属性
    return this.title.trim()
  }
}
```

## 7.
