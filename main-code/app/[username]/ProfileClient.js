"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const ProfileClient = ({ user, payments, totalRaised }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      setFeedback('Name and Amount are required.');
      return;
    }
    
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          to_user: user.userName
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback('Record saved! Initiating UPI payment...');
        
        // Generate UPI URI
        if (user.upiId) {
            // upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=MESSAGE
            const upiUrl = `upi://pay?pa=${user.upiId}&pn=${encodeURIComponent(user.name)}&am=${formData.amount}&cu=INR&tn=${encodeURIComponent(formData.message)}`;
            
            // Try to open the UPI app (works on mobile)
            window.location.href = upiUrl;
            
            // Optional: You could show a QR code here for desktop users using excellent libraries like 'qrcode.react'
        } else {
            setFeedback('Payment saved, but receiving user has no UPI ID set.');
        }

        // Reset form after a slight delay
        setTimeout(() => {
            setFormData({ name: '', message: '', amount: '' });
            window.location.reload(); // Quick refresh to update supporters list
        }, 3000);

      } else {
        setFeedback(data.error || 'Failed to process payment');
      }
    } catch (error) {
      setFeedback('An error occurred during payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-screen h-87.5 flex justify-center items-center relative'>
        {/* Adjusted height to prevent image stretching */}
        <img src="/Images/cover.jpg" alt="bg_img" className='object-cover w-full h-full z-[-1]' />
        <img src={user.image || "/Images/profile.jpg"} alt="profile_img" className='w-24 h-24 rounded-full absolute -bottom-12 ring-4 ring-blue-500/50 shadow-2xl shadow-blue-700 z-1 bg-gray-800' />
      </div>

      <div className='w-screen flex flex-col justify-center items-center gap-1 mt-16 mb-6'>
        <p className='w-[99%] flex justify-center items-center text-xl font-bold hover:text-[22px] hover:text-blue-600 transition-all duration-200 text-white'>
          @{user.userName}
        </p>
        <p className='w-[99%] flex justify-center items-center text-sm text-slate-400'>
          Lets raise funds for @{user.userName}!
        </p>
        <div className='flex justify-center items-center text-sm text-slate-400 mt-2 gap-2'>
          <span className="text-white font-semibold">{payments.length}</span> Payments
          <span>|</span>
          <span className="text-white font-semibold">₹{totalRaised}</span> Raised
        </div>
      </div>

      <div className='w-screen min-h-100 flex flex-col md:flex-row justify-center items-stretch p-4 gap-6 max-w-6xl mx-auto'>
        
        {/* Supporters List */}
        <div className='w-full md:w-1/2 flex flex-col justify-start items-center p-6 bg-gray-900 rounded-2xl shadow-xs shadow-blue-700'>
          <h2 className='w-full text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-white'>Supporters list</h2>
          
          <ul className='w-full flex flex-col gap-3 overflow-y-auto max-h-100 pr-2'>
            {payments.length === 0 ? (
                <p className="text-slate-500 italic text-center mt-4">No payments yet. Be the first to support!</p>
            ) : (
                payments.map(payment => (
                  <li key={payment._id} className='flex items-start gap-3 text-slate-300 text-[15px] p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors'>
                    <div className="mt-1 text-blue-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div>
                        <span className="font-semibold text-white">{payment.name}</span> donated <span className="font-bold text-green-400">₹{payment.amount}</span> 
                        {payment.message && <span className="italic text-slate-400 block mt-1">"{payment.message}"</span>}
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>

        {/* Payment Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-start items-center p-6 bg-gray-900 rounded-2xl shadow-xs shadow-blue-700'>
          <h2 className='w-full text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-white'>Make Payment</h2>
          
          <form onSubmit={handlePay} className='w-full flex flex-col gap-4'>
            {feedback && (
              <div className={`p-3 rounded-md text-sm ${feedback.includes('error') || feedback.includes('required') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                {feedback}
              </div>
            )}

            <div className='flex flex-col gap-1'>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder='Enter your Name' className='w-full p-3 rounded-lg bg-blue-950/50 border border-transparent focus:border-blue-500 outline-none text-white transition-colors'/>
            </div>
            
            <div className='flex flex-col gap-1'>
              <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder='Enter your message' className='w-full p-3 rounded-lg bg-blue-950/50 border border-transparent focus:border-blue-500 outline-none text-white transition-colors'/>
            </div>
            
            <div className='flex flex-col gap-1'>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} required min="1" placeholder='Enter amount (₹)' className='w-full p-3 rounded-lg bg-blue-950/50 border border-transparent focus:border-blue-500 outline-none text-white transition-colors'/>
            </div>

            <button type="submit" disabled={loading} className='w-full mt-2 font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-lg px-4 py-3 shadow-lg transition-all'>
              {loading ? 'Processing...' : 'Pay with UPI'}
            </button>
            
            <div className='flex flex-row justify-between items-center gap-2 mt-4'>
              <button type="button" onClick={() => setFormData({...formData, amount: '100'})} className='flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors'>Pay ₹100</button>
              <button type="button" onClick={() => setFormData({...formData, amount: '500'})} className='flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors'>Pay ₹500</button>
              <button type="button" onClick={() => setFormData({...formData, amount: '1000'})} className='flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors'>Pay ₹1000</button>
            </div>
          </form>
        </div>
        
      </div>
    </>
  )
}

export default ProfileClient 
