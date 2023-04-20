// Description: User routes
// Author: Sebastián Gámez Ariza

// Importing the express router
import { Router } from 'express';
// Importing the user controller
import UserController from '../controllers/user.controller.js';
// Importing the auth util
import AuthUtil from '../utils/auth.util.js';
// Importing the express cache util
import ExpressCacheUtil from '../utils/expressCache.util.js';

// Create the user router
class UserRouter {

    // Set the user controller to handle the requests
    userController = new UserController();
    // Create the router
    router = Router();
    // Create auth util
    authUtil = new AuthUtil();
    // Create express cache util
    expressCacheUtil = new ExpressCacheUtil();

    // Constructor to set the routes
    constructor() {
        // Login route
        this.router.post('/login', this.userController.login);
        // Create user route
        this.router.post('/', this.userController.createUser);
        // Get all users route
        this.router.get(
            '/', 
            this.authUtil.verifyTokenMiddleware,
            this.authUtil.validateRoleMiddleware(['administrator']),
            this.expressCacheUtil.setCacheMiddleware(20),
            this.userController.getAllUsers,
        );
        // Update user route
        this.router.put(
            '/:id', 
            this.authUtil.verifyTokenMiddleware,
            this.authUtil.validateRoleMiddleware(['administrator']),
            this.userController.updateUser
        );
        // Delete user route
        this.router.delete(
            '/:id', 
            this.authUtil.verifyTokenMiddleware,
            this.authUtil.validateRoleMiddleware(['administrator']),
            this.userController.deleteUser
        );
    }

}

// Export the user router
export default UserRouter;