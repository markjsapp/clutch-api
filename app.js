const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Set up Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Axe Throwing API',
      version: '1.0.0',
      description: 'An API for tracking axe throwing scores'
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            games: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Game',
              },
            },
          },
        },
        Game: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
            },
            opponent: {
              type: 'string',
            },
            score: {
              type: 'number',
            },
            win: {
              type: 'boolean',
            },
            killshots: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
  basePath: '/'
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set up API routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
