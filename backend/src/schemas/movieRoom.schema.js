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
    hour: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    start_date: joi.date(),
    end_date: joi.date(),
    movie_id: joi.number(),
    room_id: joi.number(),
});
    
export default movieRoomSchema;
