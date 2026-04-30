import 'dotenv/config.js';
import app from './app.js';
import connectDB from './config/db.js';
import { ConnectCloudinary } from './config/cloudinary.js';

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await ConnectCloudinary();

    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
