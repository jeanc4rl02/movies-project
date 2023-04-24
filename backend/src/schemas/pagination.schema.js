// Description: Pagination joi validation schema
// Author: Sebastián Gámez Ariza

// Importing the joi library
import Joi from 'joi';

// Create the pagination schema
const paginationSchema = Joi.object({
    // User pagination schema
    page: Joi
        .number()
        .required(),
    limit: Joi
        .number()
        .required()
});

// Export the pagination schema
export default paginationSchema;
