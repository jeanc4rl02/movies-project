// Description: This file contains the movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';

// Import datatypes from sequelize
import { DataTypes, INTEGER, STRING } from 'sequelize';

// Define account model
const moviesModel = cinemaDatabase.define('movie', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: STRING,
    },
    duration: {
        type: STRING,
    },
    trailer: {
        type: STRING,
    },
    image: {
        type: STRING,
    },
},
    {
        tableName: 'movies',
        timestamps: false
    });

// Export gender model
export default moviesModel;
