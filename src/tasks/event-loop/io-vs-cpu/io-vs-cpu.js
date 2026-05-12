const fs = require("fs");

// CPU-bound
console.time("cpu-task");

let sum = 0;
for (let i = 0; i < 1_000_000_000; i++) sum += i;

console.timeEnd("cpu-task");
setTimeout(() => console.log("I should fire in 100ms"), 100);

// I/O-bound
console.time("I/O-task");

const filePromises = Promise.all(
  Array.from({ length: 10 }, async (_, i) => {
    return await fs.promises.readFile(__dirname + `/files/file-${i + 1}`);
  }),
);

console.timeEnd("I/O-task");

/** Вопрос: 
 * Почему I/O-bound не блокирует Event Loop, а CPU-bound — блокирует
 */
 /** Ответ:
  * Потому что cpu-bound не передаёт управление event-loop и является синхронным, 
  * а синхронщина всегда выполняется до конца,
  * прежде чем event-loop пойдёт доставать callback'и из других очередей!
  * I/O-bound же в свою очередь является асинхронщиной, которая не блокирует основной поток из-за того,
  * что операция делегируется libuv - который использует отдельные потоки системы, 
  * освобождающие основной поток от выполнения др. задач.
  */
  
/** 
 * Объяснение результата, 'Почему setTimeout(() => console.log('I should fire in 100ms'), 100) не срабатывает вовремя?".
 */
 /** Ответ:
  * Потому что синхронщина выполнялась слишком долго
  * и блокировала call-stack,
  * а event-loop не может проверить timer queue, 
  * пока стек не освободится, даже если таймер уже выполнился!
  */