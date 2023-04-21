// Description: This file contains the configuration for the environment variables

// Importing the dotenv module
import {config} from 'dotenv';

// Configuring the environment variables
config();

// Exporting the environment variables
export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;
