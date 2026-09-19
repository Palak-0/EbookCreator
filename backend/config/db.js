const mongoose = require("mongoose");

// Cache the connection to reuse in serverless functions
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const isLocal = process.env.MONGO_URI.includes("localhost") || process.env.MONGO_URI.includes("127.0.0.1");
    const opts = {
      bufferCommands: false,
      tls: !isLocal, // ensures TLS for Atlas, but disabled for local MongoDB
      tlsAllowInvalidCertificates: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Database connection error:", e.message);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
