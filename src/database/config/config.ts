import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, { dialect: "postgres" });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./../models/Admin/userModel')(sequelize, DataTypes);
db.vendors = require('./../models/Admin/vendorModel')(sequelize, DataTypes);
db.products = require('./../models/productModel')(sequelize, DataTypes);
db.carts = require('./../models/cartModel')(sequelize, DataTypes);

// db.carts.associate(db);

export default db;