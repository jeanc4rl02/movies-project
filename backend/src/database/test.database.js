// Description: This file contains the database connection test function
// Author: Sebastián Gámez Ariza
// Coauthor: Jean Carlos Carrillo

// Import the database connection
import deviceDatabase from './cinema.database.js';

// Test the database connection
const testDatabase = async () => {
	try {
		await deviceDatabase.authenticate();
		console.log('Database connection successful');
	} catch (error) {
		console.log('Database connection failed');
	}
};

// Export the test database function
export default testDatabase;