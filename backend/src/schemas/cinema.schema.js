import joi from 'joi';

const cinemaSchema = joi.object({
    id: joi.number()
        .integer()
        .min(1),
    name: joi.string()
        .min(3)
        .max(50)
        .required(),
    address: joi.string()
        .min(10)
        .max(70)
        .required(),
    city: joi.string()
        .min(3)
        .max(50)
        .required(),
    phone: joi.string(),
    logo: joi.object({
        public_url: joi.string(),
        secure_url: joi.string()
    })
});
    
export default cinemaSchema;
