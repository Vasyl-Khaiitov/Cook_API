import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { auth } from './middlewares/auth.js';
import usersRoutes from './routes/usersRoutes.js';
dotenv.config();

const PORT = Number(getEnvVar('PORT', '3030'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use('/api-docs', swaggerDocs());
  app.use('/api/users',auth, usersRoutes);

  app.use('/api/auth', authRouter);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
