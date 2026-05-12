import fastify from "fastify";

const CHUNK_STEP = 100_000_000;
const MAX_CHUNK_SIZE = 5_000_000_000;

// function badCalculate() {
//   let sum = 0;
//   for (let chunk = 0; chunk < MAX_CHUNK_SIZE; chunk += CHUNK_STEP) {
//     for (let i = chunk; i < chunk + CHUNK_STEP; i++) {
//       sum += i;
//     }
//     console.log({ chunk });
//   }
//   return sum;
// }

async function calculate() {
  let sum = 0;
  for (let chunk = 0; chunk < MAX_CHUNK_SIZE; chunk += CHUNK_STEP) {
    await new Promise((resolve) => {
      setImmediate(() => {
        for (let i = chunk; i < chunk + CHUNK_STEP; i++) {
          sum += i;
        }
        resolve();
      });
    });
    console.log({ chunk });
  }
  return sum;
}

fastify({
  logger: true,
})
  .get("/fast", async (req, reply) => {
    return { message: "I am fast" };
  })
  .get("/old-slow", async () => {
    for (let i = 0; i < MAX_CHUNK_SIZE; i++);
    return { message: "I am slow" };
  })
  .get("/slow", async (req, reply) => {
    const sum = await calculate();
    // const sum = await badCalculate();
    reply.code(200).send({ result: "I am slow, sum: " + sum });
  })
  .listen({ port: 3000 });

/**
 * Как работает чанкирование и почему setImmediate освобождает Event Loop?
 * 
 * Чанкирование работает по принципу разбиения какого-то большого объёма на несколько маленьких.
 * В данном случае у нас перебор на 5млрд. зн-й и мы разбиваем их на 50 чанков.
 * 
 * Потому что setImmediate передаёт управление event-loop, 
 * после того, как выполнится каждая макро-задача.
 * В нашем примере мы разбили на чанки наш перебор, что позволило выполнять каждый чанк, 
 * как отдельную макро-задачу, не блокируя основной поток 
 * с возможностью обработать другие запросы, например, /fast, между чанками.
 * Если бы весь цикл был бы чистой синхронщиной, то поток был бы заблокирован
 * и мы бы не смогли выполнить /fast, при работающем /slow .
 */