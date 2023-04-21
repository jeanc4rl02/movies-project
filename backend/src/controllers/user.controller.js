// Description: User controllers
// Author: Sebastián Gámez Ariza

// Import bcrypt
import bcrypt from 'bcrypt';

// Importing user service
import UserService from '../services/user.service.js';
// Importing auth util
import AuthUtil from '../utils/auth.util.js';
// Importing user schemas
import {
    userRegisterSchema,
    userLoginSchema,
    userUpdateSchema,
    userIdSchema,
    userPaginationSchema
} from '../schemas/user.schema.js';

// Create the user controller
class UserController {
    
    // Set the user service to handle the database
    userService = new UserService();

    // Login method
    login = async (req, res) => {
        // Create a response
        let response;
        // Try to validate the user data
        try {
            // Get the user data from the request
            const { body: user } = req;
            // Validate the user data
            await userLoginSchema.validateAsync(user);
            // Try to login the user
            try {
                // Get the user from the body
                const { email, password } = user;
                // Login the user
                const { data: userDB } = await this.userService.getUserByEmail(email);
                // Check if the user exists
                if (!userDB) {
                    // Set the response
                    response = {
                        status: 404,
                        message: 'User not found',
                    }
                }
                // If the user exists
                else {
                    // Check if the password is correct with bcrypt
                    const isPasswordCorrect = await bcrypt.compare(password, userDB.password);
                    // Check if the password is correct
                    if (isPasswordCorrect) {
                        // Sign a token
                        const authUtil = new AuthUtil();
                        const token = authUtil.signTokenHelper({
                            id: userDB.id, 
                            role: userDB.role, 
                            email: userDB.email
                        });
                        // Set the response
                        response = {
                            status: 200,
                            message: 'User logged in',
                            data: { token }
                        }
                    }
                    // If the password is incorrect
                    else {
                        // Set the response
                        response = {
                            status: 401,
                            message: 'Incorrect password',
                        }
                    }
                }
            }
            // Catch the error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error logging in user',
                }
            }
        }
        // Catch the error
        catch (error) {
            // Set the response
            response = {
                status: 400,
                message: 'Invalid user data',
                data: error.details[0].message
            }
        }
        // Send the response
        res.status(response.status).send(response);
    }
    // Get all users method
    getAllUsers = async (req, res) => {
        // Create a response
        let response;
        // Try to validate the pagination data
        try {
            // Get the page and limit from the query
            const { page, limit } = req.query;
            // Check if the page and limit are defined
            if(page && limit){
                // Validate the pagination data
                await userPaginationSchema.validateAsync({ page, limit });
            }
            // Try to get all users
            try {
                // Get all users
                const { data: usersDB } = await this.userService.getAllUsers(page, limit);
                // Set the response
                response = {
                    status: 200,
                    message: 'Users found',
                    data: usersDB
                }
            }
            // If there is an error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error getting users',
                }
            }
        } 
        // Catch the error
        catch (error) {
            // Set the response
            response = {
                status: 400,
                message: 'Invalid pagination data',
                data: error.details[0].message
            }
        }
        // Send the response
        res.status(response.status).send(response);
    }
    // Create user method
    createUser = async (req, res) => {
        // Create a response
        let response;
        // Try to validate the user data
        try {
            // Get the user data from the request
            const { body: user } = req;
            // Validate the user data
            await userRegisterSchema.validateAsync(user);
            // Try to create the user
            try {
                // Check if the email already exists
                const { data: userDB } = await this.userService.getUserByEmail(user.email);
                // Check if the user exists
                if (userDB) {
                    // Set the response
                    response = {
                        status: 409,
                        message: 'User already exists',
                    }
                }
                // If the user doesn't exist
                else {
                    // Hash the password
                    user.password = await bcrypt.hash(user.password, 10);
                    // Create the user
                    await this.userService.createUser(user);
                    // Set the response
                    response = {
                        status: 201,
                        message: 'User created',
                    }
                }
            }
            // If there is an error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error creating user',
                }
            }
        }
        // Catch the error
        catch (error) {
            // Set the response
            response = {
                status: 400,
                message: 'Invalid user data',
                data: error.details[0].message
            }
        }
        // Send the response
        res.status(response.status).send(response);
    }
    // Update user method
    updateUser = async (req, res) => {
        // Create a response
        let response;
        // Try to validate the user data
        try {
            // Get the user id from the params
            const { id } = req.params;
            // Get the user data from the request
            const { body: user } = req;
            // Validate if the id is a number with Joi
            await userIdSchema.validateAsync(id);
            // Validate the user data
            await userUpdateSchema.validateAsync(user);
            // Try to update the user
            try {
                // Check if the user wants to update the password
                if (user.password) {
                    // Check if the user add the new password
                    if (user.newPassword) {
                        // Get the user the database
                        const { data: userDB } = await this.userService.getUserById(id);
                        // Get the password from the user
                        const { password } = userDB;
                        // Check if the password is the same with bcrypt
                        const isPasswordCorrect = await bcrypt.compare(user.password, password);
                        // Check if the password is correct
                        if (isPasswordCorrect) {
                            // Set the new password
                            user.password = await bcrypt.hash(user.newPassword, 10);
                            // Set the response
                            response = {
                                status: 200,
                                message: 'User password updated',
                            }
                        }
                        // If the password is incorrect
                        else {
                            // Set the response
                            response = {
                                status: 401,
                                message: 'Incorrect password',
                            }
                        }
                    }
                    // If the user doesn't add the new password
                    else {
                        // Set the response
                        response = {
                            status: 401,
                            message: 'You must add the new password'
                        }
                    }
                    
                }
                // If the user doesn't want to update the password
                else {
                    // Set the response
                    response = {
                        status: 200,
                        message: 'User updated',
                    }
                }
                // Update the user
                response.status === 200 && await this.userService.updateUser(id, user);
            }
            // If there is an error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error updating user',
                }
            }
        }
        // Catch the error
        catch (error) {
            // Set the response
            response = {
                status: 400,
                message: 'Invalid user data',
                data: error.details[0].message
            }
        }
        // Send the response
        res.status(response.status).send(response);
    }
    // Delete user method
    deleteUser = async (req, res) => {
        // Create a response
        let response;
        // Try to validate the user id
        try {
            // Get the user id from the params
            const { id } = req.params;
            // Validate if the id is a number with Joi
            await userIdSchema.validateAsync(id);
            // Try to delete the user
            try {
                // Get the user id from the params
                const { id } = req.params;
                // Delete the user
                await this.userService.deleteUser(id);
                // Set the response
                response = {
                    status: 200,
                    message: 'User deleted',
                }
            }
            // If there is an error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error deleting user',
                }
            }
        }
        // Catch the error
        catch (error) {
            // Set the response
            response = {
                status: 400,
                message: 'Invalid user id',
                data: error.details[0].message
            }
        }
        // Send the response
        res.status(response.status).send(response);
    }
    
}

// Export the user controller
export default UserController;
