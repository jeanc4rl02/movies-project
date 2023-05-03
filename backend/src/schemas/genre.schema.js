// Description: This file contains the validation schema to genres
// Author: Juan David Ospina Ortega

// Importing the joi library
import joi from 'joi';

// Creating the schema
const genresSchema = joi.object({
    id: joi
        .number()
        .integer()
        .min(1),
    name: joi
        .string()
        .min(1),
});

// Exporting the schema
export default genresSchema;