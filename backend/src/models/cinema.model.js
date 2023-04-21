import sequelize from '../database/cinema.database.js';
import { DataTypes } from 'sequelize';

const cinemaModel = sequelize.define('cinema', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {   
        type: DataTypes.STRING,
        defaultValue: true 
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'cinemas'
});

export default cinemaModel;