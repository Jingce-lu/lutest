# React 源码中如何实现受控组件

[[toc]]

今天我们站在框架开发者的角度来聊聊如何实现`受控组件`。

在 React 中一个简单的`受控组件`如下：

```js
function App() {
  const [num, updateNum] = React.useState(0);

  const onChange = ({ target: { value } }) => {
    updateNum(value);
  };

  return <input value={num} onChange={onChange} />;
}
```

在 `onChange` 中会更新 `num`，`num` 作为 `value prop` 传递给`<input/>`，达到 `value` 受控的目的。

如果让你来设计，你会怎么做？

我相信大部分同学第一个想法是：将 `value prop` 与其他 `attribute prop` 一样处理就行。

我们知道 React 内部运行有 3 个阶段：

- schedule 调度更新阶段
- render 进行 diff 算法的阶段
- commit 进行 DOM 操作的阶段

假设我们要在 `onChange` 中触发更新改变 `className`，只需要在 `render` 阶段记录要改变的 `className`，在 `commit` 阶段执行对应的 `addClass DOM` 操作。

同样的，如果我们要在 `onChange` 中触发更新改变 `value`，只需要在 `render` 阶段记录要改变的 `value`，在 `commit` 阶段执行对应的 `inputDOM.setAttribute('value', value)`操作。

这样逻辑非常通顺。那么事实上呢？

## 直接改变 value 的问题

`className` 只是 `inputDOM` 上的一个普通属性。而 `value` 则涉及到输入框光标的位置。

如果我们直接修改 `value`，那么属性改变后 `input` 的光标输入位置也会丢失，光标会跳到输入框的最后。

想想我们将 1234 修改为 12534。

```js
1234-- > 12534;
```

需要先将光标位置移动到 2 之后，再输入 5。

如果`setAttribute('value', '12534')`，那么光标不会保持在 5 后面而是跳到 4 后面。

那么 `React` 如何解决这个问题呢？

## 用非受控的形式实现受控组件

你没有看错，`React` 用`非受控`形式实现了`受控组件`的逻辑。

简单的说，不同于 `className` 在 `commit` 阶段受控更新，`value` 则完全是非受控的形式，只在必要的时候受控更新。

因为一旦更新 `value`，那么光标位置就会丢失。

我们稍微修改下 Demo，`input` 为受控组件，`value` 始终为 1：

```js
function App() {
  const num = 1;

  return <input value={num} />;
}
```

当我们在源码中打上断点，输入 2 后，实际上会先显示 12，再删掉 2。

只不过这个删除的过程是同步的所以看起来输入框内始终只有 1。

<div align="center"><img :src="$withBase('/images/brochure/2020102201.webp')" alt="brochure/2020102201.webp"></div>

所以，不同于 `React` 其他组件 `props` 的更新会经历 `schedule - render - commit` 流程。

对于 `input`、`textarea`、`select`，`React` 有一条单独的更新路径，这条路径触发的更新被称为 `discreteUpdate`。

这条路径的工作流程如下：

1. 先以`非受控`的形式更新表单 DOM
2. 以`同步`的优先级开启一次更新
3. 更新后的 `value` 在 `commit` 阶段并不会像其他 `props` 一样作用于 `DOM`
4. 调用 `restoreStateOfTarget` 方法，比较 DOM 的实际 `value`（即步骤 1 中的非受控 value）与步骤 3 中更新的 `value`，如果相同则退出，如果不同则用步骤 3 的 `value` 更新 DOM

什么情况下这 2 个 `value` 会相同呢？

我们正常的受控组件就是相同的情况：

```js
function App() {
  const [num, updateNum] = React.useState(0);

  const onChange = ({ target: { value } }) => {
    updateNum(value);
  };

  return <input value={num} onChange={onChange} />;
}
```

什么情况下这 2 个 value 会不同呢？

上面的 Demo 中，虽然受控，但是没有调用 updateNum 更新 value 的情况：

```js
function App() {
  const num = 1;

  return <input value={num} />;
}
```

在这种情况下，步骤 1 的`非受控 value` 变为了 12，步骤 3 的`受控 value` 还是 1，所以最终会用 1 再更新下 DOM 的 `value`。

## 总结

可以看到，要实现一个完备的前端框架，是有非常多细节的。

为了实现受控组件，就得脱离整体更新流程，单独实现一套流程。
