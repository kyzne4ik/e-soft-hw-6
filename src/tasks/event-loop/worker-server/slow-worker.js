import { parentPort, workerData } from "worker_threads";

const { limit, chunkStep } = workerData;

console.log("worker:", limit);
console.time("worker");

(async function () {
  let sum = 0;

  for (let chunk = 0; chunk < limit; chunk += chunkStep) {
    await new Promise((resolve) => {
      setImmediate(() => {
        for (let i = chunk; i < chunk + chunkStep; i++) {
          sum += i;
        }
        resolve();
      });
      console.log({ chunk });
    });
  }
  return sum;
})().then((res) => {
  console.timeEnd("worker");
  parentPort.postMessage({
    result: "I am slow, sum: " + res,
  });
});
