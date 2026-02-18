import 'dotenv/config.js';
import app from './app.js';
import connectDB from './config/database.config.js';
import connectCloudinary from './config/cloudinary.config.js';

const port = process.env.PORT;

// db connection
await connectDB();
await connectCloudinary();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
