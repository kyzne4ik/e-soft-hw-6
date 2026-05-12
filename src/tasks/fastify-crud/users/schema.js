export const userSchema = {
  body: {
    type: "object",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
      email: {
        type: "string",
        format: "email",
      },
      role: {
        type: "string",
        enum: ["customer", "admin"],
      },
    },
  },
};
