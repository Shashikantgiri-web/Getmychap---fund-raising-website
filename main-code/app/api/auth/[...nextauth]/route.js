import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import GithubProvider from 'next-auth/providers/github'
// import Providers from `next-auth/providers`
import TwitterProvider from 'next-auth/providers/twitter'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import mongoose from 'mongoose'
import User from '@/models/User'
// import Payment from '@/models/payment'

// lib/db.js or similar would be better, but keeping it simple for now
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGODB_URI);
}

export const authoptions = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // OAuth authentication providers...
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // Providers.LinkedIn({
        //     clientId: process.env.LINKEDIN_CLIENT_ID,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        // }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
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