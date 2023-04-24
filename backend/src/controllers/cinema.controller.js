import fs from 'fs-extra';
import cinemaModel from '../models/cinema.model.js';
import cinemaSchema from '../schemas/cinema.schema.js';
import {uploadImage, deleteImage} from '../config/cloudinary.config.js';
import paginationSchema from '../schemas/pagination.schema.js';
import {response, uploadToCloudinary, RESPONSE} from '../utils/response.util.js'

export const getAllCinemas = async(req, res) => {
    let cinemas;
    const {limit, offset} = req.query;
    const {error, value} = await paginationSchema.validate(req.query, {abortEarly: false});
    error ? cinemas = await cinemaModel.findAll() : cinemas = await cinemaModel.findAll({offset, limit});
    cinemas.length != 0 ? response(200, RESPONSE.OK , cinemas, res) : 
    response(404, RESPONSE.NO_CINEMA, RESPONSE.NO_DATA, res)
}


export const getOneCinema = async(req, res) => {
    const {id} = req.params
    const cinema = await cinemaModel.findByPk(id)
    cinema ? response(200, RESPONSE.OK, cinema, res ) : response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res);
}


export const createCinema = async (req, res) => {
    const {name, address, city, phone} = req.body;
    const {error, value} = await cinemaSchema.validate(req.body, {abortEarly: false});
    if(error || !req.files){
        response(400, error ? error.details[0].message : RESPONSE.EMPTY, RESPONSE.NO_DATA, res)
    } else {
        try {
            const newCinema = {name, address, city, phone, logo: {}};
            const isAnyFile = req.files?.logo;
            const pathToUpload = req.files.logo.tempFilePath;
            const result = await uploadToCloudinary(isAnyFile, pathToUpload);
            newCinema.logo = result;
            await Promise.all([
                cinemaModel.create(newCinema),
                fs.unlink(pathToUpload) 
            ])
            response(201, RESPONSE.OK, newCinema, res)
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    }
}


export const updateCinema = async (req, res) => {
    const {id} = req.params
    const cinemaToUpdate = await cinemaModel.findByPk(id)
    if(cinemaToUpdate){
        try {
            const {name, address, city, phone} = req.body;
            cinemaToUpdate.name = name
            cinemaToUpdate.address = address
            cinemaToUpdate.city = city
            cinemaToUpdate.phone = phone
            //Update the image in cloudinary
            if(req.files?.logo){
                const result = await uploadImage(req.files.logo.tempFilePath);
                //Delete old image in cloudinary 
                await deleteImage(cinemaToUpdate.logo.public_id)
                cinemaToUpdate.logo = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
                //Delete temporal files
                await fs.unlink(req.files.logo.tempFilePath)
            }
            //Update the cinema
            await cinemaToUpdate.save();
            response(200, RESPONSE.OK, cinemaToUpdate, res)
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    } else {
        response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res )
    }
}


export const deleteCinema = async (req, res) => {
    const {id} = req.params
    const cinemaToDelete = await cinemaModel.findByPk(id)
    if(cinemaToDelete){
        try {
            await Promise.all([
                deleteImage(cinemaToDelete.logo.public_id),
                cinemaModel.destroy({where: {id}})
            ])
            response(200, RESPONSE.DELETE_OK, RESPONSE.NO_DATA, res);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    } else {
        response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res);
    }
}