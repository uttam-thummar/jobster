import dotenv from 'dotenv';
dotenv.config();
import { readFile } from 'fs/promises';
import Job from './models/Job.model.js'
import connectDB from './db/connect.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const mockData = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    )
    await Job.create(mockData);
    console.log('Success !!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
