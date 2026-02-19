import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors({
  origin: ['https://inteliqbylumos.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

app.use('/api', chatRoutes);

app.use(errorHandler);

export default app;
