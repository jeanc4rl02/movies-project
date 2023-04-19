import genresModel from '../models/genres.model.js';

export const creategenres = async (req, res) => {
    const { name } = req.body;
    if (
        name == null
    ) {
        res.status(400).json({
            message: 'field incomplete.'
        });
    } else {
        const newgenres = await genresModel.create({
            name,
        });
        res.status(201).json(newgenres)
    }
}

export const getgenres = async (res) => {
    const genres = await genresModel.findAll()
    genres.length != 0 ? res.send(genres) : res.status(404).json({
        message: 'At the moment we have no genres to show. Please create one before using this request.'
    });
}

export const getOnegenres = async (req, res) => {
    const { id } = req.params
    const genres = await genresModel.findByPk(id)
    genres ? res.send(genres) : res.status(404).json({
        message: `At the moment we have no genres with id: ${id} to show. Please make sure that the provided id exists in the database.`
    });
}

export const updategenres = async (req, res) => {
    const { id } = req.params
    const genresToUpdate = await genresModel.findByPk(id)
    if (genresToUpdate) {
        const { name} = req.body;
        genresToUpdate.name = name
        await genresToUpdate.save();
        res.status(200).json(genresToUpdate);
    } else {
        res.status(404).json({
            message: `At the moment we have no genres with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
    }
}

export const deletegenres = async (req, res) => {
    const { id } = req.params
    const genresToDelete = await genresModel.findByPk(id)

    if (genresToDelete) {
        await genresModel.destroy({
            where: {
                id
            }
        })
        res.status(200).json({
            message: `The genres with id: ${id} was successfully deleted.`
        });
    } else {
        res.status(404).json({
            message: `The genres with id: ${id} doesn't exist in the database.`
        })
    }
}