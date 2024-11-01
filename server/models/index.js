import sequelize from "../config/sequelize_database.js";
import Application from "./applicationSchema.js";
import People from "./peopleSchema.js";
import Advertisement from "./advertisementSchema.js";
import Company from "./companySchema.js";


Application.belongsTo(People, { foreignKey: "applicantId", as: "applicant" });
People.hasMany(Application, { foreignKey: "applicantId", as: "applications" });

Application.belongsTo(Advertisement, { foreignKey: "jobId", as: "job" });
Advertisement.hasMany(Application, { foreignKey: "jobId", as: "applications" });

Advertisement.belongsTo(Company, { foreignKey: "companyId", as: "company" });
Company.hasMany(Advertisement, { foreignKey: "companyId", as: "advertisements" });

export { sequelize, Application, People, Advertisement, Company };
