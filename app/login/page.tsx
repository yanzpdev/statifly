'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '../components/Button'
import DarkmodeBtn from '../components/DarkModeBtn'
import { useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";

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
    <section className='bg-white dark:bg-slate-900 py-20 px-10 lg:px-72 text-center lg:text-start relative text-black dark:text-white h-screen w-full duration-300'>
      <div className='fixed top-4 right-4'>
        <DarkmodeBtn />
      </div>
      <div className='flex flex-col items-center justify-start lg:grid lg:grid-cols-2 place-items-end'>
        <div>
          <Image 
            src='assets/statifly-logo.svg'
            alt='Statifly Icon Logo'
            height={400}
            width={400}
            className='h-[250px] lg:h-[400px] w-auto '
          />
          <Image 
            src='assets/logo.svg'
            alt='Statifly Text Logo'
            height={400}
            width={400}
            className='-mt-8 h-[70px] lg:h-[100px] w-auto'
          />
        </div>
        <div className='self-end py-6'>
          <h1 className='font-semibold text-sm lg:text-xl'>
            Track your favorite songs, artists, and genres. Dive deep into your Spotify listening habits and uncover trends, stats, and insights that help you understand your music vibe like never before.
          </h1>
          <div className='mx-auto lg:mx-0 w-fit'>
            <Button 
              className='mt-8 mx-auto w-fit hover:lg:dark:bg-slate-300 hover:lg:bg-slate-700 bg-slate-900 text-white dark:bg-white dark:text-slate-800 font-bold rounded-xl p-5 duration-300'
              onClick={() => signIn('spotify', { callbackUrl: '/' })}
            >
              Log in with Spotify
            </Button>
          </div>
          <h2 className='mt-5 lg:mt-20 text-xs'>Statifly does not collect personal data</h2>
          <h3 className='mt-5 text-xs'>Statifly is not affiliated with Spotify™</h3>
        </div>
      </div>
    </section>
  )
}