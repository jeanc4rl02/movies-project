// Description: User model for the SQL database
// Author: Sebastián Gámez Ariza

// Import DataTypes
import { DataTypes } from 'sequelize';
// Importing the database connection
import cinemaDatabase from '../database/cinema.database.js';

// Creating the user model
const UserModel = cinemaDatabase.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { tableName: 'users'});

// Exporting the user model
export default UserModel;
