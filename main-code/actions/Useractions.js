"use server"
import React from 'react'
import Payment from '@/models/payment'
import User from '@/models/User'
import mongoose from 'mongoose'

export default async function UserActions({ username, name, message, amount }) {
  await mongoose.connect(process.env.MONGODB_URI)
  const user = await User.findOne({ username: username })

};  