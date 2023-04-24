// Description: This file contains the schemas for the ticket model
// Author: Sebastián Gámez Ariza

// Import joi library
import Joi from 'joi';

// Define the ticket schema
export const ticketUpdateSchema = Joi.object({
    title: Joi
        .string(),  
    seatNumber: Joi
        .string()
        .alphanum(),
    status: Joi
        .boolean(),
    type: Joi
        .string(),
    price: Joi
        .number(),
    movieRoomId: Joi
        .string()
});
