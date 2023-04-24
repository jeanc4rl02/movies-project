import joi from 'joi';

const movieRoomSchema = joi.object({
    id: joi.number()
        .integer()
        .min(1),
    vip: joi.number()
        .min(1)
        .required(),
    general: joi.number()
        .min(1)
        .required(),
    preferential: joi.number()
        .min(1)
        .required(),
    hour: joi.date(),
});
    
export default movieRoomSchema;
