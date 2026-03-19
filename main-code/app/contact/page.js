"use client"
import React, { useState } from 'react'

const Contact = () => {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate form submission
        setTimeout(() => {
            setLoading(false)
            setStatus("success")
            e.target.reset()
        }, 1500)
    }

    return (
        <div className='min-h-screen text-white flex items-center justify-center p-6'>
            <div className='max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                
                {/* Contact Info Side */}
                <div className='flex flex-col gap-8'>
                    <div>
                        <h1 className='text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                            Get in Touch
                        </h1>
                        <p className='text-slate-400 text-lg'>
                            Have questions or ideas? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center gap-4 group'>
                            <div className='w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div>
                                <p className='text-sm text-slate-500 font-bold uppercase tracking-wider'>Email Us</p>
                                <p className='text-white font-medium'>support@getmychap.com</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 group'>
                            <div className='w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div>
                                <p className='text-sm text-slate-500 font-bold uppercase tracking-wider'>Our Location</p>
                                <p className='text-white font-medium'>Mumbai, India</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 mt-4'>
                        {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                            <button key={social} className='w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all text-slate-400 capitalize'>
                                <span className='sr-only'>{social}</span>
                                <div className='w-5 h-5 bg-current opacity-20'></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Side */}
                <div className='bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden'>
                    <div className='absolute -left-20 -bottom-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl'></div>
                    
                    <form onSubmit={handleSubmit} className='relative z-10 flex flex-col gap-5'>
                        {status === 'success' && (
                            <div className='bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-2xl text-sm flex items-center gap-3 animate-in fade-in zoom-in duration-300'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        <div className='grid grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Name</label>
                                <input required type="text" placeholder="John Doe" className='bg-gray-950/50 border border-gray-800 rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'/>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Email</label>
                                <input required type="email" placeholder="john@example.com" className='bg-gray-950/50 border border-gray-800 rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'/>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Subject</label>
                            <input required type="text" placeholder="How can we help?" className='bg-gray-950/50 border border-gray-800 rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Message</label>
                            <textarea required rows="4" placeholder="Your specific questions..." className='bg-gray-950/50 border border-gray-800 rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none'></textarea>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className='w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {loading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polyline points="22 2 15 22 11 13 2 9 22 2"></polyline></svg>
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
