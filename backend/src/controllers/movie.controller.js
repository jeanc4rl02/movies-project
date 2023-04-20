import moviesSchema from '../schemas/movie.schema.js';
import moviesModel from '../models/movie.model.js';

export const createmovies = async (req, res) => {
    const { name, duration, trailer, image } = req.body;
    const { error, value } = await moviesSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        if (name == null || duration == null ||
            trailer == null || image == null) {
            res.status(400).json({
                message: 'field incomplete.'
            });
        } else {
            const newmovies = await moviesModel.create({
                name, duration, trailer, image,
            });
            res.status(201).json(newmovies)
            try {
                const newmovie = {
                    name, duration, trailer, image: {}
                }
                if (req.files?.image) {
                    const result = await uploadImage(req.files.image.tempFilePath);
                    newmovie.image = {
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    }
                }
                await moviesModel.create(newmovie);
                await fs.unlink(req.files.image.tempFilePath)
                res.status(201).json({
                    message: 'Successful request',
                    body: newmovie
                })
            } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: error.message });
            }
        }
    }
}

export const getmovies = async (req, res) => {
    const { page = 1, limit } = req.query;
    const movies = await moviesModel.findAll()
    movies.length != 0 ? res.send({
        message: 'Successful request',
        body: movies
    }) : res.status(404).json({
        message: 'At the moment we have no movies to show. Please create one before using this request.'
    });
}

export const getOnemovies = async (req, res) => {
    const { id } = req.params
    const movies = await moviesModel.findByPk(id)
    movies ? res.send({
        message: 'Successful request',
        body: movies
    }) : res.status(404).json({
        message: `At the moment we have no movie with id: ${id} to show. Please make sure that the provided id exists in the database.`
    });
}

export const updatemovies = async (req, res) => {
    const { id } = req.params
    const moviesToUpdate = await moviesModel.findByPk(id)
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
    const { id } = req.params
    const moviesToDelete = await moviesModel.findByPk(id)

    if (moviesToDelete) {
        try {
            await deleteImage(cinemaToDelete.image.public_id);
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