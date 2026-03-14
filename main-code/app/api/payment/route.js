import connectDB from "@/lib/db";
import Payment from "@/models/payment";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, message, amount, to_user } = body;

    // Basic validation
    if (!name || !amount || !to_user) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Verify the receiving user exists
    const receiver = await User.findOne({ userName: to_user });
    if (!receiver) {
      return NextResponse.json({ error: "Receiving user not found" }, { status: 404 });
    }

    // Create a new payment record (simulating a successful payment for now)
    const newPayment = new Payment({
      name,
      to_user,
      o_user: name, // Using the sender's name as o_user (originating user) for now
      message,
      amount: Number(amount),
      done: true // Marking as true to simulate a successful payment automatically
    });

    await newPayment.save();

    return NextResponse.json({ success: true, message: "Payment successful!", payment: newPayment });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
