import { db } from "../db.js";

export const categoriesService = {
  getAll() {
    return db.categories;
  },
  getById(id) {
    return db.categories.find((cat) => cat.id === Number(id));
  },
  create(data) {
    const newCategory = {
      id:
        db.categories.length > 0
          ? Math.max(...db.categories.map((c) => c.id)) + 1
          : 1,
      ...data,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  update(id, data) {
    const idx = db.categories.findIndex((cat) => cat.id === Number(id));
    if (idx === -1) return null;

    db.categories[idx] = { ...db.categories[idx], ...data };
    return db.categories[idx];
  },
  delete(id) {
    const numericId = Number(id);
    const idx = db.categories.findIndex((cat) => cat.id === numericId);
    if (idx === -1) return { success: false, error: "not_found" };

    const hasProducts = db.products.some((p) => p.categoryId === numericId);
    if (hasProducts) return { success: false, error: "has_products" };

    db.categories.splice(idx, 1);
    return { success: true };
  },
};
