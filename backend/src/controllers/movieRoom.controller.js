import movieRoomModel from '../models/movieRoom.model.js';
import movieRoomSchema from '../schemas/movieRoom.schema.js';
import paginationSchema from '../schemas/pagination.schema.js';
import {response, RESPONSE} from '../utils/response.util.js'
import roomModel from '../models/room.model.js';
import moviesModel from '../models/movie.model.js';
import { createAllTickets } from '../utils/movieRoom.util.js';

export const getAllMovieRooms = async(req, res) => {
    let movieRooms;
    const {limit, offset} = req.query;
    const {error, value} = await paginationSchema.validate(req.query, {abortEarly: false});
    error ? movieRooms = await movieRoomModel.findAll({
        include: [
            {model: roomModel}, 
            {model: moviesModel}],
        attributes: {
            exclude: ['room_id', 'movie_id']
        },
    }) : movieRooms = await movieRoomModel.findAll({
        offset,
        limit,
        include: [
            {model: roomModel}, 
            {model: moviesModel}],
        attributes: {
            exclude: ['room_id', 'movie_id']}
        });
    movieRooms.length != 0 ? response(200, RESPONSE.OK , movieRooms, res) : 
    response(404, RESPONSE.NO_CINEMA, RESPONSE.NO_DATA, res)
}


export const getOneMovieRoom = async(req, res) => {
    const {id} = req.params
    const movieRoom = await movieRoomModel.findByPk(id, {
        include: [
            {model: roomModel}, 
            {model: moviesModel}],
        attributes: {
            exclude: ['room_id', 'movie_id']
        }
    })
    movieRoom ? response(200, RESPONSE.OK, movieRoom, res ) : response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res);
}


export const getAllMovieRoomByMovieId = async(req, res) => {
    const {id} = req.params
    const movieRoom = await movieRoomModel.findAll({
        where: {movie_id: id},
        include: [
            {model: roomModel}, 
            {model: moviesModel}],
        attributes: {
            exclude: ['room_id', 'movie_id']
        }
    })
    movieRoom.length != 0 ? response(200, RESPONSE.OK, movieRoom, res ) : response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res);
}


export const createMovieRoom = async (req, res) => {
    const { vip, general, preferential, hour, start_date, end_date, movie_id, room_id} = req.body;
    const {error, value} = await movieRoomSchema.validate(req.body, {abortEarly: false});
    if(error){
        response(400, error.details[0].message, RESPONSE.NO_DATA, res)
    } else {
        try {
            const newMovieRoom = {hour, start_date, end_date, movie_id, room_id};
            const movieRoomCreated = await movieRoomModel.create(newMovieRoom);
            await createAllTickets(general, preferential, vip, movieRoomCreated.id);
            response(201, RESPONSE.OK, movieRoomCreated, res)
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    }
}


export const updateMovieRoom = async (req, res) => {
    const {id} = req.params
    const movieRoomToUpdate = await movieRoomModel.findByPk(id)
    if(movieRoomToUpdate){
        try {
            const {vip, general, preferential, ...dataToUpdate} = req.body;
            await movieRoomToUpdate.update(dataToUpdate, {where: {id}})
            response(200, RESPONSE.OK, movieRoomToUpdate, res)
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    } else {
        response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res )
    }
}


export const deleteMovieRoom = async (req, res) => {
    const {id} = req.params
    const movieRoomToDelete = await movieRoomModel.findByPk(id)
    if(movieRoomToDelete){
        try {
            await movieRoomModel.destroy({where: {id}})
            response(200, RESPONSE.DELETE_OK, RESPONSE.NO_DATA, res);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    } else {
        response(404, RESPONSE.NO_DATA_ID, RESPONSE.NO_DATA, res);
    }
}