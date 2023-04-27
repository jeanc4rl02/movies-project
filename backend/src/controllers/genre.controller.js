// Description: This file contains the genres controller class
// Author: JUan David Ospina Ortega

//Importing the genres model
import genresModel from '../models/genre.model.js';
//Importing the genres schema
import genresSchema from '../schemas/genre.schema.js';
//Importing the pagination schema
import paginationSchema from '../schemas/pagination.schema.js';

//Create the genres class
//class genresController {

//genres model instance
//genreModel = new genresModel();
//function to  make a genre (insert)
export const creategenres = async (req, res) => {
    //deconstructing request
    const { name } = req.body;
    //validate information
    const { error, value } = await genresSchema.validate(req.body, { abortEarly: false });
    if (error) {
        //show error
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        try {
            //make a new object to send request
            const newGender = { name };
            //create a new genre
            await genresModel.create(newGender);
            res.status(201).json({
                message: 'Successful request',
                body: newGender
            })
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        }
    }
}

//function to consult all genres (select)
export const getgenres = async (req, res) => {
    let genres;
    //deconstructing limits and amount
    const { limit, offset } = req.query;
    //validate information
    const { error, value } = await paginationSchema.validate(req.query, { abortEarly: false });
    //On a error consult all data
    (error) ?
        genres = await genresModel.findAll() :
        genres = await genresModel.findAll({ offset, limit });
    //amount of genres
    (genres.length != 0) ?
        res.send({
            message: 'Successful request',
            body: genres
        }) :
        res.status(404).json({
            message: 'At the moment we have no genres to show. Please create one before using this request.'
        });
}

//function to get a egnre (select where id)
export const getOnegenres = async (req, res) => {
    //destructing id to select a genre 
    const { id } = req.params;
    //find the genre
    const genres = await genresModel.findByPk(id);
    //On a error consult all data
    (genres) ?
        res.send({
            message: 'Successful request',
            body: genres
        }) :
        res.status(404).json({
            message: `At the moment we have no genre with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
}

//update genres function (update)
export const updategenres = async (req, res) => {
    //destructing id to select a genre 
    const { id } = req.params;
    //select the genre to update
    const genresToUpdate = await genresModel.findByPk(id);
    //if a genre found
    if (genresToUpdate) {
        try {
            //deconstructing request
            const { name } = req.body;
            //add data to object
            genresToUpdate.name = name;
            //add new genre params
            await genresToUpdate.save();
            res.status(200).json({
                message: 'Successful request',
                body: genresToUpdate
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(404).json({
            message: `At the moment we have no genres with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
    }
}

//delete genres function (delete)
export const deletegenres = async (req, res) => {
    //destructing id to select a genre 
    const { id } = req.params;
    //select the genre to remove
    const genresToDelete = await genresModel.findByPk(id);
    //if a genre found
    if (genresToDelete) {
        try {
            //the request is send
            await genresModel.destroy({ where: { id } });
            //On a error deleted the genre
            res.status(200).json({
                message: `The genres with id: ${id} was successfully deleted.`
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(404).json({
            message: `The genres with id: ${id} doesn't exist in the database.`
        })
    }
}