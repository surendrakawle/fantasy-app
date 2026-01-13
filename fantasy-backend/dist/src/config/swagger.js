"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
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
        "./src/routes/**/*.ts", // for development
        "./dist/routes/**/*.js" // for production build
    ]
});
