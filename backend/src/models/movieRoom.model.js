import sequelize from '../database/cinema.database.js';
import { DataTypes } from 'sequelize';
import roomModel from './room.model.js';
const cinemaModel = sequelize.define('cinema', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    end_date: {   
        type: DataTypes.STRING,
        defaultValue: true 
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'cinemas'
});

cinemaModel.belongsTo(movieModel, {
    foreignKey: 'movie_id',
    targetId: 'id',
    allowNull: false
});

cinemaModel.belongsTo(roomModel, {
    foreignKey: 'room_id',
    targetId: 'id',
    allowNull: false
});

export default cinemaModel;