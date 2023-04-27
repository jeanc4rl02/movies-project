import {Router} from 'express';
import { creategenres, getgenres, getOnegenres, updategenres, deletegenres } from '../controllers/genre.controller.js';
import apicache from 'apicache';

import AuthUtil from '../utils/auth.util.js';
const router = Router();
const cache = apicache.middleware;
const auth = new AuthUtil();

/**
 * @swagger
 * components:
 *  schemas:
 *      genres:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of gender.
 *              name:
 *                  type: string
 *                  description: name of the gender
 *          required: 
 *              - name
 *              
 *          example:
 *             name: 'Fantasy'
 *      genresNotFound:
 *          type: object
 *          properties: 
 *              msg: nfg
 *              type: string
 *              description: not found genres
 *          example:
 *              msg: not found genres
 *      Empty:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message: At the moment we have no genres to show. Please create one before using this request.
 *      EmptyPost:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message:"name" is required
 *      EmptyPut:
 *          type: object
 *          properties:
 *              message: string
 *          example: 
 *              notNull Violation: genres.name cannot be null
 *      noDataPut:
 *          type: object
 *          properties:
 *              message: string
 *          example:At the moment we have no genres with id: 4 to show. Please make sure that the provided id exists in the database.
 *  parameters:
 *      id:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: Id of the genre.
 * 
 *      offset:
 *          in: path
 *          name: offset
 *          required: false
 *          schema:
 *              type: number
 *          description: The number of genres to skip before starting to collect the result set.
 *      limit:
 *          in: path
 *          name: limit
 *          required: false
 *          schema:
 *              type: number
 *          description: The numbers of genres to return.
*/

/**
 * @swagger
 *  tags:
 *      name: genres
 *      description: Endpoints of the genre
*/

/**
 * @swagger
 * /api/v1/genres:
 *  post:
 *      summary: create a new genres
 *      tags: [genres]
 *      requestBody:
 *          required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/genres'   
 *      responses:
 *          200:
 *              description: The genres was successfully created
 *              content:
 *                  application/json:
 *                      schema: 
 *                          items: 
 *                              $ref: '#/components/schemas/genres' 
 *      400: 
 *        description: There are no registered genres
 *        content:
 *        application/json:
 *          schema:
 *              $ref:  '#/components/schemas/EmptyPost'                
 */
router.post('/', auth.verifyTokenMiddleware, creategenres);

/**
 * @swagger
 *  /api/v1/genres:
 *      get:
 *          summary: Get a genres list
 *          tags: [genres]
 *          parameters:
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 * 
 *          responses: 
 *              200:
 *                  description: the list of genres.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/genres'
 *              404:
 *                  description: the list of genres is empty
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'                  
 * */
router.get('/', cache('2 minutes'), getgenres);

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      get:
 *          summary: Get a genre by id
 *          tags: [genres]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the genre with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/genre'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
router.get('/:id', cache('2 minutes'), getOnegenres);

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      put:
 *          summary: Update a genre by id.
 *          tags: [genres]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/token'
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/genre'
 *          responses:
 *              200:
 *                  description: The update of the genre has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/genre'
 *              400:
 *                  description: Property name are required and check validations of length and data type.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/EmptyPut'
 *              401:
 *               description: Unauthorized, invalid token
 *               content:
 *                application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Response'
 *                 example:
 *                  status: 401
 *                  message: Unauthorized, invalid token
 *              403:
 *               description: No token provided
 *               content:
 *                application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Response'
 *                 example:
 *                  status: 403
 *                  message: No token provided
 *              404:
 *                  description: There is no genre registered with the provided id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/noDataPut'
 */
router.put('/:id', auth.verifyTokenMiddleware, updategenres);

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      delete: 
 *          summary: Delete a genre by id.
 *          tags: [genres]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: The removal of the genre has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/genre'
 *              500:
 *                  description: Server error.
 *              401:
 *               description: Unauthorized, invalid token
 *               content:
 *                application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Response'
 *                 example:
 *                  status: 401
 *                  message: Unauthorized, invalid token
 *              403:
 *               description: No token provided
 *               content:
 *                application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Response'
 *                 example:
 *                  status: 403
 *                  message: No token provided
 *              404:
 *                  description: There is no genre registered with the provided id.
 */
router.delete('/:id', auth.verifyTokenMiddleware, deletegenres);

export default router;