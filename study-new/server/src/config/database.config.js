import mongoose from 'mongoose';

if (!process.env.MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL');
}

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('MongoDB database connected successfully ✅');
    })
    .catch((err) => {
      console.log('Database connection failed ❌', err);
      process.exit(1);
    });
};

export default connectDB;
