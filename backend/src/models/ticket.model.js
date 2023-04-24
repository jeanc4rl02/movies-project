// Description: This file contains the ticket model
// Author: Sebastián Gámez Ariza

// Import DataTypes
import { DataTypes } from 'sequelize';
// Importing the database connection
import cinemaDatabase from '../database/cinema.database.js';

// Creating the ticket model
const TicketModel = cinemaDatabase.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seat_number'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, { tableName: 'tickets'});

// Exporting the ticket model
export default TicketModel;

