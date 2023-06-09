import { Router } from "express";
import { getAllMovieRooms, getOneMovieRoom, createMovieRoom, deleteMovieRoom, updateMovieRoom, getAllMovieRoomByMovieId } from "../controllers/movieRoom.controller.js";
import apicache from 'apicache';

const movieRoomRouter = Router ();
const cache = apicache.middleware


movieRoomRouter.get('/', cache('1 minutes'), getAllMovieRooms);

movieRoomRouter.get('/:id', cache('2 minutes'), getOneMovieRoom);

movieRoomRouter.get('/movie/:id', getAllMovieRoomByMovieId);

movieRoomRouter.post('/', createMovieRoom);

movieRoomRouter.put('/:id', updateMovieRoom);

movieRoomRouter.delete('/:id', deleteMovieRoom);

export default movieRoomRouter;