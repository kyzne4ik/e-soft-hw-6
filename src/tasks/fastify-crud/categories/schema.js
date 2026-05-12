export const categorySchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      description: {
        type: "string",
        maxLength: 300,
      },
    },
  },
};
