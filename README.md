# Домашнее задание #6: Node.js — Event Loop, Fastify, REST API

**Зачем?**
Это задание закрепит понимание того, как Node.js работает под капотом (Event Loop, асинхронность), и научит строить настоящий REST API на Fastify с правильным роутингом. Без этого невозможно писать серверный код осознанно.

---

## Что нужно сдать

Ссылку на публичный репозиторий на GitHub. Преподаватель проверяет: код, историю коммитов, работоспособность сервера (curl-команды или скриншоты Postman/Bruno).

> **Важно:** каждый пункт задания должен быть реализован в **отдельном файле/папке**. Например: `src/tasks/event-loop/`, `src/tasks/fastify-crud/` и т.д. Это помогает держать код чистым и позволяет проверяющему быстро найти каждое задание.

---

## Часть 1 — Event Loop и асинхронность

### 🔹 1.1. Предсказание порядка выполнения

**Задача:** файл с набором асинхронных вызовов — ваша задача написать правильный порядок вывода **до** запуска.

**Требования:**

* Создайте файл `src/tasks/event-loop/task1-order-prediction.js` со следующим кодом (скопируйте как есть):

```js
console.log('1: sync start')

setTimeout(() => console.log('2: setTimeout 0'), 0)

setImmediate(() => console.log('3: setImmediate'))

Promise.resolve()
  .then(() => console.log('4: promise.then 1'))
  .then(() => console.log('5: promise.then 2'))

process.nextTick(() => console.log('6: nextTick'))

fs.readFile(__filename, () => {
  console.log('7: readFile callback')

  setTimeout(() => console.log('8: inner setTimeout 0'), 0)
  setImmediate(() => console.log('9: inner setImmediate'))

  Promise.resolve().then(() => console.log('10: inner promise'))
  process.nextTick(() => console.log('11: inner nextTick'))
})

console.log('12: sync end')
```

* **Сначала** — напишите в файле `src/tasks/event-loop/answers.md` свой предсказанный порядок (1–12).
* **Потом** — запустите файл (`node order-prediction.js`) и сравните результат.
* **В `answers.md`** добавьте объяснение: почему порядок именно такой. Упомяните microtasks vs macrotasks, фазы Event Loop, приоритет `nextTick` над `Promise.then`.

**Контрольная точка:** объяснение корректное, упоминаются microtasks/macrotasks, `nextTick` > `Promise.then`, фазы Event Loop.

---

### 🔹 1.2. I/O-bound vs CPU-bound — замерьте

**Задача:** два скрипта, демонстрирующие разницу между I/O-bound и CPU-bound нагрузкой.

**Требования:**

* Создайте `src/tasks/event-loop/io-vs-cpu.js`.

* **CPU-bound:** напишите синхронную функцию, которая считает сумму от 1 до 1 000 000 000 в цикле. Замерьте время через `console.time` / `console.timeEnd`.

* **I/O-bound:** прочитайте 10 файлов параллельно через `Promise.all` + `fs.promises.readFile` (файлы создайте заранее — небольшие, по ~1 КБ). Замерьте время.

* Выведите оба времени и добавьте комментарий: почему I/O-bound не блокирует Event Loop, а CPU-bound — блокирует.

* **Дополнительно:** покажите, что во время CPU-задачи `setTimeout` не срабатывает вовремя — добавьте `setTimeout(() => console.log('I should fire in 100ms'), 100)` и запустите перед CPU-задачей. Объясните результат.

**Контрольная точка:** время CPU-задачи > 100ms и setTimeout срабатывает с задержкой. Есть объяснение.

---

### 🔹 1.3. Блокировка Event Loop — найти и исправить

**Задача:** дан «плохой» сервер, который блокирует Event Loop.

**Требования:**

* Создайте `src/tasks/event-loop/blocking-server.js` с Fastify-сервером на порту 3000.

* Добавьте два роута:
  * `GET /fast` — возвращает `{ message: 'I am fast' }` мгновенно.
  * `GET /slow` — выполняет синхронный тяжёлый цикл (сумма от 1 до 5 000 000 000), потом возвращает `{ result: ... }`.

* Покажите проблему: откройте две вкладки/терминала. В первой запросите `/slow`, во второй — `/fast`. `/fast` не ответит, пока `/slow` не завершится.

* **Исправьте:** перепишите `/slow` так, чтобы он не блокировал Event Loop. Варианты:
  * Используйте `setImmediate` или `process.nextTick` для разбиения задачи на чанки.
  * Или вынесите в `worker_threads`.

* Добавьте комментарий: какой подход вы выбрали и почему.

**Контрольная точка:** после исправления `/fast` отвечает мгновенно даже во время выполнения `/slow`.

---

## Часть 2 — CommonJS vs ESM

### 🔹 2.1. Два модуля — один результат

**Задача:** реализуйте одну и ту же утилиту в двух форматах модулей.

**Требования:**

* Создайте `src/tasks/modules/math.cjs` — CommonJS:
  * Экспортируйте функции `add`, `subtract`, `multiply`.
  * Используйте `module.exports`.

* Создайте `src/tasks/modules/math.mjs` — ESM:
  * Те же три функции.
  * Используйте `export` / `export default`.

* Создайте `src/tasks/modules/demo.cjs` — импортируйте `math.cjs` через `require()` и выведите результат `add(2, 3)`.

* Создайте `src/tasks/modules/demo.mjs` — импортируйте `math.mjs` через `import` и выведите результат `add(2, 3)`.

* В комментариях в обоих `demo`-файлах напишите:
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

* Создайте `src/tasks/fastify-basic/server.js`.

* Поднимите Fastify на порту 3000.

* Реализуйте роуты:
  * `GET /` — возвращает `{ message: 'Server is running' }`.
  * `GET /health` — возвращает `{ status: 'ok', uptime: <seconds> }` (используйте `process.uptime()`).
  * `GET /time` — возвращает `{ iso: <ISO string>, unix: <timestamp> }`.

* Добавьте graceful shutdown: при `SIGINT` и `SIGTERM` — закрыть сервер через `fastify.close()` и вывести `Server closed`.

* Добавьте скрипт в `package.json`: `"start": "node src/tasks/fastify-basic/server.js"`.

**Контрольная точка:** все три роута работают, сервер корректно останавливается по Ctrl+C.

---

### 🔹 3.2. REST API — CRUD для задач (Todo)

**Задача:** полноценный REST API для управления задачами. Данные храните в памяти (массив).

**Требования:**

* Создайте `src/tasks/fastify-crud/server.js`.

* Модель задачи (Todo):
  ```js
  {
    id: number,        // автогенерация
    title: string,     // обязательное
    completed: boolean, // по умолчанию false
    createdAt: string  // ISO дата
  }
  ```

* Реализуйте **все** REST-эндпоинты:

  | Метод   | Путь              | Описание                          |
  |---------|-------------------|-----------------------------------|
  | `GET`   | `/api/todos`      | Получить все задачи               |
  | `GET`   | `/api/todos/:id`  | Получить одну задачу по ID        |
  | `POST`  | `/api/todos`      | Создать задачу                    |
  | `PUT`   | `/api/todos/:id`  | Обновить задачу полностью         |
  | `DELETE`| `/api/todos/:id`  | Удалить задачу                    |

* **Валидация через Fastify schema:**
  * `POST` и `PUT` — проверяйте, что `title` — строка, непустая, до 200 символов.
  * Используйте `body` schema в опциях роута:
    ```js
    fastify.post('/api/todos', {
      schema: {
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 200 }
          }
        }
      }
    }, handler)
    ```

* **Обработка ошибок:**
  * Если задача не найдена — возвращайте `404` с `{ error: 'Todo not found' }`.
  * Если валидация не пройдена — Fastify автоматически вернёт `400` с деталями.

* **Query-параметры для `GET /api/todos`:**
  * `?completed=true` — только завершённые.
  * `?completed=false` — только незавершённые.
  * Без параметра — все задачи.
  * Реализуйте через Fastify `querystring` schema.

* Добавьте скрипт `"start:crud": "node src/tasks/fastify-crud/server.js"`.

**Контрольная точка:** все 5 эндпоинтов работают, валидация отдаёт 400, несуществующий ID — 404, фильтрация по `completed` работает.

---

### 🔹 3.3. Роутинг через Fastify Router

**Задача:** вынесите роуты в отдельные файлы, используя `fastify.register()`.

**Требования:**

* Создайте структуру:
  ```
  src/tasks/fastify-router/
    server.js
    routes/
      health.js
      todos.js
  ```

* В `routes/health.js`:
  ```js
  export default async function healthRoutes(fastify) {
    fastify.get('/health', async () => ({ status: 'ok' }))
  }
  ```

* В `routes/todos.js` — перенесите CRUD из задания 3.2.

* В `server.js`:
  ```js
  import fastify from 'fastify'
  import healthRoutes from './routes/health.js'
  import todosRoutes from './routes/todos.js'

  const app = fastify()

  app.register(healthRoutes)
  app.register(todosRoutes, { prefix: '/api' })

  await app.listen({ port: 3000 })
  ```

* Добавьте префикс `/api` для todo-роутов через опцию `prefix` в `register()`.

**Контрольная точка:** роуты разнесены по файлам, сервер работает, эндпоинты доступны по `/api/todos`.

---

### 🔹 3.4. Дополнительно — Логирование и хуки запросов

**Задача:** добавьте логирование и измерение времени ответа.

**Требования:**

* Используйте встроенный логгер Fastify (`fastify.log`).
* Добавьте `onRequest` хук, который логирует метод и URL входящего запроса.
* Добавьте `onResponse` хук, который логирует статус-код и время ответа (`response.elapsedTime`).

```js
fastify.addHook('onRequest', async (request) => {
  fastify.log.info(`→ ${request.method} ${request.url}`)
})

fastify.addHook('onResponse', async (request, reply) => {
  fastify.log.info(`← ${reply.statusCode} (${reply.elapsedTime}ms)`)
})
```

* Покажите в консоли пример логов при нескольких запросах.

**Контрольная точка:** в консоли видны логи каждого запроса с методом, URL, статусом и временем.

---

## Часть 4 — Бонус: Вопросы для самопроверки

Напишите короткие ответы в `README.md` проекта. Важно своими словами, не копировать документацию:

1. Перечислите фазы Event Loop в правильном порядке. На какой фазе выполняются `setTimeout` колбэки, а на какой — `setImmediate`?
2. Почему `process.nextTick` выполняется раньше, чем `Promise.then`? К какой категории (microtasks/macrotasks) они относятся?
3. Что произойдёт, если в обработчике роута Fastify сделать синхронный тяжёлый цикл? Как это влияет на другие запросы?
4. В чём разница между CommonJS (`require`) и ESM (`import`)? Как `"type": "module"` в `package.json` меняет поведение?
5. Объясните принцип REST своими словами. Почему `PUT /api/todos/5` — это обновление, а `POST /api/todos` — создание?
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
        │   ├── order-prediction.js
        │   ├── answers.md
        │   ├── io-vs-cpu.js
        │   ├── test-files/      ← файлы для I/O-теста
        │   └── blocking-server.js
        ├── modules/
        │   ├── math.cjs
        │   ├── math.mjs
        │   ├── demo.cjs
        │   └── demo.mjs
        ├── fastify-basic/
        │   └── server.js
        ├── fastify-crud/
        │   └── server.js
        └── fastify-router/
            ├── server.js
            └── routes/
                ├── health.js
                └── todos.js
```

---

## Дедлайн

**__.05.2026, __:__ по МСК** *(заполнит преподаватель)*

---

## Как сдать

1. Убедитесь, что репозиторий **публичный**.
2. Каждое задание — в отдельной папке внутри `src/tasks/`.
3. Пришлите ссылку на репозиторий преподавателю в установленном формате.

---

## Полезные ресурсы

* [Node.js Event Loop — официальная документация](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
* [Fastify — документация](https://fastify.dev/)
* [Fastify Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
* [CommonJS vs ESM — Node.js docs](https://nodejs.org/api/esm.html)
* [REST API — лучшие практики](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
