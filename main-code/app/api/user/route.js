import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, userName, upiId } = body;

        await connectDB();

        // Update the user record. We use email from session for security.
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { 
                $set: { 
                    name, 
                    userName, 
                    upiId,
                    updatedAt: Date.now()
                } 
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                name: updatedUser.name,
                userName: updatedUser.userName,
                upiId: updatedUser.upiId
            }
        });

    } catch (error) {
        console.error("API /api/user Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
