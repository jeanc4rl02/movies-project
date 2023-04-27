// Description: This file contains the room routes class
// Author: Sebastián Gámez Ariza

// Importing the express router
import { Router } from 'express';
// Importing the room controller
import RoomController from '../controllers/room.controller.js';
// Importing the auth util
import AuthUtil from '../utils/auth.util.js';
// Importing the express cache util
import ExpressCacheUtil from '../utils/expressCache.util.js';

/**
 *  
 * @swagger
 *  
 * components:
 *  schemas:
 *   Room:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The room id
 *     name:
 *      type: string
 *      description: The room name
 *     capacity:
 *      type: integer
 *      description: The room capacity
 *     status:
 *      type: string
 *      description: The room status
 *     cinemaId:
 *      type: integer
 *      description: The cinema id
 *    required:
 *     - name
 *     - capacity
 *     - status
 *     - cinemaId
 *    example:
 *     name: Room 1
 *     capacity: 100
 *     status: active
 *     cinemaId: 1
 *    
 *   Response:
 *     type: object
 *     properties:
 *      status:
 *       type: integer
 *       description: The status code
 *      message:
 *       type: string
 *       description: The message
 *      data:
 *       type: 
 *        - object
 *        - array
 *       description: The data send by the server
 *     required:
 *      - status
 *      - message 
 *     example:
 *      status: 200
 *      message: Rooms found
 *  
 *   parameters:
 *    token:
 *     in: header
 *     name: x-access-token
 *     description: The token to access the API
 *     schema:
 *      type: string
 *     required: true
 *    id:
 *     in: path
 *     name: id
 *     description: The id on database
 *     schema:
 *      type: string
 *     required: true
 * 
*/

/**
 * @swagger
 * tags:
 *  name: Rooms
 *  description: Rooms management
*/

// Create the room router class
class RoomRouter {

    // Create the router
    _router = Router();
    // Set the room controller to handle the requests
    _roomController = new RoomController();
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
         * /api/v1/rooms:
         *  get:
         *   summary: Get all rooms
         *   description: Get all rooms
         *   tags: 
         *     - Rooms
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *   responses:
         *    200:
         *     description: Rooms found successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Rooms found
         *        data: Array(...Rooms)
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
         *     description: Error getting rooms
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error getting rooms
         * 
        */
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['client', 'seller', 'administrator']),
            this._expressCacheUtil.setCacheMiddleware(20), 
            this._roomController.getAllRooms
        );
        /**
         * @swagger
         * /api/v1/rooms/cinema/{id}:
         *  get:
         *   summary: Get all rooms by cinema id
         *   description: Get all rooms by cinema id
         *   tags: 
         *     - Rooms
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'  
         *   responses:
         *    200:
         *     description: Rooms found successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Rooms found
         *        data: Array(...Rooms)
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
         *     description: Error getting rooms
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error getting rooms
         * 
        */
        this._router.get(
            '/cinema/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['client', 'seller', 'administrator']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._roomController.getRoomsByCinema
        );
        /**
        * @swagger
        * /api/v1/rooms:
        *  post:
        *   summary: Create a room
        *   description: Create a room
        *   tags: 
        *    - Rooms
        *   parameters:
        *    - $ref: '#/components/parameters/token'
        *   requestBody:
        *    required: true
        *    content:
        *     application/json:
        *      schema:
        *       $ref: '#/components/schemas/Room'
        *   responses:
        *    201:
        *     description: Room found successfully
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 201
        *        message: Room found
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
        *     description: Error creating room
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 500
        *        message: Error creating room
        */
        this._router.post(
            '/',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._expressCacheUtil.resetCacheMiddleware,
            this._roomController.createRoom
        );
        /**
         * @swagger
         * /api/v1/room/{id}:
         *  put:
         *   summary: Update a room
         *   description: Update a room
         *   tags: 
         *    - Rooms
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/room'
         *      example:
         *       status: "busy"
         *   responses:
         *    200:
         *     description: Room updated successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Room updated
         *        data: Object(...Room)
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
         *     description: Error updating room
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error updating room
        */
        this._router.put(
            '/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._expressCacheUtil.resetCacheMiddleware,
            this._roomController.updateRoom
        );
        /**
         * @swagger
         * /api/v1/rooms/{id}:
         *  delete:
         *   summary: Delete a room
         *   description: Delete a room
         *   tags: 
         *    - Rooms
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   responses:
         *    200:
         *     description: Room deleted successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Room deleted
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
         *     description: Error deleting room
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error deleting room
        */
        this._router.delete(
            '/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._expressCacheUtil.resetCacheMiddleware,
            this._roomController.deleteRoom
        );
    }

    // Get the router
    get router() {
        // Return the router
        return this._router;
    }

}

// Export the router
export default RoomRouter;
