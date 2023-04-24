// Description: User services to handle user related operations with the database
// Author: Sebastián Gámez Ariza

// Importing user model 
import UserModel from '../models/user.model.js';

// Create the user service
class UserService {
    
    // Set the user model to handle the database
    _userModel = UserModel;

    // Get all users method
    getAllUsers = async (page, limit) => {
        // Create a response
        let response;
        // Try to create the user
        try {
            if (page && limit) {
                // Set the pagination variables
                const offset = (page - 1) * limit;
                // Get all users from the database
                const usersDB = await this._userModel.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                // Set the total of users
                const totalUsers = await this._userModel.count();
                // Set the total of pages
                const totalPages = Math.ceil(totalUsers / limit);
                // Create the response
                response = { users: usersDB, totalUsers, totalPages }
            }
            // If the page and limit are not 0
            else {
                // Get all users from the database
                const usersDB = await this._userModel.findAll({
                    attributes: { exclude: ['password'] },
                });
                // Create the response
                response = usersDB
            }
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Get user by id method
    getUserById = async (id) => {
        // Create a response
        let response;
        // Try to create the user
        try {
            // Get the user from the database
            const userDB = await this._userModel.findByPk(id);
            // Create the response
            response = userDB
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Get user by email method
    getUserByEmail = async (email) => {
        // Create a response
        let response;
        // Try to create the user
        try {
            // Get the user from the database
            const userDB = await this._userModel.findOne({
                where: { email },
            });
            // Create the response
            response = userDB
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Create user method   
    createUser = async (user) => {
        // Create a response
        let response;
        // Try to create the user
        try {
            // Create the user in the database
            const userDB = await this._userModel.create(user);
            // Hide the password
            userDB.password = '';
            // Create the response
            response = userDB;
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Update user method
    updateUser = async (id, user) => {
        // Create a response
        let response;
        // Try to update the user
        try {
            const userDB = await this._userModel.update(user, { where: { id: id }, returning: true } );
            // Create the response
            response = userDB;
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Delete user method
    deleteUser = async (id) => {
        // Create a response
        let response;
        // Try to delete the user
        try {
            const user = await this._userModel.destroy({ where: { id: id }, returning: true });
            // Create the response
            response = user;
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }

}

// Export the user service
export default UserService;
