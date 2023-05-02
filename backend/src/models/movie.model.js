// Description: This file contains the movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';

// Import datatypes from sequelize
import { DataTypes } from 'sequelize';

// Define account model
const moviesModel = cinemaDatabase.define('movie', 
    {
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
        genres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'movies',
        timestamps: true
    });

// Exporting movie model
export default moviesModel;
