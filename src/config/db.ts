import mongoose from "mongoose";
require("dotenv").config();

if (!process.env.MONGO_DATABASE) {
  console.error("MongoDB connection URL is not defined");
  process.exit(1);
}

export default mongoose
  .connect(process.env.MONGO_DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
