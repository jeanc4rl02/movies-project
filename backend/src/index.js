// Importing the app
import app from './app.js';
// Importing port
import {PORT} from './config/env.config.js';
// Importing the test database function
import testDatabase from './database/test.database.js';
// Importing the sync database function
import syncDatabase from './database/sync.database.js';

// Setting the port
const port = PORT || 3000;

// Start the server
app.listen(port, async () => {
    // Log the server is running
    console.log(`Server is running on port ${port}`);
    // Test the database connection
    await testDatabase();
    // Sync the database with the models
    await syncDatabase();
});
