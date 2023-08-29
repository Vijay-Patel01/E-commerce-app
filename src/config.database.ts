import { Sequelize, DataTypes } from 'sequelize';
import config from './config';

const dbName = config.DATABASE.DATABASE as string;
const dbUser = config.DATABASE.USER as string;
const dbPassword = config.DATABASE.PASSWORD;
const dbHost = config.DATABASE.HOST;
const dbPort = config.DATABASE.PORT;

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, { dialect: "postgres" });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./modules/user/user.model')(sequelize, DataTypes);
db.vendors = require('./modules/vendor/vendor.model')(sequelize, DataTypes);
db.products = require('./modules/product/product.model')(sequelize, DataTypes);
db.carts = require('./modules/product/cart/cart.model')(sequelize, DataTypes);

// db.carts.associate(db);

export default db;