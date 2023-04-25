// Description: This file contains the ticket routes class
// Author: Sebastián Gámez Ariza

// Import the express router
import { Router } from 'express';
// Import the ticket controller class
import TicketController from '../controllers/ticket.controller.js';
// Import auth util
import AuthUtil from '../utils/auth.util.js';
// Import express cache util
import ExpressCacheUtil from '../utils/expressCache.util.js';

// Create the ticket routes class
class TicketRoutes {

    // Express router instance
    _router = Router();
    // Ticket controller instance
    _ticketController = new TicketController();
    // Auth util instance
    _authUtil = new AuthUtil();
    // Express cache util instance
    _expressCacheUtil = new ExpressCacheUtil();

    // Constructor method
    constructor() {
        // Call the setRoutes method
        this._setRoutes();
    }

    // Method to set the ticket routes
    _setRoutes = () => {
        // Get all tickets
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator', 'seller', 'client']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._ticketController.getAllTickets
        );
        // Get tickets by movie room id
        this._router.get(
            '/movieRoom/:movieRoomId',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator', 'seller', 'client']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._ticketController.getTicketsByMovieRoomId
        );
        // Create a ticket
        this._router.post(
            '/',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.createTicket
        );
        // Update a ticket
        this._router.put(
            '/:ticketId',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.updateTicket
        );
        // Delete a ticket
        this._router.delete(
            '/:ticketId',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.deleteTicket
        );
    }

    // Method to get the express router
    get router() {
        // Return the router
        return this._router;
    }

}

// Export the ticket routes
export default TicketRoutes;