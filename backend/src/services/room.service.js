// Description: This file contains the room services class
// Author: Sebastián Gámez Ariza

// Importing the room model
import roomModel from '../models/room.model.js';
// Importing the cinema model
import cinemaModel from '../models/cinema.model.js';

// Create the room services class
class RoomService {

    // Room model instance
    _roomModel = roomModel;
    // Cinema model instance
    _cinemaModel = cinemaModel;

    // Method to get all rooms
    getAllRooms = async(page, limit) => {
        // Create a response
        let response;
        // Try to get all rooms
        try {
            if (page && limit) {
                // Set the pagination variables
                const offset = (page - 1) * limit;
                // Get all rooms
                const rooms = await this._roomModel.findAll({
                    include: [
                        {
                            model: this._cinemaModel,
                            as: 'cinema',
                        },
                    ],
                    attributes: {
                        exclude: ['cinemaId'],
                    },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                // Set the total of rooms
                const totalRooms = await this._roomModel.count();
                // Set the total of pages
                const totalPages = Math.ceil(totalRooms / limit);
                // Create the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: {
                        rooms,
                        totalRooms,
                        totalPages,
                    },
                };
            }
            // If the page and limit aren't defined
            else{
                // Get all rooms
                const rooms = await this._roomModel.findAll({
                    attributes: {
                        exclude: ['cinemaId'],
                    },
                    include: [
                        {
                            model: cinemaModel,
                            as: 'cinema',
                        },
                    ],
                });
                // Create the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: rooms,
                };
            }
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Rooms not found',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to get a rooms by cinema id
    getRoomsByCinema = async(cinemaId, page, limit) => {
        // Create a response
        let response;
        // Try to get a rooms by cinema id
        try {
            // Check if the page and limit are defined
            if (page && limit) {
                // Set the pagination variables
                const offset = (page - 1) * limit;
                // Get a rooms by cinema id
                const roomsDB = await this._roomModel.findAll({
                    where: { cinemaId },
                    include: [
                        {
                            model: this._cinemaModel,
                            as: 'cinema',
                        },
                    ],
                    attributes: {
                        exclude: ['cinemaId'],
                    },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                // Set the total of rooms
                const totalRooms = await this._roomModel.count({
                    where: { cinemaId },
                });
                // Set the total of pages
                const totalPages = Math.ceil(totalRooms / limit);
                // Create the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: {
                        rooms: roomsDB,
                        totalRooms,
                        totalPages,
                    },
                };
            }
            // If the page and limit aren't defined
            else{
                // Get a rooms by cinema id
                const roomsDB = await this._roomModel.findAll({
                    where: { cinemaId },
                    include: [
                        {
                            model: this._cinemaModel,
                            as: 'cinema',
                        },
                    ],
                    attributes: {
                        exclude: ['cinemaId'],
                    },
                });
                // Create the response
                response = {
                    status: 200,
                    message: 'Rooms found',
                    data: roomsDB,
                };
            }
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Rooms not found',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to get a room by id
    getRoomById = async(id) => {
        // Create a response
        let response;
        // Try to get a room by id
        try {
            // Get a room by id
            const room = await this._roomModel.findByPk(id, {
                include: [
                    {
                        model: this._cinemaModel,
                        as: 'cinema',
                    },
                ],
                attributes: {
                    exclude: ['cinemaId'],
                },
            });
            // Create the response
            response = {
                status: 200,
                message: 'Room found',
                data: room,
            };
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Room not found',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to create a room
    createRoom = async(room) => {
        // Create a response
        let response;
        // Try to create a room
        try {
            // Create a room
            await this._roomModel.create(room);
            // Create the response
            response = {
                status: 200,
                message: 'Room created',
            };
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Error creating room',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to update a room
    updateRoom = async(id, room) => {
        // Create a response
        let response;
        // Try to update a room
        try {
            // Update a room
            await this._roomModel.update(room, {
                where: { id },
            });
            // Create the response
            response = {
                status: 200,
                message: 'Room updated',
            };
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Error updating room',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }
    // Method to delete a room
    deleteRoom = async(id) => {
        // Create a response
        let response;
        // Try to delete a room
        try {
            // Delete a room
            await this._roomModel.destroy({
                where: { id },
            });
            // Create the response
            response = {
                status: 200,
                message: 'Room deleted',
            };
        }
        // Catch the error
        catch (error) {
            // Create the response
            response = {
                status: 500,
                message: 'Error deleting room',
            };
            // Throw the error
            throw error;
        }
        // Return the response
        return response;
    }   

}

// Export the room services class
export default RoomService;
