import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3030'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
