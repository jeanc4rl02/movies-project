import cinemaModel from '../models/cinema.model.js'
// Sync the database with the models
const syncDatabase = async () => {
	// Try to sync the database
	try {
		// Sync the database
		await cinemaModel.sync({force:true}); 
		// Log the success message
		console.log('Database synchronized successfully');
	} catch (error) {
		// Log the error message
		console.log(`Error synchronizing the database: ${error}`);
	}
};

// Export the sync database function
export default syncDatabase;
