import { productsService } from "./products.service.js";

export const productsController = {
  getAll: async (request, reply) => {
    return productsService.getAll(request.query);
  },
  getById: async (request, reply) => {
    const product = productsService.getById(request.params.id);
    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return product;
  },
  create: async (request, reply) => {
    const result = productsService.create(request.body);

    if (result.error === "category_not_found") {
      return reply.status(400).send({ error: "Category not found" });
    }

    return reply.status(201).send(result);
  },
  update: async (request, reply) => {
    const product = productsService.update(request.params.id, request.body);
    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return product;
  },
  delete: async (request, reply) => {
    const success = productsService.delete(request.params.id);
    if (!success) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return reply.status(204).send();
  },
};
