import sequelize from "../config/sequelize_database.js";
import { DataTypes } from "@sequelize/core";

const Company = sequelize.define(
    "Company",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "companies", 
        timestamps: false, 
    }
);

export default Company;
