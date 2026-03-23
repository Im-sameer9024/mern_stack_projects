import "dotenv/config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 8000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
