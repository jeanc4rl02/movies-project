import {Router} from 'express';
import { createmovies, getmovies, getOnemovies, updatemovies, deletemovies } from '../controllers/movie.controller.js';
import fileUpload from 'express-fileupload';
import apicache from 'apicache';
import AuthUtil from '../utils/auth.util.js';

const router = Router();
const cache = apicache.middleware;
const auth = new AuthUtil();

/**
 * @swagger
 * components:
 *  schemas:
 *      movie:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of the movie.
 *              name:
 *                  type: string
 *                  description: name of the movie.
 *              duration: 
 *                  type: string
 *                  description: duration of the movie.
 *              trailer:
 *                  type: string
 *                  description: trailer of the movie.
 *              image:
 *                  type: file
 *                  description: image of the movie.
 *              genres:
 *                  type: string
 *                  description: arrayObject parse to string of genres data.
 *          required: 
 *              - name
 *              - trailer
 *              - duration
 *              - genres
 *          example:
 *              id: 1
 *              name: Mario
 *              duration: 1h 23min
 *              trailer: enlace
 *              image: (file)
 *              genres: [{"id":1,"name":"campo 1"},{"id":2,"name":"campo 2"}]
 *      Empty:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message: At the moment we have no movies to show. Please create one before using this request.
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
 *          example:notNull Violation: movie.duration cannot be null
 *      noDataPut:
 *          type: object
 *          properties:
 *              message: string
 *          example:At the moment we have no movie with id: 4 to show. Please make sure that the provided id exists in the database.
 *  parameters:
 *      id:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: number
 *          description: Id of the movie.
 *      token:
 *          in: header
 *          name: x-access-token
 *          description: A token to access the API
 *          schema:
 *              type: string
 *          require: true
 *      offset:
 *          in: path
 *          name: offset
 *          required: false
 *          schema:
 *              type: number
 *          description: The number of movies to skip before starting to collect the result set.
 *      limit:
 *          in: path
 *          name: limit
 *          required: false
 *          schema:
 *              type: number
 *          description: The numbers of movies to return.
 */

/**
 * @swagger
 * tags:
 *  name: movies
 *  description: Endpoints of the movie.
 */

/**
 * @swagger
 *  /api/v1/movies:
 *      post:
 *          summary: Save a new movie.
 *          tags: [movies]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/movie'
 *          responses: 
 *              201:
 *                  description: movie was successfully created.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/movie'
 *              400:
 *                  description: Properties name, duration and trailer are required and check validations of length and data type.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/EmptyPost'                
 * */
router.post('/', auth.verifyTokenMiddleware, fileUpload({useTempFiles : true, tempFileDir : './uploads'}), createmovies)

/**
 * @swagger
 *  /api/v1/movies:
 *      get:
 *          summary: Get a movie list
 *          tags: [movies]
 *          parameters:
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the list of movies.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/movie'
 *              404:
 *                  description: the list of movies is empty
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'                  
 * */
router.get('/', cache('2 minutes'), getmovies)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      get:
 *          summary: Get a movie by id
 *          tags: [movies]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the movie with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/movie'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
router.get('/:id', cache('1 minutes'), getOnemovies)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      put:
 *          summary: Update a movie by id.
 *          tags: [movies]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/token'
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/movie'
 *          responses:
 *              200:
 *                  description: The update of the movie has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/movie'
 *              400:
 *                  description: Properties name, duration and trailer are required and check validations of length and data type.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/EmptyPut'
 *              404:
 *                  description: There is no movie registered with the provided id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/noDataPut'
 */
router.put('/:id', auth.verifyTokenMiddleware, fileUpload({useTempFiles : true, tempFileDir : './uploads'}), updatemovies)

/**
 * @swagger
 *  /api/v1/movies/{id}:
 *      delete: 
 *          summary: Delete a movie by id.
 *          tags: [movies]
 *          parameters:
 *              - $ref: '#/components/parameters/id'
 *              - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: The removal of the movie has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/movie'
 *              500:
 *                  description: Server error.
 *              404:
 *                  description: There is no movie registered with the provided id.
 */
router.delete('/:id', auth.verifyTokenMiddleware, deletemovies)

export default router;