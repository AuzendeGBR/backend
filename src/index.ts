import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import './database/connect.ts';

import { env } from './app/config/env.ts';
import { loginRouter } from './app/controllers/loginController.ts';
import { schedulesRouter } from './app/controllers/scheduleController.ts';
import { servicesRouter } from './app/controllers/serviceController.ts';
import { usersRouter } from './app/controllers/userController.ts';

const app = express();

app.use(express.json());
app.use(cors());
app.use(loginRouter);
app.use(usersRouter);
app.use(servicesRouter);
app.use(schedulesRouter);

app.listen(env.port, () =>
  console.log(`🔥 Servidor rodando em http://localhost:${env.port}`)
);
