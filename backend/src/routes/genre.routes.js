import {Router} from 'express';
import { creategenre, getgenres, getOnegenre, updategenre, deletegenre } from '../controllers/genre.controller.js';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware.js';

const router = Router();

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
 *                  type: integer
 *                  description: name of the gender
 *          required: 
 *              - name
 *              
 *          example:
 *             name: 'Fantasy'
 *      genresNotFound:
 *          type: object
 *          properties: 
 *              msg: 
 *              type: string
 *              description: not found genres
 *          example:
 *              msg: not found genres
 *  parameters:
 *      genresId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: Id of the genre Detail.
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
 *      name: genres
 *      description: Endpoints of the genre
*/

/**
 * @swagger
 * /api/v1/genres/:
 *  post:
 *      summary: create a new genres
 *      tags: [genres]
 *      parameters: 
 *          - $ref: '#/components/parameters/token'  
 *      requestBody:
 *          required: true
 *      content:
 *          application/json:
 *          schema:
 *              items: 
 *                  $ref: '#/components/schemas/genres'   
 *      responses:
 *          200:
 *              description: The genres was succesfully created
 *              content:
 *                  application/json:
 *                      schema: 
 *                          items: 
 *                              $ref: '#/components/schemas/genres' 
 *      400: 
 *        description: There are no registered genres
 */
router.post('/', verifyTokenMiddleware, creategenre)

/**
* @swagger
*  /api/v1/genres:
*      get:
*          summary: Get an genres list
*          tags: [genres]
*          parameters: 
*               - $ref: '#/components/parameters/token' 
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
* */
router.get('/', getgenres)

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      get:
 *          summary: Get an genre by id
 *          tags: [genres]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/genresId'
 *          responses: 
 *              200:
 *                  description: the genre with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/genres'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 * */
router.get('/:id', verifyTokenMiddleware, getOnegenre)

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      put:
 *          summary: Update an genre by id
 *          tags: [genres]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/genresId'
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/genres'
 *          responses:
 *              200:
 *                  description: The update of the genre has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/genres'
 *              400:
 *                  description: fields empty.
 *              404:
 *                  description: There is no genre registered with the provided id.
 */

router.put('/:id', verifyTokenMiddleware, updategenre)

/**
 * @swagger
 *  /api/v1/genres/{id}:
 *      delete: 
 *          summary: Delete an genre by id
 *          tags: [genres]
 *          parameters: 
 *              - $ref: '#/components/parameters/token' 
 *              - $ref: '#/components/parameters/genresId'
 *          responses:
 *              200:
 *                  description: The removal of the genre has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/genres'
 *              500:
 *                  description: Server error.
 *              404:
 *                  description: There is no genre registered with the provided id.
 */

router.delete('/:id', verifyTokenMiddleware, deletegenre)

export default router;