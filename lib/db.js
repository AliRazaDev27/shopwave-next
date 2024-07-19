import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const connectDB = async () => {
  if (cached.conn) {
    console.log("Using cached connection")
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB")
      return mongoose;
    });
    cached.conn = await cached.promise;
    return cached.conn;
  }
};
async function clearDbCache() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export { clearDbCache, connectDB };
