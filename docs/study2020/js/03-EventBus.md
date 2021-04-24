# Event Bus

[[toc]]

## 1. 发布订阅

```js
class Event {
  constructor() {
    this.map = {};
  }

  add(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn);
      return;
    }

    this.map[name] = [fn];
    return;
  }

  emit(name, ...args) {
    this.map[name].forEach((fn) => {
      fn(...args);
    });
  }
}
```

```js
let e = new Event();

e.add("hello", (err, name) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(name);
});

e.emit("hello", "发生了错误");
e.emit("hello", null, "Hello nodejs");
```

## 2. 支持链式调用

```js
class CahinEvent {
  constructor() {
    this.map = {};
  }

  add(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn);
      return this;
    }

    this.map[name] = [fn];
    return this;
  }

  emit(name, ...args) {
    this.map[name].forEach((fn) => {
      fn(...args);
    });
    return this;
  }
}
```

```js
let e2 = new ChainEvent();
e2.add("hello", (err, name) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(name);
})
  .emit("hello", "发生了错误")
  .emit("hello", null, "Hello nodejs");
```

## 3. 观察者模式实现异步

```js
function create(fn) {
  let ret = false;
  return ({ next, complete, error }) => {
    function nextFn(...args) {
      if (ret) {
        return;
      }
      next(...args);
    }
    function completeFn(...args) {
      complete(...args);
      ret = true;
    }
    function errorFn(...args) {
      error(...args);
    }

    fn({
      next: nextFn,
      complete: completeFn,
      error: errorFn,
    });

    return () => (ret = true);
  };
}

let observerable = create((observer) => {
  setTimeout(() => {
    observer.next(1);
  }, 1000);
  observer.next(2);
  observer.complete(3);
});

const subject = {
  next: (value) => {
    console.log(value);
  },
  complete: console.log,
  error: console.log,
};

let unsubscribe = observerable(subject);

// 结果
// 2
// 3
```
