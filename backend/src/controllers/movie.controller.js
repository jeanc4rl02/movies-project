import moviesModel from '../models/movie.model.js';


export const createmovies = async (req, res) => {
    const { name, duration, trailer, image } = req.body;
    if (
        name == null ||
        duration == null ||
        trailer == null ||
        image == null
    ) {
        res.status(400).json({
            message: 'field incomplete.'
        });
    } else {
        const newmovies = await moviesModel.create({
            name, duration, trailer, image,
        });
        res.status(201).json(newmovies)
    }
}

export const getmovies = async (res) => {
    const movies = await moviesModel.findAll()
    movies.length != 0 ? res.send(movies) : res.status(404).json({
        message: 'At the moment we have no movies to show. Please create one before using this request.'
    });
}

export const getOnemovies = async (req, res) => {
    const { id } = req.params
    const movies = await moviesModel.findByPk(id)
    movies ? res.send(movies) : res.status(404).json({
        message: `At the moment we have no movies with id: ${id} to show. Please make sure that the provided id exists in the database.`
    });
}

export const updatemovies = async (req, res) => {
    const { id } = req.params
    const moviesToUpdate = await moviesModel.findByPk(id)
    if (moviesToUpdate) {
        const { name, duration, trailer, image } = req.body;
        moviesToUpdate.name = name
        moviesToUpdate.duration = duration
        moviesToUpdate.trailer = trailer
        moviesToUpdate.image = image
        await moviesToUpdate.save();
        res.status(200).json(moviesToUpdate);
    } else {
        res.status(404).json({
            message: `At the moment we have no movies with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
    }
}

export const deletemovies = async (req, res) => {
    const { id } = req.params
    const moviesToDelete = await moviesModel.findByPk(id)

    if (moviesToDelete) {
        await moviesModel.destroy({
            where: {
                id
            }
        })
        res.status(200).json({
            message: `The movies with id: ${id} was successfully deleted.`
        });
    } else {
        res.status(404).json({
            message: `The movies with id: ${id} doesn't exist in the database.`
        })
    }
}