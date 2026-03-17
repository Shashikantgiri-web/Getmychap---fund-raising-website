import React from 'react'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Payment from '@/models/payment'
import ProfileClient from './ProfileClient' // We will extract the client part

const UserName = async ({ params }) => {
  const { username } = await params
  const decodedUsername = decodeURIComponent(username);

  // Fetch data server-side (case-insensitive)
  await connectDB()
  const user = await User.findOne({ userName: new RegExp(`^${decodedUsername}$`, 'i') }).lean()
  
  if (!user) {
    return (
      <div className="w-screen h-[60vh] flex justify-center items-center text-white text-2xl">
        User @{decodedUsername} not found
      </div>
    )
  }

  // Fetch successful payments for this user
  const payments = await Payment.find({ to_user: decodedUsername, done: true }).sort({ createdAt: -1 }).lean()
  const totalRaised = payments.reduce((sum, p) => sum + p.amount, 0)

  // Serialize MongoDB ObjectIds to strings before passing to Client Component
  const serializedPayments = payments.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const serializedUser = {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }

  return (
    <div className="w-[99%] min-h-[150vh] max-h-[200vh] flex flex-col items-center justify-start relative gap-0.5">
      <ProfileClient user={serializedUser} payments={serializedPayments} totalRaised={totalRaised} />
    </div>
  )
}

export default UserName