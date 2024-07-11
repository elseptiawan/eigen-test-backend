const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API Documentation for Simple Library Management System',
    },
    servers: [
      {
        url: process.env.APP_URL || 'http://localhost:3000',
      },
    ],
  },
  apis: ['./controllers/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
