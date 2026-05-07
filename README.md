# Домашнее задание #6: Node.js — Event Loop, Fastify, REST API

**Зачем?**
Это задание закрепит понимание того, как Node.js работает под капотом (Event Loop, асинхронность), и научит строить настоящий REST API на Fastify с правильным роутингом. Без этого невозможно писать серверный код осознанно.

---

## Что нужно сдать

Ссылку на публичный репозиторий на GitHub. Преподаватель проверяет: код, историю коммитов, работоспособность сервера (curl-команды или скриншоты Postman/Bruno).

> **Важно:** каждый пункт задания должен быть реализован в **отдельном файле/папке**. Например: `src/tasks/event-loop/`, `src/tasks/fastify-crud/` и т.д. Это помогает держать код чистым и позволяет проверяющему быстро найти каждое задание.

P.S В репозитории есть ветка с подсказками, если вы застряли по ДЗ -> ветка helpder. 
https://github.com/BubbaCat/backend_dz_6/edit/helper/README.md

---

## Часть 1 — Event Loop и асинхронность

### 🔹 1.1. Предсказание порядка выполнения

**Задача:** файл с набором асинхронных вызовов — ваша задача написать правильный порядок вывода **до** запуска.

**Требования:**

- Создайте файл `src/tasks/event-loop/task1-order-prediction.js` со следующим кодом (скопируйте как есть):

```js
console.log("1: sync start");

setTimeout(() => console.log("2: setTimeout 0"), 0);

setImmediate(() => console.log("3: setImmediate"));

Promise.resolve()
  .then(() => console.log("4: promise.then 1"))
  .then(() => console.log("5: promise.then 2"));

process.nextTick(() => console.log("6: nextTick"));

fs.readFile(__filename, () => {
  console.log("7: readFile callback");

  setTimeout(() => console.log("8: inner setTimeout 0"), 0);
  setImmediate(() => console.log("9: inner setImmediate"));

  Promise.resolve().then(() => console.log("10: inner promise"));
  process.nextTick(() => console.log("11: inner nextTick"));
});

console.log("12: sync end");
```

- **Сначала** — напишите в файле `src/tasks/event-loop/answers.md` свой предсказанный порядок (1–12).
- **Потом** — запустите файл (`node order-prediction.js`) и сравните результат.
- **В `answers.md`** добавьте объяснение: почему порядок именно такой. Упомяните microtasks vs macrotasks, фазы Event Loop, приоритет `nextTick` над `Promise.then`.

**Контрольная точка:** объяснение корректное, упоминаются microtasks/macrotasks, `nextTick` > `Promise.then`, фазы Event Loop.

---

### 🔹 1.2. I/O-bound vs CPU-bound — замерьте

**Задача:** два скрипта, демонстрирующие разницу между I/O-bound и CPU-bound нагрузкой.

**Требования:**

- Создайте `src/tasks/event-loop/io-vs-cpu.js`.

- **CPU-bound:** напишите синхронную функцию, которая считает сумму от 1 до 1 000 000 000 в цикле. Замерьте время через `console.time` / `console.timeEnd`.

- **I/O-bound:** прочитайте 10 файлов параллельно через `Promise.all` + `fs.promises.readFile` (файлы создайте заранее — небольшие, по ~1 КБ). Замерьте время.

- Выведите оба времени и добавьте комментарий: почему I/O-bound не блокирует Event Loop, а CPU-bound — блокирует.

- **Дополнительно:** покажите, что во время CPU-задачи `setTimeout` не срабатывает вовремя — добавьте `setTimeout(() => console.log('I should fire in 100ms'), 100)` и запустите перед CPU-задачей. Объясните результат.

**Контрольная точка:** время CPU-задачи > 100ms и setTimeout срабатывает с задержкой. Есть объяснение.

---

### 🔹 1.3. Блокировка Event Loop — найти и исправить

**Задача:** дан «плохой» сервер, который блокирует Event Loop.

**Требования:**

- Создайте `src/tasks/event-loop/blocking-server.js` с Fastify-сервером на порту 3000.

- Добавьте два роута:

  - `GET /fast` — возвращает `{ message: 'I am fast' }` мгновенно.
  - `GET /slow` — выполняет синхронный тяжёлый цикл (сумма от 1 до 5 000 000 000), потом возвращает `{ result: ... }`.

- Покажите проблему: откройте две вкладки/терминала. В первой запросите `/slow`, во второй — `/fast`. `/fast` не ответит, пока `/slow` не завершится.

- **Исправьте:** перепишите `/slow` через разбиение на чанки с `setImmediate`. Идея: вместо одного цикла на 5 млрд итераций — разбиваем на части (например, по 100 млн), между чанками отдаём управление Event Loop через `setImmediate`. Это даёт Event Loop шанс обработать другие запросы между чанками.

- Добавьте комментарий: как работает чанкирование и почему `setImmediate` освобождает Event Loop.

**Контрольная точка:** после исправления `/fast` отвечает мгновенно даже во время выполнения `/slow`.

---

### 🔹 1.4. Бонус — worker_threads

**Задача:** альтернативный способ неблокирующих вычислений — настоящий отдельный поток ОС.

**Требования:**

- Создайте `src/tasks/event-loop/worker-server.js` — перепишите `/slow` из задания 1.3 через `worker_threads`.

- Создайте `src/tasks/event-loop/slow-worker.js` — файл для Worker'а, который принимает `limit` через `workerData` и отправляет результат через `parentPort.postMessage()`.

- Используйте паттерн:

  ```js
  const { Worker } = require("worker_threads");
  const result = await new Promise((resolve, reject) => {
    const worker = new Worker("./slow-worker.js", {
      workerData: { limit: 5_000_000_000 },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
  ```

- В комментарии сравните два подхода (чанкирование vs worker_threads): плюсы и минусы каждого.

**Контрольная точка:** `/fast` отвечает мгновенно, результат `/slow` корректный, есть сравнение подходов.

---

## Часть 2 — CommonJS vs ESM

### 🔹 2.1. Два модуля — один результат

**Задача:** реализуйте одну и ту же утилиту в двух форматах модулей.

**Требования:**

- Создайте `src/tasks/modules/math.cjs` — CommonJS:

  - Экспортируйте функции `add`, `subtract`, `multiply`.
  - Используйте `module.exports`.

- Создайте `src/tasks/modules/math.mjs` — ESM:

  - Те же три функции.
  - Используйте `export` / `export default`.

- Создайте `src/tasks/modules/demo.cjs` — импортируйте `math.cjs` через `require()` и выведите результат `add(2, 3)`.

- Создайте `src/tasks/modules/demo.mjs` — импортируйте `math.mjs` через `import` и выведите результат `add(2, 3)`.

- В комментариях в обоих `demo`-файлах напишите:
  1. Можно ли в `.cjs` файле использовать `import`? (спойлер: нет, без настройки — объясните почему).
  2. Можно ли в `.mjs` файле использовать `require`? (спойлер: нет — объясните почему).
  3. Что такое `"type": "module"` в `package.json` и как он влияет на расширения файлов?

**Контрольная точка:** оба `demo` файла запускаются и выводят `5`. Комментарии содержат корректные объяснения.

---

## Часть 3 — Fastify: сервер и роутинг

### 🔹 3.1. Первый Fastify-сервер

**Задача:** минимальный сервер с несколькими роутами.

**Установите зависимости:**

```bash
npm init -y
npm install fastify
```

**Требования:**

- Создайте `src/tasks/fastify-basic/server.js`.

- Поднимите Fastify на порту 3000.

- Реализуйте роуты:

  - `GET /` — возвращает `{ message: 'Server is running' }`.
  - `GET /health` — возвращает `{ status: 'ok', uptime: <seconds> }` (используйте `process.uptime()`).
  - `GET /time` — возвращает `{ iso: <ISO string>, unix: <timestamp> }`.

- Добавьте graceful shutdown: при `SIGINT` и `SIGTERM` — закрыть сервер через `fastify.close()` и вывести `Server closed`.

- Добавьте скрипт в `package.json`: `"start": "node src/tasks/fastify-basic/server.js"`.

**Контрольная точка:** все три роута работают, сервер корректно останавливается по Ctrl+C.

---

### 🔹 3.2. REST API — Интернет-магазин

**Задача:** полноценный REST API для небольшого магазина. Три сущности: категории, товары, пользователи. Данные в памяти (массивы).

**Требования:**

- Создайте `src/tasks/fastify-crud/server.js`.

#### Модели:

**Категория (Category):**

```js
{
  id: number,          // автогенерация
  name: string,        // обязательное, до 50 символов
  description: string  // опциональное, до 300 символов
}
```

**Товар (Product):**

```js
{
  id: number,          // автогенерация
  name: string,        // обязательное, до 200 символов
  price: number,       // обязательное, > 0
  categoryId: number,  // обязательное, должно существовать в категориях
  inStock: boolean,    // по умолчанию true
  createdAt: string    // ISO дата
}
```

**Пользователь (User):**

```js
{
  id: number,          // автогенерация
  name: string,        // обязательное, до 100 символов
  email: string,       // обязательное, уникальное
  role: string,        // "customer" | "admin", по умолчанию "customer"
  createdAt: string    // ISO дата
}
```

#### Эндпоинты:

**Категории:**

| Метод    | Путь                  | Описание           |
| -------- | --------------------- | ------------------ |
| `GET`    | `/api/categories`     | Все категории      |
| `GET`    | `/api/categories/:id` | Одна категория     |
| `POST`   | `/api/categories`     | Создать категорию  |
| `PUT`    | `/api/categories/:id` | Обновить категорию |
| `DELETE` | `/api/categories/:id` | Удалить категорию  |

**Товары:**

| Метод    | Путь                | Описание                           |
| -------- | ------------------- | ---------------------------------- |
| `GET`    | `/api/products`     | Все товары (?categoryId=&inStock=) |
| `GET`    | `/api/products/:id` | Один товар                         |
| `POST`   | `/api/products`     | Создать товар                      |
| `PUT`    | `/api/products/:id` | Обновить товар                     |
| `DELETE` | `/api/products/:id` | Удалить товар                      |

**Пользователи:**

| Метод    | Путь             | Описание                  |
| -------- | ---------------- | ------------------------- |
| `GET`    | `/api/users`     | Все пользователи (?role=) |
| `GET`    | `/api/users/:id` | Один пользователь         |
| `POST`   | `/api/users`     | Создать пользователя      |
| `PUT`    | `/api/users/:id` | Обновить пользователя     |
| `DELETE` | `/api/users/:id` | Удалить пользователя      |

#### Валидация через Fastify schema:

- `POST` / `PUT` для каждой сущности — валидируйте поля через `body` schema.
- Пример для товара:
  ```js
  {
    body: {
      type: 'object',
      required: ['name', 'price', 'categoryId'],
      properties: {
        name:       { type: 'string', minLength: 1, maxLength: 200 },
        price:      { type: 'number', minimum: 0.01 },
        categoryId: { type: 'integer', minimum: 1 },
        inStock:    { type: 'boolean' }
      }
    }
  }
  ```
- При ошибке валидации Fastify автоматически вернёт `400` с деталями.

#### Бизнес-логика:

- **Удаление категории** — должно вернуть `400` с `{ error: 'Category has products' }`, если в ней есть товары.
- **Создание товара** — если `categoryId` не существует — вернуть `400` с `{ error: 'Category not found' }`.
- **Создание пользователя** — если `email` уже занят — вернуть `409` с `{ error: 'Email already exists' }`.
- **Обработка ошибок:** сущность не найдена — `404` с `{ error: '... not found' }`.

#### Query-параметры:

- `GET /api/products?categoryId=1` — товары конкретной категории.
- `GET /api/products?inStock=true` — только в наличии.
- `GET /api/products?categoryId=1&inStock=true` — комбинирование.
- `GET /api/users?role=admin` — фильтрация по роли.

- Добавьте скрипт `"start:crud": "node src/tasks/fastify-crud/server.js"`.

**Контрольная точка:** все 15 эндпоинтов работают, валидация отдаёт 400, конфликт email — 409, удаление категории с товарами — 400, фильтрация по query работает.

---

## Часть 4 — Бонус: Вопросы для самопроверки

Напишите короткие ответы в `README.md` проекта. Важно своими словами, не копировать документацию:

1. Перечислите фазы Event Loop в правильном порядке. На какой фазе выполняются `setTimeout` колбэки, а на какой — `setImmediate`?
2. Почему `process.nextTick` выполняется раньше, чем `Promise.then`? К какой категории (microtasks/macrotasks) они относятся?
3. Что произойдёт, если в обработчике роута Fastify сделать синхронный тяжёлый цикл? Как это влияет на другие запросы?
4. В чём разница между CommonJS (`require`) и ESM (`import`)? Как `"type": "module"` в `package.json` меняет поведение?
5. Объясните принцип REST своими словами. Почему `PUT /api/products/5` — это обновление, а `POST /api/products` — создание?
6. Что такое graceful shutdown и почему `fastify.close()` важнее, чем просто убить процесс?

---

## Структура проекта

```
dz_6/
├── package.json
├── README.md                    ← ответы на бонус-вопросы
└── src/
    └── tasks/
        ├── event-loop/
        │   ├── task1-order-prediction.js
        │   ├── answers.md
        │   ├── io-vs-cpu.js
        │   ├── test-files/        ← файлы для I/O-теста
        │   ├── blocking-server.js  ← чанкирование
        │   ├── worker-server.js    ← бонус: worker_threads
        │   └── slow-worker.js      ← бонус: worker
        ├── modules/
        │   ├── math.cjs
        │   ├── math.mjs
        │   ├── demo.cjs
        │   └── demo.mjs
        ├── fastify-basic/
        │   └── server.js
        └── fastify-crud/
            └── server.js            ← Store API (categories, products, users)
```

---

## Дедлайн

12.05.2026, 12:00 по МСК
---

## Как сдать

1. Убедитесь, что репозиторий **публичный**.
2. Каждое задание — в отдельной папке внутри `src/tasks/`.
3. Пришлите ссылку на репозиторий преподавателю в установленном формате.

---

## Полезные ресурсы

- [Node.js Event Loop — официальная документация](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Fastify — документация](https://fastify.dev/)
- [Fastify Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
- [CommonJS vs ESM — Node.js docs](https://nodejs.org/api/esm.html)
- [REST API — лучшие практики](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
