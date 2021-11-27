# Koa.js

[[toc]]

## 1. Koa.js 中间件核心代码

下面代码来自代码仓库 [https://github.com/koajs/compose](https://github.com/koajs/compose)

```js
function compose(middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(
          fn(context, function next() {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```

测试代码

```js
async funtion a(ctx,next){
  console.log(1)
  const hello = await Promise.resolve("hello node.js")
  console.log(hello)
  await next()
  console.log('a end')
}

async funtion b(ctx,next){
  console.log(2)
  const hello = await Promise.resolve("hello node.js")
  console.log(hello)
  await next()
  console.log('b end')
}

compose([a,b])({})

/**
  * 结果如下
  * 1
  * hello node.js
  * 2
  * hello node.js
  * b end
  * a end
  */
```
