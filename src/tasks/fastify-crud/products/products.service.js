import { db } from "../db.js";

export const productsService = {
  getAll(filters = {}) {
    let result = [...db.products];

    if (filters.categoryId) {
      result = result.filter(
        (p) => p.categoryId === Number(filters.categoryId),
      );
    }

    if (filters.inStock !== undefined) {
      const isStock = filters.inStock === "true";
      result = result.filter((p) => p.inStock === isStock);
    }

    return result;
  },
  getById(id) {
    return db.products.find((p) => p.id === Number(id));
  },
  create(data) {
    const categoryExists = db.categories.some((c) => c.id === data.categoryId);
    if (!categoryExists) return { error: "category_not_found" };

    const newProduct = {
      id:
        db.products.length > 0
          ? Math.max(...db.products.map((p) => p.id)) + 1
          : 1,
      inStock: data.inStock ?? true,
      ...data,
      createdAt: new Date().toISOString(),
    };
    db.products.push(newProduct);
    return newProduct;
  },
  update(id, data) {
    const idx = db.products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return null;

    db.products[idx] = { ...db.products[idx], ...data };
    return db.products[idx];
  },
  delete(id) {
    const idx = db.products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return false;
    db.products.splice(idx, 1);
    return true;
  },
};
