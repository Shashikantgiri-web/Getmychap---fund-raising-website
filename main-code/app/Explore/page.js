import React from 'react'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Link from 'next/link'

const Explore = async (props) => {
  const searchParams = await props.searchParams;
  await connectDB();
  const search = searchParams.search || ""

  // Fetch users matching search query (name or userName)
  const users = await User.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { userName: { $regex: search, $options: "i" } }
    ]
  }).lean();

  return (
    <div className='min-h-screen bg-[#000d1d] text-white p-4 md:p-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
          Explore Creators
        </h1>
        <p className='text-center text-slate-400 mb-10 font-medium'>Find and support your favorite fund raisers</p>

        {/* Search Bar */}
        <div className='mb-12 flex justify-center'>
          <form action="/Explore" method="GET" className='relative w-full max-w-lg group'>
            <input 
              type="text" 
              name="search" 
              defaultValue={search}
              placeholder="Search by name or username..." 
              className='w-full bg-gray-900/60 border border-gray-700/50 rounded-full py-4 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white backdrop-blur-sm'
            />
            <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors'>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <button type="submit" className='absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95'>
              Search
            </button>
          </form>
        </div>

        {/* User Grid */}
        {users.length === 0 ? (
          <div className='text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-gray-700/50 flex flex-col items-center justify-center gap-4'>
            <div className='w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-500'>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <p className='text-slate-500 font-medium italic'>No creators found matching "{search}"</p>
            <Link href="/Explore" className='text-blue-500 hover:underline text-sm'>View all creators</Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {users.map((item) => (
              <Link 
                href={`/${item.userName}`} 
                key={item._id.toString()}
                className='group relative bg-gray-900/40 border border-gray-800/50 rounded-3xl p-6 hover:bg-gray-800/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-md overflow-hidden'
              >
                {/* Decorative background element */}
                <div className='absolute -right-10 -top-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all duration-500'></div>
                
                <div className='flex items-center gap-5 relative z-10'>
                  <div className='relative shrink-0'>
                    <img 
                      src={item.image || "/Images/profile.jpg"} 
                      alt={item.name} 
                      className='w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-800 group-hover:ring-blue-500/50 transition-all duration-500 shadow-lg'
                    />
                    <div className='absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-gray-900 shadow-md'></div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h2 className='text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300'>
                      {item.name}
                    </h2>
                    <p className='text-sm text-blue-500/70 font-mono truncate'>@{item.userName}</p>
                  </div>
                </div>

                <div className='mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10'>
                  <div className='flex flex-col'>
                    <span className='text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1'>Creator Tier</span>
                    <span className='text-xs font-bold text-slate-300'>Active Member</span>
                  </div>
                  <div className='w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore