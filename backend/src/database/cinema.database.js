// Importing the database url
import {DB_URL} from '../config/env.config.js';

// There's importing the ORM
import {Sequelize} from 'sequelize';

// There's connecting the db
const sequelize = new Sequelize(DB_URL);

// There's exporting the db
export default sequelize;
