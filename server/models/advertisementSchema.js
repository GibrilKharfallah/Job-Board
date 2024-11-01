import sequelize from "../config/sequelize_database.js";
import { DataTypes } from "@sequelize/core";

const Advertisement = sequelize.define(
    "Advertisement",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contractType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sector: {
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
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },        
        wage: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expiringDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "advertisements",
        timestamps: false,
    }
);

export default Advertisement;
