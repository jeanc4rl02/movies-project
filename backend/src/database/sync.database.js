// Description: Syncs the database with the models
// Author: Sebastián Gámez Ariza
// Coauthor: Jean Carlos Carrillo

// Import the user model
import userModel from '../models/user.model.js';
// Import the cinema model
import cinemaModel from '../models/cinema.model.js'
// Import the room model
import roomModel from '../models/room.model.js';

// Sync the database with the models
const syncDatabase = async () => {
	// Try to sync the database
	try {
		// Sync the database
		await userModel.sync({force: true});
		await cinemaModel.sync({force:true}); 
		await roomModel.sync({force:true});
		// Log the success message
		console.log('Database synchronized successfully');
	} catch (error) {
		// Log the error message
		console.log(`Error synchronizing the database: ${error}`);
	}
};

// Export the sync database function
export default syncDatabase;
