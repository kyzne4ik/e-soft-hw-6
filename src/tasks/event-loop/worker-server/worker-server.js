import { fileURLToPath } from "url";
import fastify from "fastify";
import { dirname } from "path";
import { Worker } from "worker_threads";

const CHUNK_STEP = 100_000_000;
const MAX_CHUNK_SIZE = 5_000_000_000;
const WORKER_PATH = dirname(fileURLToPath(import.meta.url)) + "/slow-worker.js";

console.log({ WORKER_PATH });

fastify({
  logger: true,
})
  .get("/fast", async () => {
    return { message: "I am fast" };
  })
  .get("/slow", async (_, reply) => {
    const result = await new Promise((resolve, reject) => {
      const worker = new Worker(WORKER_PATH, {
        workerData: { limit: MAX_CHUNK_SIZE, chunkStep: CHUNK_STEP },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
    });
    reply.code(200).send(result);
  })
  .listen({ port: 3000 });

/**
 * Сравните два подхода (чанкирование vs worker_threads): плюсы и минусы каждого
 * 
 * Чанкирование - круто, не блокирует основной поток, что даёт делать /fast запросы,
 * но всё равно есть ожидание у пользователя, пока закончится макротаска (например, каждый чанк), 
 * чтобы event-loop передал управление и выполнился /fast запрос.
 * 
 * worker_threads - тоже круто, тоже не блокирует основной поток, что даёт делать /fast запросы,
 * но есть ограничение по cpu (один worker на ядро), 
 * что даёт возможность запустить параллельно несколько воркеров на разные ядра, 
 * однако это требует больше мощностей. 
 */