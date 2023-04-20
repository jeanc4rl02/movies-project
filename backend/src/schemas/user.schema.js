// Description: User schema to validate the user data received
// Author: Sebastián Gámez Ariza

// Importing the joi library
import Joi from 'joi';

// Create the user schema
const userSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30),
    lastName: Joi.
        string()
        .min(3)
        .max(30),
    role: Joi
        .string()
        .min(3)
        .max(30),
    email: Joi
        .string()
        .email(),
    password: Joi
        .string()
        .min(6)
        .max(30),
    newPassword: Joi
        .string()
        .min(6)
        .max(30),
    phone: Joi
        .string()
        .min(6)
        .max(30)
});

// Export the user schema
export default userSchema;

