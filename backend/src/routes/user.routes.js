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

    // Create the router
    _router = Router();
    // Set the user controller to handle the requests
    _userController = new UserController();
    // Create auth util
    _authUtil = new AuthUtil();
    // Create express cache util
    _expressCacheUtil = new ExpressCacheUtil();

    // Constructor to set the routes
    constructor() {
        // Set the routes
        this._setRouter();
    }
    
    // Set the routes
    _setRouter = () => {
        // Login route
        this._router.post('/login', this._userController.login);
        // Create user route
        this._router.post('/', this._userController.createUser);
        // Get all users route
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._userController.getAllUsers,
        );
        // Update user route
        this._router.put(
            '/:id', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._userController.updateUser
        );
        // Delete user route
        this._router.delete(
            '/:id', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._userController.deleteUser
        );
    }
    
    // Get the router
    get router() {
        // Return the router
        return this._router;
    }
}

// Export the user router
export default UserRouter;