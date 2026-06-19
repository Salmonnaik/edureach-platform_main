import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // Disable command buffering immediately to prevent timeouts
    mongoose.set("bufferCommands", false);
    
    // Try local MongoDB first, fallback to Atlas
    let mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      // Use local MongoDB for development
      mongoURI = "mongodb://localhost:27017/edureach_db";
      console.log("🔧 Using local MongoDB for development");
    } else {
      console.log("🌐 Using MongoDB Atlas from environment");
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000,
      socketTimeoutMS: 2000,
      bufferCommands: false,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ MongoDB Database Name: ${conn.connection.name}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`✗ MongoDB Connection Error: ${error.message}`);
    } else {
      console.error(`✗ MongoDB Connection Error: ${error}`);
    }
    // Ensure buffering is disabled when connection fails
    mongoose.set("bufferCommands", false);
    console.warn("⚠️  Server will continue without MongoDB. Some features may not work.");
    
    // For demo purposes, we'll continue without MongoDB
    // The authentication routes will be modified to work with in-memory data
  }
};

export default connectDB;