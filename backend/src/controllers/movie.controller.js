//Importing movie scheme
import moviesSchema from '../schemas/movie.schema.js';
//Importing movie model
import moviesModel from '../models/movie.model.js';

//Importing couldinary functions
import { uploadImage, deleteImage } from '../config/cloudinary.config.js';
import { response, uploadToCloudinary, RESPONSE } from '../utils/response.util.js'
import fs from 'fs-extra';
//importing pagination scheme
import paginationSchema from '../schemas/pagination.schema.js';

//function to  make a movie (insert)
export const createmovies = async (req, res) => {
    console.log(req.body)
    /*req.body = {
        name: req.body.name,
        duration: req.body.duration,
        trailer: req.body.trailer,
        genres: JSON.parse(req.body.genres)
    }
    let gen = req.body.genres.map(genre => ({ id: genre.id, name: genre.name }));
    console.log(req.body)*/
    //deconstructing request
    const { name, duration, trailer, genres } = req.body;
    //validate information
    const { error, value } = await moviesSchema.validate(req.body, { abortEarly: false });
    if (error) {
        //show error
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        //all fields here, are required
        if (name == null || duration == null ||
            trailer == null || genres == null) {///////////////
            res.status(400).json({
                message: 'field incomplete.'
            });
        } else {
            try {
                //make a new object to send request
                const newmovie = {
                    name,
                    duration,
                    trailer,
                    image: {},
                    genres,/////////////////
                }
                //checking and uploading image with couldinary
                const isAnyFile = req.files?.image;
                const pathToUpload = req.files.image.tempFilePath;
                const result = await uploadToCloudinary(isAnyFile, pathToUpload);
                newmovie.image = result;
                ////const news = await moviesModel.create(newmovie);
                ////news.set(gen)
                ////console.log(news)
                //create a new movie
                await Promise.all([
                    ////news,
                    await moviesModel.create(newmovie),
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

//function to consult all movies (select)
export const getmovies = async (req, res) => {
    let movies;
    //deconstructing limits
    const { limit, offset } = req.query;
    const { error, value } = await paginationSchema.validate(req.query, { abortEarly: false });

    //On a error consult all data
    (error) ?
        movies = await moviesModel.findAll() :
        movies = await moviesModel.findAll({
            offset,
            limit,

        });

    //amount of movies
    (movies.length != 0) ?
        res.send({
            message: 'Successful request',
            body: movies
        }) :
        res.status(404).json({
            message: 'At the moment we have no movies to show. Please create one before using this request.'
        });
}

//function to get a movie
export const getOnemovies = async (req, res) => {
    //destructing id to select a movie 
    const { id } = req.params;
    const movies = await moviesModel.findByPk(id);
    //On a error consult all data
    (movies) ?
        res.send({
            message: 'Successful request',
            body: movies
        }) : res.status(404).json({
            message: `At the moment we have no movie with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
}

//update movies function
export const updatemovies = async (req, res) => {
    //destructing id to select a movie 
    const { id } = req.params;
    //select the movie to update
    const moviesToUpdate = await moviesModel.findByPk(id);
    //if a movie found
    if (moviesToUpdate) {
        try {
            /*req.body = {
                name: req.body.name,
                duration: req.body.duration,
                trailer: req.body.trailer,
                genres: JSON.parse(req.body.genres)
            }*/
            //deconstructing request
            const { name, duration, trailer, genres } = req.body;
            //add data to object
            moviesToUpdate.name = name
            moviesToUpdate.duration = duration
            moviesToUpdate.trailer = trailer
            moviesToUpdate.genres = genres//.map(genre => ({ id: genre.id, name: genre.name }))
            //if the image can change
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
            //add new movie params
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

//delete movies function
export const deletemovies = async (req, res) => {
    //destructing id to select a movie 
    const { id } = req.params;
    const moviesToDelete = await moviesModel.findByPk(id);

    //if a movie found
    if (moviesToDelete) {
        try {
            //the request is send
            await deleteImage(moviesToDelete.image.public_id);
            await moviesModel.destroy({
                where: { id }
            })
            //On a error deleted the movie
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