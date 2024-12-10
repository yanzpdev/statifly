'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import DarkmodeBtn from '../../components/ui/DarkModeBtn'
import { useSearchParams } from 'next/navigation';
import { signIn } from "next-auth/react";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Login() {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError('Authorization failed. Please try again.');
    }
  }, [searchParams]);

  return(
    <motion.section 
      className='bg-white dark:bg-slate-900 py-20 px-10 lg:px-72 text-center lg:text-start relative text-black dark:text-white h-screen w-full duration-300'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className='fixed top-4 right-4'>
        <DarkmodeBtn />
      </div>
      <div className='flex flex-col -mt-5 lg:mt-0 items-center justify-start lg:grid lg:grid-cols-2 place-items-end'>
        <div>
          <Image 
            src='/assets/statify-logo.png'
            alt='Statify Icon Logo'
            height={400}
            width={400}
            className='h-[250px] lg:h-[400px] w-auto'
          />
          <Image 
            src='/assets/logo.svg'
            alt='Statify Text Logo'
            height={400}
            width={400}
            className='-mt-8 h-[70px] lg:h-[100px] w-auto'
          />
        </div>
        <motion.div 
          className='self-end py-6'
        >
          <h1 className='font-semibold text-sm lg:text-xl'>
            Track your favorite songs, artists, and genres. Dive deep into your Spotify listening habits and uncover trends, stats, and insights that help you understand your music vibe like never before.
          </h1>
          <div className='mx-auto lg:mx-0 w-fit'>
            <Button 
              className='mt-8 mx-auto w-fit hover:lg:dark:bg-slate-300 hover:lg:bg-slate-700 bg-slate-900 text-white dark:bg-white dark:text-slate-800 font-bold rounded-xl p-5 duration-300'
              onClick={() => signIn('spotify', { callbackUrl: '/' })}
            >
              Log in using Spotify
            </Button>
          </div>
          <h2 className='mt-5 lg:mt-20 text-xs'>Statify does not collect your personal data.</h2>
          <h3 className='mt-3 text-xs flex items-center justify-center lg:justify-start'>
            Statify is not affiliated with 
            <Link
              href={'https://www.spotify.com/ph-en/premium/'}
              className='flex items-center'
            >
            <Image 
              src='/assets/spotify-logo.svg'
              alt='Spotify Logo'
              height={400}
              width={400}
              className='ml-1 -mt-0.5 h-[36px] w-auto'
            /> <span className='text-lg text-[#20d464]'>®</span>
            </Link> 
            
          </h3>
        </motion.div>
      </div>
    </motion.section>
  )
}