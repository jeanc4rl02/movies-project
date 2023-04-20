import {Router} from 'express';
import { createmovie, getmovies, getOnemovie, updatemovie, deletemovie } from '../controllers/movie.controller.js';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      movies:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of gender.
 *              name:
 *                  type: integer
 *                  description: name of the gender
 *              duration:
 *                  type: string
 *                  description: duration of the film
 *              trailer:
 *                  type: string
 *                  description: trailer of the film
 *              image:
 *                  type: string
 *                  description: image-logo of the film
 * 
 *          required: 
 *              - name
 *              - duration
 *              - trailer
 *              - image
 *              
 *          example:
 *             name: 'Power Rangers'
 *             duration: '1:20'
 *             trailer: ''
 *             image: ''
 *      moviesNotFound:
 *          type: object
 *          properties: 
 *              msg: 
 *              type: string
 *              description: not found movies
 *          example:
 *              msg: not found movies
 *  parameters:
 *      moviesId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: Id of the movie Detail.
 *      token:
 *          in: header
 *          name: x-access-token
 *          description: The token to access the API
 *          schema:
 *              type: string
 *              required: true
*/

/**
 * @swagger
 *  tags:
 *      name: movies
 *      description: Endpoints of the movie
*/

/**
 * @swagger
 * /api/v1/movies/:
 *  post:
 *      summary: create a new movies
 *      tags: [movies]
 *      parameters: 
 *          - $ref: '#/components/parameters/token'  
 *      requestBody:
 *          required: true
 *      content:
 *          application/json:
 *          schema:
 *              items: 
 *                  $ref: '#/components/schemas/movies'   
 *      responses:
 *          200:
 *              description: The movies was succesfully created
 *              content:
 *                  application/json:
 *                      schema: 
 *                          items: 
 *                              $ref: '#/components/schemas/movies' 
 *      400: 
 *        description: There are no registered movies
 */
router.post('/', verifyTokenMiddleware, createmovie)

/**
* @swagger
*  /api/v1/movies:
*      get:
*          summary: Get an movies list
*          tags: [movies]
*          parameters: 
*               - $ref: '#/components/parameters/token' 
*          responses: 
*              200:
*                  description: the list of movies.
*                  content:
*                      application/json:
*                          schema:
*                              type: array
*                              items: 
*                                  $ref: '#/components/schemas/movies'
*              404:
*                  description: the list of movies is empty
* */
router.get('/', getmovies)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      get:
 *          summary: Get an movie by id
 *          tags: [movies]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/moviesId'
 *          responses: 
 *              200:
 *                  description: the movie with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/movies'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 * */
router.get('/:id', verifyTokenMiddleware, getOnemovie)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      put:
 *          summary: Update an movie by id
 *          tags: [movies]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/moviesId'
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/movies'
 *          responses:
 *              200:
 *                  description: The update of the movie has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/movies'
 *              400:
 *                  description: fields empty.
 *              404:
 *                  description: There is no movie registered with the provided id.
 */

router.put('/:id', verifyTokenMiddleware, updatemovie)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      delete: 
 *          summary: Delete an movie by id
 *          tags: [movies]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/moviesId'
 *          responses:
 *              200:
 *                  description: The removal of the movie has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/movies'
 *              500:
 *                  description: Server error.
 *              404:
 *                  description: There is no movie registered with the provided id.
 */

router.delete('/:id', verifyTokenMiddleware, deletemovie)

export default router;