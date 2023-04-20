// Description: This file contains the authentication utilities
// Author: Sebastián Gámez Ariza

// Importing the environment variables
import { JWT_PASSWORD, JWT_EXPIRATION } from '../config/env.config.js';

// Importing the jwt library
import jwt from 'jsonwebtoken';

// Create the auth utilities
class AuthUtil {
    // Sign token method
    signTokenHelper = (data) => {
        try {
            // Create the token
            const token = jwt.sign(data, JWT_PASSWORD, { expiresIn: JWT_EXPIRATION });
            // Return the token
            return token;
        // Catch the error
        } catch (error) {
            // Throw the error
            throw error;
        }
    }
    // Verify token middleware method
    verifyTokenMiddleware = (req, res, next) => {
        // Get the token from the headers
        const token = req.headers['x-access-token'];
        // Check if the token doesn't exists
        if (!token) {
            // Send the response
            res.status(403).json({
                status: 403,
                message: 'No token provided',
            });
        }
        // If the token exists
        else {
            // Try to verify the token
            try {
                // Verify the token and set the role
                const decoded = jwt.verify(token, JWT_PASSWORD);
                // Set the user to the request
                req.user = decoded;
                // Continue with the next middleware
                next();
            }
            // Catch the error
            catch (error) {
                // Send the response
                res.status(401).json({
                    status: 401,
                    message: 'Unauthorized, invalid token',
                });
            }
        }
    }
    // Validate role middleware method
    validateRoleMiddleware = (roles) => {
        // Return the middleware
        return (req, res, next) => {
            // Get the user from the request
            const user = req.user;
            // Check if the user exists
            if (user) {
                // Check if the user has the role
                if (roles.includes(user.role)) {
                    // Continue with the next middleware
                    next();
                }
                // If the user doesn't have the role
                else {
                    // Send the response
                    res.status(403).json({
                        status: 403,
                        message: 'Forbidden, you don\'t have permission to access this resource',
                    });
                }
            }
            // If the user doesn't exists
            else {
                // Send the response
                res.status(401).json({
                    status: 401,
                    message: 'Unauthorized, invalid token',
                });
            }
        }
    }
}

// Export the auth utilities
export default AuthUtil;
