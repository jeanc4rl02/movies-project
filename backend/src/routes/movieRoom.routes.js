import { Router } from "express";
import { getAllMovieRooms, 
    getOneMovieRoom, 
    createMovieRoom, 
    deleteMovieRoom, 
    updateMovieRoom, 
    getAllMovieRoomByMovieId, 
    getAllMovieRoomByRoomId } from "../controllers/movieRoom.controller.js";
import apicache from 'apicache';

const movieRoomRouter = Router ();
const cache = apicache.middleware

/**
 * @swagger
 * components:
 *  schemas:
 *      MovieRoom:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of the function.
 *              hour:
 *                  type: string
 *                  description: Time of film presentation.
 *              start_date: 
 *                  type: string
 *                  description: Date from which it will be available in theaters.
 *              end_date:
 *                  type: string
 *                  description: Date until which it will be available in theaters.
 *              movie_id:
 *                  type: string
 *                  description: Film to be presented.
 *              room_id:
 *                  type: integer
 *                  description: Room where it will be presented at that time.
 *              vip:
 *                  type: integer
 *                  description: Number of VIP seats available.
 *              general:
 *                  type: integer
 *                  description: Number of General seats available.
 *              preferential:
 *                  type: integer
 *                  description: Number of Preferential seats available.
 *          required: 
 *              - hour
 *              - start_date
 *              - end_date
 *              - movie_id
 *              - room_id
 *              - vip
 *              - general
 *              - preferential
 *          example:
 *              id: 1
 *              hour: 14:00
 *              start_date: 2023-04-26
 *              end_date: 2023-05-26
 *              movie_id: 1
 *              room_id: 1
 *              vip: 5
 *              general: 15
 *              preferential: 10
 *      MovieRoomPut:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generated id of the function.
 *              hour:
 *                  type: string
 *                  description: Time of film presentation.
 *              start_date: 
 *                  type: string
 *                  description: Date from which it will be available in theaters.
 *              end_date:
 *                  type: string
 *                  description: Date until which it will be available in theaters.
 *              movie_id:
 *                  type: string
 *                  description: Film to be presented.
 *              room_id:
 *                  type: integer
 *                  description: Room where it will be presented at that time.
 *          example:
 *              id: 1
 *              hour: 14:00
 *              start_date: 2023-04-26
 *              end_date: 2023-05-26
 *              movie_id: 1
 *              room_id: 1
 *      Empty:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message: At the moment we have no items to show. Please create one before using this request.
 *      EmptyPost:
 *          type: object
 *          properties:
 *              message: string
 *          example:
 *              message:"vip" is required
 *      noDataPut:
 *          type: object
 *          properties:
 *              message: string
 *          example:At the moment we have no item with id: 4 to show. Please make sure that the provided id exists in the database.
 *  parameters:
 *      movieRoomId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: number
 *          description: Id of the movie room.
 *      offset:
 *          in: path
 *          name: offset
 *          required: false
 *          schema:
 *              type: number
 *          description: The number of movie rooms to skip before starting to collect the result set.
 *      limit:
 *          in: path
 *          name: limit
 *          required: false
 *          schema:
 *              type: number
 *          description: The numbers of movie rooms to return.
 *      movieId:
 *          in: path
 *          name: movieId
 *          required: true
 *          schema:
 *              type: number
 *          description: The movie id to filter by movie.
 *      roomId:
 *          in: path
 *          name: roomId
 *          required: true
 *          schema:
 *              type: number
 *          description: The room id to filter by room.
 */

/**
 * @swagger
 * tags:
 *  name: Movie Rooms
 *  description: Endpoints of the Movie Rooms.
 */

/**
 * @swagger
 *  /api/v1/movie-rooms:
 *      get:
 *          summary: Get a movie room list
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the list of movie rooms.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/MovieRoomPut'
 *              404:
 *                  description: the list of cinemas is empty
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'                  
 * */
movieRoomRouter.get('/', cache('1 minutes'), getAllMovieRooms);

/**
 * @swagger
 *  /api/v1/movie-rooms/{id}:
 *      get:
 *          summary: Get a movie room by id
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/movieRoomId'
 *              - $ref: '#/components/parameters/limit'
 *              - $ref: '#/components/parameters/offset'
 *          responses: 
 *              200:
 *                  description: the movie room with the id provided.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/MovieRoomPut'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
movieRoomRouter.get('/:id', cache('2 minutes'), getOneMovieRoom);

/**
 * @swagger
 *  /api/v1/movie-rooms/movie/{movieId}:
 *      get:
 *          summary: Get a movie room by movie id.
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/movieId'
 *          responses: 
 *              200:
 *                  description: All the movie rooms filter by movie_id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/MovieRoomPut'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
movieRoomRouter.get('/movie/:id', getAllMovieRoomByMovieId);

/**
 * @swagger
 *  /api/v1/movie-rooms/room/{roomId}:
 *      get:
 *          summary: Get a movie room by room id.
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/roomId'
 *          responses: 
 *              200:
 *                  description: All the movie rooms filter by room_id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/MovieRoomPut'
 *              404:
 *                  description: The id provided doesn't exist in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Empty'    
 * */
movieRoomRouter.get('/room/:id', getAllMovieRoomByRoomId);

/**
 * @swagger
 *  /api/v1/movie-rooms:
 *      post:
 *          summary: Save a new movie room.
 *          tags: [Movie Rooms]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MovieRoom'
 *          responses: 
 *              201:
 *                  description: Movie Room was succesfully created.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/MovieRoom'
 *              400:
 *                  description: All properties are required and check if that hour already exists in the database.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/components/schemas/EmptyPost'             
 * */
movieRoomRouter.post('/', createMovieRoom);

/**
 * @swagger
 *  /api/v1/movie-rooms/{id}:
 *      put:
 *          summary: Update a movie room by id.
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/movieRoomId'
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MovieRoom'
 *          responses:
 *              200:
 *                  description: The update of the movie room has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/MovieRoomPut'
 *              404:
 *                  description: There is no cinema registered with the provided id.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/noDataPut'
 */
movieRoomRouter.put('/:id', updateMovieRoom);

/**
 * @swagger
 *  /api/v1/movie-rooms/{id}:
 *      delete: 
 *          summary: Delete a movie room by id.
 *          tags: [Movie Rooms]
 *          parameters:
 *              - $ref: '#/components/parameters/movieRoomId'
 *          responses:
 *              200:
 *                  description: The removal of the movie room has been successfully completed.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/MovieRoom'
 *              500:
 *                  description: Server error.
 *              404:
 *                  description: There is no movie room registered with the provided id.
 */
movieRoomRouter.delete('/:id', deleteMovieRoom);

export default movieRoomRouter;