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
import Payment from '@/models/payment'

export const authoptions = NextAuth({
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
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === 'github') {
                const client = await mongoose.connect("https://cloud.mongodb.com/v2/69b185f823aca5080a841ed5#/clusters/detail/getme-a-chain/collections/getme-a-chain%2Eusers/insertOne")
                const currentUser = User.findOne({ email: user.email })
                if (!currentUser) {
                    const newUser = new User({ 
                        email: user.email, 
                        name: user.email.split('@')[0],
                        userName: user.name,
                        upiId: user.upiID
                     })
                    await newUser.save()
                    user.name= newUser.userName
                }
                else {
                    user.name = currentUser.userName
                }
            }
            if (account.provider === 'google') {
                const client = await mongoose.connect("https://cloud.mongodb.com/v2/69b185f823aca5080a841ed5#/clusters/detail/getme-a-chain/collections/getme-a-chain%2Eusers/insertOne")
                const currentUser = User.findOne({ email: user.email })
                if (!currentUser) {
                    const newUser = new User({ 
                        email: user.email, 
                        name: user.email.split('@')[0],
                        userName: user.name,
                        upiId: user.upiID
                     })
                    await newUser.save()
                    user.name= newUser.userName
                }
                else {
                    user.name = currentUser.userName
                }
                return true
            }
        },
    }
})

export { authoptions as GET, authoptions as POST }