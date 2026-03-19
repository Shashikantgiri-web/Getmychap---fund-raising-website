"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Github from 'next-auth/providers/github'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div className='w-[99%] h-[10vh] hidden md:flex items-center justify-center bg-gray-900'>
        <div className='w-[30%] h-[99%] flex flex-row items-center justify-start'>
          <Link href="/" className='flex flex-row items-center justify-start'>
            <span className='w-[30%] h-[99%] flex justify-end items-center'>
              <img src="/Images/tea.gif" alt="images not found" className='w-12.5 h-12.5 pb-1.5' />
            </span>
            <p className=' text-white font-bold text-2xl'>Getmychai</p>
          </Link>
        </div>
        <div className='w-[70%] h-[99%] flex items-center justify-end'>
          <ul className='w-[99%] md:w-[80%] h-[99%] flex items-center justify-around text-white '>
            <Link href="/"><li className='hover:text-purple-200 hover:text-lg transition-all duration-150 ease-in-out'>Home</li></Link>
            <Link href="/Explore"><li className='hover:text-purple-200 hover:text-lg transition-all duration-150 ease-in-out'>Explore</li></Link>
            <Link href="/contact"><li className='hover:text-purple-200 hover:text-lg transition-all duration-150 ease-in-out'>Contact</li></Link>
            <li className='relative'>{session && <>
              <button id="dropdownHoverButton" onClick={() => { setShowDropdown(!showdropdown) }} onBlur={() => { setTimeout(() => { setShowDropdown(false) }, 300) }} data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="flex justify-center items-center text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 p-0.5" type="button">
                Welcome {session.user.email}
                <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
              </button>
              <div id="dropdownHover" className={`z-10 ${showdropdown ? '' : 'hidden'} absolute right-0 flex justify-center items-center text-white bg-gray-900 shadow-xs shadow-blue-700 font-medium rounded-2xl text-sm px-4 py-2.5 text-center leading-5 p-0.5 mt-2.5`}>
                <ul className="w-32.5 text-sm text-body font-medium" aria-labelledby="dropdownHoverButton">
                  <Link href="/dashboard"><li className="hover:bg-blue-800 hover:text-white rounded-2xl w-[95%] h-[10%] p-2 flex items-center justify-center">
                    Dashboard
                  </li></Link>
                  <Link href={`/${session.user.name}`}><li className="hover:bg-blue-800 hover:text-white rounded-2xl w-[95%] h-[10%] p-2 flex items-center justify-center">
                    Your Page
                  </li></Link>
                  <li className="hover:bg-blue-800 hover:text-white rounded-2xl w-[95%] h-[10%] p-2 flex items-center justify-center" onClick={() => { signOut() }}>
                    <Link href="#" className=" text-white">Log out</Link>
                  </li>
                </ul>
              </div>
            </>}</li>
            <li>{!session && <Link href="/signin"><button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 p-0.5">Signin</button></Link>}</li>
            <li>{!session && <Link href="/login"><button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 p-0.5">Login</button></Link>}</li>
          </ul>
        </div>
      </div>

      <div className='w-[99%] h-[10vh] flex md:hidden items-center justify-center bg-gray-900'>
        <div className='w-[20%] h-[99%] flex flex-row items-center justify-start'>
          <Link href="/" className='flex flex-row items-center justify-start'>
            <span className='w-[99%] h-[99%] flex justify-end items-center'>
              <img src="/Images/tea.gif" alt="images not found" className='w-13.5 h-13.5 pb-1.5' />
            </span>
          </Link>
        </div>
        <div className='w-[80%] h-[99%] flex items-center justify-end'>
          {session && <>
            <div className='relative flex flex-row items-center justify-center'>
              <button className="flex justify-center items-center text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 p-0.5">
                {session.user.image && <img src={session.user.image} alt="profile" className='w-6 h-6 rounded-full me-1' />}
              </button>
              <button data-collapse-toggle="mega-menu-full" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-lg md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-default" aria-controls="mega-menu-full" aria-expanded="false">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
              </button>
            </div>
            <div id="mega-menu-full" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                <li>
                  <Link href="#" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href="/Explore" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Explore</Link>
                </li>
                <li>
                  <Link href="/contact" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Contact</Link>
                </li>
                <li>
                  <Link href="/dashboard" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Your Page</Link>
                </li>
                <li onClick={() => { signOut() }}>
                  <a href='#' class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light hover:bg-neutral-secondary-soft md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Log out</a>
                </li>
              </ul>
            </div>
          </>}
          {!session && <Link href="/login"><button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 p-0.5">Login</button></Link>}
        </div>
      </div>
    </>
  )
}

export default Navbar