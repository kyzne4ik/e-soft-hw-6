import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server
  .get("/", () => {
    return { message: "server is running" };
  })
  .get("/health", () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  })
  .get("/time", () => {
    return {
      iso: new Date().toISOString(),
      unix: Date.now(),
    };
  })
  .listen({ port: 3000 })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
