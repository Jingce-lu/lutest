# React hook

[[toc]]

## useState

useState 是一个函数， 其中的输入参数是 initialState； 它会返回一个数组，第一个值是 state，第二个值是改变 state 的函数

useState 返回的是一个数组而不是一个对象，表意更加清晰且简单，也支持方便我们自动设置别名

useState 其实很好实现，实现代码如下

```js
const React = (function () {
  let stateValue;

  return Object.assign(React, {
    useState(initialStateValue) {
      stateValue = stateValue || initialStateValue;

      function setState(value) {
        stateVaue = value;
      }

      return [stateValue, setState];
    },
  });
})();
```

我们使用 stateValue 闭包变量存储 state，并提供修改 stateValue 的方法 setState,一并作为数组返回。

## useEffect

```js
const React = (function () {
  let deps;

  return Object.assign(React, {
    useEffect(callback, depsArray) {
      const depsChange = deps
        ? !deps.every((depItem, index) => depItem === depsArray[index])
        : true;

      if (shouldUpdate || depsChange) {
        callback();

        deps = depsArray || [];
      }
    },
  });
})();
```

闭包变量 deps 会存储前一刻 useEffect 的依赖数组中的值。每次调用 useEffect 时。都会遍历 deps 数组和当前 depsArray 数组中的值，如果其中任何一项有变化，depsChange 的值都将为 true,进而执行 useEffect 的回调。

## useState & uesEffect

上述两种实现都是简易版的，旨在剖析这两个 hook 的工作原理，很多细节都没有实现，最重要的一点是，如果组件内多次调用 uesState 和 useEffect,那么我们的实现为了区分每次调用 useState 之前不同的 state 值及对应的 setter 函数，九需要额外使用一个数组来存储每次调用的配对值，代码如下：

```js
const React = (function () {
  let hooks = [];
  let currentHook = 0;

  return Object.assign(React, {
    useState(initialStateValue) {
      hooks[currentHook] = hooks[currentHook] || initialStateValue;

      function setState(value) {
        hooks[currentHook] = value;
      }

      return [hooks[currentHook++], setState];
    },

    useEffect(callback, depsArray) {
      const shouldUpdate = !depsArray;

      const depsChange = hooks[currentHook]
        ? !hooks[currentHook].every((depItem, index) => depItem === depsArray[index])
        : true;

      if (shouldUpdate || depsChange) {
        callback();

        hooks[currentHook] = depsArray || [];
      }
    },
  });
})();
```

这也是 hook 只可以在顶层使用，不能写在循环体、条件渲染，或者嵌套 function 里的原因。 React 内部实现需要调用顺序来记录每个 useState 的调用，以做区分

## React hook 之 hook 之所以被设计为 hook 的原因

- useState 让函数式组件能够使用 state
- useEffect 让函数式组件可以模拟生命周期方法，并进行副作用操作
- useReducer 让我们能够更清晰地处理状态数据
- useContext 可以获取 context 的值

那么为什么其他的一些 API，如 React.memo 并没有成为一个 hook 呢？ 事实上 React 认为能够成为 hook 有两个特定条件

1. **可组合**： 这个新特性需要具有组合能力，也就是说需要有复用价值，因为 hook 的一大用途就是完成组件的复用，因此，开发者可以自定义 hook,而不必使用官方指定的 hook.
2. **可调试**: hook 的一大特性就是能够调试，如果应用出现差错，要能够从错误的 props 和 state 中找到错误的组件或逻辑，具有这样调试功能的特性才有资格成为一个 hook
