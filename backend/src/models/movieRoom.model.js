import sequelize from '../database/cinema.database.js';
import { DataTypes } from 'sequelize';
import roomModel from './room.model.js';
import movieModel from './movie.model.js'
const movieRoomModel = sequelize.define('movieRoom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {   
        type: DataTypes.DATE,
        allowNull: false,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'movie_rooms'
});

movieRoomModel.belongsTo(movieModel, {
    foreignKey: 'movie_id',
    targetId: 'id',
    allowNull: false
});

movieRoomModel.belongsTo(roomModel, {
    foreignKey: 'room_id',
    targetId: 'id',
    allowNull: false
});

export default movieRoomModel;