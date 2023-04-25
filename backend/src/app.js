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
// Importing the user router
import UserRouter from './routes/user.routes.js';
// Importing the room router
import RoomRouter from './routes/room.routes.js';
// Importing the routes
import cinemaRouter from './routes/cinema.routes.js'
//Importing the gender router
import genreRouter from './routes/genre.routes.js';
//Importing the movie router
import movieRouter from './routes/movie.routes.js';
//Importing the movie router
import movieRoomRouter from './routes/movieRoom.routes.js';

class App {

    // The app properties
    app = express();
    // Routes
    routes = {
        userRoute: new UserRouter(),
        roomRoute: new RoomRouter()
    }

    // The constructor method
    constructor() {
        // Declare paths
        this.docPath = '/api/v1/docs'
        this.cinemaPath = '/api/v1/cinemas';
        this.genrePath = '/api/v1/genres';
        this.moviePath = '/api/v1/movies';
        this.movieRoomPath = '/api/v1/movie-rooms'
        // Call the methods to configure the app
        this.setMiddlewares();
        // Define routes
        this.setRoutes();
        // Set database
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
        this.app.use('/api/v1/users', this.routes.userRoute.router);
        this.app.use('/api/v1/rooms', this.routes.roomRoute.router);
        this.app.use(this.docPath, swaggerUi.serve, swaggerUi.setup(swaggerConfiguration));
        this.app.use(this.cinemaPath, cinemaRouter);
        this.app.use(this.genrePath, genreRouter);
        this.app.use(this.moviePath, movieRouter);
        this.app.use(this.movieRoomPath, movieRoomRouter);
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
