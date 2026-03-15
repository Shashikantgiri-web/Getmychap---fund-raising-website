"use client"
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import Link from 'next/link'

const signin = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Triggering the email provider sign-in flow
    await signIn("email", { email, callbackUrl: '/dashboard' })
  }

  return (
    <div className='w-screen h-[80vh] flex justify-center items-center'>
      <div className='w-[40%] h-[60vh] ring-1 ring-white rounded-lg flex flex-col justify-center items-center'>
        <div className='w-[99%] h-[15vh] flex flex-col justify-center items-center gap-2'>
          <h2 className='text-xl font-semibold text-white'>Sign In to GetMyChai</h2>
          <p className="text-sm text-gray-400">Enter your email below to receive a magic link</p>
        </div>
        
        <div className='w-[99%] h-[40vh] flex flex-col justify-center items-center gap-4'>
          <form onSubmit={handleSubmit} className="w-[60%] flex flex-col items-center gap-4">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border-none outline-none ring-1 ring-gray-600 rounded-lg text-white focus:ring-blue-500 transition-shadow"
            />
            
            <button
              type="submit"
              className="w-full flex justify-center items-center rounded-lg ring-1 ring-white px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 0 20 20" fill="currentColor">
                <path d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z" transform="translate(-6.75 0) scale(0.16)" />
              </svg>
              <span>Send Magic Link</span>
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center w-[60%] border-t border-gray-700 pt-4">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Social Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signin