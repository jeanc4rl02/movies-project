import { Router } from "express";
import { getAllCinemas, getOneCinema, createCinema, deleteCinema, updateCinema } from "../controllers/cinema.controller.js";
import fileUpload from 'express-fileupload';
import apicache from 'apicache';

const cineRouter = Router ();
const cache = apicache.middleware

/**
 * @swagger
 * components:
 *  schemas:
 *      Cinema:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of the Cinema.
 *              name:
 *                  type: string
 *                  description: name of the cinema.
 *              city: 
 *                  type: string
 *                  description: City where the cinema is located.
 *              address:
 *                  type: string
 *                  description: Address of the cinema.
 *              phone:
 *                  type: string
 *                  description: Phone of the cinema.
 *              logo:
 *                  type: file
 *                  description: Logo of the cinema.
 *          required: 
 *              - name
 *              - address
 *              - city
 *          example:
 *              id: 1
 *              name: Cine Colombia
 *              city: Medellín
 *              address: Centro Comercial Santafé
 *              phone: (604) 856 9506
 *              logo: (file)
 *      Empty:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message: At the moment we have no cinemas to show. Please create one before using this request.
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
 *          example:notNull Violation: cinema.city cannot be null
 *      noDataPut:
 *          type: object
 *          properties:
 *              message: string
 *          example:At the moment we have no cinema with id: 4 to show. Please make sure that the provided id exists in the database.
 *  parameters:
 *      cinemaId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: number
 *          description: Id of the cinema.
 *      offset:
 *          in: path
 *          name: offset
 *          required: false
 *          schema:
 *              type: number
 *          description: The number of Cinemas to skip before starting to collect the result set.
 *      limit:
 *          in: path
 *          name: limit
 *          required: false
 *          schema:
 *              type: number
 *          description: The numbers of cinemas to return.
 */

/**
 * @swagger
 * tags:
 *  name: Cinema
 *  description: Endpoints of the cinema.
 */

/**
 * @swagger
 *  /api/v1/cinemas:
 *      get:
 *          summary: Get a cinema list
 *          tags: [Cinemas]
 *          parameters:
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the list of cinemas.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Cinema'
 *              404:
 *                  description: the list of cinemas is empty
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'                  
 * */
cineRouter.get('/', cache('1 minutes'), getAllCinemas);

/**
 * @swagger
 *  /api/v1/cinemas/{id}:
 *      get:
 *          summary: Get a cinema by id
 *          tags: [Cinemas]
 *          parameters:
 *              - $ref: '#/components/parameters/cinemaId'
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the cinema with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Cinema'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
cineRouter.get('/:id', cache('2 minutes'), getOneCinema);

/**
 * @swagger
 *  /api/v1/cinemas:
 *      post:
 *          summary: Save a new cinema.
 *          tags: [Cinemas]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Cinema'
 *          responses: 
 *              201:
 *                  description: Cinema was succesfully created.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/Cinema'
 *              400:
 *                  description: Properties name, city and address are required and check validations of length and data type.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/EmptyPost'                
 * */
cineRouter.post('/', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), createCinema);

/**
 * @swagger
 *  /api/v1/cinemas/{id}:
 *      put:
 *          summary: Update a cinema by id.
 *          tags: [Cinemas]
 *          parameters:
 *              - $ref: '#/components/parameters/cinemaId'
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Cinema'
 *          responses:
 *              200:
 *                  description: The update of the atm has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Cinema'
 *              400:
 *                  description: Properties name, city and address are required and check validations of length and data type.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/EmptyPut'
 *              404:
 *                  description: There is no cinema registered with the provided id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/noDataPut'
 */
cineRouter.put('/:id', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), updateCinema);

/**
 * @swagger
 *  /api/v1/cinemas/{id}:
 *      delete: 
 *          summary: Delete a cinema by id.
 *          tags: [Cinemas]
 *          parameters:
 *              - $ref: '#/components/parameters/cinemaId'
 *          responses:
 *              200:
 *                  description: The removal of the cinema has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/cinema'
 *              500:
 *                  description: Server error.
 *              404:
 *                  description: There is no cinema registered with the provided id.
 */
cineRouter.delete('/:id', deleteCinema);

export default cineRouter;