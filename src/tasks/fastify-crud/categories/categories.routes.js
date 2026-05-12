import { categoriesController } from "./categories.controller.js";
import { categorySchema } from "./schema.js";

export async function categoryRoutes(fastify) {
  fastify.get("/", categoriesController.getAll);
  fastify.get("/:id", categoriesController.getById);
  fastify.post("/", { schema: categorySchema }, categoriesController.create);
  fastify.put("/:id", { schema: categorySchema }, categoriesController.update);
  fastify.delete("/:id", categoriesController.delete);
}
