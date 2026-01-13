import swaggerJsdoc from "swagger-jsdoc";

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
        url: "http://localhost:4000/api/v1",
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

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // 🔥 MOST IMPORTANT PART
  apis: [
    "./src/routes/**/*.ts",   // for development
    "./dist/routes/**/*.js"   // for production build
  ]
});
