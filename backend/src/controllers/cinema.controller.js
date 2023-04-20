import cinemaModel from '../models/cinema.model.js';
import cinemaSchema from '../schemas/cinema.schema.js';
import {uploadImage, deleteImage} from '../config/cloudinary.config.js';
import fs from 'fs-extra';
import paginationSchema from '../schemas/pagination.schema.js';

export const getAllCinemas = async(req, res) => {
    let cinemas;
    const {limit, offset} = req.query;
    const {error, value} = await paginationSchema.validate(req.query, {abortEarly: false});
    error ? cinemas = await cinemaModel.findAll() 
    : cinemas = await cinemaModel.findAll({offset, limit});
    cinemas.length != 0 ? 
    res.send({
        message: 'Successful request',
        body: cinemas}) 
        : 
        res.status(404).json({
        message: 'At the moment we have no cinemas to show. Please create one before using this request.'
            });
}


export const getOneCinema = async(req, res) => {
    const {id} = req.params
    const cinema = await cinemaModel.findByPk(id)
    cinema ? res.send({
        message: 'Successful request',
        body: cinema}) : res.status(404).json({
        message: `At the moment we have no cinema with id: ${id} to show. Please make sure that the provided id exists in the database.`
    });
}


export const createCinema = async (req, res) => {
    const {name, address, city, phone} = req.body;
    const {error, value} = await cinemaSchema.validate(req.body, {abortEarly: false});
    if(error){
        res.status(400).json({
            message: error.details[0].message
        });
    } else {
        try {
            const newCinema = {
                name,
                address,
                city,
                phone,
                logo: {}
            }
            if(req.files?.logo){
                const result = await uploadImage(req.files.logo.tempFilePath);
                newCinema.logo = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
            }
            await cinemaModel.create(newCinema);
            await fs.unlink(req.files.logo.tempFilePath)
            res.status(201).json({
                message: 'Successful request',
                body: newCinema})
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
            res.status(200).json({
                message: 'Successful request',
                body: cinemaToUpdate});
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    } else {
        res.status(404).json({
            message: `At the moment we have no cinema with id: ${id} to show. Please make sure that the provided id exists in the database.`
        });
    }
}


export const deleteCinema = async (req, res) => {
    const {id} = req.params
    const cinemaToDelete = await cinemaModel.findByPk(id)
    if(cinemaToDelete){
        try {
            await deleteImage(cinemaToDelete.logo.public_id);
            await cinemaModel.destroy({where: {id}});
            res.status(200).json({
                message:`The cinema with id: ${id} was successfully deleted.`
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    } else {
        res.status(404).json({
            message: `The cinema with id: ${id} doesn't exist in the database.`
        })
    }
}