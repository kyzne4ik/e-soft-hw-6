import { productsController } from "./products.controller.js";
import { productSchema } from "./schema.js";

export async function productRoutes(fastify) {
  fastify.get("/", productsController.getAll);
  fastify.get("/:id", productsController.getById);
  fastify.post("/", { schema: productSchema }, productsController.create);
  fastify.put("/:id", { schema: productSchema }, productsController.update);
  fastify.delete("/:id", productsController.delete);
}
