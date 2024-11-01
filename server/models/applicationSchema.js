import sequelize from "../config/sequelize_database.js";
import { Model, DataTypes } from "@sequelize/core";

class Application extends Model {}

Application.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        applicationDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize, 
        modelName: "Application",  
        tableName: "applications", 
        timestamps: false,
    }
);

export default Application;
