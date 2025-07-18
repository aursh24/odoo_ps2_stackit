import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/login';

if (!MONGODB_URI) {
throw new Error('Please define the MONGODB_URI in .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
if (cached.conn) return cached.conn;

if (!cached.promise) {
cached.promise = mongoose.connect(MONGODB_URI, {
bufferCommands: false,
});
}

cached.conn = await cached.promise;
return cached.conn;
}