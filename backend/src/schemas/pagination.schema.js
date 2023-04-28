// Description: Pagination joi validation schema
// Author: Jean Carlos Carrillo & Sebastián Gámez Ariza

// Importing the joi library
import Joi from 'joi';

// Create the pagination schema
const paginationSchema = Joi.object({
    // User pagination schema
    page: Joi
        .number()
        .greater(0),
    limit: Joi
        .number()
        .greater(0)
});

// Export the pagination schema
export default paginationSchema;
