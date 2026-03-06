const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use('/api/', limiter);

// API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tasks', require('./routes/taskRoutes'));

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'API for managing tasks for a backend developer internship'
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [path.join(__dirname, 'routes', '*.js')]
};

// ADD THESE DEBUG LINES
console.log('🔍 __dirname is:', __dirname);
console.log('🔍 Looking for routes at:', path.join(__dirname, 'routes', '*.js'));
console.log('🔍 Files in routes folder:', require('fs').readdirSync(path.join(__dirname, 'routes')));

const swaggerDocs = swaggerJsdoc(swaggerOptions);

console.log('📚 Swagger spec:', JSON.stringify(swaggerDocs, null, 2));
console.log('📚 Number of paths found:', Object.keys(swaggerDocs.paths || {}).length);
console.log('📋 Path names:', Object.keys(swaggerDocs.paths || {}));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
