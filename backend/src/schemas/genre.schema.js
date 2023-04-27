// Description: This file contains the validation schema to genres
// Author: Juan David Ospina Ortega

// Importing the joi library
import joi from 'joi';

// Creating the schema
const genresSchema = joi.object({
    name: joi
        .string()
        .min(1),
});

// Exporting the schema
export default genresSchema;