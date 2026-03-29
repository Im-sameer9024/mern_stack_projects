import mongoose from 'mongoose';

if (!process.env.MONGODB_URL) {
  console.log('Error occur, Mongodb url Not Found ❌');
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Databse connected ✅');
  } catch (error) {
    console.log('Error connecting to MongoDB ❌', error);
    process.exit(1);
  }
};

export default connectDB;
