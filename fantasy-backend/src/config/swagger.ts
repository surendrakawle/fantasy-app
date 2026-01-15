import swaggerJsdoc from "swagger-jsdoc";

const baseUrl = process.env.API_BASE_URL || "http://localhost:4000";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Fantasy Prediction API",
      version: "1.0.0",
      description: "Production-ready Fantasy Prediction Backend APIs"
    },

    servers: [
      {
        url: `${baseUrl}/api/v1`,
        description: process.env.NODE_ENV === "production"
          ? "Production Server"
          : "Development Server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: [
    "./src/routes/**/*.ts",
    "./dist/routes/**/*.js"
  ]
});
