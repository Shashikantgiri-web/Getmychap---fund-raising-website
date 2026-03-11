
"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

const dashboard = () => {
  const { data: session } = useSession()
      if (!session) {
          const router = useRouter();
          router.push('/login');
      }
  return (
    <>
     <div className='w-screen h-[60%] flex justify-center items-center relative'>
      <div className='w-[50%] h-[60%] flex flex-col justify-start items-center p-4 bg-gray-900 rounded-2xl shadow-xs shadow-blue-700 gap-1.5'>
        <div className='w-[99%] h-[20%] flex flex-col justify-center items-start gap-2.5'>
          <p>Name:</p>
          <input type="text" name="name" id="" placeholder={session?.user?.name} className='w-[90%] h-[80%] flex justify-start items-center p-1.5 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] h-[20%] flex flex-col justify-center items-start gap-2.5'>
          <p>Email:</p>
          <input type="text" name="email" id="" placeholder={session?.user?.email} className='w-[90%] h-[80%] flex justify-start items-center p-1.5 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] h-[20%] flex flex-col justify-center items-start gap-2.5'>
          <p>UserName:</p>
          <input type="text" name="userName" id="" placeholder={session?.user?.name} className='w-[90%] h-[80%] flex justify-start items-center p-1.5 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] h-[20%] flex flex-col justify-center items-start gap-2.5'>
          <p>UPI ID</p>
          <input type="text" name="upiId" id="" placeholder='Enter your UPI ID' className='w-[90%] h-[80%] flex justify-start items-center p-1.5 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] h-[20%] flex flex-col justify-center items-start gap-2.5'>
          <button type="submit" className='w-25 h-[80%] flex flex-row justify-center items-center p-1.5 bg-blue-950 rounded-lg '>Save</button>
        </div>
      </div>
     </div>
    </>
  )
}

export default dashboard
