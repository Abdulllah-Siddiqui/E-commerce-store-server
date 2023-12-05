import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import ApplyMiddlewares from './middlewares';
import router from './routes';
import Agenda from './jobs/config';
import './jobs/definitions';

import './config/database';

const app = express();

app.use(cors());
ApplyMiddlewares(app);

app.use('/', router);

app.listen(process.env.PORT, async () => {
  console.log(`app is listening to port ${process.env.PORT}`);
  await Agenda._ready;
  console.log('Agenda Ready');
  Agenda.start();
  console.log('Agenda Started');
});
