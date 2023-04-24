// Description: This file contains the movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';
import genresModel from './genre.model.js';

// Import datatypes from sequelize
import { DataTypes } from 'sequelize';

// Define account model
const moviesModel = cinemaDatabase.define('movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    /*id_genres: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    }*/
},
{
        tableName: 'movies',
        timestamps: true
});/*
genresModel.belongsToMany(moviesModel, {
    through: 'id_genres',
});
moviesModel.belongsToMany(genresModel, {
    through: 'id_genres',
});*/

// Export gender model
export default moviesModel;
