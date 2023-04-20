// Importing the app
import App from './app.js';
// Importing port
import {PORT} from './config/env.config.js';

// Create the app
const app = new App();

// Start the server (Without port argument, the server will run on port 3000)
app.start(PORT);

