// Description: This file contains the gender_movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';

// Import datatypes from sequelize
import { DataTypes, INTEGER, STRING } from 'sequelize';

// Define account model
const genresModel = cinemaDatabase.define('atmDetail', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: STRING,
    },
}, 
{ 
    tableName: 'genres', 
    timestamps: false 
});

// Export gender model
export default genresModel;
