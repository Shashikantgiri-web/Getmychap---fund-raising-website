import React from 'react'
import connectDB from '@/lib/db'

const Explore = async () => {
  const user = await connectDB();
  console.log(user);
  return (
    <div className='w-[99%] h-[84vh] flex items-start justify-center'>
      {user.map((item) => {
        return (
          <div className='w-[30%] h-[20vh] bg-gray-900 m-5 rounded-lg flex items-center justify-center text-white text-xl font-bold' key={item._id}>
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default Explore