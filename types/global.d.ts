import mongoose from 'mongoose';

declare global {
namespace globalThis {
var mongoose: {
conn: typeof mongoose | null;
promise: Promise<typeof mongoose> | null;
};
}
}

export {};