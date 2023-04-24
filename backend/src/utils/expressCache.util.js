// Description: This file contains the express class that is used to cache the express routes
// Author: Sebastián Gámez Ariza

// Importing the cache class
import NodeCache from 'node-cache';

// Create express cache class
class ExpressCache {
    
    // Create the cache
    cache = new NodeCache();

    // Create the middleware
    setCacheMiddleware = (duration) => {
        return (req, res, next) => {
            // Set the key
            const key = 'express-cache' + req.url + `-${req.method}`;
            // Get the cached body
            const cachedResponse = this.cache.get(key);
            // If the cached body exists, send it
            if (cachedResponse) {
                res.status(cachedResponse.status).send(JSON.parse(cachedResponse.body));
            } else {
                // If the cached body doesn't exist, set the response
                res.sendResponse = res.send;
                // Set the cache and the response with the same body and status
                res.send = (body) => {
                    // Get the status
                    const status = res.statusCode;
                    // Set response in cache
                    this.cache.set(key, {body, status}, duration);
                    // Set response
                    res.status(status).sendResponse(body);
                }
                next();
            }
        };
    }
}

// Export default express cache class
export default ExpressCache;
