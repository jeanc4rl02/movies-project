// Description: This file contains the ticket controller class
// Author: Sebastián Gámez Ariza

// Import the ticket services 
import TicketService from '../services/ticket.service.js';
// Import pagination schema
import paginationSchema from '../schemas/pagination.schema.js';

// Create the ticket controller class
class TicketController {

    // Ticket service instance
    _ticketService = new TicketService();

    // Method to get all tickets
    getAllTickets = async (req, res) => {
        // Create a response
        let response;
        // Get the page and limit
        const { page, limit } = req.query;
        // Try to validate the pagination schema
        try {
            // Check if the page and limit are defined
            if (page && limit) {
                // Validate the pagination schema
                await paginationSchema.validateAsync({ page, limit });
            }
            // Try to get all tickets
            try {
                // Get all tickets
                const ticketsDB = await this._ticketService.getAllTickets(page, limit);
                // Set the response
                response = { status: 200, message: 'Tickets found', data: ticketsDB };
            }
            // Catch the error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = { status: 404, message: 'Tickets not found' };
            }
        }
        // Catch the error
        catch (error) {
            // Log the error
            console.log(error);
            // Set the response
            response = { status: 400, message: error.details[0].message };
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Method to get tickets by movie room id
    getTicketsByMovieRoomId = async (req, res) => {
        // Create a response
        let response;
        // Get the page and limit
        const { page, limit } = req.query;
        // Get the movie room id
        const { movieRoomId } = req.params;
        // Try to validate the pagination schema
        try {
            // Check if the page and limit are defined
            if (page && limit) {
                // Validate the pagination schema
                await paginationSchema.validateAsync({ page, limit });
            }
            // Try to get all tickets
            try {
                // Get all tickets
                const ticketsDB = await this._ticketService.getTicketsByMovieRoomId(movieRoomId, page, limit);
                // Set the response
                response = { status: 200, message: 'Tickets found', data: ticketsDB };
            }
            // Catch the error
            catch (error) {
                // Log the error
                console.log(error);
                // Set the response
                response = { status: 404, message: 'Tickets not found' };
            }
        }
        // Catch the error
        catch (error) {
            // Log the error
            console.log(error);
            // Set the response
            response = { status: 400, message: error.details[0].message };
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Create a ticket
    createTicket = async (req, res) => {
        // Create a response
        let response;
        // Get the ticket data
        const ticketData = req.body;
        // Try to create the ticket
        try {
            // Create the ticket
            const ticketDB = await this._ticketService.createTicket(ticketData);
            // Set the response
            response = { status: 201, message: 'Ticket created', data: ticketDB };
        }
        // Catch the error
        catch (error) {
            // Log the error
            console.log(error);
            // Set the response
            response = { status: 400, message: error.message };
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Update a ticket
    updateTicket = async (req, res) => {
        // Create a response
        let response;
        // Get the ticket data
        const ticketData = req.body;
        // Get the ticket id
        const { ticketId } = req.params;
        // Try to update the ticket
        try {
            // Update the ticket
            const ticketDB = await this._ticketService.updateTicket(ticketId, ticketData);
            // Set the response
            response = { status: 200, message: 'Ticket updated', data: ticketDB };
        }
        // Catch the error
        catch (error) {
            // Log the error
            console.log(error);
            // Set the response
            response = { status: 400, message: error.message };
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Delete a ticket
    deleteTicket = async (req, res) => {
        // Create a response
        let response;
        // Get the ticket id
        const { ticketId } = req.params;
        // Try to delete the ticket
        try {
            // Delete the ticket
            const ticketDB = await this._ticketService.deleteTicket(ticketId);
            // Set the response
            response = { status: 200, message: 'Ticket deleted', data: ticketDB };
        }
        // Catch the error
        catch (error) {
            // Log the error
            console.log(error);
            // Set the response
            response = { status: 400, message: error.message };
        }
        // Return the response
        res.status(response.status).send(response);
    }

}

// Export the ticket controller class
export default TicketController;
