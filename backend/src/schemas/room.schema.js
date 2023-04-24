// Description: Joi validation room schemas
// Author: Sebastián Gámez Ariza

// Importing the joi library
import Joi from 'joi';

// Create the room create schema
export const roomCreateSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    capacity: Joi
        .number()
        .required(),
    status: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    cinemaId: Joi
        .number()
        .required()
});

// Create the room update schema
export const roomUpdateSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30),
    capacity: Joi
        .number(),
    status: Joi
        .string()
        .min(3)
        .max(30),
    cinemaId: Joi
        .number()
});

