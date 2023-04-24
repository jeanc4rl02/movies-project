// Description: Syncs the database with the models
// Author: Sebastián Gámez Ariza
// Coauthor: Jean Carlos Carrillo

// Import the user model
import userModel from '../models/user.model.js';
// Import the cinema model
import cinemaModel from '../models/cinema.model.js'
import genreModel from '../models/genre.model.js';
import movieModel from '../models/movie.model.js';
// Import the room model
import roomModel from '../models/room.model.js';

// Sync the database with the models
const syncDatabase = async () => {
	// Try to sync the database
	try {
		// Sync the database
		await movieModel.sync();
		await genreModel.sync();
		await userModel.sync();
		await cinemaModel.sync(); 
		await roomModel.sync();
		// Log the success message
		console.log('Database synchronized successfully');
	} catch (error) {
		// Log the error message
		console.log(`Error synchronizing the database: ${error}`);
	}
};

// Export the sync database function
export default syncDatabase;
