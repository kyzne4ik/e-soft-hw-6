import { usersController } from "./users.controller.js";
import { userSchema } from "./schema.js";

export async function userRoutes(fastify) {
  fastify.get("/", usersController.getAll);
  fastify.get("/:id", usersController.getById);
  fastify.post("/", { schema: userSchema }, usersController.create);
  fastify.put("/:id", { schema: userSchema }, usersController.update);
  fastify.delete("/:id", usersController.delete);
}
