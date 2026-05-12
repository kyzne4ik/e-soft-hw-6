import { db } from "../db.js";

export const usersService = {
  getAll(role) {
    if (role) {
      return db.users.filter((u) => u.role === role);
    }
    return db.users;
  },
  getById(id) {
    return db.users.find((u) => u.id === Number(id));
  },
  create(data) {
    const isTaken = db.users.some((u) => u.email === data.email);
    if (isTaken) return { error: "email_conflict" };

    const newUser = {
      id: db.users.length > 0 ? Math.max(...db.users.map((u) => u.id)) + 1 : 1,
      role: data.role || "customer",
      ...data,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    return newUser;
  },
  update(id, data) {
    const idx = db.users.findIndex((u) => u.id === Number(id));
    if (idx === -1) return null;

    db.users[idx] = { ...db.users[idx], ...data };
    return db.users[idx];
  },
  delete(id) {
    const idx = db.users.findIndex((u) => u.id === Number(id));
    if (idx === -1) return false;
    db.users.splice(idx, 1);
    return true;
  },
};
