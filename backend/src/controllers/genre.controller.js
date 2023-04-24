import genresModel from '../models/genre.model.js';
import genresSchema from '../schemas/genre.schema.js';
import paginationSchema from '../schemas/pagination.schema.js';

export const creategenres = async (req, res) => {
    const { name } = req.body;
    const { error, value } = await genresSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        try {
            const newGender = { name };
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

export const getgenres = async (req, res) => {
    let genres;
    const { limit, offset } = req.query;
    const { error, value } = await paginationSchema.validate(req.query, { abortEarly: false });
    (error) ?
        genres = await genresModel.findAll() :
        genres = await genresModel.findAll({ offset, limit });
    (genres.length != 0) ?
        res.send({
            message: 'Successful request',
            body: genres
        }) :
        res.status(404).json({
            message: 'At the moment we have no genres to show. Please create one before using this request.'
        });
}

export const getOnegenres = async (req, res) => {
    const { id } = req.params;
    const genres = await genresModel.findByPk(id);
    (genres) ?
        res.send({
            message: 'Successful request',
            body: genres
        }) :
        res.status(404).json({
            message: `At the moment we have no genre with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
}

export const updategenres = async (req, res) => {
    const { id } = req.params;
    const genresToUpdate = await genresModel.findByPk(id);
    if (genresToUpdate) {
        try {
            const { name } = req.body;
            genresToUpdate.name = name;
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

export const deletegenres = async (req, res) => {
    const { id } = req.params;
    const genresToDelete = await genresModel.findByPk(id);

    if (genresToDelete) {
        try {
            await genresModel.destroy({ where: { id } });
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