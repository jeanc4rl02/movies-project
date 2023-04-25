// Description: This file contains the movies model
// Author: Juan David Ospina Ortega

// Import sequelize instance (Database connection) //same conection......
import cinemaDatabase from '../database/cinema.database.js';
import genresModel from './genre.model.js';

// Import datatypes from sequelize
import { DataTypes } from 'sequelize';


// Define account model
const moviesModel = cinemaDatabase.define('movie', {
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
    /*genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }*/
},
    {
        tableName: 'movies',
        timestamps: true
    });

/*moviesModel.belongsToMany(genresModel, {
    through: 'gendersas',
});*/
/*genresModel.belongsToMany(moviesModel, {
    through: 'gendersas',
});*/
/*const User_Profile = sequelize.define('User_Profile', {
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });
  User.belongsToMany(Profile, { through: User_Profile });
  Profile.belongsToMany(User, { through: User_Profile });*/
// Exporting the schema
// Export gender model
export default moviesModel;
