export const productSchema = {
  body: {
    type: "object",
    required: ["name", "price", "categoryId"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 200,
      },
      price: {
        type: "number",
        minimum: 0.01,
      },
      categoryId: {
        type: "integer",
        minimum: 1,
      },
      inStock: {
        type: "boolean",
      },
    },
  },
};
