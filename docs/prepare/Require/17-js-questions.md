# Js questions

[[toc]]

## 1. for in 和 for of 的区别

1. for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值
2. for of 遍历的只是数组内的元素，而不包括数组的原型属性 method 和索引 name
3. for in 可以遍历到 对象 的原型方法 method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性
4. for..of 适用遍历数/数组对象/字符串/map/set 等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与 forEach()不同的是，它可以正确响应 break、continue 和 return 语句
5. for-of 循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）或内建的 Object.keys()方法

### 1.遍历数组通常用 for 循环

ES5 的话也可以使用 `forEach`，ES5 具有遍历数组功能的还有 `map`、`filter`、`some`、`every`、`reduce`、`reduceRight` 等，只不过他们的返回结果不一样。**但是使用 `foreach` 遍历数组的话，使用 `break` 不能中断循环，使用 `return` 也不能返回到外层函数**。

```js
Array.prototype.method = function() {
  console.log(this.length);
};
var myArray = [1, 2, 4, 5, 6, 7];
myArray.name = "数组";
for (var index in myArray) {
  console.log(myArray[index]);
}
```

### 2 for in 遍历数组的毛病

1. index 索引为字符串型数字，不能直接进行几何运算
2. 遍历顺序有可能不是按照实际数组的内部顺序
3. **使用 for in 会遍历数组所有的可枚举属性，包括原型**。例如上栗的原型方法 method 和 name 属性

所以 for in 更适合遍历对象，不要使用 for in 遍历数组。

那么除了使用 for 循环，如何更简单的正确的遍历数组达到我们的期望呢（即不遍历 method 和 name），ES6 中的 for of 更胜一筹.

```js
Array.prototype.method = function() {
  console.log(this.length);
};
var myArray = [1, 2, 4, 5, 6, 7];
myArray.name = "数组";
for (var value of myArray) {
  console.log(value);
}
```

记住，for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值。

for of 遍历的只是数组内的元素，而不包括数组的原型属性 method 和索引 name

### 3 遍历对象

遍历对象 通常用 for in 来遍历对象的键名

```js
Object.prototype.method = function() {
  console.log(this);
};
var myObject = {
  a: 1,
  b: 2,
  c: 3
};
for (var key in myObject) {
  console.log(key);
}
```

**for in 可以遍历到 myObject 的原型方法 method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性**

```js
for (var key in myObject) {
  if (myObject.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

同样可以通过 ES5 的 `Object.keys(myObject)`获取对象的实例属性组成的数组，不包括原型方法和属性

```js
Object.prototype.method = function() {
  console.log(this);
};
var myObject = {
  a: 1,
  b: 2,
  c: 3
};
```

### 总结

1. for..of 适用遍历数/数组对象/字符串/map/set 等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与 forEach()不同的是，它可以正确响应 break、continue 和 return 语句
2. for-of 循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）或内建的 Object.keys()方法：
   ```js
   for (var key of Object.keys(someObject)) {
     console.log(key + ": " + someObject[key]);
   }
   ```
3. 遍历 map 对象时适合用解构,例如;
   ```js
   for (var [key, value] of phoneBookMap) {
     console.log(key + "'s phone number is: " + value);
   }
   ```
4. 当你为对象添加`myObject.toString()`方法后，就可以将对象转化为字符串，同样地，当你向任意对象添加`myObjectSymbol.iterator`方法，就可以遍历这个对象了。
   ```js
   jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
   ```
   所有拥有`Symbol.iterator`的对象被称为可迭代的。可迭代对象的概念几乎贯穿于整门语言之中，不仅是 for-of 循环，还有 Map 和 Set 构造函数、解构赋值，以及新的展开操作符。
5. for...of 的步骤  
   for-of 循环首先调用集合的 Symbol.iterator 方法，紧接着返回一个新的迭代器对象。迭代器对象可以是任意具有.next()方法的对象；for-of 循环将重复调用这个方法，每次循环调用一次。举个例子，这段代码是我能想出来的最简单的迭代器：
   ```js
   var zeroesForeverIterator = {
     [Symbol.iterator]: function() {
       return this;
     },
     next: function() {
       return { done: false, value: 0 };
     }
   };
   ```

## 2.
