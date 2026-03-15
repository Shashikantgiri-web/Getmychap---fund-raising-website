import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from "next-auth/providers/email"
import mongoose from 'mongoose'
import connectDB from '@/lib/db';
import User from '@/models/User';

export const authoptions = NextAuth({
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
        // EmailProvider({
        //     server: process.env.RESEND_API_KEY,
        //     from: process.env.EMAIL_FROM
        // }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'github' || account.provider === 'google') {
                await connectDB();
                const currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        name: user.name || user.email.split('@')[0],
                        userName: user.email.split('@')[0],
                    })
                    await newUser.save()
                }
                return true
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