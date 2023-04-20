// Description: This file contains the express app configuration class

// Importing the express module
import express from 'express';
// Importing morgan
import morgan from 'morgan';
// Importing the cors module
import cors from 'cors';
// Importing the swagger UI
import swaggerUi from 'swagger-ui-express';
// Importing the swagger configuration
import swaggerConfiguration from './config/swagger.config.js';
// Importing the database connection test
import testDatabase from './database/test.database.js';
// Importing the database sync
import syncDatabase from './database/sync.database.js';

class App {
    // The constructor method
    constructor() {
        // Declare and initialize the express app
        this.app = express();
        // Call the methods to configure the app
        this.setMiddlewares();
        this.setRoutes();
        this.setDatabase();
    }
    // The middlewares method
    setMiddlewares = () => {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }
    // The routes method
    setRoutes = () => {
        this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfiguration));
    }
    // Set database 
    setDatabase = async() => {
        // Test the database connection
        await testDatabase();
        // Sync the database with the models
        await syncDatabase();
    }
    // The start method
    start = (port=3000) => {
        this.app.listen(port, () => console.log(`Server running on port ${port}`));
    }
}

// Exporting the app
export default App;
