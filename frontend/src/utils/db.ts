const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCALHOST_URI, {
    });
    console.log(`Mongodb connected site ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

