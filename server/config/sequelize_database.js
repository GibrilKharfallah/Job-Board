import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import dotenv from 'dotenv';

dotenv.config(); 

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: process.env.DB_NAME,    
    user: process.env.DB_USER,    
    password: process.env.DB_PASSWORD,  
    host: process.env.DB_HOST,         
    port: Number(process.env.DB_PORT) || 3306,  
});

export default sequelize;

