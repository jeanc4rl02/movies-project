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

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The id of the user
 *     role:
 *      type: string
 *      description: The role of the user
 *     name:
 *      type: string
 *      description: The name of the user
 *     lastName:
 *      type: string
 *      description: The last name of the user
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user
 *     phone:
 *      type: string
 *      description: The phone of the user
 *      
 *   Response:
 *    type: object
 *    properties:
 *     status:
 *      type: integer
 *      description: The status code
 *     message:
 *      type: string
 *      description: The message
 *     data:
 *      type: 
 *       - object
 *       - array
 *      description: The data send by the server
 *    required:
 *     - status
 *     - message 
 *    example:
 *     status: 200
 *     message: Users found
 * 
 *  parameters:
 *   token:
 *    in: header
 *    name: x-access-token
 *    description: The token to access the API
 *    schema:
 *     type: string
 *    required: true
 *  
 *   id:
 *    in: path
 *    name: id
 *    description: The id on database
 *    schema:
 *     type: string
 *    required: true
 * 
*/

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users management
*/


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
        /**
         * @swagger
         * /api/v1/users/login:
         *  post:
         *   summary: Login an user
         *   description: Login an user
         *   tags: 
         *    - Users
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/User'
         *      example:
         *       email: "admin@email.com"
         *       pin: "contraseña123"
         *   responses:
         *    200:
         *     description: Login successful
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Login successful
         *        data: 
         *         token: "token"
         *    400:
         *     description: Validation error
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 400
         *        message: (Validation error message)
         *    401:
         *     description: Incorrect password
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 401
         *        message: Incorrect password
         *    404:
         *     description: User not found
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 404
         *        message: User not found
         *    500:
         *     description: Error logging in
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error logging in
         * 
        */
        this._router.post('/login', this._userController.login);
        /**
        * @swagger
        * /api/v1/users:
        *  post:
        *   summary: Create an user
        *   description: Create an user
        *   tags: 
        *    - Users
        *   requestBody:
        *    required: true
        *    content:
        *     application/json:
        *      schema:
        *       $ref: '#/components/schemas/user'
        *      example:
        *       name: "Admin"
        *       lastName: "Admin"
        *       email: admin@email.com
        *       password: "contraseña123"
        *       role: "administrator"
        *       phone: "3213213214"
        * 
        *   responses:
        *    201:
        *     description: User created successfully
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 201
        *        message: User created
        *    400:
        *     description: Validation error
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 400
        *        message: (Validation error message)
        *    409:
        *     description: User already exists
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 409
        *        message: User already exists
        *    500:
        *     description: Error creating user
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 500
        *        message: Error creating user
        */
        this._router.post('/', this._userController.createUser);
        /**
         * @swagger
         * /api/v1/users:
         *  get:
         *   summary: Get all users
         *   description: Get all users
         *   tags: 
         *    - Users
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *   responses:
         *    200:
         *     description: Users found successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Users found
         *        data: Array(...Users)
         *    401:
         *     description: Unauthorized, invalid token
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 401
         *        message: Unauthorized, invalid token
         *    403:
         *     description: No token provided
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 403
         *        message: No token provided
         *    500:
         *     description: Error getting users
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error getting users
         * 
        */
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._userController.getAllUsers,
        );
        /**
         * @swagger
         * /api/v1/user/{id}:
         *  put:
         *   summary: Update an user
         *   description: Update an user
         *   tags: 
         *    - Users
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/User'
         *      example:
         *       newPassword: "contraseñita"
         *       contraseña: "contraseña123"
         *   responses:
         *    200:
         *     description: User updated successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: User updated
         *        data: Object(...user)
         *    400:
         *     description: Validation error
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 400
         *        message: Validation error
         *        data: 
         *         message: Validation error details
         *    401:
         *     description: Unauthorized, invalid token
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 401
         *        message: Unauthorized, invalid token
         *    403:
         *     description: No token provided
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 403
         *        message: No token provided
         *    500:
         *     description: Error updating user
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error updating user
        */
        this._router.put(
            '/:id', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._userController.updateUser
        );
        /**
         * @swagger
         * /api/v1/users/{id}:
         *  delete:
         *   summary: Delete an user
         *   description: Delete an user
         *   tags: 
         *    - Users
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   responses:
         *    200:
         *     description: User deleted successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: User deleted
         *    401:
         *     description: Unauthorized, invalid token
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 401
         *        message: Unauthorized, invalid token
         *    403:
         *     description: No token provided
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 403
         *        message: No token provided
         *    500:
         *     description: Error deleting user
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error deleting user
        */
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