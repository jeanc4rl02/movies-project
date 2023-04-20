// Description: This file contains the validation schema to movies
// Author: Juan David Ospina Ortega

// Importing the joi library
import joi from 'joi';

// Creating the schema
const moviesSchema = joi.object({
    id: joi
        .number()
        .integer()
        .min(1),
    name: joi
        .string()
        .min(1),
    duration: joi
        .string()
        .min(1),
    trailer: joi
        .string()
        .min(1),
    image: joi
        .string()
        .min(1),
});

// Exporting the schema
export default moviesSchema;