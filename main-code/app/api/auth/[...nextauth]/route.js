import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from "next-auth/providers/email"
import mongoose from 'mongoose'
import connectDB, { clientPromise } from '@/lib/db';
import User from '@/models/User';
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authoptions = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // Passwordless / email sign in
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDB();
            let currentUser = await User.findOne({ email: user.email });

            if (currentUser) {
                // NextAuth may have created the user, but we need to ensure our custom field 'userName' exists
                if (!currentUser.userName) {
                    currentUser.userName = user.email.split('@')[0];
                    await currentUser.save();
                }
            } else {
                // If user doesn't exist, create it manually
                const newUser = new User({
                    email: user.email,
                    name: user.name || user.email.split('@')[0],
                    userName: user.email.split('@')[0],
                });
                await newUser.save();
            }
            return true;
        },
        async session({ session, token, user }) {
            const dbUser = await User.findOne({ email: session.user.email })
            console.log(dbUser)
            session.user.id = dbUser._id.toString();
            return session;
        }
    }
})

export { authoptions as GET, authoptions as POST }