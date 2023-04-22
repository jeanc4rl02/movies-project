// Description: This file contains the room controller class
// Author: Sebastián Gámez Ariza

// Importing the room service
import RoomService from '../services/room.service.js';
// Importing the pagination schema
import paginationSchema from '../schemas/pagination.schema.js';
// Importing the room schema
import { roomCreateSchema, roomUpdateSchema } from '../schemas/room.schema.js';

// Create the room controller class
class RoomController {

    // Room service instance
    _roomService = new RoomService();

    // Get all rooms method
    getAllRooms = async(req, res) => {
        // Create a response
        let response;
        // Get the page and limit query parameters
        const { page, limit } = req.query;
        // Try to validate the pagination query parameters
        try {
            if(page && limit) {
                // Validate the pagination query parameters
                await paginationSchema.validateAsync({ page, limit });
            }
            // Try to get all rooms
            try {
                // Get all rooms
                const { data: rooms } = await this._roomService.getAllRooms(page, limit);
                // Set the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: rooms,
                }
            }
            // If there is an error
            catch(error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Internal server error',
                }
            }
        }
        // Catch the error
        catch(error) {
            // Log the error
            console.log(error);
            // Set the response
            response = {
                status: 400,
                message: error.details[0].message,
            }
        }
        // Return the response
        res.status(response.status).json(response);
    }
    // Get rooms by cinema id method
    getRoomsByCinema = async(req, res) => {
        // Create a response
        let response;
        // Get the cinema id
        const { id } = req.params;
        // Get the page and limit query parameters
        const { page, limit } = req.query;
        // Try to validate the pagination query parameters
        try {
            if(page && limit) {
                // Validate the pagination query parameters
                await paginationSchema.validateAsync({ page, limit });
            }
            // Try to get all rooms
            try {
                // Get all rooms
                const { data: rooms } = await this._roomService.getRoomsByCinema(id, page, limit);
                // Set the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: rooms,
                }
            }
            // If there is an error
            catch(error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error getting rooms',
                }
            }
        }
        // Catch the error
        catch(error) {
            // Log the error
            console.log(error);
            // Set the response
            response = {
                status: 400,
                message: error.details[0].message,
            }
        }
        // Return the response
        res.status(response.status).json(response);
    }
    // Create room method
    createRoom = async(req, res) => {
        // Create a response
        let response;
        // Get the room data
        const {body: room} = req;
        // Try to validate the room data
        try {
            // Validate the room data
            await roomCreateSchema.validateAsync(room);
            // Try to create the room
            try {
                // Create the room
                await this._roomService.createRoom(room);
                // Set the response
                response = {
                    status: 201,
                    message: 'Room created',
                }
            }
            // If there is an error
            catch(error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error creating room',
                }
            }
        }
        // Catch the error
        catch(error) {
            // Log the error
            console.log(error);
            // Set the response
            response = {
                status: 400,
                message: error.details[0].message,
            }
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Update room method
    updateRoom = async(req, res) => {
        // Create a response
        let response;
        // get the room id
        const { id } = req.params;
        // Get the room data
        const {body: room} = req;
        // Try to validate the room data
        try {
            // Validate the room data
            await roomUpdateSchema.validateAsync(room);
            // Try to update the room
            try {
                // Update the room
                await this._roomService.updateRoom(id, room);
                // Set the response
                response = {
                    status: 200,
                    message: 'Room updated',
                }
            }
            // If there is an error
            catch(error) {
                // Log the error
                console.log(error);
                // Set the response
                response = {
                    status: 500,
                    message: 'Error updating room',
                }
            }
        }
        // Catch the error
        catch(error) {
            // Log the error
            console.log(error);
            // Set the response
            response = {
                status: 400,
                message: error.details[0].message,
            }
        }
        // Return the response
        res.status(response.status).send(response);
    }
    // Delete room method
    deleteRoom = async(req, res) => {
        // Create a response
        let response;
        // Get the room id
        const { id } = req.params;
        // Try to delete the room
        try {
            // Delete the room
            await this._roomService.deleteRoom(id);
            // Set the response
            response = {
                status: 200,
                message: 'Room deleted',
            }
        }
        // Catch the error
        catch(error) {
            // Log the error
            console.log(error);
            // Set the response
            response = {
                status: 500,
                message: 'Error deleting room',
            }
        }
        // Return the response
        res.status(response.status).send(response);
    }

}

// Export the room controller
export default RoomController;
