// Description: User schema to validate the user data received
// Author: Sebastián Gámez Ariza

// Importing the joi library
import Joi from 'joi';

// User register schema
export const userRegisterSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.
        string()
        .min(3)
        .max(30)
        .required(),
    role: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .min(6)
        .max(30)
        .required(),
    phone: Joi
        .string()
        .min(6)
        .max(30)
        .required()
});

// User login schema
export const userLoginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .min(6)
        .max(30)
        .required()
});

// Create the user update schema
export const userUpdateSchema = Joi.object({
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

// User id schema
export const userIdSchema = Joi.object({
    id: Joi
        .number()
        .required()
});

// User pagination schema
export const userPaginationSchema = Joi.object({
    page: Joi
        .number()
        .required(),
    limit: Joi
        .number()
        .required()
});
