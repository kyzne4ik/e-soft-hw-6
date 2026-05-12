1.1.

В файле "./steps.md" - описал пошагово.

Ответ:

```text
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
```

```bash
➜  e-soft-hw-6 git:(HW_6/feature) ✗ node -v
v20.20.0
➜  e-soft-hw-6 git:(HW_6/feature) ✗ node ./src/tasks/event-loop/task1-order-prediction/task1-order-prediction.js
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
➜  e-soft-hw-6 git:(HW_6/feature) ✗
```

Почему порядок именно такой. Упомяните microtasks vs macrotasks, фазы Event Loop, приоритет nextTick над Promise.then.

Event-loop работает по циклу, но на каждой фазе (макротаске) он останавливается, чтобы проверить очередь микрозадач.
Сначала выполняется синхронный код.
Потом выполняется микротаски:
  так как process.nextTick имеет приоритет над Promise'ом, то nextTick выполняется раньше, а затем promise.
После этого мы возвращаем управление event-loop и начинается выполнение timer'ов, после которых потом следуют микротакси, если они не пустые, потом I/O, снова микротакси, далее check-фаза (setImmediate), снова микротакси и в конце close-фаза (socket.on('close', ...)), снова микротакси и потом возвращается timers-фаза. 

При этом важно понимать, что если в очереди, например, timers'ов лежит 5 готовых таймеров, то микрозадачи выполнятся после каждого из них, а не один раз в конце всей фазы.

```mermaid
flowchart TD
    timers -> pending
    pending -> idle
    idle -> poll
    poll -> check
    check -> close
    close -> timers
```
