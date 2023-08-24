import express, { Express} from 'express';
import dotenv from 'dotenv';
import db from './database/config/config';
import routes from './routes';

const app: Express = express();
dotenv.config({ path: './.env' });

const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("db has been re sync")
// });

app.use('/',routes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});