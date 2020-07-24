# Vue Composition API 响应式包装对象原理

上一篇文章Vue 3.0 最新进展，Composition API中，笔者通过描述Vue Composition API 的最新修正，本文通过解析[@vue/composition-api](https://github.com/vuejs/composition-api)的响应式原理部分代码，以便在解读学习过程中，加深对 Vue Composition API 的理解。

如果读者对 Vue Composition API 还不太熟悉，建议在阅读本文之前先了解 Vue 3.0 即将带来的Composition API，可以查阅[@vue/composition-api](https://github.com/vuejs/composition-api)相关文档，或查看笔者之前写过的文章：

Vue 3.0 最新进展，Composition API
Vue 3.0 前瞻，体验 Vue Function API

本文主要分以下两个部分对 Composition API 的原理进行解读：

* `reactive` API 原理
* `ref` API 原理

### `reactive` API 原理

打开源码可以找到`reactive`的入口，在[composition-api/src/reactivity/reactive.ts](https://github.com/vuejs/composition-api/blob/master/src/reactivity/reactive.ts)，我们先从函数入口开始分析`reactive`发生了什么事情，通过之前的学习我们知道，`reactive`用于创建响应式对象，需要传递一个普通对象作为参数。

```typescript
export function reactive<T = any>(obj: T): UnwrapRef<T> {
  if (process.env.NODE_ENV !== 'production' && !obj) {
    warn('"reactive()" is called without provide an "object".');
    // @ts-ignore
    return;
  }

  if (!isPlainObject(obj) || isReactive(obj) || isNonReactive(obj) || !Object.isExtensible(obj)) {
    return obj as any;
  }
  // 创建一个响应式对象
  const observed = observe(obj);
  // 标记一个对象为响应式对象
  def(observed, ReactiveIdentifierKey, ReactiveIdentifier);
  // 初始化对象的访问控制，便于访问ref属性时自动解包装
  setupAccessControl(observed);
  return observed as UnwrapRef<T>;
}
```

首先，在开发环境下，会进行传参检验，如果没有传递对应的`obj`参数，开发环境下会给予开发者一个警告，在这种情况，为了不影响生产环境，生产环境下会将警告放过。

函数入口会检查类型，首先调用`isPlainObject`检查是否是对象。如果不是对象，将会直接返回该参数，因为非对象类型并不可观察。

然后调用isReactive判断对象是否已经是响应式对象，下面是`isReactive`原型：
```typescript
import {
  AccessControlIdentifierKey,
  ReactiveIdentifierKey,
  NonReactiveIdentifierKey,
  RefKey,
} from '../symbols';
// ...
export function isReactive(obj: any): boolean {
  return hasOwn(obj, ReactiveIdentifierKey) && obj[ReactiveIdentifierKey] === ReactiveIdentifier;
}
```

通过上面的代码我们知道，`ReactiveIdentifierKey`和`ReactiveIdentifier`都是一个`Symbol`，打开`composition-api/src/symbols.ts`可以看到，`ReactiveIdentifierKey`和`ReactiveIdentifier`是已经定义好的`Symbol`：

```typescript
import { hasSymbol } from './utils';

function createSymbol(name: string): string {
  return hasSymbol ? (Symbol.for(name) as any) : name;
}

export const WatcherPreFlushQueueKey = createSymbol('vfa.key.preFlushQueue');
export const WatcherPostFlushQueueKey = createSymbol('vfa.key.postFlushQueue');
export const AccessControlIdentifierKey = createSymbol('vfa.key.accessControlIdentifier');
export const ReactiveIdentifierKey = createSymbol('vfa.key.reactiveIdentifier');
export const NonReactiveIdentifierKey = createSymbol('vfa.key.nonReactiveIdentifier');

// must be a string, symbol key is ignored in reactive
export const RefKey = 'vfa.key.refKey';
```

在这里我们大致可以猜出来，在定义响应式对象时，Vue Composition API 会在响应式对象上设定一个`Symbol`的属性，属性值为`Symbol(vfa.key.reactiveIdentifier)`。从而我们可以通过对象上是否具有`Symbol(vfa.key.reactiveIdentifier)`来判断这个对象是否是响应式对象。

同理，因为 Vue Composition API 内部使用的`nonReactive`，用于保证一个对象不可响应，与`isReactive`类似，也是通过检查对象是否具有对应的`Symbol`，即`Symbol(vfa.key.nonReactiveIdentifier)`来实现的。

```typescript
function isNonReactive(obj: any): boolean {
  return (
    hasOwn(obj, NonReactiveIdentifierKey) && obj[NonReactiveIdentifierKey] === NonReactiveIdentifier
  );
}
```

此外，因为创建响应式对象需要拓展对象属性，通过`Object.isExtensible`来判断到，当对象是不可拓展对象，也将不可创建响应式对象。

接下来，在容错判断逻辑结束后，通过`observe`来创建响应式对象了，通过文档和源码我们知道`reactive`等同于 Vue 2.6+ 中`Vue.observable`，Vue Composition API 会尽可能通过`Vue.observable`来创建响应式对象，但如果 Vue 版本低于2.6，将通过`new Vue`的方式来创建一个 Vue 组件，将`obj`作为组件内部状态来保证其响应式。关于 Vue 2.x 中如何实现响应式对象，笔者之前也有写过一篇文章，在这里就不过多阐述。感兴趣的朋友，可以翻阅笔者两年前的文章[Vue源码学习笔记之observer与变异方法](https://github.com/xingbofeng/xingbofeng.github.io/issues/3)。

```typescript
function observe<T>(obj: T): T {
  const Vue = getCurrentVue();
  let observed: T;
  if (Vue.observable) {
    observed = Vue.observable(obj);
  } else {
    const vm = createComponentInstance(Vue, {
      data: {
        $$state: obj,
      },
    });
    observed = vm._data.$$state;
  }

  return observed;
}
```

接下来，会在对象上设置`Symbol(vfa.key.reactiveIdentifier)`属性，`def`是一个工具函数，其实就是`Object.defineProperty`：

```typescript
export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
```

接下来，调用`setupAccessControl(observed)`就是`reactive`的核心部分了，通过之前的文章我们知道：直接获取包装对象的值必须使用`.value`，但是，如果包装对象作为另一个响应式对象的属性，访问响应式对象的属性值时， Vue 内部会自动展开包装对象。同时，在模板渲染的上下文中，也会被自动展开。`setupAccessControl`就是帮助我们做这件事：

```typescript
/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target: AnyObject): void {
  // 首先需要保证设定访问控制参数的合法性
  // 除了与前面相同的保证响应式对象target是对象类型和不是nonReactive对象外
  // 还需要保证保证对象不是数组（因为无法为数组元素设定属性描述符）
  // 也需要保证不是ref对象（因为ref的value属性用于保证属性的响应式），以及不能是Vue组件实例。
  if (
    !isPlainObject(target) ||
    isNonReactive(target) ||
    Array.isArray(target) ||
    isRef(target) ||
    isComponentInstance(target)
  ) {
    return;
  }
  // 一旦初始化了该属性的访问控制，也会往响应式对象target上设定一个Symbol(vfa.key.accessControlIdentifier)的属性。
  // 用于标记该对象以及初始化完成了自动解包装的访问控制。
  if (
    hasOwn(target, AccessControlIdentifierKey) &&
    target[AccessControlIdentifierKey] === AccessControlIdentifier
  ) {
    return;
  }

  if (Object.isExtensible(target)) {
    def(target, AccessControlIdentifierKey, AccessControlIdentifier);
  }
  const keys = Object.keys(target);
  // 遍历对象本身的可枚举属性，这里注意：通过def方法定义的Symbol标记并非可枚举属性
  for (let i = 0; i < keys.length; i++) {
    defineAccessControl(target, keys[i]);
  }
}
```

首先需要保证设定访问控制参数的合法性，除了与前面相同的保证响应式对象`target`是对象类型和不是`nonReactive`对象外，还需要保证保证对象不是数组（因为无法为数组元素设定属性描述符），也需要保证不是`ref`对象（因为`ref`的`value`属性用于保证属性的响应式），以及不能是`Vue`组件实例。

与上面相同的是，一旦初始化了该属性的访问控制，也会往响应式对象`target`上设定一个`Symbol(vfa.key.accessControlIdentifier)`的属性。用于标记该对象以及初始化完成了自动解包装的访问控制。

下面来看核心部分：通过`Object.keys(target)`获取到对象本身非继承的属性，之后调用`defineAccessControl`，这里需要注意的一点是，`Object.keys`只会遍历响应式对象`target`本身的非继承的可枚举属性，通过def方法定义的Symbol标记`Symbol(vfa.key.accessControlIdentifier)`等，并非可枚举属性，因而不会受到访问控制的影响。

```typescript
const keys = Object.keys(target);
// 遍历对象本身的可枚举属性，这里注意：通过def方法定义的Symbol标记并非可枚举属性
for (let i = 0; i < keys.length; i++) {
  defineAccessControl(target, keys[i]);
}
```

`defineAccessControl`会创建响应式对象的属性的代理，以便`ref`自动进行解包装，方便开发者在开发过程中用到`ref`时，手动执行一次`.value`的解封装：

```typescript
/**
 * Auto unwrapping when access property
 */
export function defineAccessControl(target: AnyObject, key: any, val?: any) {
  // 每一个Vue可观察对象都有一个__ob__属性，这个属性用于收集watch这个状态的观察者，这个属性是一个内部属性，不需要解封装
  if (key === '__ob__') return;

  let getter: (() => any) | undefined;
  let setter: ((x: any) => void) | undefined;
  const property = Object.getOwnPropertyDescriptor(target, key);
  if (property) {
    // 保证可以改变目标对象属性的自有属性描述符：如果对象的自有属性描述符的configurable为false，无法为该属性设定属性描述符，无法设定getter和setter
    if (property.configurable === false) {
      return;
    }
    getter = property.get;
    setter = property.set;
    // arguments.length === 2表示没有传入val参数，并且不是readonly对象，这时该属性的值：响应式对象的属性可以直接取值拿到
    // 传入val的情况是使用vue.set，composition 也提供了set api
    if ((!getter || setter) /* not only have getter */ && arguments.length === 2) {
      val = target[key];
    }
  }
  // 嵌套对象的情况，实际上setupAccessControl是递归调用的
  setupAccessControl(val);
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function getterHandler() {
      const value = getter ? getter.call(target) : val;
      // if the key is equal to RefKey, skip the unwrap logic
      // 对ref对象取值时，属性名不是ref对象的Symbol标记RefKey，getterHandler返回包装对象的值，即`value.value`
      if (key !== RefKey && isRef(value)) {
        return value.value;
      } else {
        // 不是ref对象，getterHandler直接返回其值，即`value`
        return value;
      }
    },
    set: function setterHandler(newVal) {
      // 属性没有setter，证明这个属性不是被Vue观察的，直接返回
      if (getter && !setter) return;
      // 给响应式对象属性赋值时，先拿到
      const value = getter ? getter.call(target) : val;
      // If the key is equal to RefKey, skip the unwrap logic
      // If and only if "value" is ref and "newVal" is not a ref,
      // the assignment should be proxied to "value" ref.
      // 对ref对象赋值时，并且属性名不是ref对象的Symbol标记RefKey，如果newVal不是ref对象，setterHandler将代理到对ref对象的value属性赋值，即`value.value = newVal`
      if (key !== RefKey && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
      } else if (setter) {
        // 该对象有setter，直接调用setter即可
        // 会通知依赖这一属性状态的对象更新
        setter.call(target, newVal);
      } else if (isRef(newVal)) {
        // 既没有getter也没有setter的情况，普通键值，直接赋值
        val = newVal;
      }
      // 每次重新赋值，考虑到嵌套对象的情况：对newVal重新初始化访问控制
      setupAccessControl(newVal);
    },
  });
}
```

通过上面的代码，我们可以看到，为了给`ref`对象自动解包装，`defineAccessControl`会为`reactive`对象重新设置`getter`和`setter`，考虑到嵌套对象的情况，在初始化响应式对象和重新为响应式对象的某个属性赋值时，会深递归执行`setupAccessControl`，保证整个嵌套对象所有层级的`ref`属性都可以自动解包装。

### `ref` API 原理
---

`ref`的入口在[composition-api/src/reactivity/ref.ts](https://github.com/vuejs/composition-api/blob/master/src/reactivity/ref.ts)，下面先来看`ref`函数：

```typescript
class RefImpl<T> implements Ref<T> {
  public value!: T;
  constructor({ get, set }: RefOption<T>) {
    proxy(this, 'value', {
      get,
      set,
    });
  }
}

export function createRef<T>(options: RefOption<T>) {
  // seal the ref, this could prevent ref from being observed
  // It's safe to seal the ref, since we really shoulnd't extend it.
  // related issues: #79
  // 密封ref，保证其安全性
  return Object.seal(new RefImpl<T>(options));
}

export function ref(raw?: any): any {
  // 先创建一个可观察对象，这个value实际上是一个 Vue Composition API 内部使用的局部变量，并不会暴露给开发者
  const value = reactive({ [RefKey]: raw });
  // 创建ref，对其取值其实最终代理到了value
  return createRef({
    get: () => value[RefKey] as any,
    set: v => ((value[RefKey] as any) = v),
  });
}
```

看到`ref`的入口首先调用`reactive`来创建了一个可观察对象，这个value实际上是一个 Vue Composition API 内部使用的局部变量，并不会暴露给开发者。它具有一个属性值`RefKey`，其实也是个`Symbol`，然后调用`createRef`。`ref`返回`createRef`创建的`ref`对象，`ref`对象实际上通过`getter`和`setter`代理到我们通过`const value = reactive({ [RefKey]: raw })`;创建的局部变量`value`的值，便于我们获取`ref`包装对象的值。

另外为了保证`ref`对象的安全性，不被开发者意外篡改，也为了保证 Vue 不会再为`ref`对象再创建代理（因为包装对象的`value`属性确实没有必要再另外被观察），因此调用`Object.seal`将对象密封。保证只能改变其`value`，而不会为其拓展属性。

`isRef`很简单，通过判断传递的参数是否继承自`RefImpl`：

```typescript
export function isRef<T>(value: any): value is Ref<T> {
  return value instanceof RefImpl;
}
```

`toRefs`将`reactive`对象转换为普通对象，其中结果对象上的每个属性都是指向原始对象中相应属性的`ref`引用对象，这在组合函数返回响应式状态时非常有用，这样保证了开发者使用对象解构或拓展运算符不会丢失原有响应式对象的响应。其实也只是递归调用`createRef`。

```typescript
export function toRefs<T extends Data = Data>(obj: T): Refs<T> {
  if (!isPlainObject(obj)) return obj as any;

  const res: Refs<T> = {} as any;
  Object.keys(obj).forEach(key => {
    let val: any = obj[key];
    // use ref to proxy the property
    if (!isRef(val)) {
      val = createRef<any>({
        get: () => obj[key],
        set: v => (obj[key as keyof T] = v),
      });
    }
    // todo
    res[key as keyof T] = val;
  });

  return res;
}
```

### 小结
---

本文主要描述 Vue Composition API 响应式部分的代码，`reactive`和`ref`都是基于 Vue 响应式对象上做再次封装，`ref`的内部其实是一个响应式对象，`ref`的`value`属性将代理到这个响应式对象上，这个响应式对象对开发者是不可见的，使得调用过程相对友好，而`reactive`提供了对`ref`自动解包装功能，以提升开发者开发体验。