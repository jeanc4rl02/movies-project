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
        .min(1)
        .max(50)
        .required(),
    duration: joi
        .string()
        .min(1)
        .max(50)
        .required(),
    trailer: joi
        .string()
        .min(1)
        .max(50)
        .required(),
    image: joi
        .object({
            public_url: joi.string(),
            secure_url: joi.string()
        }),
    /*id_genres: joi
        .array()
        .items( joi.object() )*/

});

// Exporting the schema
export default moviesSchema;