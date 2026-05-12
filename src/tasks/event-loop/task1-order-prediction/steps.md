
**console**
*<EMPTY>*

**stack** <-

**timer queue**

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**


## 1-шаг:

**console**
*<EMPTY>*

**stack** <-
console.log("1: sync start");

**timer queue**

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 2-шаг:

**console**
1: sync start

**stack** <-

**timer queue**

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 3-шаг:

**console**
1: sync start

**stack**

**timer queue** <-
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 4-шаг:

**console**
1: sync start

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue** <-
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 5-шаг:

**console**
1: sync start

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue** <-
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 6-шаг:

**console**
1: sync start

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue** <-
process.nextTick(() => console.log("6: nextTick"));

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 7-шаг:

**console**
1: sync start

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**
process.nextTick(() => console.log("6: nextTick"));

**I/O queue** <-
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 8-шаг:

**console**
1: sync start

**stack** <-
console.log("12: sync end");

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**
process.nextTick(() => console.log("6: nextTick"));

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 9-шаг:

**console**
1: sync start
12: sync end

**stack** <-

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**
process.nextTick(() => console.log("6: nextTick"));

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 10-шаг:

**console**
1: sync start
12: sync end

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue** <-
process.nextTick(() => console.log("6: nextTick"));

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 11-шаг:

**console**
1: sync start
12: sync end

**stack** <-
() => console.log("6: nextTick");

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 12-шаг:

**console**
1: sync start
12: sync end
6: nextTick

**stack** <-

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 13-шаг:

**console**
1: sync start
12: sync end
6: nextTick

**stack**

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue** <-
Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

## 14-шаг:

**console**
1: sync start
12: sync end
6: nextTick

**stack** <-
() => console.log("4: promise.then 1");
() => console.log("5: promise.then 2");

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 15-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1

**stack** <-
() => console.log("5: promise.then 2");

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 16-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2

**stack** <-

**timer queue**
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 17-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2

**stack**

**timer queue** <-
setTimeout(() => console.log("2: setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 18-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2

**stack** <-
() => console.log("2: setTimeout 0")

**timer queue**

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 19-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0

**stack** <-

**timer queue**

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {...});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 20-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0

**stack**

**timer queue**

**nextTick queue**

**I/O queue** <-
fs.readFile(__filename, () => {
  console.log("7: readFile callback");

  setTimeout(() => console.log("8: inner setTimeout 0"), 0);
  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 21-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0

**stack** <-
console.log("7: readFile callback");

**timer queue**

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {

  setTimeout(() => console.log("8: inner setTimeout 0"), 0);
  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 22-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack** <-

**timer queue**

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {

  setTimeout(() => console.log("8: inner setTimeout 0"), 0);
  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 23-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**

**nextTick queue**

**I/O queue** <-
fs.readFile(__filename, () => {

  setTimeout(() => console.log("8: inner setTimeout 0"), 0);
  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 24-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue** <-
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {

  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 25-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue** <-
fs.readFile(__filename, () => {

  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));

**promise queue**

## 26-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {
  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue** <-
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 27-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue** <-
fs.readFile(__filename, () => {
  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 28-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**
fs.readFile(__filename, () => {
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue** <-
Promise.resolve().then(() => console.log("10: inner promise"));

## 29-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue** <-
fs.readFile(__filename, () => {
  process.nextTick(() => console.log("11: inner nextTick"));
});

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**
Promise.resolve().then(() => console.log("10: inner promise"));

## 30-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue** <-
process.nextTick(() => console.log("11: inner nextTick"));

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**
Promise.resolve().then(() => console.log("10: inner promise"));

## 31-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback

**stack** <-
() => console.log("11: inner nextTick");

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**
Promise.resolve().then(() => console.log("10: inner promise"));

## 32-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick

**stack** <-

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**
Promise.resolve().then(() => console.log("10: inner promise"));

## 33-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue** <-
Promise.resolve().then(() => console.log("10: inner promise"));

## 34-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick

**stack** <-
() => console.log("10: inner promise");

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 35-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise

**stack** <-

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 36-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue** <-
setImmediate(() => console.log("3: setImmediate"));
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 37-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise

**stack** <-
() => console.log("3: setImmediate");

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 38-шаг:

**console**
1: sync start
12: sync end
6: nexttick
4: promise.then 1
5: promise.then 2
2: settimeout 0
7: readfile callback
11: inner nexttick
10: inner promise
3: setimmediate

**stack** <-

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 39-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate

**stack**

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue** <-
setImmediate(() => console.log("9: inner setImmediate"));

**promise queue**

## 40-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate

**stack** <-
() => console.log("9: inner setImmediate");

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 41-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate
9: inner setImmediate

**stack** <-

**timer queue**
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 42-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate
9: inner setImmediate

**stack**

**timer queue** <-
setTimeout(() => console.log("8: inner setTimeout 0"), 0);

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 43-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate
9: inner setImmediate

**stack** <-
() => console.log("8: inner setTimeout 0");

**timer queue**

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**

## 44-шаг:

**console**
1: sync start
12: sync end
6: nextTick
4: promise.then 1
5: promise.then 2
2: setTimeout 0
7: readFile callback
11: inner nextTick
10: inner promise
3: setImmediate
9: inner setImmediate
8: inner setTimeout 0

**stack** <-

**timer queue**

**nextTick queue**

**I/O queue**

**check queue**

**promise queue**