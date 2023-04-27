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

/**
 *  
 * @swagger
 *  
 * components:
 *  schemas:
 *   Ticket:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The ticket id
 *     seatNumber:
 *      type: string
 *      description: The seat number
 *     status:
 *      type: boolean
 *      description: The ticket status
 *     type:
 *      type: string
 *      description: The ticket type
 *     price:
 *      type: number
 *      description: The ticket price
 *     movieRoomId:
 *      type: integer
 *      description: The movie room id
 *   required:
 *    - seatNumber
 *    - status
 *    - type
 *    - price
 *    - movieRoomId
 *   example:
 *    seatNumber: A1
 *    status: true
 *    type: VIP
 *    price: 10000
 *    movieRoomId: 1
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
 *      message: Tickets found
 *  
 *   parameters:
 *    token:
 *     in: header
 *     name: x-access-token
 *     description: The token to access the API
 *     schema:
 *      type: string
 *     required: true
 *   id:
 *    in: path
 *    name: id
 *    description: The id on database
 *    schema:
 *     type: integer
 *    required: true
 *   movieRoomId:
 *    in: path
 *    name: movieRoomId
 *    description: The movie room id on database
 *    schema:
 *     type: integer
 *    required: true
 * 
*/

/**
 * @swagger
 * tags:
 *  name: Tickets
 *  description: Tickets management
*/

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
        /**
         * @swagger
         * /api/v1/tickets:
         *  get:
         *   summary: Get all tickets
         *   description: Get all tickets
         *   tags: 
         *     - Tickets
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *   responses:
         *    200:
         *     description: Tickets found successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Tickets found
         *        data: Array(...Tickets)
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
         *     description: Error getting tickets
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error getting tickets
         * 
        */
        this._router.get(
            '/', 
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator', 'seller', 'client']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._ticketController.getAllTickets
        );
        /**
         * @swagger
         * /api/v1/tickets/{movieRoomId}:
         *  get:
         *   summary: Get all tickets by movie room id
         *   description: Get all tickets by movie room id
         *   tags: 
         *     - Tickets
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/cinemaId'  
         *   responses:
         *    200:
         *     description: Tickets found successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Tickets found
         *        data: Array(...Tickets)
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
         *     description: Error getting tickets
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error getting tickets
         * 
        */
        this._router.get(
            '/movieRoom/:movieRoomId',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator', 'seller', 'client']),
            this._expressCacheUtil.setCacheMiddleware(20),
            this._ticketController.getTicketsByMovieRoomId
        );
        /**
        * @swagger
        * /api/v1/tickets:
        *  post:
        *   summary: Create a ticket
        *   description: Create a ticket
        *   tags: 
        *    - Tickets
        *   requestBody:
        *    required: true
        *    content:
        *     application/json:
        *      schema:
        *       $ref: '#/components/schemas/Ticket'
        *   responses:
        *    201:
        *     description: Ticket created successfully
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 201
        *        message: Ticket created
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
        *     description: Error creating ticket
        *     content:
        *      application/json:
        *       schema:
        *        $ref: '#/components/schemas/Response'
        *       example:
        *        status: 500
        *        message: Error creating ticket
        */
        this._router.post(
            '/',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.createTicket
        );
        /**
         * @swagger
         * /api/v1/tickets/{id}:
         *  put:
         *   summary: Update a ticket
         *   description: Update a ticket
         *   tags: 
         *    - Tickets
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/Ticket'
         *      example:
         *       status: false
         *   responses:
         *    200:
         *     description: Ticket updated successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Ticket updated
         *        data: Object(...Tickets)
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
         *     description: Error updating ticket
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error updating ticket
        */
        this._router.put(
            '/:ticketId',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.updateTicket
        );
        /**
         * @swagger
         * /api/v1/tickets:
         *  put:
         *   summary: Update several tickets
         *   description: Update several tickets
         *   tags: 
         *    - Tickets
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *   requestBody:
         *    required: true
         *    content:
         *     application/json:
         *      schema:
         *       $ref: '#/components/schemas/Ticket'
         *      example:
         *       tickets: [ticketId, ticketId, ticketId]
         *       data: 
         *        status: false
         *   responses:
         *    200:
         *     description: Tickets updated successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Ticket updated
         *        data: Object(...Ticket)
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
         *     description: Error updating tickets
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error updating tickets
        */
        this._router.put(
            '/',
            this._authUtil.verifyTokenMiddleware,
            this._authUtil.validateRoleMiddleware(['administrator']),
            this._ticketController.updateSeveralTickets
        );
        /**
         * @swagger
         * /api/v1/ticket/{id}:
         *  delete:
         *   summary: Delete a ticket
         *   description: Delete a ticket
         *   tags: 
         *    - Tickets
         *   parameters:
         *    - $ref: '#/components/parameters/token'
         *    - $ref: '#/components/parameters/id'
         *   responses:
         *    200:
         *     description: Ticket deleted successfully
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 200
         *        message: Ticket deleted
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
         *     description: Error deleting ticket
         *     content:
         *      application/json:
         *       schema:
         *        $ref: '#/components/schemas/Response'
         *       example:
         *        status: 500
         *        message: Error deleting ticket
        */
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