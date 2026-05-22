import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareerBytes API',
      version: '1.0.0',
      description: 'Dokumentasi REST API untuk platform CareerBytes',
    },
    servers: [
      { 
        url: 'https://careerbytes-capstone-production-d45d.up.railway.app',
        description: 'Production Server (Railway)' 
      },
      { 
        url: 'http://localhost:3000',
        description: 'Local Server' 
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Ditambah versi .js buat amannya production
};

// Menggunakan Named Export agar ramah TypeScript compiler
export const swaggerSpec = swaggerJsdoc(options);