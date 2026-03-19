import React from 'react'
import connectDB from '@/lib/db'

const Explore = async () => {
  const user = await connectDB();
  console.log(user);
  return (
    <div className='w-[99%] h-[84vh] flex items-start justify-center'>all user data display</div>
  )
}

export default Explore