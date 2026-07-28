import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path resolution for dotenv to guarantee environment variables load regardless of working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const SHARED_ATLAS_URI = 'mongodb+srv://jshivraj028_db_user:5d1ym0d0dVseIwLJ@cluster0.oosccw2.mongodb.net/akole_cafe?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || SHARED_ATLAS_URI;

    // Explicitly connect ONLY to the shared MongoDB Atlas Cloud Cluster
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 8000
    });

    console.log(`✅ [MongoDB Atlas Connected]: Host: ${conn.connection.host} | DB Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.error(`📌 ATLAS IP WHITELIST ACTION REQUIRED: Please add 0.0.0.0/0 (Allow access from anywhere) in MongoDB Atlas Network Access so all teammates access the exact same database!`);
  }
};

export default connectDB;
