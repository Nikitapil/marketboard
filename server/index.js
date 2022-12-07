import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ProductRouter from './routers/ProductRouter.js';
import errorMiddleware from './middlewares/error-middleware.js';
import authRouter from './routers/AuthRouter.js';

dotenv.config();

const {PORT, MONGODB_URL} = process.env;

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', ProductRouter);
app.use('/api', authRouter);
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.error('Error on starting app:', e);
  }
};

startApp();


