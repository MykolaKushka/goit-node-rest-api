import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineContact from "./models/contact.js"; 

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Contact = defineContact(sequelize); 

try {
  await sequelize.authenticate();
  await sequelize.sync();
} catch (error) {
  process.exit(1);
}

export { sequelize, Contact };
