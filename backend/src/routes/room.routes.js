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
        // Get all rooms route
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['client', 'seller', 'administrator']),
            this._expressCacheUtil.setCacheMiddleware(20), 
            this._roomController.getAllRooms
        );
        // Get rooms by cinema id route
        this._router.get(
            '/cinema/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['client', 'seller', 'administrator']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._roomController.getRoomsByCinema
        );
        // Create room route
        this._router.post(
            '/',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._roomController.createRoom
        );
        // Update room route
        this._router.put(
            '/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._roomController.updateRoom
        );
        // Delete room route
        this._router.delete(
            '/:id',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
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
