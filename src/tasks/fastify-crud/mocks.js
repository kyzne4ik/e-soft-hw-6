/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} categoryId
 * @property {boolean} inStock
 * @property {string} createdAt
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {'customer'|'admin'} role
 * @property {string} createdAt
 */

/** @type {Category[]} */
export const categories = [
  {
    id: 1,
    name: "Электроника",
    description:
      "Смартфоны, ноутбуки, планшеты и другие электронные устройства",
  },
  {
    id: 2,
    name: "Одежда",
    description: "Мужская, женская и детская одежда",
  },
  {
    id: 3,
    name: "Дом и кухня",
    description: "Товары для дома, кухонная утварь и мебель",
  },
  {
    id: 4,
    name: "Спорт",
    description: "Спортивный инвентарь, тренажеры и экипировка",
  },
  {
    id: 5,
    name: "Книги",
    description: "Художественная и образовательная литература",
  },
];

/** @type {Product[]} */
export const products = [
  {
    id: 1,
    name: "Смартфон Galaxy S21",
    price: 59999,
    categoryId: 1,
    inStock: true,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Ноутбук MacBook Air",
    price: 129999,
    categoryId: 1,
    inStock: true,
    createdAt: "2024-01-20T14:45:00Z",
  },
  {
    id: 3,
    name: "Джинсы классические",
    price: 3499,
    categoryId: 2,
    inStock: true,
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: 4,
    name: "Футболка хлопковая",
    price: 1299,
    categoryId: 2,
    inStock: true,
    createdAt: "2024-02-05T11:20:00Z",
  },
  {
    id: 5,
    name: "Набор кастрюль",
    price: 8999,
    categoryId: 3,
    inStock: false,
    createdAt: "2024-02-10T16:30:00Z",
  },
  {
    id: 6,
    name: "Беговая дорожка",
    price: 45999,
    categoryId: 4,
    inStock: true,
    createdAt: "2024-02-15T08:00:00Z",
  },
  {
    id: 7,
    name: "Гантели 10кг",
    price: 2999,
    categoryId: 4,
    inStock: true,
    createdAt: "2024-02-20T12:45:00Z",
  },
  {
    id: 8,
    name: "JavaScript: The Good Parts",
    price: 1800,
    categoryId: 5,
    inStock: true,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: 9,
    name: "Кофемашина",
    price: 24999,
    categoryId: 3,
    inStock: false,
    createdAt: "2024-03-05T14:30:00Z",
  },
  {
    id: 10,
    name: "Зимняя куртка",
    price: 12999,
    categoryId: 2,
    inStock: true,
    createdAt: "2024-03-10T09:45:00Z",
  },
];

/** @type {User[]} */
export const users = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "admin",
    createdAt: "2023-12-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "user",
    createdAt: "2023-12-05T11:30:00Z",
  },
  {
    id: 3,
    name: "Алексей Смирнов",
    email: "alexey@example.com",
    role: "user",
    createdAt: "2023-12-10T14:15:00Z",
  },
  {
    id: 4,
    name: "Елена Козлова",
    email: "elena@example.com",
    role: "moderator",
    createdAt: "2023-12-15T09:45:00Z",
  },
  {
    id: 5,
    name: "Дмитрий Новиков",
    email: "dmitry@example.com",
    role: "user",
    createdAt: "2023-12-20T16:20:00Z",
  },
  {
    id: 6,
    name: "Анна Морозова",
    email: "anna@example.com",
    role: "admin",
    createdAt: "2024-01-05T13:10:00Z",
  },
  {
    id: 7,
    name: "Сергей Васильев",
    email: "sergey@example.com",
    role: "user",
    createdAt: "2024-01-10T11:45:00Z",
  },
  {
    id: 8,
    name: "Татьяна Павлова",
    email: "tatyana@example.com",
    role: "user",
    createdAt: "2024-01-15T10:30:00Z",
  },
];
