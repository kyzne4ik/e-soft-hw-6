const math = require("./math.cjs");

console.log("math.cjs", "math.add(2,3) =", math.add(2, 3));

/**
 * Можно ли в .cjs файле использовать import?
 * нет нельзя, потому что import - это синтаксис es-modules,
 * но при этом можно сделать костыль по типу:
 *    (async () => {
 *        const module = await import('some-cjs-file');
 *    })()
 */
