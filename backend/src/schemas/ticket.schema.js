// Description: This file contains the schemas for the ticket model
// Author: Sebastián Gámez Ariza

// Import joi library
import Joi from 'joi';

// Define the create ticket schema
export const ticketCreateSchema = Joi.object({
    seatNumber: Joi
        .string()
        .alphanum()
        .required(),
    status: Joi
        .boolean()
        .required(),
    type: Joi
        .string()
        .required(),
    price: Joi
        .number()
        .required(),
    movieRoomId: Joi
        .number()
        .integer()
        .positive()
        .required(),
});

// Define the update ticket schema
export const ticketUpdateSchema = Joi.object({
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
        .number()
        .integer()
        .positive()
});

// Define the update several tickets schema
export const ticketUpdateSeveralSchema = Joi.object({
    tickets: Joi
        .array()
        .items(Joi.number().integer().positive().required())
        .required(),
    data: ticketUpdateSchema
        .required()
});


