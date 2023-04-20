import { Router } from "express";
import { getAllCinemas, getOneCinema, createCinema, deleteCinema, updateCinema } from "../controllers/cinema.controller.js";
import fileUpload from 'express-fileupload';
import apicache from 'apicache';

const cineRouter = Router ();
const cache = apicache.middleware

cineRouter.get('/', cache('1 minutes'), getAllCinemas);

cineRouter.get('/:id', cache('2 minutes'), getOneCinema);

cineRouter.post('/', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), createCinema);

cineRouter.put('/:id', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), updateCinema);

cineRouter.delete('/:id', deleteCinema);

export default cineRouter;