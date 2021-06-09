import mongoose from 'mongoose';
import { dbUri, logDanger, logPrimary } from '../utils';

export async function initDB(): Promise<void | mongoose.Connection> {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;

    logPrimary('Mongodb connected...');

    return db;
  } catch (err) {
    logDanger(err.message);
    // exit process
    process.exit(1);
  }
}