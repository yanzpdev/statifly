'use client';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import DarkmodeBtn from './ui/DarkModeBtn';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"

const Header = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header 
      className="sticky z-50 top-0 p-2 bg-white dark:bg-slate-900 duration-300 border-b grid grid-cols-3 gap-5 justify-between items-center px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Link
        className=''
        href='/'
      >
        <Image 
          src='/assets/logo.svg'
          alt="Statifly Logo"
          width={200}
          height={200}
          className='h-auto w-36 lg:w-52'
          priority
        />
      </Link>
      <nav className='flex gap-5 items-center justify-center dark:text-white'>      
        <Link href="/tracks">Top Tracks</Link>
        <Link href="/genres">Top Genres</Link>
        <Link href="/artists">Top Artists</Link>
      </nav>

      <div className='flex h-full w-full items-center justify-end ml-auto relative'>
        <DarkmodeBtn />
        <div ref={dropdownRef}>
          <Button
            variant={'ghost'}
            className='flex hover:bg-transparent items-center rounded-full justify-center w-fit dark:text-white duration-300'
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={!session}
          >
            <Image 
              src={session?.user?.image || '/assets/loading.gif'} 
              alt={session?.user?.name || 'Loading...'}          
              width={1000}
              height={1000} 
              className={`h-12 w-12 p-0.5 duration-300 rounded-full  border-2 ${showDropdown ? 'border-slate-500' : 'border-transparent'}`}
            />
          </Button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 text-center p-5 bg-white rounded-md shadow-lg dark:bg-slate-800">
              {/* Dropdown content */}
              <Button
                variant={'ghost'}
                className='dark:text-white hover:bg-transparent hover:underline'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header