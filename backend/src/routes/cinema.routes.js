import { Router } from "express";
import { getAllCinemas, getOneCinema, createCinema, deleteCinema, updateCinema } from "../controllers/cinema.controller.js";
import fileUpload from 'express-fileupload';

const cineRouter = Router ();

cineRouter.get('/', getAllCinemas);

cineRouter.get('/:id', getOneCinema);

cineRouter.post('/', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), createCinema);

cineRouter.put('/:id', fileUpload({useTempFiles : true, tempFileDir : './uploads'}), updateCinema);

cineRouter.delete('/:id', deleteCinema);

export default cineRouter;