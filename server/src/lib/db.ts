// Database connection — supports both MongoDB and in-memory modes
import mongoose from 'mongoose';
import { logger } from './logger.js';

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    logger.info('No MONGODB_URI set — running in-memory mode');
    return false;
  }

  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected', { database: uri.split('/').pop()?.split('?')[0] });
    return true;
  } catch (error) {
    logger.warn('MongoDB connection failed — falling back to in-memory mode', {
      error: (error as Error).message,
    });
    return false;
  }
}

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
