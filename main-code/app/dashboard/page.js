"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    upiId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (session) {
      // Initialize form with session data if available
      setFormData({
        name: session.user?.name || '',
        userName: session.user?.name || '', // Using name as default username for now
        upiId: session.user?.upiId || ''
      });
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <>
     <div className='w-[99%] min-h-[79vh] max-h-[80vh] flex flex-col justify-start items-center relative mt-10'>
      <h1 className='text-2xl font-bold text-white mb-4'>Dashboard</h1>
      {message && <p className='text-green-500 mb-2'>{message}</p>}
      <form onSubmit={handleSubmit} className='w-[90%] md:w-[50%] flex flex-col justify-start items-center p-6 bg-gray-900 rounded-2xl shadow-xs shadow-blue-700 gap-4 mt-2.5'>
        <div className='w-[99%] flex flex-col justify-center items-start gap-1'>
          <p>Name:</p>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={session?.user?.name} className='w-[90%] flex justify-start items-center p-2 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] flex flex-col justify-center items-start gap-1'>
          <p>Email: <span className="text-gray-400 text-sm ml-2">(Cannot be changed)</span></p>
          <input type="text" disabled value={session?.user?.email || ''} className='w-[90%] flex justify-start items-center p-2 pl-2 rounded-lg bg-gray-800 text-gray-400 cursor-not-allowed'/>
        </div>
        <div className='w-[99%] flex flex-col justify-center items-start gap-1'>
          <p>UserName:</p>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder={session?.user?.name} className='w-[90%] flex justify-start items-center p-2 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] flex flex-col justify-center items-start gap-1'>
          <p>UPI ID</p>
          <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} placeholder={session?.user?.upiId || 'Enter your UPI ID'} className='w-[90%] flex justify-start items-center p-2 pl-2 rounded-lg bg-blue-950 hover:ring-1 hover:ring-blue-700 text-white'/>
        </div>
        <div className='w-[99%] flex flex-col justify-center items-start gap-2.5 mt-4'>
          <button type="submit" disabled={loading} className='w-full max-w-50 flex flex-row justify-center items-center py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg text-white font-semibold transition-colors'>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
     </div>
    </>
  )
}

export default dashboard
