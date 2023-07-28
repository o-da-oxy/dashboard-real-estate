import express from 'express';
import morgan from 'morgan';
import { routes } from './routes/app.router.js';
import cors from 'cors';
import db from './models/index.cjs';

const PORT = 3000;
const app = express();
app.use(express.json());

const logger = morgan('dev');

app.use(logger);
app.use(cors());
app.use(routes);

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  // Создать таблицы заново
  // await db.sequelize.sync({ force: true });
});
