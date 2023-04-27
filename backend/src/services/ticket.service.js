// Description: This file contains the ticket services
// Author: Sebastián Gámez Ariza

// Importing the ticket model
import ticketModel from "../models/ticket.model.js";
// Importing the movie room model
import movieRoomModel from "../models/movieRoom.model.js";

// Create the ticket class service
class TicketService {

    // Ticket model
    _ticketModel = ticketModel;
    // Movie room model
    _movieRoomModel = movieRoomModel;

    // Method to get all tickets
    getAllTickets = async(page, limit) => {
        // Create a response
        let response;
        // Try to get all tickets
        try {
            // Check if the page and limit are defined
            if (page && limit) {
                // Set the pagination variables
                const offset = (page - 1) * limit;
                // Get all tickets
                const ticketsDB = await this._ticketModel.findAll({
                    include: [{ model: this._movieRoomModel, as: 'movieRoom' }],
                    attributes: { exclude: ['movieRoomId'] },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                // Set the total of tickets
                const totalTickets = await this._ticketModel.count();
                // Set the total of pages
                const totalPages = Math.ceil(totalTickets / limit);
                // Create the response
                response = { ticketsDB, totalTickets, totalPages };
            }
            // If the page and limit aren't defined
            else{
                // Get all tickets
                const ticketsDB = await this._ticketModel.findAll({
                    include: [{ model: this._movieRoomModel, as: 'movieRoom' }],
                    attributes: { exclude: ['movieRoomId'] },
                });
                // Create the response
                response = ticketsDB;
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
    // Method to get tickets by movie room id
    getTicketsByMovieRoomId = async(movieRoomId, page, limit) => {
        // Create a response
        let response;
        // Try to get tickets by movie room id
        try {
            // Check if the page and limit are defined
            if (page && limit) {
                // Set the pagination variables
                const offset = (page - 1) * limit;
                // Get tickets by movie room id
                const ticketsDB = await this._ticketModel.findAll({
                    where: { movieRoomId },
                    include: [{ model: this._movieRoomModel, as: 'movieRoom' }],
                    attributes: { exclude: ['movieRoomId'] },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                // Set the total of tickets
                const totalTickets = await this._ticketModel.count({ where: { movieRoomId: movieRoomId } });
                // Set the total of pages
                const totalPages = Math.ceil(totalTickets / limit);
                // Create the response
                response = { ticketsDB, totalTickets, totalPages };
            }
            // If the page and limit aren't defined
            else{
                // Get tickets by movie room id
                const ticketsDB = await this._ticketModel.findAll({
                    where: { movieRoomId: movieRoomId },
                    include: [{ model: this._movieRoomModel, as: 'movieRoom' }],
                    attributes: { exclude: ['movieRoomId'] },
                });
                // Create the response
                response = ticketsDB;
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
    // Method to create a ticket
    createTicket = async(ticket) => {
        // Create a response
        let response;
        // Try to create a ticket
        try {
            // Create a ticket
            const ticketsDB = await this._ticketModel.create(ticket);
            // Create the response
            response = ticketsDB
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to update a ticket
    updateTicket = async(id, ticket) => {
        // Create a response
        let response;
        // Try to update a ticket
        try {
            // Update a ticket
            const ticketDB = await this._ticketModel.update(ticket, { where: { id }, returning: true });
            // Create the response
            response = ticketDB
        }
        // Catch the error
        catch (error) {
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to delete a ticket
    deleteTicket = async(id) => {
        // Create a response
        let response;
        // Try to delete a ticket
        try {
            // Delete a ticket
            const ticketDB = await this._ticketModel.destroy({ where: { id }, returning: true});
            // Create the response
            response = ticketDB;
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

// Export the ticket class service
export default TicketService;
