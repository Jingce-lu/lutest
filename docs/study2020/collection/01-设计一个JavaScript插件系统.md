# 设计一个 JavaScript 插件系统

[[toc]]

插件是库和框架的常见功能，并且有一个很好的使用它的理由：它们允许开发人员以安全，可扩展的方式添加功能。这就使核心项目更具价值，这种开放形势可以帮助项目建立社区，并且不会为我们增加额外的维护负担。

本文就使用 `JavaScript` 来构建一个我们自己的插件系统。

## 让我们构建一个插件系统

让我们从一个名为 `BetaCalc` 的示例项目开始。`BetaCalc` 的目标是成为一个简约的 JavaScript 计算器，其他开发人员可以在其中添加“按钮”。下面是一些基本的代码，可以帮助我们入门：

```js
// The Calculator
const betaCalc = {
  currentValue: 0,

  setValue(newValue) {
    this.currentValue = newValue;
    console.log(this.currentValue);
  },

  plus(addend) {
    this.setValue(this.currentValue + addend);
  },

  minus(subtrahend) {
    this.setValue(this.currentValue - subtrahend);
  }
};

// Using the calculator
betaCalc.setValue(3); // => 3
betaCalc.plus(3); // => 6
betaCalc.minus(2); // => 4
```

为了简单起见，我们将计算器定义为 `object-literal`。该计算器通过 console.log 打印结果。

现在功能真的很简单。我们有一个 `setValue` 方法，它接受一个数字并将其显示在“屏幕”上。我们还有 `plus` 和 `minus` 方法，它们将对当前显示的值执行操作。

是时候添加更多的功能了。让我们从创建一个插件系统开始。

## 世界上最小的插件系统

我们将从创建一个 `register` 方法开始，其他开发人员可以使用它在 `BetaCalc` 上注册插件。这个方法的原理很简单: 获取外部插件，获取其 `exec` 功能，并将其作为新方法附加到我们的计算器上：

```js
// The Calculator
const betaCalc = {
  // ...other calculator code up here
  register(plugin) {
    const { name, exec } = plugin;
    this[name] = exec;
  }
};
```

这是一个示例插件，为我们的计算器提供了一个 `squared` 按钮：

```js
// Define the plugin
const squaredPlugin = {
  name: "squared",
  exec: function() {
    this.setValue(this.currentValue * this.currentValue);
  }
};

// Register the plugin
betaCalc.register(squaredPlugin);
```

在许多插件系统中，插件通常分为两个部分：

1. 要执行的代码
2. 元数据（例如名称，描述，版本号，依赖项等）

在我们的插件中，`exec` 函数包含我们的代码，名称是我们的元数据。当插件注册时， `exec` 函数直接作为方法附加到 `betaCalc` 对象上，从而使其可以访问 `BetaCalc` 的 `this` 。

现在， `BetaCalc` 有一个新的 `squared` 按钮，可以直接调用：

```js
betaCalc.setValue(3); // => 3
betaCalc.plus(2); // => 5
betaCalc.squared(); // => 25
betaCalc.squared(); // => 625
```

这个系统有很多优点。该插件是一种简单的对象字面量，可以传递给我们的函数。这意味着可以通过 npm 下载插件并将其作为 ES6 模块导入。

但是我们的系统有一些缺陷。

通过为插件提供对 BetaCalc 的 this 访问权限，插件可以对所有 BetaCalc 的代码进行读/写访问。虽然这对于获取和设置 `currentValue` 很有用，但也很危险。如果某个插件要重新定义内部函数（如`setValue`），则它可能会对 `BetaCalc` 和其他插件产生意外的影响。这违反了开放闭合原则，该原则规定，软件实体应该对扩展开放，对修改关闭。

同样的， `squared` 函数通过产生副作用发挥作用。这在 `JavaScript` 中并不少见，但感觉不是很好 —— 特别是当其他插件可能在处理同一内部状态时。一种更实用的方法将大大有助于使我们的系统更安全、更可预测。

## 更好的插件架构

让我们来看一个更好的插件架构。下一个示例更改了计算器及其插件 `API` ：

```js
// The Calculator
const betaCalc = {
  currentValue: 0,

  setValue(value) {
    this.currentValue = value;
    console.log(this.currentValue);
  },

  core: {
    plus: (currentVal, addend) => currentVal + addend,
    minus: (currentVal, subtrahend) => currentVal - subtrahend
  },

  plugins: {},

  press(buttonName, newVal) {
    const func = this.core[buttonName] || this.plugins[buttonName];
    this.setValue(func(this.currentValue, newVal));
  },

  register(plugin) {
    const { name, exec } = plugin;
    this.plugins[name] = exec;
  }
};

// Our Plugin
const squaredPlugin = {
  name: "squared",
  exec: function(currentValue) {
    return currentValue * currentValue;
  }
};

betaCalc.register(squaredPlugin);

// Using the calculator
betaCalc.setValue(3); // => 3
betaCalc.press("plus", 2); // => 5
betaCalc.press("squared"); // => 25
betaCalc.press("squared"); // => 625
```

我们在这里做了一些值得注意的更改。

首先，我们将插件与“核心”计算器方法（如 `plus` 和 `minus`）分开，方法是将其放在自己的插件对象中。将插件存储在一个 `plugin` 对象中可以使我们的系统更安全。现在，插件访问不到 `BetaCalc` 属性-他们只能访问到 `betaCalc.plugins` 的属性。

其次，我们实现了一个 `press` 方法，该方法按名称查找按钮的功能，然后调用它。现在，当我们调用插件的 `exec` 函数时，我们将当前的计算器值（currentValue）传递给它，并且我们期望它返回新的计算器值。

本质上，这种新 `press` 方法将我们所有的计算器按钮转换为纯函数。他们获取一个值，执行一个操作，然后返回结果。这有很多好处：

- 简化了 `API`。
- 使测试更加容易（对于 `BetaCalc` 和插件本身）。
- 减少了我们系统的依赖性，使其更松散地耦合在一起。

这个新的体系结构比第一个示例有更多的限制，但方式是好的。我们为插件作者设置了防护栏，限制他们只做我们想让他们做的改变。

实际上，它可能太严格了！现在，我们的计算器插件只能操作 currentValue 。如果插件作者想要添加高级功能，例如“内存”按钮或跟踪历史记录的方法，则无法做到。

也许没关系。你赋予插件作者的力量是微妙的平衡。给它们过多的权限可能会影响项目的稳定性。但是，给他们很少的权限会使他们很难解决他们的问题。

## 我们还能做什么？

我们还可以做很多工作来改善我们的系统。

如果插件作者忘记定义名称或返回值，我们可以添加错误处理以通知插件作者。像 QA 开发人员一样思考并想象我们的系统如何崩溃，以便我们能够主动处理这些情况。

我们可以扩展插件的功能范围。现在，一个 BetaCalc 插件可以添加一个按钮。但是，如果它还可以注册某些生命周期事件的回调（例如当计算器将要显示值时）怎么办？或者，如果有一个专用的位置来存储多个交互中的状态，该怎么办？

我们还可以扩展插件注册。如果可以使用一些初始设置注册插件怎么办？可以使插件更灵活吗？如果插件作者希望注册整个按钮套件而不是一个按钮套件（如 BetaCalc Statistics Pack），该怎么办？为了支持这一点需要进行哪些更改？

## 你的插件系统

BetaCalc 及其插件系统都非常简单。如果你的项目较大，则需要探索其他一些插件体系结构。

一个很好的起点是查看现有项目，以获取成功的插件系统的示例。对于 JavaScript ，你可以查看 jQuery，Gatsby，D3，CKEditor 或其他。

你可能还想熟悉各种 JavaScript 设计模式。每种模式都提供了不同的接口和耦合程度，这为你提供了许多不错的插件体系结构选项供你选择。了解这些选项可以帮助你更好地平衡使用项目的每个人的需求。

除了模式本身之外，你还可以借鉴许多好的软件开发原则来做出此类决策。我已经提到了一些方法（例如开闭原理和松散耦合），但是其他一些相关的方法包括 Demeter 定律和依赖注入。

我知道这听起来很多，但是你必须进行研究。没有什么比让每个人都重写他们的插件更痛苦的了，因为你需要更改插件架构。这是一种失去信任并阻止人们在将来做出贡献的快速方法。
