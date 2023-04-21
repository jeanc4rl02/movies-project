// Description: This file contains the gender_movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';

// Import datatypes from sequelize
import { DataTypes } from 'sequelize';

// Define account model
const genresModel = cinemaDatabase.define('genres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'genres',
        timestamps: true
    });

// Export gender model
export default genresModel;
