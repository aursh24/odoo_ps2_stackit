import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
await connectDB();
const { email, password } = await req.json();

const user = await User.findOne({ email });
if (!user) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });

const isMatch = await bcrypt.compare(password, user.passwordHash);
if (!isMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

return NextResponse.json({ message: 'Login successful', token });
}