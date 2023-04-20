import joi from 'joi';

const paginationSchema = joi.object({
    limit: joi.number(),
    offset: joi.number(),
});
    
export default paginationSchema;

