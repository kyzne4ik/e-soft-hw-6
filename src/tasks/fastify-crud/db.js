import {
  categories as catMocks,
  products as prodMocks,
  users as usersMocks,
} from "./mocks.js";

export const db = {
  categories: [],
  products: [],
  users: [],
  nextIds: {
    categories: 1,
    products: 1,
    users: 1,
  },
};

db.categories = [...catMocks];
db.products = [...prodMocks];
db.users = [...usersMocks];

db.nextIds.categories = catMocks.length;
db.nextIds.products = prodMocks.length;
db.nextIds.users = usersMocks.length;
