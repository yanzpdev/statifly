import React from 'react'
import Image from 'next/image'
import Button from '../components/Button'
import DarkmodeBtn from '../components/DarkModeBtn'

export default function Login() {
  return(
    <section className='bg-white dark:bg-slate-900 py-20 px-10 text-center relative text-black dark:text-white h-screen w-full duration-300 flex flex-col items-center justify-start'>
      <div className='fixed top-4 right-4'>
        <DarkmodeBtn />
      </div>
      <Image 
        src='assets/statifly-logo.svg'
        alt='Statifly Icon Logo'
        height={400}
        width={400}
        className='h-[300px] lg:h-[400px] w-auto '
      />
      <Image 
        src='assets/logo.svg'
        alt='Statifly Text Logo'
        height={400}
        width={400}
        className='-mt-8 h-[80px] lg:h-[120px] w-auto'
      />
      <div className='font-semibold'>
        Track your favorite songs, artists, and genres. Dive deep into your Spotify listening habits and uncover trends, stats, and insights that help you understand your music like never before.
      </div>
      <div className='mx-auto w-fit'>
        <Button 
          className='mx-auto w-fit bg-slate-900 text-white dark:bg-white dark:text-slate-800 font-bold rounded-xl p-5 duration-300'
        >
          Sign in with Spotify
        </Button>
      </div>
    </section>
  )
}