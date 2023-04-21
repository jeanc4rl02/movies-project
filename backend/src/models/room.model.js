// Description: This file contains the room model created with sequelize
// Author: Sebastián Gámez Ariza

// Importing the sequelize library
import { DataTypes } from 'sequelize';
// Importing the database connection
import cinemaDatabase from '../database/cinema.database';

// Creating the room model
const roomModel = cinemaDatabase.define('Room', {
    // The room id
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // The room name
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // The room capacity
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // The room status
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { tableName: 'rooms' });

// Add relation with cinema model
roomModel.belongsTo(cinemaModel, { 
    foreignKey: 'cinemaId',
    field: 'cinema_id',
    as: 'cinema'
});

// Exporting the room model
export default roomModel;
