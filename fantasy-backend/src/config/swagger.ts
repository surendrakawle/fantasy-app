import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fantasy Backend API",
      version: "1.0.0",
      description: "Production-ready Fantasy App APIs"
    },
    servers: [
      {
        url: "https://fantasy-api.online/",
        description: "ICT Server"
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
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/routes/*.ts"]
});
