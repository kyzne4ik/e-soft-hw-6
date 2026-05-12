import { categoriesService } from "./categories.service.js";

export const categoriesController = {
  getAll: async (request, reply) => {
    return categoriesService.getAll();
  },
  getById: async (request, reply) => {
    const category = categoriesService.getById(request.params.id);
    if (!category) {
      return reply.status(404).send({ error: "Category not found" });
    }
    return category;
  },
  create: async (request, reply) => {
    const category = categoriesService.create(request.body);
    return reply.status(201).send(category);
  },
  update: async (request, reply) => {
    const category = categoriesService.update(request.params.id, request.body);
    if (!category) {
      return reply.status(404).send({ error: "Category not found" });
    }
    return category;
  },
  delete: async (request, reply) => {
    const result = categoriesService.delete(request.params.id);

    if (!result.success) {
      if (result.error === "has_products") {
        return reply.status(400).send({ error: "Category has products" });
      }
      return reply.status(404).send({ error: "Category not found" });
    }

    return reply.status(204).send();
  },
};
