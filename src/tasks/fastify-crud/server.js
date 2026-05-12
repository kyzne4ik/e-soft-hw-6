import Fastify from "fastify";
import { categoryRoutes } from "./categories/index.js";
import { productRoutes } from "./products/index.js";
import { userRoutes } from "./users/index.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", () => {
  return { message: "server is running" };
});
fastify.register(categoryRoutes, { prefix: "/api/categories" });
fastify.register(productRoutes, { prefix: "/api/products" });
fastify.register(userRoutes, { prefix: "/api/users" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
