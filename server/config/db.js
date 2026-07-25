import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/akole_cafe';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB Connected]: ${conn.connection.host} / DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error]: ${error.message}`);
    // Do not crash app, allow static fallbacks if connection fails
  }
};

export default connectDB;
