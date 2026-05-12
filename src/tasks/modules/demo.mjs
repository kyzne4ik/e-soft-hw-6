import { add } from "./math.mjs";

console.log("math.mjs", "math.add(2,3) =", add(2, 3));

/**
 * Можно ли в .mjs файле использовать require?
 *
 * нельзя, потому что это синтаксис CommonJS и его не существует в этом контексте.
 */

/**
 * Что такое "type": "module" в package.json?
 *
 * это настройка, которая включает esm модули,
 * то есть каждый файл *.js будет интерпретироваться как esm.
 */

/**
 * Ещё CommonJS отличается от ESM тем, что
 * cjs - загружается синхронно,
 * а esm - асинхронно.
 * При этом всём в cjs можно использовать динамический импорт по типу
 * (async () => {const module = await import('some-cjs-file')})()
 *
 * Также ESM в отличие от CommonJS - 
 * - не имеет module.exports|require|__dirname|__filename(но есть import.meta.url)
 */
