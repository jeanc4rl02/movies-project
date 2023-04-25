import moviesSchema from '../schemas/movie.schema.js';
import moviesModel from '../models/movie.model.js';
import genresModel from '../models/genre.model.js';

import { uploadImage, deleteImage } from '../config/cloudinary.config.js';
import {response, uploadToCloudinary, RESPONSE} from '../utils/response.util.js'
import fs from 'fs-extra';
import paginationSchema from '../schemas/pagination.schema.js';

export const createmovies = async (req, res) => {
    console.log(req.body)
    req.body = {
        name: req.body.name,
        duration: req.body.duration,
        trailer: req.body.trailer,
        id_genres: JSON.parse(req.body.id_genres)
    }
    console.log(req.body)
    const { name, duration, trailer, id_genres } = req.body;
    const { error, value } = await moviesSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        if (name == null || duration == null ||
            trailer == null) {
            res.status(400).json({
                message: 'field incomplete.'
            });
        } else {
            try {
                const newmovie = {
                    name,
                    duration,
                    trailer,
                    id_genres: id_genres.map(genre => ({ id: genre.id, name: genre.name })),
                    image: {},
                }
                const isAnyFile = req.files?.image;
                const pathToUpload = req.files.image.tempFilePath;
                const result = await uploadToCloudinary(isAnyFile, pathToUpload);
                newmovie.image = result;
                await Promise.all([
                    moviesModel.create(newmovie),
                    fs.unlink(pathToUpload)
                ])
                response(201, RESPONSE.OK, newmovie, res)
            } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: error.message });
            }
        }
    }
}

export const getmovies = async (req, res) => {
    let movies;
    const { limit, offset } = req.query;
    const { error, value } = await paginationSchema.validate(req.query, { abortEarly: false });

    (error) ?
        movies = await moviesModel.findAll() :
        movies = await moviesModel.findAll({
            offset,
            limit,

        });
    (movies.length != 0) ?
        res.send({
            message: 'Successful request',
            body: movies
        }) :
        res.status(404).json({
            message: 'At the moment we have no movies to show. Please create one before using this request.'
        });
}

export const getOnemovies = async (req, res) => {
    const { id } = req.params;
    const movies = await moviesModel.findByPk(id);
    (movies) ?
        res.send({
            message: 'Successful request',
            body: movies
        }) : res.status(404).json({
            message: `At the moment we have no movie with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
}

export const updatemovies = async (req, res) => {
    const { id } = req.params;
    const moviesToUpdate = await moviesModel.findByPk(id);
    if (moviesToUpdate) {
        try {
            const { name, duration, trailer } = req.body;
            moviesToUpdate.name = name
            moviesToUpdate.duration = duration
            moviesToUpdate.trailer = trailer
            if (req.files?.image) {
                const result = await uploadImage(req.files.image.tempFilePath);
                //Delete old image in cloudinary 
                await deleteImage(moviesToUpdate.image.public_id)
                moviesToUpdate.image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
                //Delete temporal files
                await fs.unlink(req.files.image.tempFilePath)
            }
            await moviesToUpdate.save();
            res.status(200).json({
                message: 'Successful request',
                body: moviesToUpdate
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(404).json({
            message: `At the moment we have no movies with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
    }
}

export const deletemovies = async (req, res) => {
    const { id } = req.params;
    const moviesToDelete = await moviesModel.findByPk(id);

    if (moviesToDelete) {
        try {
            await deleteImage(moviesToDelete.image.public_id);
            await moviesModel.destroy({
                where: { id }
            })
            res.status(200).json({
                message: `The movies with id: ${id} was successfully deleted.`
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(404).json({
            message: `The movies with id: ${id} doesn't exist in the database.`
        })
    }
}