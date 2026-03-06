import mongoose from "mongoose";

const MongoUri = process.env.MONGO_URI as string;

if (!MongoUri) {
  throw new Error("Please define MONGO_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function DbConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MongoUri);
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB Connected");

  return cached.conn;
}

export default DbConnection;
