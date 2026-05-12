import { usersService } from "./users.service.js";

export const usersController = {
  getAll: async (request, reply) => {
    return usersService.getAll(request.query.role);
  },
  getById: async (request, reply) => {
    const user = usersService.getById(request.params.id);
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    return user;
  },
  create: async (request, reply) => {
    const result = usersService.create(request.body);

    if (result.error === "email_conflict") {
      return reply.status(409).send({ error: "Email already exists" });
    }

    return reply.status(201).send(result);
  },
  update: async (request, reply) => {
    const user = usersService.update(request.params.id, request.body);
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    return user;
  },
  delete: async (request, reply) => {
    const success = usersService.delete(request.params.id);
    if (!success) {
      return reply.status(404).send({ error: "User not found" });
    }
    return reply.status(204).send();
  },
};
