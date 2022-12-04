import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import ProductRouter from './routers/ProductRouter.js';

dotenv.config();

const {PORT, MONGODB_URL} = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', ProductRouter);

const startApp = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.error('Error on starting app:', e);
  }
};

startApp();


