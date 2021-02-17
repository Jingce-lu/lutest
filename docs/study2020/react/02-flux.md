# Flux

Flux:

1. Store 包含状态和更改逻辑
2. 有多个 Store
3. 所有 Store 都互不影响且是平级的
4. 有单一调度器
5. React 组件订阅 store
6. 状态是可变的

Flux 的最大特点，就是数据的"单向流动"。

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

一个 Flux 应用包含四个部分

- `Dispatcher`: 处理动作分发，维持 Store 之间的依赖关系
- `Store`: 负责存储数据和处理数据相关逻辑
- `Action`: 驱动 Dispatcher 的 Javascript 对象
- `View`: 视图部分，负责显示用户界面

```js
// react-and-redux/chapter-03/flux/src/AppDispatcher.js
import { Dispatcher } from "flux";

export default new Dispatcher();
```

```js
// react-and-redux/chapter-03/flux/src/ActionTypes.js
export const INCREMENT = "increment";

export const DECREMENT = "decrement";
```

```js {32}
// react-and-redux/chapter-03/flux/src/stores/CounterStore.js
import AppDispatcher from "../AppDispatcher.js";
import * as ActionTypes from "../ActionTypes.js";
import { EventEmitter } from "events";

const CHANGE_EVENT = "changed";

const counterValues = {
  First: 0,
  Second: 10,
  Third: 30
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: function() {
    return counterValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CounterStore.dispatchToken = AppDispatcher.register(action => {
  if (action.type === ActionTypes.INCREMENT) {
    counterValues[action.counterCaption]++;
    CounterStore.emitChange();
  } else if (action.type === ActionTypes.DECREMENT) {
    counterValues[action.counterCaption]--;
    CounterStore.emitChange();
  }
});

export default CounterStore;
```

```js
// react-and-redux/chapter-03/flux/src/Actions.js
import * as ActionTypes from "./ActionTypes.js";
import AppDispatcher from "./AppDispatcher.js";

export const increment = counterCaption => {
  AppDispatcher.dispatch({
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  });
};

export const decrement = counterCaption => {
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  });
};
```

```js
// react-and-redux/chapter-03/flux/src/views/Counter.js
import React, { Component, PropTypes } from "react";

import * as Actions from "../Actions.js";
import CounterStore from "../stores/CounterStore.js";

const buttonStyle = {
  margin: "10px"
};

class Counter extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

    this.state = {
      count: CounterStore.getCounterValues()[props.caption]
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.caption !== this.props.caption ||
      nextState.count !== this.state.count
    );
  }

  componentDidMount() {
    CounterStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    CounterStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const newCount = CounterStore.getCounterValues()[this.props.caption];
    this.setState({ count: newCount });
  }

  onClickIncrementButton() {
    Actions.increment(this.props.caption);
  }

  onClickDecrementButton() {
    Actions.decrement(this.props.caption);
  }

  render() {
    const { caption } = this.props;
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>
          +
        </button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>
          -
        </button>
        <span>
          {caption} count: {this.state.count}
        </span>
      </div>
    );
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired
};

export default Counter;
```

利用 `Dispatcher` 的 `waitFor` 方法可以保证多个 Store 之间的更新顺序，但是会产生不同 Store 之间的显示依赖关系

```js {42}
// react-and-redux/chapter-03/flux/src/stores/SummaryStore.js
import AppDispatcher from "../AppDispatcher.js";
import * as ActionTypes from "../ActionTypes.js";
import CounterStore from "./CounterStore.js";
import { EventEmitter } from "events";

const CHANGE_EVENT = "changed";

function computeSummary(counterValues) {
  let summary = 0;
  for (const key in counterValues) {
    if (counterValues.hasOwnProperty(key)) {
      summary += counterValues[key];
    }
  }
  return summary;
}

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
  getSummary: function() {
    return computeSummary(CounterStore.getCounterValues());
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

SummaryStore.dispatchToken = AppDispatcher.register(action => {
  if (
    action.type === ActionTypes.INCREMENT ||
    action.type === ActionTypes.DECREMENT
  ) {
    AppDispatcher.waitFor([CounterStore.dispatchToken]);

    SummaryStore.emitChange();
  }
});

export default SummaryStore;
```
